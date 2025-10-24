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
    const baseScale = Math.min(this.canvas.width, this.canvas.height) / (maxFib * 2.8);
    // Save context for rotation
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.rotation);
    // Draw Fibonacci boxes
    const numBoxesToDraw = Math.floor(this.progress);
    // Store all box positions first, then draw with centering offset
    const boxes = [];
    let minX = 0, minY = 0, maxX = 0, maxY = 0;
    // Classic Fibonacci spiral positions
    // Pattern: Start with 1x1, add 1x1 to right, then spiral: top, left, bottom, right...
    let currentX = 0;
    let currentY = 0;
    for (let i = 0; i < numBoxesToDraw && i < this.config.maxBoxes; i++) {
      const size = this.fibonacci[i] * baseScale;
      boxes.push({ x: currentX, y: currentY, size, fib: this.fibonacci[i] });
      // Update bounds
      minX = Math.min(minX, currentX);
      minY = Math.min(minY, currentY);
      maxX = Math.max(maxX, currentX + size);
      maxY = Math.max(maxY, currentY + size);
      // Calculate next position
      if (i === 0) {
        // First box at origin, next goes to the right
        currentX = size;
      } else if (i === 1) {
        // After second box, start spiraling upward
        currentY = -size;
        currentX = 0;
      } else {
        // Spiral pattern: each box added counterclockwise
        const dir = (i - 2) % 4;
        switch (dir) {
          case 0: // Top → Left
            currentX = minX - size;
            currentY = minY;
            break;
          case 1: // Left → Bottom
            currentX = minX;
            currentY = maxY;
            break;
          case 2: // Bottom → Right
            currentX = maxX;
            currentY = maxY - size;
            break;
          case 3: // Right → Top
            currentX = maxX - size;
            currentY = minY - size;
            break;
        }
      }
    }
    // Calculate centering offset
    const offsetX = -(minX + maxX) / 2;
    const offsetY = -(minY + maxY) / 2;
    // Draw all boxes with centering
    boxes.forEach((box, i) => {
      const boxProgress = this.progress - i;
      const fadeIn = Math.min(1, Math.max(0, boxProgress));
      // Draw filled rectangle
      this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.fillOpacity * fadeIn})`;
      this.ctx.fillRect(box.x + offsetX, box.y + offsetY, box.size, box.size);
      // Draw border
      this.ctx.strokeStyle = `rgba(139, 0, 0, ${this.config.opacity * fadeIn})`;
      this.ctx.lineWidth = this.config.lineWidth;
      this.ctx.strokeRect(box.x + offsetX, box.y + offsetY, box.size, box.size);
      // Draw Fibonacci number
      this.ctx.fillStyle = `rgba(139, 0, 0, ${0.6 * fadeIn})`;
      this.ctx.font = `${Math.max(10, box.size / 4)}px "Fira Code", monospace`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(box.fib, box.x + offsetX + box.size / 2, box.y + offsetY + box.size / 2);
    });
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
    }
  }
  cleanup() {
    super.cleanup();
  }
}
