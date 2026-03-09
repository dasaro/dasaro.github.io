// ==========================================
// ANIMATION CONTROLLER
// Main controller for managing background animations
// ==========================================

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
import { AchillesAndTortoise } from './AchillesAndTortoise.js';

const ANIMATION_CHANGE_EVENT = 'background-animation-change';

export class AnimationController {
    constructor() {
        this.canvas = document.getElementById('bg-animation-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.currentAnimation = null;
        this.enabled = true;
        this.resizeTimeoutId = null;
        this.toggleButton = null;

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
            ['situationCalculus', SituationCalculus],
            ['achillesAndTortoise', AchillesAndTortoise]
        ]);

        this.animationSymbols = new Map([
            ['gameOfLife', '⊞'],
            ['fibonacci', 'φ'],
            ['fibonacciBoxes', '□'],
            ['primes', '⊢'],
            ['riemann', 'ζ'],
            ['mandelbrot', '∞'],
            ['proofTree', '⊢'],
            ['pacman', '👾'],
            ['rule30', '◼'],
            ['turingMachine', '⊢'],
            ['turingPattern', '∇'],
            ['situationCalculus', '⊨'],
            ['achillesAndTortoise', '∞']
        ]);

        if (!this.canvas || !this.ctx) {
            return;
        }

        this.setupCanvas();
        this.setupToggleButton();
        this.setupKeyboardShortcut();
        this.loadPreferences();
        this.startInitialAnimation();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            this.resizeCanvas();

            if (this.resizeTimeoutId) {
                clearTimeout(this.resizeTimeoutId);
            }

            this.resizeTimeoutId = setTimeout(() => {
                this.resizeTimeoutId = null;

                const currentKey = this.getCurrentKey();
                if (currentKey && !document.hidden) {
                    this.start(currentKey);
                }
            }, 150);
        });

        this.setupVisibilityListener();
    }

    setupVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    pause() {
        if (!this.currentAnimation || !this.currentAnimation.isRunning) {
            return;
        }

        this.currentAnimation.isRunning = false;

        if (this.currentAnimation.animationId) {
            cancelAnimationFrame(this.currentAnimation.animationId);
            this.currentAnimation.animationId = null;
        }

        if (this.currentAnimation.timeoutId) {
            clearTimeout(this.currentAnimation.timeoutId);
            this.currentAnimation.timeoutId = null;
        }
    }

    resume() {
        if (!this.currentAnimation || this.currentAnimation.isRunning) {
            return;
        }

        this.currentAnimation.isRunning = true;
        this.currentAnimation.lastFrameTime = performance.now();
        this.currentAnimation.throttledAnimate(this.currentAnimation.lastFrameTime);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    loadPreferences() {
        try {
            const savedEnabled = localStorage.getItem('bg-animation-enabled');
            if (savedEnabled === 'false') {
                localStorage.removeItem('bg-animation-enabled');
            }
        } catch (error) {
            // Ignore storage access failures and keep animations enabled.
        }

        this.enabled = true;
    }

    getRandomAnimationKey(excludeKey = null) {
        const keys = Array.from(this.animations.keys()).filter(key => key !== excludeKey);
        if (keys.length === 0) {
            return null;
        }

        if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
            const randomValues = new Uint32Array(1);
            window.crypto.getRandomValues(randomValues);
            return keys[randomValues[0] % keys.length];
        }

        return keys[Math.floor(Math.random() * keys.length)];
    }

    getNextAnimationKey(currentKey) {
        const keys = Array.from(this.animations.keys());
        if (keys.length === 0) {
            return null;
        }

        if (!currentKey) {
            return keys[0];
        }

        const currentIndex = keys.indexOf(currentKey);
        if (currentIndex === -1) {
            return keys[0];
        }

        return keys[(currentIndex + 1) % keys.length];
    }

    resolveInitialAnimationKey() {
        const defaultKey = this.canvas.dataset.defaultAnimation;
        if (defaultKey && this.animations.has(defaultKey)) {
            return defaultKey;
        }

        return this.getRandomAnimationKey();
    }

    startInitialAnimation() {
        if (!this.enabled) {
            return;
        }

        const initialKey = this.resolveInitialAnimationKey();
        if (initialKey) {
            this.start(initialKey);
        }
    }

    start(animationKey) {
        const AnimationClass = this.animations.get(animationKey);
        if (!AnimationClass) {
            return false;
        }

        this.stop();

        this.canvas.style.display = 'block';
        this.canvas.style.visibility = 'visible';
        this.canvas.classList.remove('hidden');
        this.canvas.classList.add('active');

        this.currentAnimation = new AnimationClass(this.canvas, this.ctx);
        this.currentAnimation.start();

        this.updateToggleButton();
        this.emitAnimationChange(animationKey, AnimationClass.getMetadata());
        return true;
    }

    stop() {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.currentAnimation = null;
        }
    }

    getCurrentKey() {
        for (const [key, AnimationClass] of this.animations) {
            if (this.currentAnimation instanceof AnimationClass) {
                return key;
            }
        }

        return null;
    }

    emitAnimationChange(key, metadata) {
        window.dispatchEvent(new CustomEvent(ANIMATION_CHANGE_EVENT, {
            detail: { key, metadata }
        }));
    }

    updateToggleButton() {
        if (!this.toggleButton) {
            return;
        }

        const currentKey = this.getCurrentKey();
        if (!currentKey) {
            this.toggleButton.title = 'Toggle animation (Press A)';
            this.toggleButton.querySelector('.symbol').textContent = '∀';
            return;
        }

        const AnimationClass = this.animations.get(currentKey);
        const metadata = AnimationClass ? AnimationClass.getMetadata() : null;
        this.toggleButton.title = metadata ? `${metadata.name} (Press A to cycle)` : 'Toggle animation (Press A)';
        this.toggleButton.querySelector('.symbol').textContent =
            this.animationSymbols.get(currentKey) || '∀';
    }

    setupToggleButton() {
        const button = document.getElementById('animation-toggle');
        if (!button) {
            return;
        }

        this.toggleButton = button;
        this.updateToggleButton();

        button.addEventListener('click', () => {
            const nextKey = this.getNextAnimationKey(this.getCurrentKey());
            if (nextKey) {
                this.start(nextKey);
            }
        });
    }

    setupKeyboardShortcut() {
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'a' && event.key !== 'A') {
                return;
            }

            if (event.ctrlKey || event.metaKey || event.shiftKey) {
                return;
            }

            const activeTagName = document.activeElement?.tagName;
            if (activeTagName === 'INPUT' || activeTagName === 'TEXTAREA') {
                return;
            }

            this.toggleButton?.click();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});
