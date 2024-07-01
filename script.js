document.getElementById('search-button').addEventListener("click", search_pokemon);

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
     type: data.types.map(type_name => type_name.type.name),
     imageUrl: data.sprites.front_default, 
     abilities: data.abilities.map(abilityInfo => abilityInfo.ability.name).join(' , '),
     height: data.height,
     weight: data.weight,
     moves: data.moves.map(AllMoves => AllMoves.move.name).join(', '),
     stats: data.stats.map(statInfo =>({
        stat_name: statInfo.stat.name,
        base_stat: statInfo.base_stat
     }))
     
 };
 

 displayPokemonDetails(pokemon_details)
     } catch (error) {
     // Handle errors
     displayError(error.message);
    }
}

function displayPokemonDetails(details) {
    const stats = details.stats //array of stats 
    const container = document.getElementById('pokemon-container');

        container.innerHTML = '';
  
  // Create and append the Pokémon details
        container.innerHTML = `
            <h2>${details.name} (ID: ${details.id})</h2>
            <img src="${details.imageUrl}" alt="${details.name}">
            <p><strong>Type:</strong> ${details.type}</p>
            <p><strong>Abilities:</strong> ${details.abilities}</p>
            <p><strong>Height:</strong> ${details.height} decimetres</p>
            <p><strong>Weight:</strong> ${details.weight} hectograms</p>
            <p><strong>Stats:</strong></p>
        `;
        const statsList = document.createElement('ul');
        stats.forEach(stat => {
        const listItem = document.createElement('li');
        listItem.textContent = `${stat.stat_name}: ${stat.base_stat}`;
        statsList.appendChild(listItem);
        document.getElementById("pokemon-container").appendChild(statsList)

     });

}
 
  function displayError(message) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    container.innerHTML = `<p style="color: red;">${message}</p>`;
  }

  function suggestions() {
    

  }