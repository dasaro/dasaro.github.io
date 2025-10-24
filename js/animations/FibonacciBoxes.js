// ==========================================
// FIBONACCI BOXES
// Classic Fibonacci rectangles forming golden spiral
// ==========================================

import { AnimationBase } from './AnimationBase.js';

/**
 * Fibonacci Boxes Animation
 *
 * Displays the classic Fibonacci rectangle pattern where each square
 * has a side length equal to a Fibonacci number. When arranged in the
 * iconic spiral pattern, these squares perfectly demonstrate the
 * golden ratio's presence in the Fibonacci sequence.
 */
export class FibonacciBoxes extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    // Animation-specific config
    this.config = {
      opacity: 0.5,
      lineWidth: 2,
      fillOpacity: 0.15,
      animationSpeed: 0.02,
      maxBoxes: 12, // How many Fibonacci rectangles to show
      rotationSpeed: 0.0005
    };

    // Animation state
    this.progress = 0; // Controls which boxes are visible
    this.rotation = 0; // Slow rotation for visual interest
    this.fibonacci = [1, 1]; // Fibonacci sequence

    // Generate Fibonacci sequence
    for (let i = 2; i < this.config.maxBoxes; i++) {
      this.fibonacci[i] = this.fibonacci[i - 1] + this.fibonacci[i - 2];
    }
  }

  static getMetadata() {
    return {
      name: 'Fibonacci Boxes',
      key: 'fibonacciBoxes',
      description: 'Golden rectangle spiral with Fibonacci squares'
    };
  }

  animate(currentTime) {
    if (!this.isRunning) return;

    // Clear canvas
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    // Calculate base scale to fit nicely on screen
    const maxFib = this.fibonacci[this.config.maxBoxes - 1];
    const baseScale = Math.min(this.canvas.width, this.canvas.height) / (maxFib * 3);

    // Save context for rotation
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.rotation);

    // Draw Fibonacci boxes
    const numBoxesToDraw = Math.floor(this.progress);

    // Track the bounding rectangle as we build the spiral
    let rectX = 0, rectY = 0;
    let rectWidth = 0, rectHeight = 0;

    for (let i = 0; i < numBoxesToDraw && i < this.config.maxBoxes; i++) {
      const size = this.fibonacci[i] * baseScale;

      // Calculate opacity for fade-in effect
      const boxProgress = this.progress - i;
      const fadeIn = Math.min(1, boxProgress);

      let x, y;

      // Position each square according to the classic Fibonacci spiral pattern
      if (i === 0) {
        // First 1x1 square
        x = 0;
        y = 0;
        rectWidth = size;
        rectHeight = size;
      } else if (i === 1) {
        // Second 1x1 square - to the right of first
        x = size;
        y = 0;
        rectWidth = size * 2;
        rectHeight = size;
      } else {
        // Each subsequent square attaches to the rectangle formed so far
        // Direction cycles: top, left, bottom, right
        const direction = (i - 2) % 4;

        switch (direction) {
          case 0: // Top
            x = rectX;
            y = rectY - size;
            rectY = y;
            rectHeight += size;
            break;
          case 1: // Left
            x = rectX - size;
            y = rectY;
            rectX = x;
            rectWidth += size;
            break;
          case 2: // Bottom
            x = rectX + rectWidth - size;
            y = rectY + rectHeight;
            rectHeight += size;
            break;
          case 3: // Right
            x = rectX + rectWidth;
            y = rectY + rectHeight - size;
            rectWidth += size;
            break;
        }
      }

      // Center the entire pattern
      const offsetX = -rectWidth / 2;
      const offsetY = -rectHeight / 2;

      // Draw filled rectangle
      this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.fillOpacity * fadeIn})`;
      this.ctx.fillRect(x + offsetX, y + offsetY, size, size);

      // Draw border
      this.ctx.strokeStyle = `rgba(139, 0, 0, ${this.config.opacity * fadeIn})`;
      this.ctx.lineWidth = this.config.lineWidth;
      this.ctx.strokeRect(x + offsetX, y + offsetY, size, size);

      // Draw Fibonacci number in the box
      this.ctx.fillStyle = `rgba(139, 0, 0, ${0.6 * fadeIn})`;
      this.ctx.font = `${Math.max(10, size / 4)}px "Fira Code", monospace`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(this.fibonacci[i], x + offsetX + size / 2, y + offsetY + size / 2);
    }

    this.ctx.restore();

    // Update animation state
    this.progress += this.config.animationSpeed;
    this.rotation += this.config.rotationSpeed;

    // Reset when all boxes are drawn
    if (this.progress >= this.config.maxBoxes + 1) {
      this.progress = 0;
    }

    // Request next frame
    if (this.isRunning) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  cleanup() {
    super.cleanup();
  }
}
