// ==========================================
// LOGIC PROOF TREE
// Growing inference tree with logical symbols
// ==========================================
import { AnimationBase } from './AnimationBase.js';
export class ProofTree extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.config = {
            centerX: this.canvas.width / 2,
            startY: 100,
            maxDepth: 3,
            nodeRadius: 18,
            fadeSpeed: 0.05,
            regenerateInterval: 300
        };
        // Logical symbols and rules
        this.symbols = ['⊢', '→', '∧', '∨', '¬', '∀', '∃', 'P', 'Q', 'R'];
        this.rules = ['MP', 'MT', '∧I', '∧E', '→I', '∀I', '∃E'];
        this.tree = null;
        this.allNodes = [];
        this.time = 0;
    }
    static getMetadata() {
        return {
            name: 'Proof Tree',
            key: 'proofTree',
            description: 'Growing logical inference tree with symbols and rules'
        };
    }
    generateTree(x, y, depth, maxDepth) {
        if (depth > maxDepth) return null;
        const formula = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        const rule = this.rules[Math.floor(Math.random() * this.rules.length)];
        const node = new ProofNode(x, y, formula, rule, depth);
        this.allNodes.push(node);
        // Binary branching with probability
        const numChildren = depth < maxDepth ? (Math.random() < 0.7 ? 2 : Math.random() < 0.5 ? 1 : 0) : 0;
        const spacing = 120 / (depth + 1);
        if (numChildren >= 1) {
            node.children.push(this.generateTree(x - spacing, y + 80, depth + 1, maxDepth));
        }
        if (numChildren === 2) {
            node.children.push(this.generateTree(x + spacing, y + 80, depth + 1, maxDepth));
        }
        return node;
    }
    drawNode(node) {
        if (!node || node.opacity <= 0) return;
        // Draw connections to children with red lines
        node.children.forEach(child => {
            if (child && child.opacity > 0) {
                this.ctx.strokeStyle = `rgba(139, 0, 0, ${node.opacity * 0.6})`;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y + 15);
                this.ctx.lineTo(child.x, child.y - 5);
                this.ctx.stroke();
            }
        });
        // Draw node circle
        this.ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        this.ctx.strokeStyle = `rgba(139, 0, 0, ${node.opacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, this.config.nodeRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        // Draw formula
        this.ctx.fillStyle = `rgba(139, 0, 0, ${node.opacity})`;
        this.ctx.font = '14px "Fira Code", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(node.formula, node.x, node.y);
        // Draw rule label
        this.ctx.font = '10px "Fira Code", monospace';
        this.ctx.fillStyle = `rgba(139, 0, 0, ${node.opacity * 0.7})`;
        this.ctx.fillText(node.rule, node.x, node.y + 30);
        // Recursively draw children
        node.children.forEach(child => this.drawNode(child));
    }
    animate() {
        if (!this.isRunning) return;
        // Clear with fade
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Generate new tree periodically
        if (!this.tree || this.time % this.config.regenerateInterval === 0) {
            this.allNodes = [];
            this.tree = this.generateTree(
                this.config.centerX,
                this.config.startY,
                0,
                this.config.maxDepth
            );
            this.time = 0;
        }
        // Gradually fade in nodes based on depth and time
        this.allNodes.forEach((node, index) => {
            const appearTime = node.depth * 30 + index * 3;
            if (this.time > appearTime && node.opacity < 1) {
                node.opacity = Math.min(1, node.opacity + this.config.fadeSpeed);
            }
        });
        // Draw tree
        if (this.tree) {
            this.drawNode(this.tree);
        }
        this.time++;
    }
}
// Helper class for proof nodes
class ProofNode {
    constructor(x, y, formula, rule, depth) {
        this.x = x;
        this.y = y;
        this.formula = formula;
        this.rule = rule;
        this.depth = depth;
        this.children = [];
        this.opacity = 0;
    }
}
