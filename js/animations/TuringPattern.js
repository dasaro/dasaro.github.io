import { AnimationBase } from './AnimationBase.js';

/**
 * Turing Pattern Animation (Reaction-Diffusion)
 *
 * Implements the Gray-Scott reaction-diffusion model to generate
 * Turing patterns as described in Alan Turing's 1952 paper
 * "The Chemical Basis of Morphogenesis"
 *
 * The system models two chemicals U and V that diffuse and react:
 * - U is the "substrate" (food)
 * - V is the "catalyst" (pattern former)
 *
 * ∂u/∂t = Du∇²u - uv² + F(1-u)
 * ∂v/∂t = Dv∇²v + uv² - (F+k)v
 *
 * Different F (feed) and k (kill) parameters create different patterns:
 * - Spots, stripes, spirals, and more
 */
export class TuringPattern extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    // Grid size (lower resolution for performance)
    this.gridWidth = 200;
    this.gridHeight = 150;

    // Chemical concentration grids (double-buffered)
    this.u = null;
    this.v = null;
    this.u_next = null;
    this.v_next = null;

    // Reaction-diffusion parameters
    // These create spot patterns (similar to leopard/cheetah)
    this.Du = 0.16;    // Diffusion rate of U (substrate)
    this.Dv = 0.08;    // Diffusion rate of V (catalyst)
    this.feed = 0.060; // Feed rate (F)
    this.kill = 0.062; // Kill rate (k)

    // Simulation parameters
    this.dt = 1.0;           // Time step
    this.iterations = 1;     // Iterations per frame
    this.initialized = false;

    // Image data for rendering
    this.imageData = null;

    // Pattern presets (F, k) - can cycle through these
    this.patterns = [
      { name: 'Spots', F: 0.060, k: 0.062 },      // Leopard spots
      { name: 'Stripes', F: 0.035, k: 0.060 },    // Zebra stripes
      { name: 'Spirals', F: 0.014, k: 0.054 },    // Spiraling waves
      { name: 'Waves', F: 0.026, k: 0.051 },      // Wave patterns
      { name: 'Chaos', F: 0.026, k: 0.059 }       // Chaotic turbulence
    ];
    this.currentPattern = 0;
    this.patternChangeInterval = 30000; // Change pattern every 30s
    this.lastPatternChange = 0;
  }

  /**
   * Initialize the concentration grids with random perturbations
   */
  initialize() {
    const size = this.gridWidth * this.gridHeight;

    // Initialize grids
    this.u = new Float32Array(size);
    this.v = new Float32Array(size);
    this.u_next = new Float32Array(size);
    this.v_next = new Float32Array(size);

    // Fill with initial conditions: mostly U, small random spots of V
    for (let i = 0; i < size; i++) {
      this.u[i] = 1.0;  // Start with maximum substrate
      this.v[i] = 0.0;  // Start with no catalyst
    }

    // Add random seed points for the catalyst V
    const numSeeds = 50;
    for (let i = 0; i < numSeeds; i++) {
      const x = Math.floor(Math.random() * this.gridWidth);
      const y = Math.floor(Math.random() * this.gridHeight);
      const idx = y * this.gridWidth + x;

      // Create small circle of catalyst
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = (x + dx + this.gridWidth) % this.gridWidth;
          const ny = (y + dy + this.gridHeight) % this.gridHeight;
          const nidx = ny * this.gridWidth + nx;
          this.v[nidx] = 0.25 + Math.random() * 0.25;
          this.u[nidx] = 0.5 + Math.random() * 0.25;
        }
      }
    }

    // Create image data for rendering
    const { width, height } = this.canvas;
    this.imageData = this.ctx.createImageData(width, height);

    this.initialized = true;
  }

  /**
   * Laplacian operator (discrete approximation of ∇²)
   * Uses 9-point stencil for better accuracy
   */
  laplacian(grid, x, y) {
    const w = this.gridWidth;
    const h = this.gridHeight;

    // Wrap coordinates (toroidal topology)
    const xm1 = (x - 1 + w) % w;
    const xp1 = (x + 1) % w;
    const ym1 = (y - 1 + h) % h;
    const yp1 = (y + 1) % h;

    const idx = y * w + x;
    const center = grid[idx];

    // 5-point stencil (faster, simpler)
    const sum =
      grid[y * w + xm1] +      // left
      grid[y * w + xp1] +      // right
      grid[ym1 * w + x] +      // top
      grid[yp1 * w + x] -      // bottom
      4.0 * center;            // center

    return sum;
  }

  /**
   * Perform one step of the Gray-Scott reaction-diffusion
   */
  step() {
    const w = this.gridWidth;
    const h = this.gridHeight;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = y * w + x;
        const u = this.u[idx];
        const v = this.v[idx];

        // Compute Laplacians
        const lapU = this.laplacian(this.u, x, y);
        const lapV = this.laplacian(this.v, x, y);

        // Reaction terms
        const uvv = u * v * v;

        // Gray-Scott equations
        // ∂u/∂t = Du∇²u - uv² + F(1-u)
        // ∂v/∂t = Dv∇²v + uv² - (F+k)v
        const du = this.Du * lapU - uvv + this.feed * (1.0 - u);
        const dv = this.Dv * lapV + uvv - (this.feed + this.kill) * v;

        // Update (forward Euler)
        this.u_next[idx] = u + du * this.dt;
        this.v_next[idx] = v + dv * this.dt;

        // Clamp values
        this.u_next[idx] = Math.max(0, Math.min(1, this.u_next[idx]));
        this.v_next[idx] = Math.max(0, Math.min(1, this.v_next[idx]));
      }
    }

    // Swap buffers
    [this.u, this.u_next] = [this.u_next, this.u];
    [this.v, this.v_next] = [this.v_next, this.v];
  }

  /**
   * Change to a different pattern preset
   */
  changePattern() {
    this.currentPattern = (this.currentPattern + 1) % this.patterns.length;
    const pattern = this.patterns[this.currentPattern];
    this.feed = pattern.F;
    this.kill = pattern.k;

    // Don't reinitialize - let pattern evolve from current state
    // This creates interesting transitions
  }

  animate(currentTime) {
    if (!this.initialized) {
      this.initialize();
    }

    // Check if we should change pattern
    if (currentTime - this.lastPatternChange > this.patternChangeInterval) {
      this.changePattern();
      this.lastPatternChange = currentTime;
    }

    // Run simulation steps
    for (let i = 0; i < this.iterations; i++) {
      this.step();
    }

    // Render the pattern
    this.render();

    // Continue animation loop
    if (this.isRunning) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  /**
   * Render the pattern to canvas
   */
  render() {
    const { width, height } = this.canvas;
    const data = this.imageData.data;

    // Scale factors
    const scaleX = this.gridWidth / width;
    const scaleY = this.gridHeight / height;

    // Render each pixel
    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        // Sample from grid (nearest neighbor)
        const gx = Math.floor(px * scaleX);
        const gy = Math.floor(py * scaleY);
        const idx = gy * this.gridWidth + gx;

        const u = this.u[idx];
        const v = this.v[idx];

        // Color mapping: V concentration determines color
        // High V = dark red/black (the pattern)
        // Low V = white/light (the background)
        const intensity = 1.0 - v; // Invert: pattern is dark

        // Create subtle red-tinted grayscale
        const r = Math.floor(intensity * 255);
        const g = Math.floor(intensity * 255 * 0.95);
        const b = Math.floor(intensity * 255 * 0.95);

        // Alternative: highlight the pattern in red
        // const r = Math.floor((1 - v * 0.5) * 255);
        // const g = Math.floor(intensity * 255);
        // const b = Math.floor(intensity * 255);

        const pixelIdx = (py * width + px) * 4;
        data[pixelIdx] = r;
        data[pixelIdx + 1] = g;
        data[pixelIdx + 2] = b;
        data[pixelIdx + 3] = 255 * 0.25; // Overall opacity (subtle background)
      }
    }

    // Draw to canvas
    this.ctx.putImageData(this.imageData, 0, 0);

    // Draw pattern name
    const pattern = this.patterns[this.currentPattern];
    this.ctx.fillStyle = 'rgba(26, 26, 26, 0.5)';
    this.ctx.font = '12px "Fira Code", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Turing Pattern: ${pattern.name} (F=${pattern.F}, k=${pattern.k})`, width / 2, 30);
  }

  cleanup() {
    this.u = null;
    this.v = null;
    this.u_next = null;
    this.v_next = null;
    this.imageData = null;
    this.initialized = false;
    super.cleanup();
  }
}
