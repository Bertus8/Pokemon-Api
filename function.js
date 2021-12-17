const containerDiv$$ = document.body.querySelector(".container");
const listOl$$ = document.body.querySelector("#Pokedex");

const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
    

  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map(type => type.type.name).join(", "),
      ability: data.abilities.map(ability => ability.ability.name).join(','),
      moves: data.moves.map(move => move.move.name).slice(0, 10).join(', ')
    }));
    sendData(pokemon);
    console.log(pokemon);
  })

  function sendData(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        listOl$$.innerHTML =`
        <h1>${jsonData[i].name}</h1>
        <img src="${jsonData[i].image}" alt="${jsonData[i].name}" max-width="200px" height="200px"/>
        <h2>Type:  ${jsonData[i].type}</h2>
        <h2>Ability:  ${jsonData[i].ability}</h2>
        <h2>Moves:  ${jsonData[i].moves}</h2>
        <h2>id:  ${jsonData[i].id}</h2>`
    }
}
}


