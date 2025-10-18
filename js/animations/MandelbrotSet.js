// ==========================================
// MANDELBROT SET - DISTANCE ESTIMATOR
// Border-only rendering with progressive chunks
// ==========================================

import { AnimationBase } from './AnimationBase.js';

export class MandelbrotSet extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);

        // Animation-specific config
        this.config = {
            opacity: 0.5,
            zoomSpeed: 0.97,           // Slightly faster zoom
            rowsPerChunk: 32,          // 2x faster rendering (was 16)
            epsFactor: 1.0,            // Border thickness factor
            baseIterations: 120,       // Base iteration count
            borderColor: { r: 139, g: 0, b: 0 },  // RED for border
            fadeAmount: 0.01,
            transitionDuration: 350    // ms for smooth cross-fade
        };

        // Seahorse Valley coordinates (beautiful zoom target)
        this.startView = {
            cx: -0.743643887037158704752191506114774,
            cy: 0.131825904205311970493132056385139,
            width: 3.5
        };

        // Current viewport
        this.view = {
            cx: this.startView.cx,
            cy: this.startView.cy,
            width: this.startView.width
        };

        // Progressive rendering state
        this.yRow = 0;

        // Double buffering
        this.frontBuffer = null;  // Currently displayed
        this.backBuffer = null;   // Being drawn offscreen
        this.imageData = null;    // Points to backBuffer during rendering

        // Transition state
        this.transitionStart = null;
    }

    static getMetadata() {
        return {
            name: 'Mandelbrot Set',
            key: 'mandelbrot',
            description: 'Distance-estimator border zoom on Seahorse Valley'
        };
    }

    // Calculate pixel size in complex plane
    pixelSize() {
        return this.view.width / this.canvas.width;
    }

    // Convert canvas pixel to complex coordinates
    toComplex(pixelX, pixelY) {
        const pix = this.pixelSize();
        const cx = this.view.cx + (pixelX - this.canvas.width / 2) * pix;
        const cy = this.view.cy + (pixelY - this.canvas.height / 2) * pix;
        return [cx, cy];
    }

    // Mandelbrot distance estimator
    // Returns distance estimate (Infinity if inside set)
    mandelDE(cx, cy, maxIter) {
        let zx = 0, zy = 0;    // z
        let dx = 0, dy = 0;    // dz/dc derivative
        let it = 0;
        const bailout = 4.0;

        for (; it < maxIter; it++) {
            // z^2 + c
            const zx2 = zx * zx - zy * zy + cx;
            const zy2 = 2 * zx * zy + cy;

            // Derivative: dz' = 2z * dz + 1
            const ndx = 2 * (zx * dx - zy * dy) + 1;
            const ndy = 2 * (zx * dy + zy * dx);

            zx = zx2;
            zy = zy2;
            dx = ndx;
            dy = ndy;

            if (zx * zx + zy * zy > bailout) break;
        }

        if (it >= maxIter) return Infinity;

        const modz = Math.hypot(zx, zy);
        const moddz = Math.hypot(dx, dy);

        // Distance estimate: d ≈ |z| ln|z| / |dz/dc|
        const d = (modz * Math.log(modz)) / (moddz || 1e-16);
        return Math.abs(d);
    }

    // Render a chunk of rows
    renderChunk() {
        if (!this.isRunning) return;

        const W = this.canvas.width;
        const H = this.canvas.height;
        const rowsPerTick = this.config.rowsPerChunk;
        const epsFactor = this.config.epsFactor;
        const pix = this.pixelSize();

        // Adaptive iteration count based on zoom level
        const mag = this.startView.width / this.view.width;
        const extra = Math.max(0, Math.floor(20 * Math.log2(mag)));
        const maxIter = this.config.baseIterations + extra;

        // Border threshold
        const borderThresh = epsFactor * pix * 1.2;

        // Render rows
        for (let row = 0; row < rowsPerTick && this.yRow < H; row++, this.yRow++) {
            let offset = this.yRow * W * 4;

            for (let x = 0; x < W; x++) {
                const [cx, cy] = this.toComplex(x, this.yRow);
                const d = this.mandelDE(cx, cy, maxIter);

                let r, g, b;

                if (d === Infinity) {
                    r = g = b = 255;
                } else {
                    // Multi-stage smooth interpolation
                    const distRatio = d / borderThresh;

                    // Logarithmic scaling for better distribution
                    const logRatio = Math.log1p(distRatio) / Math.log1p(10);
                    const clamped = Math.min(logRatio, 1.0);

                    // Ultra-smooth interpolation (Ken Perlin's improved smoothstep)
                    const t = clamped;
                    const smooth1 = t * t * t * (t * (t * 6 - 15) + 10);

                    // Apply again for even smoother result
                    const smooth2 = smooth1 * smooth1 * (3 - 2 * smooth1);

                    // Final smooth value
                    const s = smooth2;

                    // Color interpolation with natural curve
                    // Very dark red → dark red → red → rose → light rose → white
                    r = Math.round(80 + 175 * s); // 80 → 255
                    g = Math.round(0 + 255 * s * s); // Slower rise for red tint
                    b = Math.round(0 + 255 * s * s); // Slower rise for red tint
                }

                this.imageData.data[offset] = r;
                this.imageData.data[offset + 1] = g;
                this.imageData.data[offset + 2] = b;
                this.imageData.data[offset + 3] = 255;

                offset += 4;
            }
        }

        // Check if frame complete
        if (this.yRow < H) {
            // Continue rendering back buffer (DON'T display yet)
            this.animationId = requestAnimationFrame(() => this.renderChunk());
        } else {
            // Frame complete - start cross-fade transition
            this.animateTransition();
        }
    }

    animateTransition() {
        if (!this.isRunning) return;

        if (!this.transitionStart) {
            this.transitionStart = performance.now();
        }

        const elapsed = performance.now() - this.transitionStart;
        const progress = Math.min(1.0, elapsed / this.config.transitionDuration);

        // Clear canvas
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw old frame fading out
        this.ctx.globalAlpha = 1.0 - progress;
        this.ctx.putImageData(this.frontBuffer, 0, 0);

        // Draw new frame fading in
        this.ctx.globalAlpha = progress;
        this.ctx.putImageData(this.backBuffer, 0, 0);

        // Reset alpha
        this.ctx.globalAlpha = 1.0;

        if (progress < 1.0) {
            // Continue transition
            this.animationId = requestAnimationFrame(() => this.animateTransition());
        } else {
            // Transition complete
            this.transitionStart = null;

            // Swap buffers
            const temp = this.frontBuffer;
            this.frontBuffer = this.backBuffer;
            this.backBuffer = temp;

            // Advance zoom
            this.view.width *= this.config.zoomSpeed;

            if (this.view.width < 1e-14) {
                this.view.cx = this.startView.cx;
                this.view.cy = this.startView.cy;
                this.view.width = this.startView.width * 1.2;
            }

            // Prepare next frame
            for (let i = 0; i < this.backBuffer.data.length; i += 4) {
                this.backBuffer.data[i] = Math.min(255, this.frontBuffer.data[i] + 5);
                this.backBuffer.data[i + 1] = Math.min(255, this.frontBuffer.data[i + 1] + 5);
                this.backBuffer.data[i + 2] = Math.min(255, this.frontBuffer.data[i + 2] + 5);
                this.backBuffer.data[i + 3] = 255;
            }

            this.imageData = this.backBuffer;
            this.yRow = 0;

            // Start next frame
            this.animationId = requestAnimationFrame(() => this.renderChunk());
        }
    }

    animate() {
        if (!this.isRunning) return;

        // Initialize double buffers if needed
        if (!this.frontBuffer || !this.backBuffer) {
            this.frontBuffer = this.ctx.createImageData(
                this.canvas.width,
                this.canvas.height
            );
            this.backBuffer = this.ctx.createImageData(
                this.canvas.width,
                this.canvas.height
            );

            // Initialize both buffers to white
            const len = this.frontBuffer.data.length;
            for (let i = 0; i < len; i += 4) {
                this.frontBuffer.data[i] = 255;
                this.frontBuffer.data[i + 1] = 255;
                this.frontBuffer.data[i + 2] = 255;
                this.frontBuffer.data[i + 3] = 255;

                this.backBuffer.data[i] = 255;
                this.backBuffer.data[i + 1] = 255;
                this.backBuffer.data[i + 2] = 255;
                this.backBuffer.data[i + 3] = 255;
            }

            // Display front buffer initially
            this.ctx.putImageData(this.frontBuffer, 0, 0);
        }

        // Point imageData to back buffer for rendering
        this.imageData = this.backBuffer;

        // Start progressive rendering
        this.yRow = 0;
        this.renderChunk();
    }

    stop() {
        super.stop();

        // Reset state
        this.view = {
            cx: this.startView.cx,
            cy: this.startView.cy,
            width: this.startView.width
        };
        this.yRow = 0;
        this.imageData = null;
    }
}
