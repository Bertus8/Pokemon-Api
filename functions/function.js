const containerDiv$$ = document.querySelector(".container");
const button$$ = document.querySelector("button");
const containerDivHero$$ = document.querySelector(".container_hero")
const input$$ = document.querySelector(".search");

const promises = [];
const createCharacterGallery = async () => {
  if (promises.length === 0){
  for (let i = 1; i < 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }}
  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
      image:data.sprites.other.dream_world.front_default,
      type: data.types.map(type => type.type.name).join(", "),
      ability: data.abilities.map(ability => ability.ability.name).join(','),
      moves: data.moves.map(move => move.move.name).slice(0, 8).join(', ')
    }));
    const filteredCharacters = pokemon.filter((data) =>
    data.name.toLowerCase().includes(input$$.value.toLowerCase()) ||
    data.type.toLowerCase().includes(input$$.value.toLowerCase())
    );
    sendData(filteredCharacters);
    sendData(pokemon);
    console.log(pokemon);
  })
  }

  function sendData(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
      const div$$ = document.createElement('div')
      containerDiv$$.appendChild(div$$);
        div$$.innerHTML =`
        <div class="card">
        <h2 class="title-card">${jsonData[i].name}</h1>
        <div class="container-imgCard">
        <img class="img-card" src="${jsonData[i].image}" alt="${jsonData[i].name}" max-width="200px" height="200px"/>
        </div>
        <div class="container-list-card">
        <ul class="list-card">
        <li class="item-card"><h3>${jsonData[i].id}</h3></li>
        <li class="item-card"><h3><strong class="title-item-card">Type:</strong></h3></li>
        <li class="item-card"><h3> ${jsonData[i].type}</h3></li>
        <li class="item-card"><h3><strong class="title-item-card">Ability:</strong>  ${jsonData[i].ability}</h3></li>
        <li class="item-card"><h3><strong class="title-item-card">Moves:</strong> </h3></li>
        <li class="item-card"><h3> ${jsonData[i].moves}</h3></li>
        </ul>
        </div>
        </div>
        ` };
        document.querySelector(".container").innerHTML = myHTML;
    };

button$$.addEventListener("click",() => {containerDiv$$.innerHTML="";createCharacterGallery()});

