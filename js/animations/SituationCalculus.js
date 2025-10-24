// ==========================================
// SITUATION CALCULUS
// Reasoning about actions and change
// ==========================================
import { AnimationBase } from './AnimationBase.js';
/**
 * Situation Calculus Animation
 *
 * Visualizes the situation calculus formalism for representing
 * dynamical domains. Shows situations (world states) connected by
 * actions, demonstrating how actions transform situations into new
 * situations in the classic do(action, situation) notation.
 */
export class SituationCalculus extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);
    // Animation-specific config
    this.config = {
      opacity: 0.5,
      nodeRadius: 30,
      lineWidth: 2,
      arrowSize: 10,
      animationSpeed: 0.01,
      maxDepth: 4 // Maximum situation depth
    };
    // Animation state
    this.progress = 0; // Controls animation progression
    this.time = 0;
    // Define action sequence (classic blocks world example)
    this.actions = [
      { name: 'pickup(A)', symbol: '↑A' },
      { name: 'move(left)', symbol: '←' },
      { name: 'putdown(A)', symbol: '↓A' },
      { name: 'pickup(B)', symbol: '↑B' }
    ];
    // Build situation tree
    this.buildSituationTree();
  }
  static getMetadata() {
    return {
      name: 'Situation Calculus',
      key: 'situationCalculus',
      description: 'Reasoning about actions and change in AI'
    };
  }
  buildSituationTree() {
    // S0 is the initial situation
    this.situations = [
      { id: 0, label: 'S₀', x: 0, y: 0, depth: 0, parent: null, action: null }
    ];
    // Generate tree of situations: do(action, situation)
    let id = 1;
    for (let depth = 0; depth < this.config.maxDepth; depth++) {
      const situationsAtDepth = this.situations.filter(s => s.depth === depth);
      situationsAtDepth.forEach(parent => {
        // Add 1-2 successor situations
        const numSuccessors = depth < 2 ? 2 : 1;
        for (let i = 0; i < numSuccessors; i++) {
          const action = this.actions[(id - 1) % this.actions.length];
          this.situations.push({
            id: id,
            label: `S${id}`,
            x: 0,
            y: 0,
            depth: depth + 1,
            parent: parent.id,
            action: action
          });
          id++;
        }
      });
    }
    // Calculate positions
    this.layoutTree();
  }
  layoutTree() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const verticalSpacing = 100;
    // Group by depth
    const depthGroups = {};
    this.situations.forEach(s => {
      if (!depthGroups[s.depth]) depthGroups[s.depth] = [];
      depthGroups[s.depth].push(s);
    });
    // Position each depth level
    Object.keys(depthGroups).forEach(depth => {
      const situations = depthGroups[depth];
      const numSituations = situations.length;
      const horizontalSpacing = Math.min(150, this.canvas.width / (numSituations + 1));
      situations.forEach((s, idx) => {
        s.x = centerX + (idx - (numSituations - 1) / 2) * horizontalSpacing;
        s.y = centerY - (this.config.maxDepth * verticalSpacing / 2) + depth * verticalSpacing;
      });
    });
  }
  drawArrow(fromX, fromY, toX, toY, label) {
    // Calculate arrow angle
    const angle = Math.atan2(toY - fromY, toX - fromX);
    // Shorten line to not overlap with nodes
    const shortenStart = this.config.nodeRadius;
    const shortenEnd = this.config.nodeRadius;
    const startX = fromX + Math.cos(angle) * shortenStart;
    const startY = fromY + Math.sin(angle) * shortenStart;
    const endX = toX - Math.cos(angle) * shortenEnd;
    const endY = toY - Math.sin(angle) * shortenEnd;
    // Draw line
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = `rgba(139, 0, 0, ${this.config.opacity})`;
    this.ctx.lineWidth = this.config.lineWidth;
    this.ctx.stroke();
    // Draw arrowhead
    const arrowSize = this.config.arrowSize;
    this.ctx.beginPath();
    this.ctx.moveTo(endX, endY);
    this.ctx.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity})`;
    this.ctx.fill();
    // Draw action label
    if (label) {
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      this.ctx.font = '14px "Fira Code", monospace';
      this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.2})`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      // Background for label
      const metrics = this.ctx.measureText(label);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      this.ctx.fillRect(midX - metrics.width / 2 - 4, midY - 10, metrics.width + 8, 20);
      this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.3})`;
      this.ctx.fillText(label, midX, midY);
    }
  }
  drawSituation(situation, opacity) {
    // Pulsing effect based on time
    const pulse = 1 + 0.1 * Math.sin(this.time * 2 + situation.id);
    const radius = this.config.nodeRadius * pulse;
    // Draw node circle
    this.ctx.beginPath();
    this.ctx.arc(situation.x, situation.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
    this.ctx.fill();
    this.ctx.strokeStyle = `rgba(139, 0, 0, ${opacity})`;
    this.ctx.lineWidth = this.config.lineWidth;
    this.ctx.stroke();
    // Draw label
    this.ctx.font = '16px "Fira Code", monospace';
    this.ctx.fillStyle = `rgba(139, 0, 0, ${opacity})`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(situation.label, situation.x, situation.y);
  }
  animate(currentTime) {
    if (!this.isRunning) return;
    // Clear canvas
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // Recalculate layout in case of resize
    this.layoutTree();
    // Calculate how many situations to show based on progress
    const numToShow = Math.min(
      Math.floor(this.progress),
      this.situations.length
    );
    // Draw title
    this.ctx.font = '24px "Fira Code", monospace';
    this.ctx.fillStyle = `rgba(139, 0, 0, ${this.config.opacity + 0.3})`;
    this.ctx.textAlign = 'center';
    this.ctx.fillText('do(action, situation)', this.canvas.width / 2, 40);
    // Draw edges (arrows) first
    for (let i = 1; i < numToShow; i++) {
      const situation = this.situations[i];
      const parent = this.situations.find(s => s.id === situation.parent);
      if (parent) {
        const fadeIn = Math.min(1, this.progress - i);
        const edgeOpacity = this.config.opacity * fadeIn;
        if (situation.action) {
          this.drawArrow(
            parent.x,
            parent.y,
            situation.x,
            situation.y,
            situation.action.symbol
          );
        }
      }
    }
    // Draw nodes
    for (let i = 0; i < numToShow; i++) {
      const situation = this.situations[i];
      const fadeIn = Math.min(1, this.progress - i);
      const nodeOpacity = this.config.opacity * fadeIn;
      this.drawSituation(situation, nodeOpacity);
    }
    // Update animation state
    this.progress += this.config.animationSpeed;
    this.time += 0.01;
    // Reset when all situations shown
    if (this.progress >= this.situations.length + 2) {
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
