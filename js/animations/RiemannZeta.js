// ==========================================
// RIEMANN ZETA POLAR PLOT
// Single evolving curve using Dirichlet eta series
// ==========================================
import { AnimationBase } from './AnimationBase.js';
export class RiemannZeta extends AnimationBase {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        // Animation-specific config
        this.config = {
            opacity: 0.6,
            speed: 0.12,
            fadeAmount: 0.04,
            lineWidth: 2.5,
            dotRadius: 7,
            seriesTerms: 500
        };
        // Animation state
        this.T_ZERO = 14.134725; // First non-trivial zero
        this.t = this.T_ZERO + 0.001;
        this.tMax = 50;
        this.sigma = 0.5; // Critical line Re(s) = 1/2
        this.path = [];
    }
    static getMetadata() {
        return {
            name: 'Riemann Zeta',
            key: 'riemann',
            description: 'Polar plot of ζ(1/2 + it) on the critical line'
        };
    }
    // Complex number helpers
    cadd(a, b) {
        return {re: a.re + b.re, im: a.im + b.im};
    }
    cmul(a, b) {
        return {
            re: a.re * b.re - a.im * b.im,
            im: a.re * b.im + a.im * b.re
        };
    }
    cdiv(a, b) {
        const d = b.re * b.re + b.im * b.im;
        return {
            re: (a.re * b.re + a.im * b.im) / d,
            im: (a.im * b.re - a.re * b.im) / d
        };
    }
    cabs(a) {
        return Math.hypot(a.re, a.im);
    }
    carg(a) {
        return Math.atan2(a.im, a.re);
    }
    // Compute Dirichlet eta: η(s) = Σ(-1)^(n-1) n^(-s)
    etaOf(sigma, t, N) {
        let sr = 0, si = 0;
        for (let n = 1; n <= N; n++) {
            const alt = (n & 1) ? 1 : -1; // (-1)^(n-1)
            const a = Math.pow(n, -sigma); // n^(-sigma)
            const th = t * Math.log(n); // t ln(n)
            const ce = Math.cos(th);
            const se = Math.sin(th);
            // n^(-s) = n^(-sigma) * e^(-it ln n)
            sr += alt * a * ce;
            si += alt * a * (-se);
        }
        return {re: sr, im: si};
    }
    // Compute zeta: ζ(s) = η(s) / (1 - 2^(1-s))
    zetaOf(sigma, t, N) {
        const eta = this.etaOf(sigma, t, N);
        // denom = 1 - 2^(1-σ) * e^(-it ln 2)
        const A = Math.pow(2, 1 - sigma);
        const th2 = t * Math.log(2);
        const denom = {
            re: 1 - A * Math.cos(th2),
            im: A * Math.sin(th2)
        };
        return this.cdiv(eta, denom);
    }
    // Convert polar to canvas coordinates
    polarToXY(r, th) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const pxPerUnit = Math.min(this.canvas.width, this.canvas.height) / 8;
        return {
            x: centerX + pxPerUnit * r * Math.cos(th),
            y: centerY - pxPerUnit * r * Math.sin(th) // Flip Y for canvas
        };
    }
    animate() {
        if (!this.isRunning) return;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const pxPerUnit = Math.min(this.canvas.width, this.canvas.height) / 8;
        // Subtle fade instead of full clear
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.fadeAmount})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw subtle reference circles
        this.ctx.strokeStyle = 'rgba(200, 200, 200, 0.08)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([3, 3]);
        for (let k = 1; k <= 3; k++) {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, k * pxPerUnit, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        this.ctx.setLineDash([]);
        // Compute next point
        if (this.t < this.tMax) {
            const z = this.zetaOf(this.sigma, this.t, this.config.seriesTerms);
            const r = this.cabs(z);
            const th = this.carg(z);
            const pt = this.polarToXY(r, th);
            this.path.push({x: pt.x, y: pt.y, r, t: this.t});
            // Mark zeros (where r ≈ 0)
            if (r < 0.08) {
                // Large red dot at zero
                this.ctx.fillStyle = 'rgba(139, 0, 0, 0.9)';
                this.ctx.beginPath();
                this.ctx.arc(pt.x, pt.y, this.config.dotRadius, 0, Math.PI * 2);
                this.ctx.fill();
                // Glow around zero
                const gradient = this.ctx.createRadialGradient(
                    pt.x, pt.y, 0,
                    pt.x, pt.y, 20
                );
                gradient.addColorStop(0, 'rgba(139, 0, 0, 0.5)');
                gradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(pt.x, pt.y, 20, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.t += this.config.speed;
        }
        // Limit path length to prevent memory issues
        if (this.path.length > 2000) this.path.shift();
        // Draw the traced path (RED)
        if (this.path.length > 1) {
            this.ctx.strokeStyle = `rgba(139, 0, 0, ${this.config.opacity})`;
            this.ctx.lineWidth = this.config.lineWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(this.path[0].x, this.path[0].y);
            for (let i = 1; i < this.path.length; i++) {
                this.ctx.lineTo(this.path[i].x, this.path[i].y);
            }
            this.ctx.stroke();
            // Current point marker
            const curr = this.path[this.path.length - 1];
            this.ctx.fillStyle = 'rgba(139, 0, 0, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(curr.x, curr.y, 3.5, 0, Math.PI * 2);
            this.ctx.fill();
        }
        // Loop indefinitely - reset immediately when reaching tMax
        if (this.t >= this.tMax) {
            this.t = this.T_ZERO + 0.001;
            this.path = [];
        }
    }
}
