const express = require('express');
const axios = require('axios');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const router = express.Router();

//get full pokemon list(pokedex)
router.get('/pokedex/:num?/:limit?', async (req, res) => {
  const { num, limit } = req.params;
  const NoLimit = num >= 800 ? 7 : 100;
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${num || 0}&limit=${
        limit || NoLimit
      }`
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

//get pokemon by id or name
router.get('/:pokemon_id_name', async (req, res) => {
  const { pokemon_id_name } = req.params;

  try {
    const pokemonById = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_id_name}/`
    );

    //destructure data
    const { abilities, species } = pokemonById.data;

    //fetch nested data
    const promises = [];
    promises.push(axios.get(species.url));
    abilities.map((ability) => {
      promises.push(axios.get(ability.ability.url));
    });
    const allPromises = await axios.all(promises);
    const allPromisesdata = allPromises.map((data) => data.data);

    //get species description
    const speciesDescription = allPromisesdata[0].flavor_text_entries;
    const speciesVariation = allPromisesdata[0].varieties;
    const pokemonSpecies = allPromisesdata[0].genera;

    //get description
    const fetchedAbilityDescription = allPromisesdata.splice(1);

    //fetch evolution chain
    const evolutionChain = await axios.get(
      allPromises[0].data.evolution_chain.url
    );

    res.send({
      ...pokemonById.data,
      description: speciesDescription,
      abilityDescriptions: fetchedAbilityDescription,
      evolutionChain: evolutionChain.data,
      varieties: speciesVariation,
      pokemonSpecies: pokemonSpecies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

// //get pokemon by id or name
// router.get('/:pokemon_id_name', async (req, res) => {
//   const { pokemon_id_name } = req.params;

//   try {
//     const pokemonById = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${pokemon_id_name}/`
//     );

//     //preparing data to send

//     //destructure data
//     const {
//       abilities,
//       id,
//       name,
//       forms,
//       stats,
//       types,
//       weight,
//       height,
//       species,
//     } = pokemonById.data;

//     //get evolution chain
//     //initialize evolution chain
//     const evolutionArr = [];
//     //fetch species data
//     const speciesById = await axios.get(species.url);
//     //fetch evolution chain
//     const evolutionChain = await axios.get(
//       speciesById.data.evolution_chain.url
//     );

//     //pad ID with zeros
//     let padToThree = (number) => {
//       if (number <= 999) {
//         return `00${number}`.slice(-3);
//       } else {
//         return number;
//       }
//     };

//     const padID = padToThree(id);

//     //deconstruct data
//     const { chain } = evolutionChain.data;
//     //function to get evolution chain
//     const getEvolution = (obj) => {
//       if (obj.species === undefined) return null;

//       evolutionArr.push({
//         name: obj.species.name,
//         id: padToThree(parseInt(obj.species.url.split('/')[6])),
//       });

//       if (obj.evolves_to.length === 1) getEvolution(obj.evolves_to[0]);

//       if (obj.evolves_to.length > 1)
//         obj.evolves_to.map((evo) => getEvolution(evo));

//       if (obj.evolves_to.length <= 0) return null;
//     };
//     //invoke function
//     getEvolution(chain);

//     //get species description
//     const speciesDescription = speciesById.data.flavor_text_entries;

//     const ORASDescription = speciesDescription
//       .filter(
//         (description) =>
//           (description.language.name === 'en' &&
//             description.version.name === 'alpha-sapphire') ||
//           (description.language.name === 'en' &&
//             description.version.name === 'omega-ruby')
//       )
//       .map((description) => ({
//         version: description.version.name,
//         description: description.flavor_text,
//       }));

//     //get the type(s) of the pokemon
//     const pokeTypes = types.map((type) => ({
//       type: type.type.name,
//     }));

//     //get stats data
//     const pokeStats = stats
//       .map((stat) => ({
//         name: stat.stat.name,
//         baseStat: stat.base_stat,
//       }))
//       .reverse();
//     const totalPokeStats = [
//       ...pokeStats,
//       {
//         name: 'total',
//         baseStat: pokeStats.reduce(
//           (accumulator, currentValue) => accumulator + currentValue.baseStat,
//           0
//         ),
//       },
//     ];

//     const addPeriod = (num) => {
//       const str = num.toString();
//       const strArr = str.split('');
//       strArr.splice(strArr.length - 1, 0, '.');
//       return strArr.join('');
//     };

//     // //get pokemon moves function
//     // const fetchMovesby = async (str) => {
//     //   let movesUSUM = await moves.filter(
//     //     (move) =>
//     //       move.version_group_details.filter(
//     //         (detail) =>
//     //           detail.move_learn_method.name === str &&
//     //           detail.version_group.name === 'ultra-sun-ultra-moon'
//     //       ).length > 0
//     //   );

//     //   if (str === 'level-up') {
//     //     movesUSUM = movesUSUM
//     //       .map((move) => ({
//     //         move: move.move.name,
//     //         url: move.move.url,
//     //         levelLearned: move.version_group_details
//     //           .filter(
//     //             (detail) => detail.version_group.name === 'ultra-sun-ultra-moon'
//     //           )
//     //           .map((detail) => detail.level_learned_at),
//     //       }))
//     //       .map((move) => ({
//     //         ...move,
//     //         levelLearned:
//     //           move.levelLearned.length > 1
//     //             ? move.levelLearned[1]
//     //             : move.levelLearned[0],
//     //       }))
//     //       .sort((a, b) => {
//     //         return a.levelLearned - b.levelLearned;
//     //       });
//     //   } else {
//     //     movesUSUM = movesUSUM.map((move) => ({
//     //       move: move.move.name,
//     //       url: move.move.url,
//     //     }));
//     //   }

//     //   const fetchDescription = await Promise.all(
//     //     movesUSUM.map((move) => {
//     //       return axios.get(move.url);
//     //     })
//     //   );

//     //   const finalDescription = fetchDescription.map((data) => ({
//     //     description: data.data.effect_entries[0].short_effect,
//     //   }));

//     //   const finalMoves = [];

//     //   for (let i = 0; i < movesUSUM.length; i++) {
//     //     finalMoves.push({ ...movesUSUM[i], ...finalDescription[i] });
//     //   }

//     //   return finalMoves;
//     // };
//     // //invoke get moves function
//     // const levelUpMoves = await fetchMovesby('level-up');

//     //get abilities and description
//     const fetchAbilityDescription = await Promise.all(
//       abilities.map((ability) => {
//         return axios.get(ability.ability.url);
//       })
//     );
//     //get description
//     const Abilitydescriptions = fetchAbilityDescription.map((data) => ({
//       description: data.data.effect_entries[0].short_effect,
//     }));
//     //clean abilities data
//     const cleanAbilities = abilities.map((ability) => ({
//       ability: ability.ability.name,
//       is_hidden: ability.is_hidden,
//     }));
//     //initialize final ability data
//     const finalAbility = [];

//     //group abilitydescriptions to clean ability data
//     for (let i = 0; i < cleanAbilities.length; i++) {
//       finalAbility.push({ ...cleanAbilities[i], ...Abilitydescriptions[i] });
//     }

//     // const getName = await axios.get(forms[0].url);

//     // const enName = getName.data.names.filter(
//     //   (name) => name.language.name === 'en'
//     // );
//     // fullName: enName[0] ? enName[0].name : null,

//     //send data
//     res.send({
//       id,
//       padID,
//       name,
//       description: ORASDescription,
//       abilities: finalAbility.reverse(),
//       pokeTypes,
//       totalPokeStats,
//       weight: `${addPeriod(weight)} kg`,
//       height: `${addPeriod(height)} m`,
//       evolutionChain: evolutionArr,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server Error', err: error.message });
//   }
// });

// //add pokemon to user team
// router.post('/:pokemon_id', auth, async (req, res) => {
//   const { pokemonname } = req.body;
//   const { pokemon_id } = req.params;
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) return res.status(401).send('Invalid credentials');

//     if (user.pokemonTeam.length >= 6)
//       return res.status(422).send('Your team is full!');

//     const updatePokemonTeam = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         $push: {
//           pokemonTeam: { pokemonname, nickname: pokemonname, id: pokemon_id },
//         },
//       },
//       { new: true }
//     );

//     res.send(updatePokemonTeam);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: 'Server Error', err: error.message });
//   }
// });

module.exports = router;
