const express = require('express');
const axios = require('axios');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const router = express.Router();

//get full pokemon list(pokedex)
router.get('/pokedex/:num?', async (req, res) => {
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
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//get pokemon by id
router.get('/:pokemon_id', async (req, res) => {
  const { pokemon_id } = req.params;
  try {
    const pokemonById = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`
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

    if (pokemon_id <= 807) {
      const evolutionById = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon_id}/`
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

    const fetchMovesby = async (str) => {
      let movesUSUM = await moves.filter(
        (move) =>
          move.version_group_details.filter(
            (detail) =>
              detail.move_learn_method.name === str &&
              detail.version_group.name === 'ultra-sun-ultra-moon'
          ).length > 0
      );

      if (str === 'level-up') {
        movesUSUM = movesUSUM
          .map((move) => ({
            move: move.move.name,
            url: move.move.url,
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
      } else {
        movesUSUM = movesUSUM.map((move) => ({
          move: move.move.name,
          url: move.move.url,
        }));
      }

      const fetchDescription = await Promise.all(
        movesUSUM.map((move) => {
          return axios.get(move.url);
        })
      );

      const finalDescription = fetchDescription.map((data) => ({
        description: data.data.effect_entries[0].short_effect,
      }));

      const finalMoves = [];

      for (let i = 0; i < movesUSUM.length; i++) {
        finalMoves.push({ ...movesUSUM[i], ...finalDescription[i] });
      }

      return finalMoves;
    };

    const levelUpMoves = await fetchMovesby('level-up');
    // const eggMoves = await fetchMovesby('egg');
    // const tmMoves = await fetchMovesby('machine');
    // const tutorMoves = await fetchMovesby('tutor');

    //send data
    res.send({
      ability,
      id,
      name,
      totalPokeStats,
      pokeTypes,
      weight,
      levelUpMoves,
      evolutionChain: evolutionArr,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//add pokemon to user team
router.post('/:pokemon_id', auth, async (req, res) => {
  const { pokemonname } = req.body;
  const { pokemon_id } = req.params;
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).send('Invalid credentials');

    if (user.pokemonTeam.length >= 6)
      return res.status(422).send('Your team is full!');

    const updatePokemonTeam = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          pokemonTeam: { pokemonname, nickname: pokemonname, id: pokemon_id },
        },
      },
      { new: true }
    );

    res.send(updatePokemonTeam);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

module.exports = router;
