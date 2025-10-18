// ==========================================
// CONWAY'S GAME OF LIFE
// Clean, simple cellular automaton
// ==========================================

import { AnimationBase } from './AnimationBase.js';

export class GameOfLife extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);

        // Animation-specific config
        this.config = {
            opacity: 0.30,
            cellSize: 12,
            updateInterval: 8,
            reseedInterval: 400,
            initialDensity: 0.15
        };

        // Initialize grid
        this.frameCount = 0;
        this.setupGrid();
    }

    static getMetadata() {
        return {
            name: "Conway's Game of Life",
            key: 'gameOfLife',
            description: 'Cellular automaton with red cells'
        };
    }

    setupGrid() {
        const cols = Math.floor(this.canvas.width / this.config.cellSize);
        const rows = Math.floor(this.canvas.height / this.config.cellSize);

        this.cols = cols;
        this.rows = rows;

        // Initialize grid - simple and straightforward
        this.grid = Array(rows).fill().map(() =>
            Array(cols).fill().map(() => Math.random() < this.config.initialDensity ? 1 : 0)
        );
    }

    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const row = (y + i + this.rows) % this.rows;
                const col = (x + j + this.cols) % this.cols;
                count += this.grid[row][col];
            }
        }
        return count;
    }

    animate() {
        if (!this.isRunning) return;

        this.frameCount++;

        // Update every updateInterval frames
        if (this.frameCount % this.config.updateInterval === 0) {
            // Compute next generation
            const nextGrid = this.grid.map((row, y) =>
                row.map((cell, x) => {
                    const neighbors = this.countNeighbors(x, y);
                    return cell === 1
                        ? (neighbors === 2 || neighbors === 3 ? 1 : 0)
                        : (neighbors === 3 ? 1 : 0);
                })
            );
            this.grid = nextGrid;

            // Clear canvas
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw cells
            for (let y = 0; y < this.rows; y++) {
                for (let x = 0; x < this.cols; x++) {
                    if (this.grid[y][x] === 1) {
                        const gradient = this.ctx.createRadialGradient(
                            x * this.config.cellSize + this.config.cellSize / 2,
                            y * this.config.cellSize + this.config.cellSize / 2,
                            0,
                            x * this.config.cellSize + this.config.cellSize / 2,
                            y * this.config.cellSize + this.config.cellSize / 2,
                            this.config.cellSize / 2
                        );
                        gradient.addColorStop(0, 'rgba(139, 0, 0, 0.30)');
                        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.16)');
                        this.ctx.fillStyle = gradient;
                        this.ctx.beginPath();
                        this.ctx.arc(
                            x * this.config.cellSize + this.config.cellSize / 2,
                            y * this.config.cellSize + this.config.cellSize / 2,
                            this.config.cellSize / 3,
                            0,
                            Math.PI * 2
                        );
                        this.ctx.fill();
                    }
                }
            }

            // Reseed to prevent extinction
            if (this.frameCount % this.config.reseedInterval === 0) {
                for (let i = 0; i < 5; i++) {
                    const x = Math.floor(Math.random() * this.cols);
                    const y = Math.floor(Math.random() * this.rows);
                    this.grid[y][x] = 1;
                }
            }
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
