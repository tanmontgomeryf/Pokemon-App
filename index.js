const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hello world' });
});

app.get('/api/pokedex/:num?', async (req, res) => {
  const { num } = req.params;
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${num || 0}&limit=20`
    );
    const data = await response.data.results.map((result) => ({
      ...result,
      id: parseInt(result.url.split('/')[6]),
    }));
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/api/pokemon/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const pokemonById = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${num}/`
    );

    const evolutionArr = [];
    const { ability, id, moves, name, stats, types, weight } = pokemonById.data;
    const pokeTypes = types.map((type) => type.type.name);
    const pokeStats = stats.map((stat) => ({
      name: stat.stat.name,
      baseStat: stat.base_stat,
    }));

    const totalPokeStats = [
      ...pokeStats,
      {
        totalBaseStats: pokeStats.reduce(
          (accumulator, currentValue) => accumulator + currentValue.baseStat,
          0
        ),
      },
    ];

    if (num <= 807) {
      const evolutionById = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${num}/`
      );

      const evolutionChain = await axios.get(
        evolutionById.data.evolution_chain.url
      );

      const { chain } = evolutionChain.data;

      const getEvolution = (obj) => {
        if (obj.species === undefined) return null;

        evolutionArr.push({
          name: obj.species.name,
          id: parseInt(obj.species.url.split('/')[6]),
        });

        if (obj.evolves_to.length === 1) getEvolution(obj.evolves_to[0]);

        if (obj.evolves_to.length > 1)
          obj.evolves_to.map((evo) => getEvolution(evo));

        if (obj.evolves_to.length <= 0) return null;
      };

      getEvolution(chain);
    }

    // const filteredMovesByLevelUp = moves.filter(
    //   (move) =>
    //     move.version_group_details.filter(
    //       (detail) =>
    //         detail.move_learn_method.name === 'level-up' &&
    //         detail.version_group.name === 'ultra-sun-ultra-moon'
    //     ).length > 0
    // );

    // const mapedMoves = filteredMovesByLevelUp.map((move) => ({
    //   move: move.move.name,
    //   levelLearned: move.version_group_details
    //     .filter(
    //       (detail) => detail.version_group.name === 'ultra-sun-ultra-moon'
    //     )
    //     .map((detail) => detail.level_learned_at),
    // }));

    const learnedMoves = moves
      .filter(
        (move) =>
          move.version_group_details.filter(
            (detail) =>
              detail.move_learn_method.name === 'level-up' &&
              detail.version_group.name === 'ultra-sun-ultra-moon'
          ).length > 0
      )
      .map((move) => ({
        move: move.move.name,
        levelLearned: move.version_group_details
          .filter(
            (detail) => detail.version_group.name === 'ultra-sun-ultra-moon'
          )
          .map((detail) => detail.level_learned_at),
      }))
      .map((move) => ({
        ...move,
        levelLearned:
          move.levelLearned.length > 1
            ? move.levelLearned[1]
            : move.levelLearned[0],
      }))
      .sort((a, b) => {
        return a.levelLearned - b.levelLearned;
      });

    res.send({
      ability,
      id,
      name,
      totalPokeStats,
      pokeTypes,
      weight,
      learnedMoves,
      evolutionChain: evolutionArr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Currently serving at http://localhost:${PORT}`)
);
