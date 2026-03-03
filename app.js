/**
 * Project Rotom-Dex - Interactive Pokédex Application
 * Fetches data from PokeAPI v2
 */

'use strict';

// Constants
const API_BASE = 'https://pokeapi.co/api/v2';
const POKEMON_TYPES = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 
                       'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
const MAX_AUTOCOMPLETE_RESULTS = 10;
const POKEMON_LIMIT = 151; // Gen 1

// State Management
const state = {
    allPokemon: [],
    filteredPokemon: [],
    currentViewMode: 'browse',
    currentPokemon: null,
    selectedIndex: 0,
    compareSlots: [null, null],
    pokemonCache: {},
    autocompleteIndex: -1,
    autocompleteResults: [],
    currentlyViewedPokemon: []
};

// DOM Elements
const elements = {
    searchInput: null,
    searchButton: null,
    autocompleteDropdown: null,
    typeFilters: null,
    pokemonGrid: null,
    detailView: null,
    compareView: null,
    detailPanel: null,
    mainScreen: null,
    themeToggle: null,
    tabButtons: null,
    dPadButtons: null,
    aButton: null,
    bButton: null
};

/**
 * Initialize the application
 */
async function init() {
    cacheDOM();
    attachEventListeners();
    createTypeFilters();
    await loadPokemonList();
    displayPokemonGrid();
    setupAutocomplete();
}

/**
 * Cache DOM elements for better performance
 */
function cacheDOM() {
    elements.searchInput = document.getElementById('searchInput');
    elements.searchButton = document.getElementById('searchButton');
    elements.autocompleteDropdown = document.getElementById('autocompleteDropdown');
    elements.typeFilters = document.getElementById('typeFilters');
    elements.pokemonGrid = document.getElementById('pokemonGrid');
    elements.detailView = document.getElementById('detailView');
    elements.compareView = document.getElementById('compareView');
    elements.detailPanel = document.getElementById('detailPanel');
    elements.mainScreen = document.getElementById('mainScreen');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.tabButtons = document.querySelectorAll('.tab-button');
    elements.dPadButtons = document.querySelectorAll('.d-pad-button');
    elements.aButton = document.getElementById('aButton');
    elements.bButton = document.getElementById('bButton');
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
    // Search
    elements.searchButton.addEventListener('click', searchPokemon);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && state.autocompleteIndex === -1) {
            searchPokemon();
        }
    });

    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);

    // View mode tabs
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            switchViewMode(mode);
        });
    });

    // D-pad navigation
    elements.dPadButtons.forEach(button => {
        const offset = parseInt(button.dataset.offset);
        if (!isNaN(offset)) {
            button.addEventListener('click', () => navigatePokemon(offset));
        }
    });

    // Action buttons
    elements.aButton.addEventListener('click', selectPokemon);
    elements.bButton.addEventListener('click', goBack);
}

/**
 * Create type filter buttons
 */
function createTypeFilters() {
    POKEMON_TYPES.forEach(type => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = type.toUpperCase();
        button.setAttribute('data-type', type);
        button.addEventListener('click', () => toggleTypeFilter(type, button));
        elements.typeFilters.appendChild(button);
    });
}

/**
 * Load initial Pokémon list from API
 */
async function loadPokemonList() {
    try {
        const response = await fetch(`${API_BASE}/pokemon?limit=${POKEMON_LIMIT}&offset=0`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        
        const data = await response.json();
        state.allPokemon = data.results.map((p, index) => ({
            name: sanitizeString(p.name),
            id: index + 1,
            url: p.url
        }));
        state.filteredPokemon = [...state.allPokemon];
    } catch (error) {
        console.error('Error loading Pokémon list:', error);
        showError('Failed to load Pokémon list. Please refresh the page.');
    }
}

/**
 * Fetch detailed Pokémon data with caching
 * @param {string|number} nameOrId - Pokémon name or ID
 * @returns {Promise<Object>} Pokémon details
 */
async function fetchPokemonDetails(nameOrId) {
    const key = String(nameOrId).toLowerCase();
    
    if (state.pokemonCache[key]) {
        return state.pokemonCache[key];
    }

    try {
        const [pokemonRes, speciesRes] = await Promise.all([
            fetch(`${API_BASE}/pokemon/${encodeURIComponent(key)}`),
            fetch(`${API_BASE}/pokemon-species/${encodeURIComponent(key)}`)
        ]);

        if (!pokemonRes.ok || !speciesRes.ok) {
            throw new Error('Pokémon not found');
        }

        const pokemon = await pokemonRes.json();
        const species = await speciesRes.json();

        const details = {
            id: pokemon.id,
            name: sanitizeString(pokemon.name),
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types,
            stats: pokemon.stats,
            abilities: pokemon.abilities,
            sprite: pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default,
            flavorText: sanitizeString(
                species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 
                'No description available.'
            ),
            evolutionChainUrl: species.evolution_chain.url,
            genera: sanitizeString(
                species.genera.find(g => g.language.name === 'en')?.genus || 'Unknown'
            )
        };

        state.pokemonCache[key] = details;
        return details;
    } catch (error) {
        console.error(`Error fetching Pokémon ${nameOrId}:`, error);
        throw new Error('Pokémon not found');
    }
}

/**
 * Display Pokémon grid
 */
function displayPokemonGrid() {
    elements.pokemonGrid.innerHTML = '<div class="loading">Loading Pokémon data</div>';

    setTimeout(() => {
        elements.pokemonGrid.innerHTML = '';
        state.filteredPokemon.forEach((pokemon, index) => {
            const card = createPokemonCard(pokemon, index);
            elements.pokemonGrid.appendChild(card);
        });
    }, 300);
}

/**
 * Create a Pokémon card element
 * @param {Object} pokemon - Pokémon data
 * @param {number} index - Index in filtered list
 * @returns {HTMLElement} Card element
 */
function createPokemonCard(pokemon, index) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.dataset.pokemonName = pokemon.name;
    card.setAttribute('role', 'gridcell');
    card.setAttribute('tabindex', '0');
    
    if (state.currentlyViewedPokemon.includes(pokemon.name)) {
        card.classList.add('selected');
    }
    
    const handleClick = () => {
        state.selectedIndex = index;
        if (state.currentViewMode === 'compare') {
            addToComparison(pokemon.name);
        } else {
            viewPokemonDetail(pokemon.name);
        }
    };
    
    card.addEventListener('click', handleClick);
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleClick();
    });

    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    
    card.innerHTML = `
        <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
        <img src="${escapeHtml(spriteUrl)}" alt="${escapeHtml(pokemon.name)}" loading="lazy">
        <div class="pokemon-name">${escapeHtml(pokemon.name)}</div>
    `;
    
    return card;
}

/**
 * Update grid highlights for selected Pokémon
 */
function updateGridHighlights() {
    document.querySelectorAll('.pokemon-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    state.currentlyViewedPokemon.forEach(pokemonName => {
        const card = document.querySelector(`.pokemon-card[data-pokemon-name="${pokemonName}"]`);
        if (card) {
            card.classList.add('selected');
        }
    });
}

/**
 * View detailed Pokémon information
 * @param {string|number} nameOrId - Pokémon name or ID
 */
async function viewPokemonDetail(nameOrId) {
    elements.detailView.innerHTML = '<div class="loading">Scanning Pokémon</div>';
    
    elements.detailPanel.classList.add('active');
    elements.mainScreen.classList.add('has-detail');

    try {
        const pokemon = await fetchPokemonDetails(nameOrId);
        state.currentPokemon = pokemon;
        
        state.currentlyViewedPokemon = [pokemon.name];
        updateGridHighlights();
        
        const evolutionChain = await fetchEvolutionChain(pokemon.evolutionChainUrl);
        
        elements.detailView.innerHTML = createDetailHTML(pokemon, evolutionChain);
    } catch (error) {
        console.error('Error viewing Pokémon detail:', error);
        elements.detailView.innerHTML = '<div class="error-message">Failed to load Pokémon details</div>';
    }
}

/**
 * Create detail view HTML
 * @param {Object} pokemon - Pokémon data
 * @param {string} evolutionChain - Evolution chain HTML
 * @returns {string} HTML string
 */
function createDetailHTML(pokemon, evolutionChain) {
    return `
        <div class="detail-header">
            <h2 style="text-transform: capitalize; color: var(--slate-gray); margin: 0;">
                ${escapeHtml(pokemon.name)} #${String(pokemon.id).padStart(3, '0')}
            </h2>
            <button class="close-detail-button" onclick="closeDetailView()" aria-label="Close detail view">✕</button>
        </div>
        
        <div class="detail-content">
            <div class="pokemon-image-section">
                <img src="${escapeHtml(pokemon.sprite)}" alt="${escapeHtml(pokemon.name)}" loading="lazy">
                <h3 style="text-transform: capitalize; margin: 10px 0;">${escapeHtml(pokemon.name)}</h3>
                <p style="color: var(--slate-gray);">${escapeHtml(pokemon.genera)}</p>
                <div style="margin-top: 10px;">
                    ${pokemon.types.map(t => `<span class="type-badge type-${escapeHtml(t.type.name)}">${escapeHtml(t.type.name)}</span>`).join('')}
                </div>
            </div>
            
            <div class="pokemon-info-section">
                <h3 style="color: var(--slate-gray); margin-bottom: 15px;">Vital Statistics</h3>
                <div class="info-row">
                    <span class="info-label">Height:</span>
                    <span class="info-value">${(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Weight:</span>
                    <span class="info-value">${(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Category:</span>
                    <span class="info-value">${escapeHtml(pokemon.genera)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Abilities:</span>
                    <span class="info-value">${pokemon.abilities.map(a => escapeHtml(a.ability.name)).join(', ')}</span>
                </div>
                <div class="flavor-text">
                    ${escapeHtml(pokemon.flavorText.replace(/\f/g, ' '))}
                </div>
            </div>
        </div>
        
        <div class="stats-section">
            <h3 style="color: var(--slate-gray); margin-bottom: 15px;">Base Stats</h3>
            ${pokemon.stats.map(stat => `
                <div class="stat-bar">
                    <div class="stat-name">${escapeHtml(stat.stat.name.toUpperCase())}</div>
                    <div class="stat-bar-container">
                        <div class="stat-bar-fill" style="width: ${Math.min((stat.base_stat / 255) * 100, 100)}%">
                            ${stat.base_stat}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="evolution-section">
            <h3 style="color: var(--slate-gray); margin-bottom: 15px;">Evolution Chain</h3>
            <div class="evolution-chain">
                ${evolutionChain}
            </div>
        </div>
    `;
}

/**
 * Fetch evolution chain data
 * @param {string} url - Evolution chain URL
 * @returns {Promise<string>} Evolution chain HTML
 */
async function fetchEvolutionChain(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch evolution chain');
        
        const data = await response.json();
        
        const chain = [];
        let current = data.chain;
        
        while (current) {
            const id = current.species.url.split('/').filter(Boolean).pop();
            chain.push({
                name: sanitizeString(current.species.name),
                id: id
            });
            current = current.evolves_to[0];
        }
        
        return chain.map((evo, index) => {
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`;
            const arrow = index < chain.length - 1 ? '<span class="evolution-arrow">→</span>' : '';
            return `
                <div class="evolution-item" onclick="viewPokemonDetail('${escapeHtml(evo.name)}')" role="button" tabindex="0">
                    <img src="${escapeHtml(sprite)}" alt="${escapeHtml(evo.name)}" loading="lazy">
                    <div style="text-transform: capitalize; font-weight: bold;">${escapeHtml(evo.name)}</div>
                </div>
                ${arrow}
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return '<p>Evolution data unavailable</p>';
    }
}

/**
 * Add Pokémon to comparison
 * @param {string} pokemonName - Pokémon name
 */
async function addToComparison(pokemonName) {
    elements.detailPanel.classList.add('active');
    elements.mainScreen.classList.add('has-detail');
    
    try {
        const pokemon = await fetchPokemonDetails(pokemonName);
        
        if (!state.compareSlots[0]) {
            state.compareSlots[0] = pokemon;
            displayComparisonCard(pokemon, 'compareSlot1');
        } else if (!state.compareSlots[1]) {
            state.compareSlots[1] = pokemon;
            displayComparisonCard(pokemon, 'compareSlot2');
            displayComparison();
        } else {
            state.compareSlots[0] = state.compareSlots[1];
            state.compareSlots[1] = pokemon;
            displayComparisonCard(state.compareSlots[0], 'compareSlot1');
            displayComparisonCard(pokemon, 'compareSlot2');
            displayComparison();
        }
        
        state.currentlyViewedPokemon = [
            state.compareSlots[0]?.name,
            state.compareSlots[1]?.name
        ].filter(Boolean);
        updateGridHighlights();
    } catch (error) {
        console.error('Error adding to comparison:', error);
        showError('Failed to load Pokémon for comparison');
    }
}

/**
 * Display comparison card
 * @param {Object} pokemon - Pokémon data
 * @param {string} slotId - Slot element ID
 */
function displayComparisonCard(pokemon, slotId) {
    const slot = document.getElementById(slotId);
    const otherPokemon = slotId === 'compareSlot1' ? state.compareSlots[1] : state.compareSlots[0];
    
    slot.innerHTML = `
        <div style="text-align: center;">
            <img src="${escapeHtml(pokemon.sprite)}" alt="${escapeHtml(pokemon.name)}" style="width: 100px; height: 100px;" loading="lazy">
            <h4 style="text-transform: capitalize; margin: 8px 0;">${escapeHtml(pokemon.name)}</h4>
            <div>
                ${pokemon.types.map(t => `<span class="type-badge type-${escapeHtml(t.type.name)}">${escapeHtml(t.type.name)}</span>`).join('')}
            </div>
        </div>
        <div style="margin-top: 15px;">
            ${pokemon.stats.map((stat, i) => {
                const val = stat.base_stat;
                let arrow = '';
                let arrowClass = '';
                
                if (otherPokemon) {
                    const otherVal = otherPokemon.stats[i].base_stat;
                    if (val > otherVal) {
                        arrow = '↑';
                        arrowClass = 'stat-arrow-up';
                    } else if (val < otherVal) {
                        arrow = '↓';
                        arrowClass = 'stat-arrow-down';
                    }
                }
                
                return `
                    <div class="stat-bar-compact">
                        <div class="stat-name-compact">
                            ${escapeHtml(stat.stat.name.toUpperCase())}
                            ${arrow ? `<span class="${arrowClass}">${arrow}</span>` : ''}
                        </div>
                        <div class="stat-bar-container-compact">
                            <div class="stat-bar-fill-compact" style="width: ${Math.min((val / 255) * 100, 100)}%">
                                ${val}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * Display comparison between two Pokémon
 */
function displayComparison() {
    if (!state.compareSlots[0] || !state.compareSlots[1]) return;
    displayComparisonCard(state.compareSlots[0], 'compareSlot1');
    displayComparisonCard(state.compareSlots[1], 'compareSlot2');
}

/**
 * Search for Pokémon
 */
async function searchPokemon() {
    const input = elements.searchInput.value.trim().toLowerCase();
    if (!input) return;

    try {
        await viewPokemonDetail(input);
    } catch (error) {
        showError('Pokémon not found. Try another name or ID.');
    }
}

/**
 * Toggle type filter
 * @param {string} type - Pokémon type
 * @param {HTMLElement} button - Filter button element
 */
async function toggleTypeFilter(type, button) {
    button.classList.toggle('active');
    
    const activeFilters = Array.from(document.querySelectorAll('.filter-button.active'))
        .map(btn => btn.dataset.type);

    if (activeFilters.length === 0) {
        state.filteredPokemon = [...state.allPokemon];
    } else {
        state.filteredPokemon = [];
        for (const poke of state.allPokemon) {
            try {
                const details = await fetchPokemonDetails(poke.name);
                const pokemonTypes = details.types.map(t => t.type.name);
                if (activeFilters.some(filter => pokemonTypes.includes(filter))) {
                    state.filteredPokemon.push(poke);
                }
            } catch (error) {
                console.error(`Error fetching ${poke.name}:`, error);
            }
        }
    }
    
    displayPokemonGrid();
}

/**
 * Switch view mode
 * @param {string} mode - View mode ('browse' or 'compare')
 */
function switchViewMode(mode) {
    state.currentViewMode = mode;
    
    elements.tabButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.tab-button[data-mode="${mode}"]`);
    if (activeButton) activeButton.classList.add('active');
    
    if (mode === 'browse') {
        elements.detailView.style.display = 'block';
        elements.compareView.classList.remove('active');
        elements.compareView.style.display = 'none';
    } else if (mode === 'compare') {
        elements.detailView.style.display = 'none';
        elements.compareView.classList.add('active');
        elements.compareView.style.display = 'block';
    }
}

/**
 * Close detail view
 */
function closeDetailView() {
    elements.detailPanel.classList.remove('active');
    elements.mainScreen.classList.remove('has-detail');
    
    setTimeout(() => {
        if (!elements.detailPanel.classList.contains('active')) {
            elements.detailView.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📱</div>
                    <h3>No Pokémon Selected</h3>
                    <p>Click on any Pokémon from the grid to view details</p>
                </div>
            `;
            state.currentlyViewedPokemon = [];
            updateGridHighlights();
        }
    }, 400);
}

/**
 * Navigate through Pokémon grid
 * @param {number} offset - Navigation offset
 */
function navigatePokemon(offset) {
    state.selectedIndex = Math.max(0, Math.min(state.filteredPokemon.length - 1, state.selectedIndex + offset));
    const cards = document.querySelectorAll('.pokemon-card');
    if (cards[state.selectedIndex]) {
        cards[state.selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        cards[state.selectedIndex].focus();
    }
}

/**
 * Select current Pokémon
 */
function selectPokemon() {
    if (state.filteredPokemon[state.selectedIndex]) {
        viewPokemonDetail(state.filteredPokemon[state.selectedIndex].name);
    }
}

/**
 * Go back to grid view
 */
function goBack() {
    closeDetailView();
}

/**
 * Toggle theme
 */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        elements.themeToggle.textContent = '☀️ Light Mode';
    } else {
        elements.themeToggle.textContent = '🌙 Dark Mode';
    }
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    elements.pokemonGrid.innerHTML = `<div class="error-message">${escapeHtml(message)}</div>`;
}

/**
 * Setup autocomplete functionality
 */
function setupAutocomplete() {
    elements.searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim().toLowerCase();
        
        if (value.length < 2) {
            elements.autocompleteDropdown.classList.remove('active');
            state.autocompleteResults = [];
            return;
        }

        state.autocompleteResults = state.allPokemon.filter(pokemon => {
            return pokemon.name.includes(value) || String(pokemon.id).includes(value);
        }).slice(0, MAX_AUTOCOMPLETE_RESULTS);

        displayAutocomplete(state.autocompleteResults);
    });

    elements.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            state.autocompleteIndex = Math.min(state.autocompleteIndex + 1, state.autocompleteResults.length - 1);
            highlightAutocompleteItem();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            state.autocompleteIndex = Math.max(state.autocompleteIndex - 1, -1);
            highlightAutocompleteItem();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (state.autocompleteIndex >= 0 && state.autocompleteResults[state.autocompleteIndex]) {
                selectAutocompleteItem(state.autocompleteResults[state.autocompleteIndex]);
            } else {
                searchPokemon();
            }
        } else if (e.key === 'Escape') {
            elements.autocompleteDropdown.classList.remove('active');
            state.autocompleteIndex = -1;
        }
    });

    document.addEventListener('click', (e) => {
        if (!elements.searchInput.contains(e.target) && !elements.autocompleteDropdown.contains(e.target)) {
            elements.autocompleteDropdown.classList.remove('active');
            state.autocompleteIndex = -1;
        }
    });
}

/**
 * Display autocomplete results
 * @param {Array} results - Autocomplete results
 */
function displayAutocomplete(results) {
    if (results.length === 0) {
        elements.autocompleteDropdown.classList.remove('active');
        return;
    }

    elements.autocompleteDropdown.innerHTML = results.map((pokemon, index) => {
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        return `
            <div class="autocomplete-item" data-index="${index}" role="option" tabindex="0">
                <img src="${escapeHtml(spriteUrl)}" alt="${escapeHtml(pokemon.name)}" loading="lazy">
                <span class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</span>
                <span class="pokemon-name">${escapeHtml(pokemon.name)}</span>
            </div>
        `;
    }).join('');

    // Attach click handlers
    elements.autocompleteDropdown.querySelectorAll('.autocomplete-item').forEach((item, index) => {
        item.addEventListener('click', () => selectAutocompleteItem(results[index]));
    });

    elements.autocompleteDropdown.classList.add('active');
    state.autocompleteIndex = -1;
}

/**
 * Highlight autocomplete item
 */
function highlightAutocompleteItem() {
    const items = elements.autocompleteDropdown.querySelectorAll('.autocomplete-item');
    items.forEach((item, index) => {
        if (index === state.autocompleteIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

/**
 * Select autocomplete item
 * @param {Object} pokemon - Pokémon data
 */
function selectAutocompleteItem(pokemon) {
    elements.searchInput.value = pokemon.name;
    elements.autocompleteDropdown.classList.remove('active');
    state.autocompleteIndex = -1;
    viewPokemonDetail(pokemon.name);
}

/**
 * Sanitize string to prevent XSS
 * @param {string} str - Input string
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
    return String(str).replace(/[<>]/g, '');
}

/**
 * Escape HTML to prevent XSS
 * @param {string} str - Input string
 * @returns {string} Escaped HTML string
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Make closeDetailView available globally for onclick handlers
window.closeDetailView = closeDetailView;
window.viewPokemonDetail = viewPokemonDetail;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
