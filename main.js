// main.js
window.onload = getPokemon;

function getPokemon() {
    const pokemonSelect = document.getElementById('pokemonSelect');
    const selectedPokemon = pokemonSelect.value.toLowerCase();

    // Zeige Lade-Indikator an
    document.getElementById('loader').style.display = 'block';

    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.error('Error fetching Pokemon data:', error);
            // Zeige klare Fehlermeldung
            alert('Error fetching Pokemon data. Please try again.');
        })
        .finally(() => {
            // Verstecke Lade-Indikator nach Abschluss des Requests
            document.getElementById('loader').style.display = 'none';
        });
}

function displayPokemon(pokemon) {
    const pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML = '';

    const name = pokemon.name;
    const image = pokemon.sprites.front_default;
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join('<br>');

    const cardContent = `
        <h2>${name}</h2>
        <img src="${image}" alt="${name}">
        <h3>Abilities:</h3>
        <p>${abilities}</p>
        <h3>Stats:</h3>
        <p>${stats}</p>
    `;

    pokemonCard.innerHTML = cardContent;
}