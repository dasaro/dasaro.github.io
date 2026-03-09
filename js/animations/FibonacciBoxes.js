// ==========================================
// FIBONACCI BOXES
// Non-overlapping Fibonacci tiling
// ==========================================
import { AnimationBase } from './AnimationBase.js';

export class FibonacciBoxes extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    this.config = {
      lineWidth: 2,
      fillOpacity: 0.1,
      animationSpeed: 0.055,
      maxBoxes: 12,
      minimumProgress: 4,
      holdDuration: 28
    };

    this.progress = this.config.minimumProgress;
    this.holdFrames = 0;
    this.fibonacci = [1, 1];

    for (let index = 2; index < this.config.maxBoxes; index++) {
      this.fibonacci[index] = this.fibonacci[index - 1] + this.fibonacci[index - 2];
    }

    const layout = this.buildLayout();
    this.boxes = layout.boxes;
    this.bounds = layout.bounds;
  }

  static getMetadata() {
    return {
      name: 'Fibonacci Boxes',
      key: 'fibonacciBoxes',
      description: 'Non-overlapping Fibonacci tiling'
    };
  }

  buildLayout() {
    const boxes = [
      { x: 0, y: 0, size: this.fibonacci[0], direction: 'seed' },
      { x: 1, y: 0, size: this.fibonacci[1], direction: 'right' }
    ];
    const bounds = {
      minX: 0,
      minY: 0,
      maxX: 2,
      maxY: 1
    };
    const directions = ['up', 'left', 'down', 'right'];

    for (let index = 2; index < this.config.maxBoxes; index++) {
      const size = this.fibonacci[index];
      const direction = directions[(index - 2) % directions.length];
      let x = 0;
      let y = 0;

      switch (direction) {
        case 'up':
          x = bounds.minX;
          y = bounds.minY - size;
          break;
        case 'left':
          x = bounds.minX - size;
          y = bounds.minY;
          break;
        case 'down':
          x = bounds.minX;
          y = bounds.maxY;
          break;
        case 'right':
          x = bounds.maxX;
          y = bounds.minY;
          break;
      }

      boxes.push({ x, y, size, direction });
      bounds.minX = Math.min(bounds.minX, x);
      bounds.minY = Math.min(bounds.minY, y);
      bounds.maxX = Math.max(bounds.maxX, x + size);
      bounds.maxY = Math.max(bounds.maxY, y + size);
    }

    bounds.width = bounds.maxX - bounds.minX;
    bounds.height = bounds.maxY - bounds.minY;

    return { boxes, bounds };
  }

  getScale() {
    const paddingX = Math.max(40, Math.min(120, this.canvas.width * 0.09));
    const paddingY = Math.max(36, Math.min(100, this.canvas.height * 0.1));
    const availableWidth = this.canvas.width - paddingX * 2;
    const availableHeight = this.canvas.height - paddingY * 2;

    return Math.min(
      availableWidth / this.bounds.width,
      availableHeight / this.bounds.height
    );
  }

  animate() {
    if (!this.isRunning) {
      return;
    }

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const scale = this.getScale();
    const drawingWidth = this.bounds.width * scale;
    const drawingHeight = this.bounds.height * scale;
    const offsetX = (this.canvas.width - drawingWidth) / 2 - this.bounds.minX * scale;
    const offsetY = (this.canvas.height - drawingHeight) / 2 - this.bounds.minY * scale;
    const newestIndex = Math.min(this.boxes.length - 1, Math.floor(this.progress));

    this.boxes.forEach((box, index) => {
      const localProgress = Math.max(0, Math.min(1, this.progress - index));
      if (localProgress <= 0) {
        return;
      }

      const x = offsetX + box.x * scale;
      const y = offsetY + box.y * scale;
      const size = box.size * scale;
      const isNewest = index === newestIndex;
      const alpha = 0.18 + localProgress * (isNewest ? 0.26 : 0.18);

      this.ctx.fillStyle = `rgba(132, 92, 73, ${this.config.fillOpacity + localProgress * (isNewest ? 0.08 : 0.05)})`;
      this.ctx.fillRect(x, y, size, size);

      this.ctx.strokeStyle = `rgba(132, 92, 73, ${alpha})`;
      this.ctx.lineWidth = isNewest ? this.config.lineWidth + 0.6 : this.config.lineWidth;
      this.ctx.strokeRect(x, y, size, size);

      if (size > 42) {
        this.ctx.fillStyle = `rgba(132, 92, 73, ${isNewest ? 0.52 : 0.34})`;
        this.ctx.font = `${Math.max(12, size / 5)}px "Fira Code", monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(String(box.size), x + size / 2, y + size / 2);
      }
    });

    if (this.progress < this.boxes.length) {
      this.progress += this.config.animationSpeed;
      this.holdFrames = 0;
      return;
    }

    this.holdFrames += 1;
    if (this.holdFrames >= this.config.holdDuration) {
      this.progress = this.config.minimumProgress;
      this.holdFrames = 0;
    }
  }
}
