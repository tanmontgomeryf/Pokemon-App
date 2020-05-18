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
