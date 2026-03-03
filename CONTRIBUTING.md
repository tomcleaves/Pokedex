# Contributing to Project Rotom-Dex

First off, thank you for considering contributing to Project Rotom-Dex! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include browser and OS information**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/rotom-dex.git
cd rotom-dex

# Create a branch
git checkout -b feature/your-feature-name

# Make changes and test locally
python -m http.server 8000
# Open http://localhost:8000 in your browser

# Commit changes
git add .
git commit -m "Add your feature"

# Push to your fork
git push origin feature/your-feature-name
```

## Code Style Guidelines

### JavaScript

- Use ES6+ features
- Use `const` and `let`, never `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Use meaningful variable names
- Keep functions small and focused
- Handle errors appropriately

**Example:**
```javascript
/**
 * Fetch Pokémon details from API
 * @param {string|number} nameOrId - Pokémon name or ID
 * @returns {Promise<Object>} Pokémon details
 */
async function fetchPokemonDetails(nameOrId) {
    // Implementation
}
```

### CSS

- Use CSS custom properties for colors
- Follow BEM naming convention where appropriate
- Group related properties together
- Use meaningful class names
- Add comments for complex sections
- Maintain mobile-first responsive design

**Example:**
```css
/* Component: Pokemon Card */
.pokemon-card {
    background: white;
    border: 3px solid var(--slate-gray);
    border-radius: 10px;
}

.pokemon-card:hover {
    transform: translateY(-5px);
}
```

### HTML

- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Use meaningful IDs and classes
- Keep markup clean and readable
- Add comments for complex sections

**Example:**
```html
<button 
    class="search-button" 
    id="searchButton" 
    aria-label="Search Pokémon">
    SCAN
</button>
```

## Testing Checklist

Before submitting a PR, ensure:

- [ ] Code works in Chrome, Firefox, Safari, and Edge
- [ ] Mobile responsive design works correctly
- [ ] No console errors or warnings
- [ ] Search functionality works
- [ ] Type filtering works
- [ ] Comparison mode works
- [ ] Theme toggle works
- [ ] Keyboard navigation works
- [ ] No XSS vulnerabilities (all inputs sanitized)
- [ ] Images load correctly
- [ ] Autocomplete works
- [ ] Evolution chains display correctly

## Commit Message Guidelines

Use clear and meaningful commit messages:

**Good:**
```
Add autocomplete feature to search bar
Fix responsive layout on mobile devices
Update README with deployment instructions
```

**Bad:**
```
Update
Fix bug
Changes
```

### Commit Message Format

```
<type>: <subject>

<body (optional)>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat: Add comparison mode for Pokémon stats

- Implement side-by-side comparison view
- Add color-coded stat indicators
- Update UI to accommodate comparison panel
```

## Project Structure

```
rotom-dex/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles
├── app.js              # Application logic
├── README.md           # Project documentation
├── CONTRIBUTING.md     # This file
├── DEPLOYMENT.md       # Deployment guide
└── .gitignore          # Git ignore rules
```

## Feature Requests

We welcome feature requests! Before submitting:

1. Check if the feature already exists
2. Check if someone else has requested it
3. Provide a clear use case
4. Explain the expected behavior
5. Consider implementation complexity

### Popular Feature Ideas

- Additional generations (Gen 2+)
- Sound effects and Pokémon cries
- Team builder functionality
- Move details and type effectiveness
- Shiny Pokémon variants
- Offline mode with service workers
- Save favorite Pokémon
- Battle simulator

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing.

## Recognition

Contributors will be recognized in the project README. Thank you for your contributions!

---

**Happy coding!** 🎮⚡
