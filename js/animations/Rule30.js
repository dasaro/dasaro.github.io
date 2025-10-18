// ==========================================
// RULE 30 CELLULAR AUTOMATON
// Classic Wolfram style with red-to-gray fade
// ==========================================

import { AnimationBase } from './AnimationBase.js';

export class Rule30 extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);

        this.config = {
            cellSize: 8,
            fadeAmount: 0.08,
            generationDelay: 100,
            restartDelay: 1500
        };

        this.cols = Math.floor(this.canvas.width / this.config.cellSize);
        this.rows = Math.floor(this.canvas.height / this.config.cellSize);

        // Rule 30: [111, 110, 101, 100, 011, 010, 001, 000] -> [0, 0, 0, 1, 1, 1, 1, 0]
        this.rule30 = [0, 1, 1, 1, 1, 0, 0, 0];

        this.initializeState();
    }

    static getMetadata() {
        return {
            name: 'Rule 30 Automaton',
            key: 'rule30',
            description: "Wolfram's Rule 30 cellular automaton with red-to-gray fade"
        };
    }

    initializeState() {
        // Current generation
        this.cells = new Array(this.cols).fill(0);
        this.cells[Math.floor(this.cols / 2)] = 1; // Single cell in center

        this.currentRow = 0;
        this.generation = 0;

        // Track when each cell was born (generation number)
        this.cellBirthGen = Array(this.rows).fill(null).map(() => Array(this.cols).fill(-1));
    }

    applyRule(left, center, right) {
        const index = (left << 2) | (center << 1) | right;
        return this.rule30[index];
    }

    drawCell(x, y, birthGen) {
        // Bounds checking
        if (y < 0 || y >= this.rows || x < 0 || x >= this.cols) {
            return;
        }

        const px = x * this.config.cellSize;
        const py = y * this.config.cellSize;

        // Calculate age: how many generations have passed since this cell was born
        const age = this.generation - birthGen;

        // Color fade from RED (new) to GRAY (old)
        let red, green, blue, alpha;

        if (age < 5) {
            // NEWEST: Bright red
            red = 200;
            green = 0;
            blue = 0;
            alpha = 0.85;
        } else if (age < 15) {
            // FADING: Red to dark red to gray
            const fadeProgress = (age - 5) / 10;
            red = 200 - fadeProgress * 120;
            green = fadeProgress * 60;
            blue = fadeProgress * 60;
            alpha = 0.85 - fadeProgress * 0.45;
        } else if (age < 30) {
            // GRAY: Darker gray fading to lighter
            const fadeProgress = (age - 15) / 15;
            const grayValue = 80 + fadeProgress * 60;
            red = grayValue;
            green = grayValue;
            blue = grayValue;
            alpha = 0.4 - fadeProgress * 0.2;
        } else {
            // OLD: Very light gray
            red = 160;
            green = 160;
            blue = 160;
            alpha = 0.15;
        }

        // Draw classic Wolfram-style SQUARE
        this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        this.ctx.fillRect(px, py, this.config.cellSize, this.config.cellSize);

        // Optional: Add very subtle border for definition
        if (age < 10) {
            this.ctx.strokeStyle = `rgba(${red * 0.7}, ${green * 0.7}, ${blue * 0.7}, ${alpha * 0.5})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeRect(px, py, this.config.cellSize, this.config.cellSize);
        }
    }

    drawAllCells() {
        // Draw ALL cells that have been generated so far
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.cellBirthGen[row][col] >= 0) {
                    this.drawCell(col, row, this.cellBirthGen[row][col]);
                }
            }
        }
    }

    computeNextGeneration() {
        const newCells = new Array(this.cols).fill(0);

        for (let i = 0; i < this.cols; i++) {
            const left = this.cells[(i - 1 + this.cols) % this.cols];
            const center = this.cells[i];
            const right = this.cells[(i + 1) % this.cols];
            newCells[i] = this.applyRule(left, center, right);
        }

        this.cells = newCells;
    }

    animate() {
        if (!this.isRunning) return;

        // Gentle fade instead of harsh clear
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.fadeAmount})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Only draw and compute if we're within bounds
        if (this.currentRow < this.rows) {
            const y = this.currentRow;

            // Mark current generation's live cells
            for (let x = 0; x < this.cols; x++) {
                if (this.cells[x] === 1) {
                    this.cellBirthGen[y][x] = this.generation;
                }
            }

            // Redraw ALL cells with updated ages
            this.drawAllCells();

            // Compute next generation
            this.computeNextGeneration();
            this.currentRow++;
            this.generation++;
        }

        // When animation reaches the bottom, RESTART FROM BEGINNING
        if (this.currentRow >= this.rows) {
            this.timeoutId = setTimeout(() => {
                if (!this.isRunning) return;

                // COMPLETE RESTART: Clear everything and start fresh
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // Reset to initial state
                this.initializeState();

                // Resume animation
                this.animate();
            }, this.config.restartDelay);

            return; // Stop this animation loop
        }

        // Delay between generations
        this.timeoutId = setTimeout(() => {
            this.animationId = requestAnimationFrame(() => this.animate());
        }, this.config.generationDelay);
    }

    start() {
        // Initial clear
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        super.start();
    }
}
