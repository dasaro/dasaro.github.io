// ==========================================
// ANIMATION BASE CLASS
// Shared functionality for all animations
// ==========================================

export class AnimationBase {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.animationId = null;
        this.timeoutId = null;
        this.isRunning = false;

        // Default config (can be overridden by subclasses)
        this.config = {
            opacity: 0.15,
            speed: 1.0,
            fadeAmount: 0.02
        };
    }

    // Start the animation
    start() {
        this.isRunning = true;
        this.animate();
    }

    // Stop and clean up
    stop() {
        this.isRunning = false;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        // Clear canvas
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // To be implemented by subclasses
    animate() {
        throw new Error('animate() must be implemented by subclass');
    }

    // Get animation metadata
    static getMetadata() {
        return {
            name: 'Base Animation',
            key: 'base',
            description: 'Base class for animations'
        };
    }
}
