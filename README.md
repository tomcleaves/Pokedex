# Project Rotom-Dex 🔴⚡

An interactive, anime-inspired Pokédex web application featuring Generation 1 Pokémon with search, filtering, and comparison capabilities.

![Project Rotom-Dex](https://img.shields.io/badge/Pokemon-Gen%201-yellow) ![License](https://img.shields.io/badge/license-MIT-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

- **Authentic Pokédex Design** - Red plastic casing with glowing blue lens and hardware controls
- **Search & Autocomplete** - Find Pokémon by name or ID with smart autocomplete
- **Type Filtering** - Filter by all 18 Pokémon types
- **Detailed View** - View stats, abilities, evolution chains, and Pokédex entries
- **Comparison Mode** - Compare two Pokémon side-by-side with color-coded stat differences
- **Dual Themes** - Classic Red and Pro Black (Dark Mode)
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Hardware Controls** - D-pad navigation and A/B buttons for authentic feel

## 🚀 Live Demo

[View Live Demo](https://your-username.github.io/rotom-dex/)

## 📸 Screenshots

### Browse Mode
Browse through all 151 Generation 1 Pokémon with search and filtering capabilities.

### Detail View
View comprehensive Pokémon information including stats, abilities, and evolution chains.

### Comparison Mode
Compare two Pokémon side-by-side with visual stat indicators.

## 🛠️ Technologies

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **PokeAPI v2** - RESTful Pokémon data API

## 📦 Installation

### Option 1: GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings > Pages
3. Select main branch as source
4. Your site will be published at `https://your-username.github.io/rotom-dex/`

### Option 2: Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/rotom-dex.git
cd rotom-dex
```

2. Open `index.html` in your browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server
```

## 🎮 Usage

### Search
- Type a Pokémon name or ID in the search bar
- Use autocomplete suggestions (appears after 2 characters)
- Press Enter or click "SCAN" to search

### Filter
- Click type buttons to filter Pokémon by type
- Multiple types can be selected
- Click again to deselect

### Browse
- Click any Pokémon card to view details
- Use D-pad buttons to navigate (Up/Down: ±10, Left/Right: ±1)
- Press A button to select highlighted Pokémon
- Press B button to go back

### Compare
- Switch to "COMPARE MODE" tab
- Click two Pokémon from the grid
- View side-by-side comparison with stat arrows:
  - 🟢 Green ↑ = Higher stat
  - 🔴 Red ↓ = Lower stat

### Themes
- Click "🌙 Dark Mode" to toggle between Classic Red and Pro Black themes

## 🏗️ Project Structure

```
rotom-dex/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── app.js              # Application logic
└── README.md           # This file
```

## 🔒 Security Features

- **XSS Protection** - All user input and API data is sanitized
- **Content Security** - No inline scripts or styles
- **HTTPS Only** - All external resources loaded via HTTPS
- **Input Validation** - All inputs are validated and escaped
- **Safe API Calls** - URL encoding for all API requests

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Caching** - API responses cached for instant repeat access
- **Lazy Loading** - Images loaded on demand
- **Optimized Rendering** - Efficient DOM manipulation
- **Responsive Images** - Pixelated sprites for authentic retro feel

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Rotom-Dex Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **[PokeAPI](https://pokeapi.co/)** - Free and open Pokémon data API
- **Nintendo/Game Freak** - Pokémon franchise creators
- **Sprite Artists** - Official Pokémon artwork contributors

## 📧 Contact

Project Link: [https://github.com/your-username/rotom-dex](https://github.com/your-username/rotom-dex)

---

**Built with ❤️ for Pokémon fans and trainers everywhere!**

*Gotta catch 'em all!* ⚡🔴
