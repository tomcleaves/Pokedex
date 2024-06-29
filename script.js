const api_url = "https://pokeapi.co/api/v2/pokemon/mewtwo";
    
async function search_pokemon() {
 const pokemon_search = document.getElementById('pokemon-name').value.toLowerCase(); 
 try{
     const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_search}`); 
     
     if (!api.ok) {
         throw new Error('Pokémon not found');
     }
     const data = await api.json();

 const pokemon_details = {
     name: data.name, 
     id: data.id,
     imageUrl: data.sprites.front_default, 
     abilities: data.abilities.map(abilityInfo => abilityInfo.ability.name).join('\n'),
     abilities_url: data.abilities.url, 
     height: data.height,
     weight: data.weight,
     moves: data.moves.map(AllMoves => AllMoves.move.name).join(', '),

 };
 displayPokemonDetails(pokemon_details)
     } catch (error) {
     // Handle errors
     displayError(error.message);
 }
}


function displayPokemonDetails(details) {
 const container = document.getElementById('pokemon-container');

 container.innerHTML = '';

// Create and append the Pokémon details
 container.innerHTML = `
     <h2>${details.name} (ID: ${details.id})</h2>
     <img src="${details.imageUrl}" alt="${details.name}">
     <p><strong>Abilities:</strong> ${details.abilities}</p>
     <p><strong>Height:</strong> ${details.height} decimetres</p>
     <p><strong>Weight:</strong> ${details.weight} hectograms</p>
     <p><strong>Moves:</strong> ${details.moves} </p>
 `;
const moves = details.moves
const moves_array = []
//const list = document.getElementById('list');
moves_array.push(moves);
console.log(moves_array)

}

 function displayError(message) {
 // Get the container
 const container = document.getElementById('pokemon-container');
 
 // Clear previous content
 container.innerHTML = '';
 
 // Display the error message
 container.innerHTML = `<p style="color: red;">${message}</p>`;
 }
 




 async function get_pokemon_name() { 
     const result = await fetch(api_url); 
     
     /** turn into json using a different method, bit messy */
     result.json().then(json => {
         const pokemon_name = json.name;
         console.log(pokemon_name);
         const title = document.getElementById('name');
         title.innerHTML = pokemon_name;
     })
 }
 async function get_abilities() { 
     const api = await fetch(api_url); 
     
     const data = await api.json();
     
     const pokemon_name = data.name;
     
     
     const abilities = data.abilities; 
     console.log(abilities)
     console.log(data)
     const names = []; 
     
     for (let i = 0; i < abilities.length; i++) {
     // Extract the name property from the ability object and add it to the abilityNames array
         names.push(abilities[i].ability.name);
     } 
     console.log(names);
     
     // html 
     //title
     const title = document.getElementById('name');
     title.innerHTML = pokemon_name;

     //abilities 
     const abilities_list = document.getElementById('abilities');
     abilities_list.innerHTML = names;
     
     const sprite_url = data.sprites.front_shiny;
     const img = document.getElementById('pokemon');
     img.src = sprite_url;
 }
 get_abilities()

 function print_text(){
     console.log("Button pressed");


 }