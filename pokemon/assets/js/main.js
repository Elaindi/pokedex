const loadMoreButton = document.getElementById('loadMore');

const limit = 5;
let offset = 0;

const pokemonListElement = document.getElementById('pokemonList');

function convertPokemonToHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                        .map(
                            (type) =>
                                `<li class="type ${type}">${type}</li>`
                        )
                        .join('')}
                </ol>

                <img
                    src="${pokemon.photo}"
                    alt="${pokemon.name}"
                >
            </div>
        </li>
    `;
}

function loadMorePokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons
                .map(convertPokemonToHTML)
                .join('');

            pokemonListElement.innerHTML += newHtml;
        })
        .catch((error) => {
            console.error(error);
        });
}

loadMorePokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadMorePokemonItems(offset, limit);
});