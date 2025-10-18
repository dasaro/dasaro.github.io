// ==========================================
// ANIMATION CONTROLLER
// Main controller for managing background animations
// ==========================================

import { GameOfLife } from './GameOfLife.js';
import { FibonacciSpiral } from './FibonacciSpiral.js';
import { PrimeSpiral } from './PrimeSpiral.js';
import { RiemannZeta } from './RiemannZeta.js';
import { MandelbrotSet } from './MandelbrotSet.js';
import { ProofTree } from './ProofTree.js';
import { PacMan } from './PacMan.js';
import { Rule30 } from './Rule30.js';

export class AnimationController {
    constructor() {
        this.canvas = document.getElementById('bg-animation-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.currentAnimation = null;
        this.enabled = true;

        // Register all available animations
        this.animations = new Map([
            ['gameOfLife', GameOfLife],
            ['fibonacci', FibonacciSpiral],
            ['primes', PrimeSpiral],
            ['riemann', RiemannZeta],
            ['mandelbrot', MandelbrotSet],
            ['proofTree', ProofTree],
            ['pacman', PacMan],
            ['rule30', Rule30]
        ]);

        if (this.canvas && this.ctx) {
            this.setupCanvas();
            this.setupToggleButton();
            this.setupKeyboardShortcut();
            this.loadPreferences();
            this.startRandomAnimation();
        } else {
            console.error('[AnimationController] Failed to initialize: Canvas or context not found');
        }
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    loadPreferences() {
        const savedEnabled = localStorage.getItem('bg-animation-enabled');
        // Clear any 'false' value from localStorage - animations enabled by default
        if (savedEnabled === 'false') {
            localStorage.removeItem('bg-animation-enabled');
        }
        this.enabled = true;
    }

    startRandomAnimation() {
        if (!this.enabled) return;

        const keys = Array.from(this.animations.keys());
        const seed = new Date().getTime();
        const randomIndex = seed % keys.length;
        const randomKey = keys[randomIndex];

        this.start(randomKey);
    }

    start(animationKey) {
        this.stop();

        const AnimationClass = this.animations.get(animationKey);
        if (!AnimationClass) {
            console.error(`[AnimationController] Animation not found: ${animationKey}`);
            return;
        }

        // Ensure canvas is visible
        this.canvas.style.display = 'block';
        this.canvas.style.visibility = 'visible';
        this.canvas.classList.remove('hidden');
        this.canvas.classList.add('active');

        // Create and start animation
        this.currentAnimation = new AnimationClass(this.canvas, this.ctx);
        this.currentAnimation.start();

        const metadata = AnimationClass.getMetadata();
        console.log(`[AnimationController] Started: ${metadata.name}`);
    }

    stop() {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.currentAnimation = null;
        }
    }

    getCurrentKey() {
        for (const [key, AnimClass] of this.animations) {
            if (this.currentAnimation instanceof AnimClass) {
                return key;
            }
        }
        return null;
    }

    setupToggleButton() {
        const button = document.getElementById('animation-toggle');
        if (!button) return;

        const symbols = ['∀', '∃', '→', '⊢', 'λ', '∅', '∧', '∨', '¬', '⊨'];
        let symbolIndex = 0;

        // Update tooltip helper
        const updateTooltip = () => {
            if (this.enabled && this.currentAnimation) {
                const currentKey = this.getCurrentKey();
                if (currentKey) {
                    const AnimClass = this.animations.get(currentKey);
                    const metadata = AnimClass.getMetadata();
                    button.title = `${metadata.name} (Press A to toggle)`;
                }
            } else {
                button.title = 'Toggle animation (Press A)';
            }
        };

        // Set initial tooltip
        updateTooltip();

        button.addEventListener('click', () => {
            this.enabled = !this.enabled;
            localStorage.setItem('bg-animation-enabled', this.enabled);

            if (this.enabled) {
                // Cycle through animations
                const keys = Array.from(this.animations.keys());
                const currentKey = this.getCurrentKey();
                const currentIndex = keys.indexOf(currentKey);
                const nextKey = keys[(currentIndex + 1) % keys.length];

                this.start(nextKey);

                // Change symbol
                symbolIndex = (symbolIndex + 1) % symbols.length;
                button.querySelector('.symbol').textContent = symbols[symbolIndex];
            } else {
                this.stop();
                this.canvas.classList.add('hidden');
                this.canvas.classList.remove('active');
            }

            // Update tooltip after toggle
            updateTooltip();

            console.log('[AnimationController] Animation toggled:', this.enabled, this.getCurrentKey());
        });
    }

    setupKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Press 'A' to toggle animations
            if (e.key === 'a' || e.key === 'A') {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    const button = document.getElementById('animation-toggle');
                    if (button && document.activeElement.tagName !== 'INPUT' &&
                        document.activeElement.tagName !== 'TEXTAREA') {
                        button.click();
                    }
                }
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

console.log('[AnimationController] Module loaded - Phase 2 modular animations ready');
