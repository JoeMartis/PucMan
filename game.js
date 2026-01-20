// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

const TILE_SIZE = 16;
const COLS = 28;
const ROWS = 31;

const GAME_STATES = {
    START: 'start',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

const GHOST_MODES = {
    SCATTER: 'scatter',
    CHASE: 'chase',
    FRIGHTENED: 'frightened',
    EATEN: 'eaten'
};

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
    NONE: { x: 0, y: 0 }
};

// ============================================================================
// MAZE LAYOUT
// ============================================================================

// 0 = wall, 1 = pellet, 2 = power pellet, 3 = empty, 4 = ghost house door
const MAZE = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,4,4,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,3,3,3,3,3,3,0,3,0,0,1,0,0,0,0,0,0],
    [3,3,3,3,3,3,1,3,3,3,0,3,3,3,3,3,3,0,3,3,3,1,3,3,3,3,3,3],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,2,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// ============================================================================
// GAME STATE
// ============================================================================

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = GAME_STATES.START;

        this.score = 0;
        this.lives = 3;
        this.level = 1;

        this.pellets = [];
        this.powerPellets = [];
        this.pacman = null;
        this.ghosts = [];

        this.ghostMode = GHOST_MODES.SCATTER;
        this.ghostModeTimer = 0;
        this.ghostModeIndex = 0;
        this.frightenedTimer = 0;
        this.ghostEatenCount = 0;

        this.bonusFruit = null;
        this.bonusFruitTimer = 0;

        this.deathAnimation = false;
        this.deathAnimationTimer = 0;

        this.initLevel();
        this.setupEventListeners();
    }

    initLevel() {
        this.pellets = [];
        this.powerPellets = [];

        // Initialize pellets from maze
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (MAZE[row][col] === 1) {
                    this.pellets.push({ x: col, y: row });
                } else if (MAZE[row][col] === 2) {
                    this.powerPellets.push({ x: col, y: row });
                }
            }
        }

        // Initialize Pac-Man
        this.pacman = new PacMan(14, 23);

        // Initialize ghosts
        this.ghosts = [
            new Blinky(13, 11),
            new Pinky(14, 14),
            new Inky(12, 14),
            new Clyde(15, 14)
        ];

        this.ghostMode = GHOST_MODES.SCATTER;
        this.ghostModeTimer = 0;
        this.ghostModeIndex = 0;
        this.frightenedTimer = 0;
        this.bonusFruit = null;
        this.bonusFruitTimer = 0;
    }

    setupEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('restartButton').addEventListener('click', () => {
            this.restartGame();
        });

        document.addEventListener('keydown', (e) => {
            if (this.state === GAME_STATES.PLAYING && this.pacman) {
                this.pacman.handleInput(e.key);
            }
        });
    }

    startGame() {
        this.state = GAME_STATES.PLAYING;
        document.getElementById('startScreen').classList.add('hidden');
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    restartGame() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.initLevel();
        this.state = GAME_STATES.PLAYING;
        document.getElementById('gameOverScreen').classList.add('hidden');
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    gameLoop(currentTime) {
        if (this.state !== GAME_STATES.PLAYING) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        try {
            this.update(deltaTime);
            this.render();
        } catch (error) {
            console.error('Game loop error:', error);
            this.state = GAME_STATES.PAUSED;
            alert('Game error: ' + error.message);
            return;
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        if (this.deathAnimation) {
            this.deathAnimationTimer += deltaTime;
            if (this.deathAnimationTimer >= 2) {
                this.deathAnimation = false;
                this.deathAnimationTimer = 0;
                this.lives--;

                if (this.lives <= 0) {
                    this.gameOver();
                } else {
                    this.resetPositions();
                }
            }
            return;
        }

        // Update Pac-Man
        this.pacman.update(deltaTime);

        // Check pellet collision
        this.checkPelletCollision();

        // Update ghost mode timing
        this.updateGhostMode(deltaTime);

        // Update ghosts
        for (let ghost of this.ghosts) {
            ghost.update(deltaTime, this.pacman, this.ghosts, this.ghostMode);
        }

        // Check ghost collision
        this.checkGhostCollision();

        // Update bonus fruit
        this.updateBonusFruit(deltaTime);

        // Check level completion
        if (this.pellets.length === 0 && this.powerPellets.length === 0) {
            this.nextLevel();
        }

        // Update UI
        this.updateUI();
    }

    updateGhostMode(deltaTime) {
        if (this.frightenedTimer > 0) {
            this.frightenedTimer -= deltaTime;
            if (this.frightenedTimer <= 0) {
                this.frightenedTimer = 0;
                // Return to previous mode
                for (let ghost of this.ghosts) {
                    if (ghost.mode === GHOST_MODES.FRIGHTENED) {
                        ghost.mode = this.ghostMode;
                    }
                }
            }
            return;
        }

        // Scatter/Chase mode switching (simplified pattern)
        // In real Pac-Man, this follows a specific sequence
        const modeDurations = [
            { mode: GHOST_MODES.SCATTER, duration: 7 },
            { mode: GHOST_MODES.CHASE, duration: 20 },
            { mode: GHOST_MODES.SCATTER, duration: 7 },
            { mode: GHOST_MODES.CHASE, duration: 20 },
            { mode: GHOST_MODES.SCATTER, duration: 5 },
            { mode: GHOST_MODES.CHASE, duration: 20 },
            { mode: GHOST_MODES.SCATTER, duration: 5 },
            { mode: GHOST_MODES.CHASE, duration: Infinity }
        ];

        this.ghostModeTimer += deltaTime;

        if (this.ghostModeIndex < modeDurations.length) {
            const currentPhase = modeDurations[this.ghostModeIndex];
            if (this.ghostModeTimer >= currentPhase.duration) {
                this.ghostModeTimer = 0;
                this.ghostModeIndex++;
                if (this.ghostModeIndex < modeDurations.length) {
                    this.ghostMode = modeDurations[this.ghostModeIndex].mode;
                }
            }
        }
    }

    checkPelletCollision() {
        const pacCol = Math.round(this.pacman.x);
        const pacRow = Math.round(this.pacman.y);

        // Check regular pellets
        for (let i = this.pellets.length - 1; i >= 0; i--) {
            const pellet = this.pellets[i];
            if (pellet.x === pacCol && pellet.y === pacRow) {
                this.pellets.splice(i, 1);
                this.score += 10;
            }
        }

        // Check power pellets
        for (let i = this.powerPellets.length - 1; i >= 0; i--) {
            const pellet = this.powerPellets[i];
            if (pellet.x === pacCol && pellet.y === pacRow) {
                this.powerPellets.splice(i, 1);
                this.score += 50;
                this.activateFrightenedMode();
            }
        }

        // Check bonus fruit
        if (this.bonusFruit &&
            Math.abs(this.bonusFruit.x - this.pacman.x) < 0.5 &&
            Math.abs(this.bonusFruit.y - this.pacman.y) < 0.5) {
            this.score += this.bonusFruit.points;
            this.bonusFruit = null;
        }
    }

    activateFrightenedMode() {
        // Frightened duration decreases with level
        this.frightenedTimer = Math.max(3, 10 - this.level);
        this.ghostEatenCount = 0;

        for (let ghost of this.ghosts) {
            if (ghost.mode !== GHOST_MODES.EATEN) {
                ghost.mode = GHOST_MODES.FRIGHTENED;
                ghost.reverseDirection();
            }
        }
    }

    checkGhostCollision() {
        for (let ghost of this.ghosts) {
            const dist = Math.sqrt(
                Math.pow(this.pacman.x - ghost.x, 2) +
                Math.pow(this.pacman.y - ghost.y, 2)
            );

            if (dist < 0.5) {
                if (ghost.mode === GHOST_MODES.FRIGHTENED) {
                    // Pac-Man eats ghost
                    ghost.mode = GHOST_MODES.EATEN;
                    ghost.targetX = 14;
                    ghost.targetY = 14;

                    // Escalating score: 200, 400, 800, 1600
                    const points = 200 * Math.pow(2, this.ghostEatenCount);
                    this.score += points;
                    this.ghostEatenCount++;
                } else if (ghost.mode !== GHOST_MODES.EATEN) {
                    // Ghost catches Pac-Man
                    this.deathAnimation = true;
                    this.deathAnimationTimer = 0;
                }
            }
        }
    }

    updateBonusFruit(deltaTime) {
        // Spawn bonus fruit at certain pellet counts
        const pelletsEaten = 244 - (this.pellets.length + this.powerPellets.length * 10);

        if (!this.bonusFruit && (pelletsEaten === 70 || pelletsEaten === 170)) {
            const fruits = [
                { type: 'cherry', points: 100 },
                { type: 'strawberry', points: 300 },
                { type: 'orange', points: 500 },
                { type: 'apple', points: 700 },
                { type: 'melon', points: 1000 },
                { type: 'galaxian', points: 2000 },
                { type: 'bell', points: 3000 },
                { type: 'key', points: 5000 }
            ];

            const fruitIndex = Math.min(this.level - 1, fruits.length - 1);
            this.bonusFruit = {
                ...fruits[fruitIndex],
                x: 14,
                y: 17,
                lifetime: 10
            };
            this.bonusFruitTimer = 0;
        }

        if (this.bonusFruit) {
            this.bonusFruitTimer += deltaTime;
            if (this.bonusFruitTimer >= this.bonusFruit.lifetime) {
                this.bonusFruit = null;
            }
        }
    }

    resetPositions() {
        this.pacman.x = 14;
        this.pacman.y = 23;
        this.pacman.direction = DIRECTIONS.NONE;
        this.pacman.nextDirection = DIRECTIONS.NONE;

        this.ghosts[0].x = 13;
        this.ghosts[0].y = 11;
        this.ghosts[1].x = 14;
        this.ghosts[1].y = 14;
        this.ghosts[2].x = 12;
        this.ghosts[2].y = 14;
        this.ghosts[3].x = 15;
        this.ghosts[3].y = 14;

        for (let ghost of this.ghosts) {
            ghost.mode = this.ghostMode;
            ghost.direction = DIRECTIONS.LEFT;
        }
    }

    nextLevel() {
        this.level++;
        this.initLevel();
        this.ghostModeIndex = 0;
        this.ghostModeTimer = 0;
    }

    gameOver() {
        this.state = GAME_STATES.GAME_OVER;
        document.getElementById('finalScore').textContent = `Final Score: ${this.score}`;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }

    updateUI() {
        document.getElementById('scoreValue').textContent = this.score;
        document.getElementById('levelValue').textContent = this.level;
        document.getElementById('livesValue').textContent = this.lives;
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw maze
        this.drawMaze();

        // Draw pellets
        this.drawPellets();

        // Draw bonus fruit
        if (this.bonusFruit) {
            this.drawBonusFruit();
        }

        // Draw ghosts
        for (let ghost of this.ghosts) {
            ghost.draw(this.ctx);
        }

        // Draw Pac-Man (unless in death animation)
        if (!this.deathAnimation) {
            this.pacman.draw(this.ctx);
        } else {
            this.drawDeathAnimation();
        }
    }

    drawMaze() {
        this.ctx.strokeStyle = '#2121de';
        this.ctx.lineWidth = 2;

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = MAZE[row][col];

                if (cell === 0) {
                    // Draw wall
                    this.ctx.fillStyle = '#2121de';
                    this.ctx.fillRect(
                        col * TILE_SIZE,
                        row * TILE_SIZE,
                        TILE_SIZE,
                        TILE_SIZE
                    );
                } else if (cell === 4) {
                    // Draw ghost house door
                    this.ctx.fillStyle = '#ffb8de';
                    this.ctx.fillRect(
                        col * TILE_SIZE,
                        row * TILE_SIZE + TILE_SIZE / 2 - 1,
                        TILE_SIZE,
                        2
                    );
                }
            }
        }
    }

    drawPellets() {
        // Regular pellets
        this.ctx.fillStyle = '#ffb8ae';
        for (let pellet of this.pellets) {
            this.ctx.beginPath();
            this.ctx.arc(
                pellet.x * TILE_SIZE + TILE_SIZE / 2,
                pellet.y * TILE_SIZE + TILE_SIZE / 2,
                2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }

        // Power pellets (blinking)
        const blink = Math.floor(Date.now() / 250) % 2;
        if (blink) {
            this.ctx.fillStyle = '#ffb8ae';
            for (let pellet of this.powerPellets) {
                this.ctx.beginPath();
                this.ctx.arc(
                    pellet.x * TILE_SIZE + TILE_SIZE / 2,
                    pellet.y * TILE_SIZE + TILE_SIZE / 2,
                    6,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
            }
        }
    }

    drawBonusFruit() {
        // Simple colored circle for fruit (can be enhanced with sprites)
        const colors = {
            cherry: '#ff0000',
            strawberry: '#ff69b4',
            orange: '#ffa500',
            apple: '#ff0000',
            melon: '#00ff00',
            galaxian: '#0000ff',
            bell: '#ffff00',
            key: '#00ffff'
        };

        this.ctx.fillStyle = colors[this.bonusFruit.type] || '#ffff00';
        this.ctx.beginPath();
        this.ctx.arc(
            this.bonusFruit.x * TILE_SIZE + TILE_SIZE / 2,
            this.bonusFruit.y * TILE_SIZE + TILE_SIZE / 2,
            8,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    drawDeathAnimation() {
        // Simple death animation: shrinking circle
        const progress = this.deathAnimationTimer / 2;
        const angle = Math.PI * 2 * progress;

        this.ctx.fillStyle = '#ffff00';
        this.ctx.beginPath();
        this.ctx.arc(
            this.pacman.x * TILE_SIZE + TILE_SIZE / 2,
            this.pacman.y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE / 2 * (1 - progress),
            angle,
            Math.PI * 2 - angle
        );
        this.ctx.lineTo(
            this.pacman.x * TILE_SIZE + TILE_SIZE / 2,
            this.pacman.y * TILE_SIZE + TILE_SIZE / 2
        );
        this.ctx.fill();
    }
}

// ============================================================================
// PAC-MAN CLASS
// ============================================================================

class PacMan {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = DIRECTIONS.NONE;
        this.nextDirection = DIRECTIONS.NONE;
        this.speed = 7.5;
        this.mouthAngle = 0;
        this.mouthOpening = true;
    }

    handleInput(key) {
        switch(key) {
            case 'ArrowUp':
                this.nextDirection = DIRECTIONS.UP;
                break;
            case 'ArrowDown':
                this.nextDirection = DIRECTIONS.DOWN;
                break;
            case 'ArrowLeft':
                this.nextDirection = DIRECTIONS.LEFT;
                break;
            case 'ArrowRight':
                this.nextDirection = DIRECTIONS.RIGHT;
                break;
        }
    }

    update(deltaTime) {
        // Try to turn in the next direction (input buffering)
        if (this.canMove(this.nextDirection)) {
            this.direction = this.nextDirection;
        }

        // Move in current direction
        if (this.canMove(this.direction)) {
            this.x += this.direction.x * this.speed * deltaTime;
            this.y += this.direction.y * this.speed * deltaTime;

            // Tunnel wraparound
            if (this.x < -0.5) this.x = COLS - 0.5;
            if (this.x > COLS - 0.5) this.x = -0.5;
        }

        // Animate mouth
        if (this.direction !== DIRECTIONS.NONE) {
            if (this.mouthOpening) {
                this.mouthAngle += deltaTime * 10;
                if (this.mouthAngle >= 0.8) this.mouthOpening = false;
            } else {
                this.mouthAngle -= deltaTime * 10;
                if (this.mouthAngle <= 0) this.mouthOpening = true;
            }
        }
    }

    canMove(direction) {
        if (direction === DIRECTIONS.NONE) return false;

        const newX = this.x + direction.x * 0.3;
        const newY = this.y + direction.y * 0.3;

        // Check all four corners of Pac-Man's bounding box
        const size = 0.4;
        const corners = [
            { x: newX - size, y: newY - size },
            { x: newX + size, y: newY - size },
            { x: newX - size, y: newY + size },
            { x: newX + size, y: newY + size }
        ];

        for (let corner of corners) {
            const col = Math.floor(corner.x);
            const row = Math.floor(corner.y);

            if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
                if (row !== 14) return false; // Allow tunnel
            } else {
                const cell = MAZE[row][col];
                if (cell === 0 || cell === 4) return false;
            }
        }

        return true;
    }

    draw(ctx) {
        const centerX = this.x * TILE_SIZE + TILE_SIZE / 2;
        const centerY = this.y * TILE_SIZE + TILE_SIZE / 2;

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();

        // Calculate mouth angle based on direction
        let startAngle = this.mouthAngle;
        let endAngle = Math.PI * 2 - this.mouthAngle;

        if (this.direction === DIRECTIONS.RIGHT) {
            // Default
        } else if (this.direction === DIRECTIONS.LEFT) {
            startAngle = Math.PI + this.mouthAngle;
            endAngle = Math.PI - this.mouthAngle;
        } else if (this.direction === DIRECTIONS.UP) {
            startAngle = Math.PI * 1.5 + this.mouthAngle;
            endAngle = Math.PI * 1.5 - this.mouthAngle;
        } else if (this.direction === DIRECTIONS.DOWN) {
            startAngle = Math.PI * 0.5 + this.mouthAngle;
            endAngle = Math.PI * 0.5 - this.mouthAngle;
        }

        ctx.arc(centerX, centerY, TILE_SIZE / 2, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
    }
}

// ============================================================================
// GHOST BASE CLASS
// ============================================================================

class Ghost {
    constructor(x, y, color, scatterTarget) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.scatterTarget = scatterTarget;
        this.mode = GHOST_MODES.SCATTER;
        this.direction = DIRECTIONS.LEFT;
        this.speed = 6.5;
        this.frightenedSpeed = 5;
        this.eatenSpeed = 12;
    }

    update(deltaTime, pacman, allGhosts, globalMode) {
        // Update mode if not frightened or eaten
        if (this.mode !== GHOST_MODES.FRIGHTENED && this.mode !== GHOST_MODES.EATEN) {
            this.mode = globalMode;
        }

        // Check if ghost has returned to house after being eaten
        if (this.mode === GHOST_MODES.EATEN) {
            const distToHome = Math.sqrt(
                Math.pow(this.x - 14, 2) + Math.pow(this.y - 14, 2)
            );
            if (distToHome < 0.5) {
                this.mode = globalMode;
            }
        }

        // Get target based on mode
        let target = this.getTarget(pacman, allGhosts);

        // Move towards target
        this.moveTowardsTarget(target, deltaTime);
    }

    getTarget(pacman, allGhosts) {
        if (this.mode === GHOST_MODES.SCATTER) {
            return this.scatterTarget;
        } else if (this.mode === GHOST_MODES.FRIGHTENED) {
            // Random movement
            return {
                x: Math.random() * COLS,
                y: Math.random() * ROWS
            };
        } else if (this.mode === GHOST_MODES.EATEN) {
            // Return to ghost house
            return { x: 14, y: 14 };
        } else {
            // Chase mode - implemented by subclasses
            return this.getChaseTarget(pacman, allGhosts);
        }
    }

    getChaseTarget(pacman, allGhosts) {
        // Default: chase Pac-Man directly
        return { x: pacman.x, y: pacman.y };
    }

    moveTowardsTarget(target, deltaTime) {
        const speed = this.mode === GHOST_MODES.EATEN ? this.eatenSpeed :
                      this.mode === GHOST_MODES.FRIGHTENED ? this.frightenedSpeed :
                      this.speed;

        // Validate target
        if (!target || isNaN(target.x) || isNaN(target.y)) {
            console.warn('Invalid target for ghost:', target);
            target = { x: this.x, y: this.y };
        }

        // Snap to grid at intersections for decision making
        const col = Math.round(this.x);
        const row = Math.round(this.y);
        const distToGrid = Math.sqrt(
            Math.pow(this.x - col, 2) + Math.pow(this.y - row, 2)
        );

        // If close to grid intersection, decide direction
        if (distToGrid < 0.1) {
            this.x = col;
            this.y = row;

            // Get possible directions
            const possibleDirs = this.getPossibleDirections();

            if (possibleDirs.length > 0) {
                // Choose direction that minimizes distance to target
                let bestDir = possibleDirs[0];
                let bestDist = Infinity;

                for (let dir of possibleDirs) {
                    const nextX = this.x + dir.x;
                    const nextY = this.y + dir.y;
                    const dist = Math.sqrt(
                        Math.pow(nextX - target.x, 2) +
                        Math.pow(nextY - target.y, 2)
                    );

                    if (dist < bestDist) {
                        bestDist = dist;
                        bestDir = dir;
                    }
                }

                this.direction = bestDir;
            } else {
                // No valid directions found - this shouldn't happen but handle it
                console.warn('Ghost has no valid directions at', this.x, this.y);
            }
        }

        // Move in current direction
        this.x += this.direction.x * speed * deltaTime;
        this.y += this.direction.y * speed * deltaTime;

        // Tunnel wraparound
        if (this.x < -0.5) this.x = COLS - 0.5;
        if (this.x > COLS - 0.5) this.x = -0.5;
    }

    getPossibleDirections() {
        const directions = [];
        const opposite = this.getOppositeDirection(this.direction);

        for (let dir of [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT]) {
            // Don't reverse direction (except when mode changes)
            if (dir === opposite) continue;

            if (this.canMove(dir)) {
                directions.push(dir);
            }
        }

        // If no other options, can reverse
        if (directions.length === 0 && this.canMove(opposite)) {
            directions.push(opposite);
        }

        return directions;
    }

    canMove(direction) {
        const newX = Math.round(this.x + direction.x);
        const newY = Math.round(this.y + direction.y);

        // Handle tunnel - allow wrapping on row 14
        if (newY === 14 && (newX < 0 || newX >= COLS)) {
            return true;
        }

        // Reject out of bounds
        if (newY < 0 || newY >= ROWS || newX < 0 || newX >= COLS) {
            return false;
        }

        const cell = MAZE[newY][newX];

        // Ghosts can pass through ghost house door when eaten
        if (this.mode === GHOST_MODES.EATEN) {
            return cell !== 0;
        }

        return cell !== 0 && cell !== 4;
    }

    getOppositeDirection(dir) {
        if (dir === DIRECTIONS.UP) return DIRECTIONS.DOWN;
        if (dir === DIRECTIONS.DOWN) return DIRECTIONS.UP;
        if (dir === DIRECTIONS.LEFT) return DIRECTIONS.RIGHT;
        if (dir === DIRECTIONS.RIGHT) return DIRECTIONS.LEFT;
        return DIRECTIONS.NONE;
    }

    reverseDirection() {
        this.direction = this.getOppositeDirection(this.direction);
    }

    draw(ctx) {
        const centerX = this.x * TILE_SIZE + TILE_SIZE / 2;
        const centerY = this.y * TILE_SIZE + TILE_SIZE / 2;

        if (this.mode === GHOST_MODES.EATEN) {
            // Draw eyes only
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(centerX - 4, centerY - 2, 3, 0, Math.PI * 2);
            ctx.arc(centerX + 4, centerY - 2, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#00f';
            ctx.beginPath();
            ctx.arc(centerX - 4 + this.direction.x * 2, centerY - 2 + this.direction.y * 2, 2, 0, Math.PI * 2);
            ctx.arc(centerX + 4 + this.direction.x * 2, centerY - 2 + this.direction.y * 2, 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Body
            if (this.mode === GHOST_MODES.FRIGHTENED) {
                // Blue when frightened
                ctx.fillStyle = '#2121de';
            } else {
                ctx.fillStyle = this.color;
            }

            // Ghost body (simplified)
            ctx.beginPath();
            ctx.arc(centerX, centerY - 2, TILE_SIZE / 2, Math.PI, 0, false);
            ctx.lineTo(centerX + TILE_SIZE / 2, centerY + TILE_SIZE / 2);
            ctx.lineTo(centerX + TILE_SIZE / 3, centerY + TILE_SIZE / 3);
            ctx.lineTo(centerX + TILE_SIZE / 6, centerY + TILE_SIZE / 2);
            ctx.lineTo(centerX, centerY + TILE_SIZE / 3);
            ctx.lineTo(centerX - TILE_SIZE / 6, centerY + TILE_SIZE / 2);
            ctx.lineTo(centerX - TILE_SIZE / 3, centerY + TILE_SIZE / 3);
            ctx.lineTo(centerX - TILE_SIZE / 2, centerY + TILE_SIZE / 2);
            ctx.closePath();
            ctx.fill();

            // Eyes
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(centerX - 4, centerY - 2, 3, 0, Math.PI * 2);
            ctx.arc(centerX + 4, centerY - 2, 3, 0, Math.PI * 2);
            ctx.fill();

            // Pupils
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(centerX - 4 + this.direction.x * 2, centerY - 2 + this.direction.y * 2, 2, 0, Math.PI * 2);
            ctx.arc(centerX + 4 + this.direction.x * 2, centerY - 2 + this.direction.y * 2, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// ============================================================================
// GHOST SUBCLASSES (Individual AI)
// ============================================================================

class Blinky extends Ghost {
    constructor(x, y) {
        super(x, y, '#ff0000', { x: 25, y: 0 }); // Red, scatter to top-right
    }

    getChaseTarget(pacman, allGhosts) {
        // Blinky: Direct chaser - targets Pac-Man's current position
        return { x: pacman.x, y: pacman.y };
    }
}

class Pinky extends Ghost {
    constructor(x, y) {
        super(x, y, '#ffb8ff', { x: 2, y: 0 }); // Pink, scatter to top-left
    }

    getChaseTarget(pacman, allGhosts) {
        // Pinky: Ambusher - targets 4 tiles ahead of Pac-Man
        let targetX = pacman.x + pacman.direction.x * 4;
        let targetY = pacman.y + pacman.direction.y * 4;

        // Original bug: when Pac-Man faces up, also offset left
        if (pacman.direction === DIRECTIONS.UP) {
            targetX -= 4;
        }

        return { x: targetX, y: targetY };
    }
}

class Inky extends Ghost {
    constructor(x, y) {
        super(x, y, '#00ffff', { x: 27, y: 31 }); // Cyan, scatter to bottom-right
    }

    getChaseTarget(pacman, allGhosts) {
        // Inky: Unpredictable - uses both Pac-Man and Blinky's position
        const blinky = allGhosts[0]; // Assumes Blinky is first ghost

        // Get point 2 tiles ahead of Pac-Man
        const intermediateX = pacman.x + pacman.direction.x * 2;
        const intermediateY = pacman.y + pacman.direction.y * 2;

        // Draw vector from Blinky to intermediate point and double it
        const targetX = intermediateX + (intermediateX - blinky.x);
        const targetY = intermediateY + (intermediateY - blinky.y);

        return { x: targetX, y: targetY };
    }
}

class Clyde extends Ghost {
    constructor(x, y) {
        super(x, y, '#ffb851', { x: 0, y: 31 }); // Orange, scatter to bottom-left
    }

    getChaseTarget(pacman, allGhosts) {
        // Clyde: Fickle - chases if far, scatters if close
        const dist = Math.sqrt(
            Math.pow(this.x - pacman.x, 2) +
            Math.pow(this.y - pacman.y, 2)
        );

        if (dist > 8) {
            // Far away: chase Pac-Man
            return { x: pacman.x, y: pacman.y };
        } else {
            // Close: go to scatter corner
            return this.scatterTarget;
        }
    }
}

// ============================================================================
// START GAME
// ============================================================================

let game;

// Wait for DOM to be fully loaded before initializing the game
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        game = new Game();
    });
} else {
    // DOM is already loaded
    game = new Game();
}
