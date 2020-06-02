//pad zeros to pokemon id
export const padZeros = (number, num) => {
  return number <= 999 ? `00${number}`.slice(num) : number;
};

//add periods to height and weight data
export const addPeriod = (num) => {
  const str = padZeros(num, -2).toString();
  const strArr = str.split('');
  strArr.splice(strArr.length - 1, 0, '.');
  return strArr.join('');
};

//clean stats data and add total base stats
export const totalBaseStats = (stats) => {
  const cleanStats = stats
    .map((stat) => ({
      name: stat.stat.name,
      baseStat: stat.base_stat,
    }))
    .reverse();

  cleanStats.push({
    name: 'total',
    baseStat: cleanStats.reduce(
      (accumulator, currentValue) => accumulator + currentValue.baseStat,
      0
    ),
  });

  return cleanStats;
};

//clean pokemon description data
export const cleanDescription = (description, versionA, VersionB) => {
  return description
    .filter(
      (description) =>
        (description.language.name === 'en' &&
          description.version.name === versionA) ||
        (description.language.name === 'en' &&
          description.version.name === VersionB)
    )
    .map((description) => ({
      version: description.version.name,
      description: description.flavor_text,
    }));
};

//clean evolution data
export const cleanEvolutionChain = (obj) => {
  const evolutionArr = [];

  //function to get evolution chain
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

  getEvolution(obj);

  return evolutionArr;
};

export const cleanAbilities = (abilities, abilityDescriptions) => {
  //get description
  const Abilitydescriptions = abilityDescriptions.map((data) => ({
    description: data.effect_entries[0].short_effect,
  }));
  //clean abilities data
  const cleanAbilities = abilities.map((ability) => ({
    ability: ability.ability.name,
    is_hidden: ability.is_hidden,
  }));
  //initialize final ability data
  const finalAbility = [];

  //group abilitydescriptions to clean ability data
  for (let i = 0; i < cleanAbilities.length; i++) {
    finalAbility.push({ ...cleanAbilities[i], ...Abilitydescriptions[i] });
  }

  return finalAbility;
};

export const checkPokemon = (str) => {
  if (str === 'farfetchd') return "farfetch'd";
  if (str === 'nidoran-m') return 'nidoran ♂️';
  if (str === 'nidoran-f') return 'nidoran ♀';
  if (str === 'mr-mime') return 'mr. mime';
  if (str === 'wormadam-plant') return 'wormadam';
  if (str === 'giratina-altered') return 'giratina';
  if (str === 'shaymin-land') return 'shaymin';
  if (str === 'basculin-red-striped') return 'basculin';
  if (str === 'darmanitan-standard') return 'darmanitan';
  if (str === 'minior-red-meteor') return 'minior';
  if (str === 'mimikyu-disguised') return 'mimikyu';
  if (str === 'deoxys-normal') return 'deoxys';
  if (str === 'meloetta-aria') return 'meloetta';
  if (str === 'keldeo-ordinary') return 'keldeo';
  if (str === 'landorus-incarnate') return 'landorus';
  if (str === 'tornadus-incarnate') return 'tornadus';
  if (str === 'thundurus-incarnate') return 'thundurus';
  if (str === 'meowstic-male') return 'meowstic';
  if (str === 'gourgeist-average') return 'gourgeist';
  if (str === 'pumpkaboo-average') return 'pumpkaboo';
  if (str === 'wishiwashi-solo') return 'wishiwashi';
  return str;
};

export const checkPokemonForLink = (str) => {
  if (str === 'minior-red-meteor') return 'minior';
  if (str === 'mimikyu-disguised') return 'mimikyu';
  if (str === 'deoxys-normal') return 'deoxys';
  return str;
};

export const checkRequestPokemon = (str) => {
  if (str === 'deoxys') return 'deoxys-normal';
  if (str === 'mimikyu') return 'mimikyu-disguised';
  if (str === 'minior') return 'minior-red-meteor';
  if (str === 'mr. mime') return 'mr-mime';
  if (str === 'wormadam') return 'wormadam-plant';
  if (str === 'giratina') return 'giratina-altered';
  if (str === 'shaymin') return 'shaymin-land';
  return str;
};

export const addDefaultTeam = (arr) => {
  const newArr = arr.concat([...Array(6).fill({ defaultPokemon: true })]);
  return newArr.splice(0, 6);
};

export const checkGen = (str) => {
  let result;
  if (str === 'gen1') result = { num: 0, limit: 151 };
  if (str === 'gen2') result = { num: 151, limit: 100 };
  if (str === 'gen3') result = { num: 251, limit: 135 };
  if (str === 'gen4') result = { num: 386, limit: 107 };
  if (str === 'gen5') result = { num: 493, limit: 156 };
  if (str === 'gen6') result = { num: 649, limit: 72 };
  if (str === 'gen7') result = { num: 721, limit: 86 };
  if (str === 'allGen') result = { num: 0, limit: 100 };
  return result;
};

export const userFirst = (arr, userName) => {
  if (userName === null) return arr;
  const newArr = [...arr];
  const userIndex = newArr.findIndex((i) => i.username === userName);
  const userInfo = newArr.splice(userIndex, 1);
  return [...userInfo, ...newArr];
};

export const totalTeamPower = (pokemonTeam) => {
  return [...pokemonTeam].reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.pokemonDetails.stats.reduce(
        (accumulator, currentValue) => accumulator + currentValue.base_stat,
        0
      ),
    0
  );
};
