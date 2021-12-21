const input$$ = document.querySelector(".myinput");

const getCharacters = async () => {
  let response = await fetch(`https://rickandmortyapi.com/api/character/`); //Hace el fetch
  let data = await response.json(); //Lo traduce a Json
  let characters = data.results; //Almaceno el .results que es lo que me interesa

  const mappedCharacters = characters.map((character) => ({
    //Mapeo los personajes y les saco name y photo de sus claves
    name: character.name,
    photo: character.image,
    genero: character.gender,
  }));

  //Aqui filtro los personajes según el valor de mi input de html y los filtro por nombre y también por género
  const filteredCharacters = mappedCharacters.filter((character) =>
    character.name.toLowerCase().includes(input$$.value.toLowerCase()) ||
    character.genero.toLowerCase().includes(input$$.value.toLowerCase())
  );

  displayCharacters(filteredCharacters); //Y para terminar ejecuto la funcion de debajo pasandole por parametro mis personajes filtrados
};

const displayCharacters = (aquiVanAIrLosPersonajes) => {
  //Defino mi funcion que mapeará y mostrara los personajes mapeados
  const myHTML = aquiVanAIrLosPersonajes.map(
    (character) =>
      `<img src=${character.photo} alt=${character.name} />
  <p>${character.name}</p> 
  <p>${character.genero}</p>
  ` //Aqui defino del bloque de HTML que quiero por cada uno de los personajes con Template Strings
  );
  document.querySelector(".container").innerHTML = myHTML; //Y se lo inyecto al body de mi HTML
};


/* input$$.addEventListener("input", getCharacters) */ //Le añado a mi input que cada vez que cambie me ejecute la función de nuevo para detectar los cambios
getCharacters(); //Externamente solo estoy ejecutando esta función, es lo único que ejecuta mi JS
