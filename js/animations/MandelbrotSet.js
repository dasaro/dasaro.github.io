// ==========================================
// MANDELBROT SET ZOOM
// Only the inner set boundary visible
// ==========================================

import { AnimationBase } from './AnimationBase.js';

export class MandelbrotSet extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);

        this.config = {
            maxIterations: 200,
            zoomSpeed: 0.018,
            opacity: 0.50
        };

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.zoom = 1;
        this.centerRe = -0.7;
        this.centerIm = 0;
        this.frameCount = 0;

        this.regions = [
            { re: -0.7, im: 0 },
            { re: -0.5, im: 0.5 },
            { re: 0.285, im: 0.01 },
            { re: -0.8, im: 0.156 },
            { re: -0.4, im: 0.6 },
            { re: -0.7269, im: 0.1889 }
        ];
    }

    static getMetadata() {
        return {
            name: 'Mandelbrot Set',
            key: 'mandelbrot',
            description: 'Mandelbrot set boundary zoom with red fractal edges'
        };
    }

    mandelbrot(cRe, cIm) {
        let zRe = 0, zIm = 0;
        let iteration = 0;

        while (zRe * zRe + zIm * zIm <= 4 && iteration < this.config.maxIterations) {
            const temp = zRe * zRe - zIm * zIm + cRe;
            zIm = 2 * zRe * zIm + cIm;
            zRe = temp;
            iteration++;
        }

        return iteration;
    }

    isInnerBoundary(x, y) {
        const cRe = this.centerRe + (x - this.centerX) / (this.zoom * 200);
        const cIm = this.centerIm + (y - this.centerY) / (this.zoom * 200);

        const centerIter = this.mandelbrot(cRe, cIm);

        // If this point is IN the set, check if neighbors are OUT
        if (centerIter === this.config.maxIterations) {
            // Check 4 neighbors (up, down, left, right)
            const neighbors = [
                [x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]
            ];

            for (const [nx, ny] of neighbors) {
                const nRe = this.centerRe + (nx - this.centerX) / (this.zoom * 200);
                const nIm = this.centerIm + (ny - this.centerY) / (this.zoom * 200);
                const nIter = this.mandelbrot(nRe, nIm);

                // If any neighbor is NOT in the set, we're on the boundary
                if (nIter < this.config.maxIterations) {
                    return true;
                }
            }
        }

        return false;
    }

    animate() {
        if (!this.isRunning) return;

        this.frameCount++;

        // Clear to pure white
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Enable high-quality rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Detect and draw only inner boundary
        const step = 1; // Pixel-perfect for smooth curves

        // Collect boundary pixels
        const boundaryPixels = [];

        for (let x = 0; x < this.canvas.width; x += step) {
            for (let y = 0; y < this.canvas.height; y += step) {
                if (this.isInnerBoundary(x, y)) {
                    boundaryPixels.push({ x, y });
                }
            }
        }

        // Draw boundary pixels with subtle red
        boundaryPixels.forEach(({ x, y }) => {
            this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity})`;
            this.ctx.fillRect(x - 0.5, y - 0.5, step + 1, step + 1);
        });

        // Apply light blur for smooth curves
        this.ctx.filter = 'blur(0.8px)';
        this.ctx.drawImage(this.canvas, 0, 0);
        this.ctx.filter = 'none';

        // Zoom
        this.zoom *= (1 + this.config.zoomSpeed);

        // Reset
        if (this.zoom > 120) {
            this.zoom = 1;
            const region = this.regions[Math.floor(Math.random() * this.regions.length)];
            this.centerRe = region.re;
            this.centerIm = region.im;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
