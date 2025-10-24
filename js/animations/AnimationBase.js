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

        // Performance optimization: throttle to 30fps (saves ~50% CPU)
        this.targetFPS = 30;
        this.frameInterval = 1000 / this.targetFPS;
        this.lastFrameTime = 0;

        // Default config (can be overridden by subclasses)
        this.config = {
            opacity: 0.15,
            speed: 1.0,
            fadeAmount: 0.02
        };
    }

    // Start the animation with throttling
    start() {
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this.throttledAnimate(this.lastFrameTime);
    }

    // Throttled animation wrapper - only render at target FPS
    throttledAnimate(currentTime) {
        if (!this.isRunning) return;

        const elapsed = currentTime - this.lastFrameTime;

        // Only render if enough time has passed
        if (elapsed >= this.frameInterval) {
            this.lastFrameTime = currentTime - (elapsed % this.frameInterval);
            this.animate(currentTime);
        }

        // Continue animation loop
        if (this.isRunning) {
            this.animationId = requestAnimationFrame((time) => this.throttledAnimate(time));
        }
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
