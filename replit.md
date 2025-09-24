# Soul Collection Game

## Overview
A p5.js-based browser game where players control a catcher to collect blue souls (+1 point) and avoid purple souls (-1 point). The game has multiple levels with increasing difficulty.

## Project Structure
- `index.html` - Main HTML file that loads p5.js libraries and the game script
- `script.js` - Main game logic using p5.js and p5play libraries
- `style.css` - Styling (currently empty)
- `server.py` - Python HTTP server to serve static files with proper headers
- `assets/` - Game assets directory containing:
  - `background.jpeg`, `background2.jpeg`, `background3.jpeg` - Background images
  - `soul1.png`, `soul2.png`, `soul3.png` - Falling object sprites
  - `SourceCodePro-SemiBold.ttf` - Custom font

## Setup
- Uses Python 3.11 to serve static files
- Server runs on port 5000 with 0.0.0.0 host binding for Replit compatibility
- Cache headers disabled for development

## Game Features
- Home screen with Play and Directions buttons
- Level-based progression (collect 5 souls for level 1, 10 for level 2)
- Arrow key controls for left/right movement
- Collision detection between catcher and falling objects
- Score tracking and win/lose conditions
- Restart functionality

## Recent Changes
- Fixed asset path references to use proper `assets/` directory
- Created Python HTTP server with cache control headers
- Configured for Replit environment with proper host binding
- Set up deployment configuration for production

## Deployment
- Configured for autoscale deployment target
- Production ready with `python3 server.py` command