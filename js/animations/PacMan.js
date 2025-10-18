// ==========================================
// PAC-MAN ARCADE GAME
// Nostalgic arcade game with Pac-Man and ghosts
// ==========================================

import { AnimationBase } from './AnimationBase.js';

export class PacMan extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);

        this.config = {
            fadeAmount: 0.15
        };

        this.pacman = new PacManCharacter(
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        this.ghosts = [
            new Ghost(this.canvas.width * 0.3, this.canvas.height * 0.3, 'rgba(139, 0, 0, 0.7)'),
            new Ghost(this.canvas.width * 0.7, this.canvas.height * 0.3, 'rgba(165, 42, 42, 0.7)'),
            new Ghost(this.canvas.width * 0.3, this.canvas.height * 0.7, 'rgba(178, 34, 34, 0.7)'),
            new Ghost(this.canvas.width * 0.7, this.canvas.height * 0.7, 'rgba(205, 92, 92, 0.7)')
        ];

        this.frameCount = 0;
    }

    static getMetadata() {
        return {
            name: 'Pac-Man',
            key: 'pacman',
            description: 'Classic Pac-Man arcade game with ghosts'
        };
    }

    animate() {
        if (!this.isRunning) return;

        this.frameCount++;

        // Clear canvas with fade effect
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.fadeAmount})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Occasionally draw subtle maze-like lines
        if (this.frameCount % 120 === 0) {
            this.ctx.strokeStyle = 'rgba(139, 0, 0, 0.05)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const x1 = Math.random() * this.canvas.width;
                const y1 = Math.random() * this.canvas.height;
                const x2 = x1 + (Math.random() - 0.5) * 200;
                const y2 = y1 + (Math.random() - 0.5) * 200;
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
            }
            this.ctx.stroke();
        }

        // Update and draw ghosts
        this.ghosts.forEach(ghost => {
            ghost.update(this.canvas.width, this.canvas.height);
            ghost.draw(this.ctx);
        });

        // Update and draw Pac-Man
        this.pacman.update(this.canvas.width, this.canvas.height);
        this.pacman.draw(this.ctx);

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Game entities
class PacManCharacter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 35;
        this.speed = 2.5;
        this.direction = 0; // 0=right, 1=down, 2=left, 3=up
        this.mouthAngle = 0;
        this.mouthOpening = true;
        this.changeDirectionCounter = 0;
    }

    update(width, height) {
        // Animate mouth
        if (this.mouthOpening) {
            this.mouthAngle += 0.08;
            if (this.mouthAngle > 0.6) this.mouthOpening = false;
        } else {
            this.mouthAngle -= 0.08;
            if (this.mouthAngle < 0.05) this.mouthOpening = true;
        }

        // Move based on direction
        switch (this.direction) {
            case 0: this.x += this.speed; break; // right
            case 1: this.y += this.speed; break; // down
            case 2: this.x -= this.speed; break; // left
            case 3: this.y -= this.speed; break; // up
        }

        // Screen wrapping (toroidal topology)
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;

        // Randomly change direction occasionally
        this.changeDirectionCounter++;
        if (this.changeDirectionCounter > 120) {
            if (Math.random() < 0.3) {
                this.direction = Math.floor(Math.random() * 4);
            }
            this.changeDirectionCounter = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction * Math.PI / 2);

        // Draw Pac-Man body (dark red)
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(0, 0, this.size, this.mouthAngle * Math.PI, (2 - this.mouthAngle) * Math.PI);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        // Add subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(139, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 0, this.size, this.mouthAngle * Math.PI, (2 - this.mouthAngle) * Math.PI);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

class Ghost {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.speed = 1.5;
        this.color = color;
        this.direction = Math.random() * Math.PI * 2;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.changeDirectionCounter = 0;
    }

    update(width, height) {
        // Move in current direction
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // Screen wrapping
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;

        // Randomly change direction
        this.changeDirectionCounter++;
        if (this.changeDirectionCounter > 100) {
            if (Math.random() < 0.4) {
                this.direction = Math.random() * Math.PI * 2;
            }
            this.changeDirectionCounter = 0;
        }

        // Update wave animation
        this.waveOffset += 0.1;
    }

    draw(ctx) {
        // Ghost body (semi-circle top)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI, 0, false);

        // Wavy bottom
        ctx.lineTo(this.x + this.size, this.y);
        for (let i = 0; i <= 4; i++) {
            const waveX = this.x + this.size - (i * this.size / 2);
            const waveY = this.y + Math.sin(this.waveOffset + i) * 5;
            ctx.lineTo(waveX, waveY);
        }
        ctx.lineTo(this.x - this.size, this.y);
        ctx.closePath();
        ctx.fill();

        // Eyes (white)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(this.x - 6, this.y - 3, 5, 0, Math.PI * 2);
        ctx.arc(this.x + 6, this.y - 3, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pupils (dark)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        const pupilOffsetX = Math.cos(this.direction) * 2;
        const pupilOffsetY = Math.sin(this.direction) * 2;
        ctx.beginPath();
        ctx.arc(this.x - 6 + pupilOffsetX, this.y - 3 + pupilOffsetY, 2.5, 0, Math.PI * 2);
        ctx.arc(this.x + 6 + pupilOffsetX, this.y - 3 + pupilOffsetY, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
}
