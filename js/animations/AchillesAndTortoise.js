// ==========================================
// ACHILLES AND THE TORTOISE
// Zeno's Paradox - The Race That Never Ends
// ==========================================

import { AnimationBase } from './AnimationBase.js';

/**
 * Achilles and the Tortoise Animation
 *
 * Visualizes Zeno's famous paradox: Achilles races a tortoise who has
 * a head start. By the time Achilles reaches where the tortoise was,
 * the tortoise has moved forward. This repeats infinitely, yet Achilles
 * does overtake the tortoise - demonstrating the concept of convergent
 * infinite series and the resolution of Zeno's paradox.
 */
export class AchillesAndTortoise extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    // Animation-specific config
    this.config = {
      opacity: 0.5,
      achillesSpeed: 2.0,    // Achilles runs 2x faster
      tortoiseSpeed: 1.0,    // Tortoise baseline speed
      headStart: 200,        // Tortoise's head start in pixels
      resetDistance: 100,    // Reset when Achilles gets this close
      lineOpacity: 0.3,
      dotRadius: 8,
      pathFade: 0.02
    };

    // Animation state
    this.achillesPos = 0;
    this.tortoisePos = this.config.headStart;
    this.segments = [];      // Track paradox segments
    this.catchUpPoints = []; // Points where Achilles catches up
    this.time = 0;
    this.raceActive = true;
  }

  static getMetadata() {
    return {
      name: 'Achilles and the Tortoise',
      key: 'achillesAndTortoise',
      description: "Zeno's paradox visualized - the infinite chase"
    };
  }

  animate(currentTime) {
    if (!this.isRunning) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const trackY = height / 2;
    const margin = 100;

    // Clear with fade effect for motion trails
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.pathFade})`;
    this.ctx.fillRect(0, 0, width, height);

    // Draw track
    this.ctx.strokeStyle = `rgba(139, 0, 0, ${this.config.lineOpacity})`;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(margin, trackY);
    this.ctx.lineTo(width - margin, trackY);
    this.ctx.stroke();

    // Scale positions to fit screen
    const trackWidth = width - 2 * margin;
    const maxPos = this.tortoisePos + 200; // Show a bit ahead
    const scale = trackWidth / maxPos;

    const achillesX = margin + this.achillesPos * scale;
    const tortoiseX = margin + this.tortoisePos * scale;

    // Draw catch-up points (Zeno's paradox segments)
    this.catchUpPoints.forEach((point, idx) => {
      const x = margin + point * scale;
      const opacity = Math.max(0.1, 1 - idx * 0.15);

      // Vertical line
      this.ctx.strokeStyle = `rgba(139, 0, 0, ${opacity * 0.3})`;
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([5, 5]);
      this.ctx.beginPath();
      this.ctx.moveTo(x, trackY - 40);
      this.ctx.lineTo(x, trackY + 40);
      this.ctx.stroke();
      this.ctx.setLineDash([]);

      // Label
      this.ctx.fillStyle = `rgba(139, 0, 0, ${opacity * 0.6})`;
      this.ctx.font = '12px "Fira Code", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`P${idx + 1}`, x, trackY - 50);
    });

    // Draw Achilles (runner)
    this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.2})`;
    this.ctx.beginPath();
    this.ctx.arc(achillesX, trackY, this.config.dotRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Achilles label
    this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.3})`;
    this.ctx.font = 'bold 14px "Fira Code", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Α', achillesX, trackY - 20); // Greek Alpha for Achilles

    // Draw Tortoise
    this.ctx.fillStyle = `rgba(34, 139, 34, ${this.config.opacity + 0.2})`;
    this.ctx.beginPath();
    this.ctx.arc(tortoiseX, trackY, this.config.dotRadius * 0.8, 0, Math.PI * 2);
    this.ctx.fill();

    // Tortoise label
    this.ctx.fillStyle = `rgba(34, 139, 34, ${this.config.opacity + 0.3})`;
    this.ctx.font = 'bold 14px "Fira Code", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🐢', tortoiseX, trackY + 35);

    // Draw title and explanation
    this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.3})`;
    this.ctx.font = '18px "Fira Code", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("Zeno's Paradox: Achilles and the Tortoise", width / 2, 40);

    this.ctx.font = '12px "Fira Code", monospace';
    this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.2})`;
    this.ctx.fillText(`Segments: ${this.catchUpPoints.length} | Achilles: ${Math.floor(this.achillesPos)} | Tortoise: ${Math.floor(this.tortoisePos)}`, width / 2, 65);

    // Update positions
    if (this.raceActive) {
      const prevAchillesPos = this.achillesPos;

      this.achillesPos += this.config.achillesSpeed;
      this.tortoisePos += this.config.tortoiseSpeed;

      // Check if Achilles reaches where tortoise WAS (Zeno's paradox point)
      if (Math.floor(prevAchillesPos) < Math.floor(this.tortoisePos - this.config.tortoiseSpeed) &&
          Math.floor(this.achillesPos) >= Math.floor(this.tortoisePos - this.config.tortoiseSpeed)) {

        // Record this catch-up point
        this.catchUpPoints.push(this.tortoisePos - this.config.tortoiseSpeed);

        // Keep only recent points
        if (this.catchUpPoints.length > 8) {
          this.catchUpPoints.shift();
        }
      }

      // Achilles overtakes - reset for continuous demonstration
      if (this.achillesPos >= this.tortoisePos + 50) {
        this.achillesPos = 0;
        this.tortoisePos = this.config.headStart;
        this.catchUpPoints = [];
      }
    }

    this.time += 0.01;

    // Request next frame
    if (this.isRunning) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  cleanup() {
    super.cleanup();
  }
}
