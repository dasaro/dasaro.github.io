// ==========================================
// ANIMATION CONTROLLER
// Main controller for managing background animations
// ==========================================

console.log('[AnimationController] Module loaded');

import { GameOfLife } from './GameOfLife.js';
import { FibonacciSpiral } from './FibonacciSpiral.js';
import { FibonacciBoxes } from './FibonacciBoxes.js';
import { PrimeSpiral } from './PrimeSpiral.js';
import { RiemannZeta } from './RiemannZeta.js';
import { MandelbrotSet } from './MandelbrotSet.js';
import { ProofTree } from './ProofTree.js';
import { PacMan } from './PacMan.js';
import { Rule30 } from './Rule30.js';
import { TuringMachine } from './TuringMachine.js';
import { TuringPattern } from './TuringPattern.js';
import { SituationCalculus } from './SituationCalculus.js';

console.log('[AnimationController] All imports successful');

export class AnimationController {
    constructor() {
        console.log('[AnimationController] Constructor called');
        console.log('[AnimationController] Canvas element:', document.getElementById('bg-animation-canvas'));

        this.canvas = document.getElementById('bg-animation-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.currentAnimation = null;
        this.enabled = true;

        console.log('[AnimationController] Canvas:', this.canvas);
        console.log('[AnimationController] Context:', this.ctx);

        // Register all available animations
        this.animations = new Map([
            ['gameOfLife', GameOfLife],
            ['fibonacci', FibonacciSpiral],
            ['fibonacciBoxes', FibonacciBoxes],
            ['primes', PrimeSpiral],
            ['riemann', RiemannZeta],
            ['mandelbrot', MandelbrotSet],
            ['proofTree', ProofTree],
            ['pacman', PacMan],
            ['rule30', Rule30],
            ['turingMachine', TuringMachine],
            ['turingPattern', TuringPattern],
            ['situationCalculus', SituationCalculus]
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
            // Get all animation keys
            const keys = Array.from(this.animations.keys());
            const currentKey = this.getCurrentKey();

            // Find next animation
            let nextIndex = 0;
            if (currentKey) {
                const currentIndex = keys.indexOf(currentKey);
                nextIndex = (currentIndex + 1) % keys.length;
            }

            const nextKey = keys[nextIndex];
            const AnimClass = this.animations.get(nextKey);

            console.log(`[AnimationController] Cycling: ${currentKey || 'none'} → ${nextKey}`);
            console.log(`[AnimationController] Starting: ${AnimClass.getMetadata().name}`);

            this.start(nextKey);

            // Cycle symbol
            symbolIndex = (symbolIndex + 1) % symbols.length;
            button.querySelector('.symbol').textContent = symbols[symbolIndex];

            // Update tooltip after toggle
            updateTooltip();
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
console.log('[AnimationController] Setting up DOMContentLoaded listener');

document.addEventListener('DOMContentLoaded', () => {
    console.log('[AnimationController] DOMContentLoaded fired, initializing...');
    window.animationController = new AnimationController();
    console.log('[AnimationController] Instance created:', window.animationController);
});

console.log('[AnimationController] Module fully loaded - Phase 2 modular animations ready');
