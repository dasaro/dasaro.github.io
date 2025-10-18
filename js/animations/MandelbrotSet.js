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
            zoomSpeed: 0.98,     // Scale multiplier per frame (smaller = faster)
            rowsPerChunk: 16,    // Rows rendered per tick
            epsFactor: 1.0,      // Border thickness factor
            baseIterations: 120,  // Base iteration count
            borderColor: { r: 139, g: 0, b: 0 },  // RED for border
            fadeAmount: 0.01
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
        this.imageData = null;
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

                // Check if on border
                const isBorder = (d !== Infinity) && (d < borderThresh);

                // Write pixel (RED for border, white otherwise)
                if (isBorder) {
                    this.imageData.data[offset] = this.config.borderColor.r;
                    this.imageData.data[offset + 1] = this.config.borderColor.g;
                    this.imageData.data[offset + 2] = this.config.borderColor.b;
                } else {
                    this.imageData.data[offset] = 255;
                    this.imageData.data[offset + 1] = 255;
                    this.imageData.data[offset + 2] = 255;
                }
                this.imageData.data[offset + 3] = 255;

                offset += 4;
            }
        }

        // Update canvas
        this.ctx.putImageData(this.imageData, 0, 0);

        // Check if frame complete
        if (this.yRow < H) {
            // Continue rendering this frame
            this.animationId = requestAnimationFrame(() => this.renderChunk());
        } else {
            // Frame complete - advance zoom
            this.view.width *= this.config.zoomSpeed;

            // Check if we need to reset
            if (this.view.width < 1e-14) {
                // Smooth reset
                this.view.cx = this.startView.cx;
                this.view.cy = this.startView.cy;
                this.view.width = this.startView.width * 1.2; // Start slightly zoomed out

                // Gentle fade on reset (30% opacity)
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.fillRect(0, 0, W, H);
            } else {
                // Normal inter-frame: very subtle fade
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
                this.ctx.fillRect(0, 0, W, H);
            }

            // Reset row counter for next frame
            this.yRow = 0;

            // Start next frame
            this.animationId = requestAnimationFrame(() => this.renderChunk());
        }
    }

    animate() {
        if (!this.isRunning) return;

        // Initialize image data if needed
        if (!this.imageData) {
            this.imageData = this.ctx.createImageData(
                this.canvas.width,
                this.canvas.height
            );
            // Initial clear only (one time)
            const len = this.imageData.data.length;
            for (let i = 0; i < len; i += 4) {
                this.imageData.data[i] = 255;     // R
                this.imageData.data[i + 1] = 255; // G
                this.imageData.data[i + 2] = 255; // B
                this.imageData.data[i + 3] = 255; // A
            }
        }

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
