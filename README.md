# Pac-Man

A fully playable JavaScript implementation of the classic Pac-Man arcade game.

## How to Play

1. Open `index.html` in a web browser
2. Click "START GAME"
3. Use arrow keys to control Pac-Man
4. Eat all pellets to complete the level
5. Avoid ghosts or eat them after consuming power pellets

## Game Features

### Core Mechanics
- **Pac-Man Movement**: Smooth movement with input buffering for precise turning
- **Maze Navigation**: Classic maze layout with tunnels for wraparound
- **Pellets**: Collect all 244 pellets to complete each level
- **Power Pellets**: 4 power pellets that make ghosts vulnerable for a limited time
- **Lives System**: Start with 3 lives

### Ghost AI

Each of the four ghosts has unique behavior:

- **Blinky (Red)**: Aggressive direct chaser - always pursues Pac-Man's current position
- **Pinky (Pink)**: Ambusher - targets 4 tiles ahead of Pac-Man to cut him off
- **Inky (Cyan)**: Unpredictable - uses complex targeting based on both Pac-Man and Blinky's positions
- **Clyde (Orange)**: Fickle - chases when far away, retreats to corner when close

### Ghost Modes

Ghosts alternate between different behavior modes:

- **Scatter Mode**: Ghosts retreat to their corner zones
- **Chase Mode**: Ghosts actively pursue Pac-Man using their unique AI
- **Frightened Mode**: After eating a power pellet, ghosts turn blue and become vulnerable
- **Eaten State**: Eaten ghosts return to the ghost house as eyes

### Scoring

- **Pellet**: 10 points
- **Power Pellet**: 50 points
- **Ghost (1st)**: 200 points
- **Ghost (2nd)**: 400 points
- **Ghost (3rd)**: 800 points
- **Ghost (4th)**: 1,600 points
- **Bonus Fruit**: 100-5,000 points (increases with level)

### Bonus Items

Fruit appears twice per level and stays for 10 seconds:
- Level 1: Cherry (100 pts)
- Level 2: Strawberry (300 pts)
- Level 3: Orange (500 pts)
- Level 4: Apple (700 pts)
- Level 5: Melon (1,000 pts)
- Level 6: Galaxian (2,000 pts)
- Level 7: Bell (3,000 pts)
- Level 8+: Key (5,000 pts)

### Difficulty Progression

As levels increase:
- Ghost speed increases
- Frightened mode duration decreases
- Timing windows become tighter

## Technical Implementation

### Technologies
- HTML5 Canvas for rendering
- Vanilla JavaScript (no frameworks)
- Object-oriented design with ES6 classes

### Architecture

- **Game Class**: Main game loop, state management, collision detection
- **PacMan Class**: Player character with movement and animation
- **Ghost Base Class**: Shared ghost behavior and pathfinding
- **Ghost Subclasses**: Individual AI implementations (Blinky, Pinky, Inky, Clyde)

### Key Features

- **Pathfinding**: Ghosts use intelligent pathfinding to navigate the maze
- **Mode System**: Timed transitions between scatter and chase modes
- **Collision Detection**: Precise tile-based collision for walls and character interactions
- **Animation**: Pac-Man mouth animation and death sequence
- **State Management**: Start screen, gameplay, game over states

## Controls

- **Arrow Keys**: Move Pac-Man (Up, Down, Left, Right)
- **Input Buffering**: Press direction slightly early to turn as soon as possible

## Game Rules

1. **Objective**: Clear all pellets from the maze
2. **Avoid Ghosts**: Contact with a ghost (except when frightened) costs a life
3. **Power Pellets**: Make ghosts vulnerable for ~10 seconds (decreases with level)
4. **Ghost Eating**: Eat ghosts during frightened mode for escalating points
5. **Level Complete**: Clear all pellets to advance to the next level
6. **Game Over**: Lose all 3 lives

## Strategy Tips

- Use corners carefully - they can trap you if a ghost blocks the exit
- Intersections are your lifelines - they provide escape options
- Tunnels are safety valves to break pursuit patterns
- Save power pellets for dangerous situations or high-scoring opportunities
- The end of each level is most dangerous with fewer pellets remaining
- Chain ghost eats during frightened mode for maximum points (200→400→800→1600)

## Credits

Based on the original Pac-Man arcade game by Namco (1980).
This implementation faithfully recreates the classic gameplay mechanics and ghost AI behaviors.
