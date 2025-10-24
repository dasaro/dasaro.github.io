// ==========================================
// FIBONACCI SPIRAL
// Golden ratio spiral animation
// ==========================================

import { AnimationBase } from './AnimationBase.js';

export class FibonacciSpiral extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);

        // Animation-specific config
        this.config = {
            opacity: 0.4,
            fadeAmount: 0.02,
            lineWidth: 2,
            shadowBlur: 3,
            maxProgress: 15,
            growSpeed: 0.01,
            rotateSpeed: 0.001
        };

        // Animation state
        this.angle = 0;
        this.progress = 0;
        this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    }

    static getMetadata() {
        return {
            name: 'Fibonacci Spiral',
            key: 'fibonacci',
            description: 'Golden ratio spiral with red accent'
        };
    }

    animate() {
        if (!this.isRunning) return;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Dynamic scaling: as the spiral grows (progress increases),
        // we shrink the scale to keep it visible on screen
        // This creates a smooth zoom-out effect as the spiral expands
        const baseScale = Math.min(this.canvas.width, this.canvas.height) / 60;
        const scaleFactor = 1 / (1 + this.progress * 0.15); // Gradually shrink as it grows
        const scale = baseScale * scaleFactor;

        // Clear with fade effect
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.fadeAmount})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw spiral with red accent
        this.ctx.strokeStyle = '#8B0000'; // Dark red
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.shadowBlur = this.config.shadowBlur;
        this.ctx.shadowColor = 'rgba(139, 0, 0, 0.5)';
        this.ctx.beginPath();

        // Draw the spiral with exponential growth
        for (let i = 0; i <= this.progress * 70; i++) {
            const theta = i * 0.08;
            const r = scale * Math.pow(this.phi, theta / (Math.PI / 2));
            const x = centerX + r * Math.cos(theta + this.angle);
            const y = centerY + r * Math.sin(theta + this.angle);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.stroke();
        this.ctx.shadowBlur = 0; // Clear shadow

        // Slowly grow and rotate
        this.progress += this.config.growSpeed;
        this.angle += this.config.rotateSpeed;

        // Reset when spiral completes its cycle
        if (this.progress > this.config.maxProgress) {
            this.progress = 0;
            this.angle = 0;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
