// ==========================================
// PRIME NUMBER SPIRAL (ULAM)
// Ulam spiral showing prime number patterns
// ==========================================
import { AnimationBase } from './AnimationBase.js';
export class PrimeSpiral extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        // Animation-specific config
        this.config = {
            opacity: 0.35,
            fadeAmount: 0.01,
            spacing: 8,
            maxN: 2000,
            dotRadius: 3.5,
            batchSize: 5
        };
        // Build prime sieve
        this.buildPrimeSieve();
        // Animation state
        this.currentN = 1;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = -1;
        this.segmentLength = 1;
        this.segmentPassed = 0;
        this.directionChanges = 0;
    }
    static getMetadata() {
        return {
            name: 'Prime Number Spiral',
            key: 'primes',
            description: 'Ulam spiral with red dots for primes'
        };
    }
    buildPrimeSieve() {
        // Sieve of Eratosthenes for prime checking
        this.isPrime = Array(this.config.maxN).fill(true);
        this.isPrime[0] = this.isPrime[1] = false;
        for (let i = 2; i * i < this.config.maxN; i++) {
            if (this.isPrime[i]) {
                for (let j = i * i; j < this.config.maxN; j += i) {
                    this.isPrime[j] = false;
                }
            }
        }
    }
    reset() {
        this.currentN = 1;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = -1;
        this.segmentLength = 1;
        this.segmentPassed = 0;
        this.directionChanges = 0;
    }
    animate() {
        if (!this.isRunning) return;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        // Clear with fade
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.fadeAmount})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw next batch of numbers
        for (let i = 0; i < this.config.batchSize; i++) {
            if (this.currentN < this.config.maxN) {
                if (this.isPrime[this.currentN]) {
                    // Red dots with glow for primes
                    const gradient = this.ctx.createRadialGradient(
                        centerX + this.x * this.config.spacing,
                        centerY + this.y * this.config.spacing,
                        0,
                        centerX + this.x * this.config.spacing,
                        centerY + this.y * this.config.spacing,
                        4
                    );
                    gradient.addColorStop(0, '#8B0000');
                    gradient.addColorStop(0.5, '#CD5C5C');
                    gradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
                    this.ctx.fillStyle = gradient;
                    this.ctx.beginPath();
                    this.ctx.arc(
                        centerX + this.x * this.config.spacing,
                        centerY + this.y * this.config.spacing,
                        this.config.dotRadius,
                        0,
                        Math.PI * 2
                    );
                    this.ctx.fill();
                }
                // Spiral movement
                this.x += this.dx;
                this.y += this.dy;
                this.segmentPassed++;
                if (this.segmentPassed === this.segmentLength) {
                    this.segmentPassed = 0;
                    const temp = this.dx;
                    this.dx = -this.dy;
                    this.dy = temp;
                    this.directionChanges++;
                    if (this.directionChanges % 2 === 0) {
                        this.segmentLength++;
                    }
                }
                this.currentN++;
            }
        }
        // Reset after full spiral
        if (this.currentN >= this.config.maxN) {
            this.timeoutId = setTimeout(() => {
                if (!this.isRunning) return;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.reset();
            }, 2000);
        } else {
        }
    }
}
