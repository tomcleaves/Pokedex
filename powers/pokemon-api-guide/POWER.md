---
name: "pokemon-api-guide"
displayName: "Pokemon API Guide"
description: "Complete guide for using the PokeAPI v2 REST API to fetch Pokemon data, including endpoints for Pokemon, moves, abilities, types, and more."
keywords: ["pokemon", "pokeapi", "api", "rest", "pokemon data", "pokedex"]
author: "Kiro Power Builder"
---

# Pokemon API Guide

## Overview

PokeAPI is a free, open, and consumption-only RESTful API for Pokemon data. It provides comprehensive information about Pokemon species, moves, abilities, types, items, locations, and much more from all Pokemon games. No authentication is required, and all resources are fully accessible via simple HTTP GET requests.

This guide covers the essential endpoints and usage patterns for integrating PokeAPI into your applications.

## Onboarding

### Base URL

All API requests use the base URL:
```
https://pokeapi.co/api/v2/
```

### Key Features

- No authentication required
- All resources are open and free to use
- Consumption-only API (GET requests only)
- No rate limiting (but please use responsibly)
- Comprehensive data from all Pokemon generations
- Supports pagination for list endpoints

### Fair Use Policy

- Locally cache resources when you request them
- Be respectful of server resources
- Avoid excessive requests
- Consider using wrapper libraries for auto-caching

### Prerequisites

- Basic understanding of REST APIs
- HTTP client (fetch, axios, curl, etc.)
- No API key or authentication needed

## Common Workflows

### Workflow 1: Get Pokemon by Name or ID

Fetch detailed information about a specific Pokemon.

**Endpoint:**
```
GET https://pokeapi.co/api/v2/pokemon/{id or name}
```

**Example:**
```javascript
// Fetch Pikachu by name
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then(response => response.json())
  .then(data => {
    console.log(data.name);        // "pikachu"
    console.log(data.id);          // 25
    console.log(data.height);      // 4 (decimetres)
    console.log(data.weight);      // 60 (hectograms)
    console.log(data.types);       // Array of types
    console.log(data.abilities);   // Array of abilities
    console.log(data.stats);       // Base stats
  });

// Or fetch by ID
fetch('https://pokeapi.co/api/v2/pokemon/25')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Key Response Fields:**
- `id`: Pokemon ID number
- `name`: Pokemon name
- `height`: Height in decimetres
- `weight`: Weight in hectograms
- `types`: Array of type objects
- `abilities`: Array of ability objects
- `stats`: Base stat values (HP, Attack, Defense, etc.)
- `sprites`: URLs to Pokemon images
- `moves`: Array of moves the Pokemon can learn

### Workflow 2: List Pokemon with Pagination

Get a paginated list of all Pokemon.

**Endpoint:**
```
GET https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}
```

**Parameters:**
- `limit`: Number of results per page (default: 20, max: depends on endpoint)
- `offset`: Number of results to skip (for pagination)

**Example:**
```javascript
// Get first 50 Pokemon
fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
  .then(response => response.json())
  .then(data => {
    console.log(data.count);    // Total count of all Pokemon
    console.log(data.next);     // URL to next page
    console.log(data.previous); // URL to previous page (null if first page)
    console.log(data.results);  // Array of Pokemon with name and URL
  });

// Get next 50 Pokemon
fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=50')
  .then(response => response.json())
  .then(data => console.log(data.results));
```

### Workflow 3: Get Pokemon Species Information

Fetch species-level data including evolution chains, egg groups, and Pokedex entries.

**Endpoint:**
```
GET https://pokeapi.co/api/v2/pokemon-species/{id or name}
```

**Example:**
```javascript
fetch('https://pokeapi.co/api/v2/pokemon-species/bulbasaur')
  .then(response => response.json())
  .then(data => {
    console.log(data.evolution_chain);     // Evolution chain URL
    console.log(data.egg_groups);          // Breeding egg groups
    console.log(data.flavor_text_entries); // Pokedex descriptions
    console.log(data.generation);          // Generation introduced
    console.log(data.habitat);             // Natural habitat
    console.log(data.color);               // Pokemon color
  });
```

### Workflow 4: Get Move Information

Fetch detailed information about Pokemon moves.

**Endpoint:**
```
GET https://pokeapi.co/api/v2/move/{id or name}
```

**Example:**
```javascript
fetch('https://pokeapi.co/api/v2/move/thunderbolt')
  .then(response => response.json())
  .then(data => {
    console.log(data.name);              // "thunderbolt"
    console.log(data.power);             // 90
    console.log(data.pp);                // 15
    console.log(data.accuracy);          // 100
    console.log(data.type);              // Type object
    console.log(data.damage_class);      // Physical/Special/Status
    console.log(data.effect_entries);    // Move effect descriptions
    console.log(data.learned_by_pokemon); // Pokemon that can learn it
  });
```

### Workflow 5: Get Type Information and Effectiveness

Fetch type data including damage relations (super effective, not very effective, etc.).

**Endpoint:**
```
GET https://pokeapi.co/api/v2/type/{id or name}
```

**Example:**
```javascript
fetch('https://pokeapi.co/api/v2/type/fire')
  .then(response => response.json())
  .then(data => {
    console.log(data.damage_relations.double_damage_to);   // Super effective against
    console.log(data.damage_relations.half_damage_to);     // Not very effective against
    console.log(data.damage_relations.no_damage_to);       // No effect on
    console.log(data.damage_relations.double_damage_from); // Weak to
    console.log(data.pokemon);                             // Pokemon with this type
    console.log(data.moves);                               // Moves of this type
  });
```

### Workflow 6: Get Ability Information

Fetch ability details and which Pokemon can have them.

**Endpoint:**
```
GET https://pokeapi.co/api/v2/ability/{id or name}
```

**Example:**
```javascript
fetch('https://pokeapi.co/api/v2/ability/overgrow')
  .then(response => response.json())
  .then(data => {
    console.log(data.name);            // "overgrow"
    console.log(data.effect_entries);  // Ability effect descriptions
    console.log(data.pokemon);         // Pokemon that can have this ability
    console.log(data.generation);      // Generation introduced
  });
```

### Workflow 7: Get Evolution Chain

Fetch complete evolution chain information.

**Endpoint:**
```
GET https://pokeapi.co/api/v2/evolution-chain/{id}
```

**Example:**
```javascript
// First get the evolution chain URL from pokemon-species
fetch('https://pokeapi.co/api/v2/pokemon-species/charmander')
  .then(response => response.json())
  .then(species => {
    // Extract evolution chain ID from URL
    return fetch(species.evolution_chain.url);
  })
  .then(response => response.json())
  .then(chain => {
    console.log(chain.chain.species.name);        // "charmander"
    console.log(chain.chain.evolves_to[0].species.name); // "charmeleon"
    console.log(chain.chain.evolves_to[0].evolution_details); // Evolution conditions
  });
```

## API Endpoint Reference

### Pokemon Endpoints
- `GET /pokemon` - List all Pokemon
- `GET /pokemon/{id or name}` - Get specific Pokemon
- `GET /pokemon/{id or name}/encounters` - Get Pokemon location encounters
- `GET /pokemon-species/{id or name}` - Get Pokemon species data
- `GET /pokemon-form/{id or name}` - Get Pokemon form variations

### Move Endpoints
- `GET /move` - List all moves
- `GET /move/{id or name}` - Get specific move
- `GET /move-ailment/{id or name}` - Get move status ailments
- `GET /move-category/{id or name}` - Get move categories
- `GET /move-damage-class/{id or name}` - Get damage classes (physical/special/status)

### Ability Endpoints
- `GET /ability` - List all abilities
- `GET /ability/{id or name}` - Get specific ability

### Type Endpoints
- `GET /type` - List all types
- `GET /type/{id or name}` - Get specific type with damage relations

### Item Endpoints
- `GET /item` - List all items
- `GET /item/{id or name}` - Get specific item
- `GET /item-category/{id or name}` - Get item categories

### Location Endpoints
- `GET /location` - List all locations
- `GET /location/{id or name}` - Get specific location
- `GET /location-area/{id or name}` - Get location area details
- `GET /region/{id or name}` - Get region information

### Game Endpoints
- `GET /generation/{id or name}` - Get generation data
- `GET /pokedex/{id or name}` - Get Pokedex information
- `GET /version/{id or name}` - Get game version data
- `GET /version-group/{id or name}` - Get version group data

### Evolution Endpoints
- `GET /evolution-chain/{id}` - Get evolution chain
- `GET /evolution-trigger/{id or name}` - Get evolution triggers

### Berry Endpoints
- `GET /berry/{id or name}` - Get berry information
- `GET /berry-firmness/{id or name}` - Get berry firmness
- `GET /berry-flavor/{id or name}` - Get berry flavors

## Best Practices

- Cache API responses locally to reduce server load and improve performance
- Use pagination parameters (`limit` and `offset`) for list endpoints
- Handle errors gracefully (network issues, invalid IDs, etc.)
- Use lowercase names when querying by name
- Consider using a wrapper library for automatic caching and easier usage
- Respect the fair use policy to keep the API free for everyone

## Troubleshooting

### Error: 404 Not Found
**Cause:** Invalid Pokemon name or ID
**Solution:**
1. Verify the Pokemon name is spelled correctly and lowercase
2. Check that the ID is within valid range (1-1025+ depending on generation)
3. Use the list endpoint to find valid names: `GET /pokemon?limit=2000`

### Error: Network Request Failed
**Cause:** Network connectivity issues or API downtime
**Solution:**
1. Check your internet connection
2. Verify the base URL is correct: `https://pokeapi.co/api/v2/`
3. Check PokeAPI status at https://pokeapi.co/
4. Implement retry logic with exponential backoff

### Issue: Slow Response Times
**Cause:** Not caching responses, making repeated requests
**Solution:**
1. Implement local caching (localStorage, IndexedDB, or server-side cache)
2. Use a wrapper library with built-in caching
3. Batch requests when possible
4. Consider downloading the full dataset for offline use

### Issue: Missing Data in Response
**Cause:** Some Pokemon or resources have incomplete data
**Solution:**
1. Always check if fields exist before accessing them
2. Use optional chaining: `data.sprites?.front_default`
3. Provide fallback values for missing data
4. Check the API documentation for field availability

## Wrapper Libraries

Consider using these community-maintained wrapper libraries for easier integration:

- **JavaScript/Node.js:** pokeapi-js-wrapper, Pokedex Promise v2
- **Python:** PokeBase, Pokepy
- **PHP:** PokePHP, PHPokéAPI
- **Ruby:** Poke-Api-V2
- **Java:** pokeapi-reactor
- **.NET:** PokeApi.NET, PokeApiNet
- **Go:** pokeapi-go, PokeGo
- **Swift:** PokemonAPI
- **Kotlin:** PokeKotlin
- **Rust:** Rustemon
- **TypeScript:** Pokenode-ts

## Additional Resources

- Official Documentation: https://pokeapi.co/docs/v2
- GitHub Repository: https://github.com/PokeAPI/pokeapi
- Sprite Repository: https://github.com/PokeAPI/sprites
- Community Slack: Sign up at https://pokeapi.co/

---

**API Base URL:** `https://pokeapi.co/api/v2/`
**Authentication:** None required
**Rate Limiting:** None (please use responsibly)
