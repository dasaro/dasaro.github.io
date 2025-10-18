// ==========================================
// MATHEMATICAL BACKGROUND ANIMATIONS
// Phase 2: Spectacular but Subtle
// ==========================================

class BackgroundAnimations {
    constructor() {
        this.canvas = document.getElementById('bg-animation-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

        this.animationId = null;
        this.timeoutId = null; // Track setTimeout for proper cleanup
        this.currentAnimation = null;
        this.animations = {
            gameOfLife: this.gameOfLife.bind(this),
            fibonacci: this.fibonacciSpiral.bind(this),
            primes: this.primeSpiral.bind(this),
            riemann: this.riemannZeta.bind(this),
            mandelbrot: this.mandelbrotZoom.bind(this),
            proofTree: this.proofTree.bind(this),
            pacman: this.pacmanGame.bind(this), // CHANGED from voronoi
            rule30: this.rule30.bind(this), // NEW - Rule 30 cellular automaton
            none: null
        };

        // Always randomly select animation on page load
        const animationTypes = ['gameOfLife', 'fibonacci', 'primes', 'riemann', 'mandelbrot', 'proofTree', 'pacman', 'rule30'];
        // Use time-based seed for randomization
        const seed = new Date().getTime();
        const randomIndex = seed % animationTypes.length;
        this.currentType = animationTypes[randomIndex];

        // FORCE animations enabled by default
        // Always start enabled unless user explicitly disables
        const savedEnabled = localStorage.getItem('bg-animation-enabled');
        // Clear any 'false' value from localStorage
        if (savedEnabled === 'false') {
            localStorage.removeItem('bg-animation-enabled');
        }
        this.enabled = true; // Always enabled on page load

        if (this.canvas && this.ctx) {
            this.setupCanvas();
            this.setupToggleButton();
            this.setupKeyboardShortcut();

            if (this.enabled) {
                this.start(this.currentType);
            }
        } else {
            console.error('[animations.js] Failed to initialize: Canvas or context not found');
        }
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupToggleButton() {
        const button = document.getElementById('animation-toggle');
        if (!button) return;

        const symbols = ['∀', '∃', '→', '⊢', 'λ', '∅', '∧', '∨', '¬', '⊨'];
        let symbolIndex = 0;

        // Animation names for tooltips
        const animationNames = {
            gameOfLife: 'Conway\'s Game of Life',
            fibonacci: 'Fibonacci Spiral',
            primes: 'Prime Number Spiral',
            riemann: 'Riemann Zeta',
            mandelbrot: 'Mandelbrot Set',
            proofTree: 'Proof Tree',
            pacman: 'Pac-Man', // CHANGED from voronoi
            rule30: 'Rule 30 Automaton' // NEW - Wolfram's Rule 30
        };

        // Update tooltip helper
        const updateTooltip = () => {
            if (this.enabled) {
                const name = animationNames[this.currentType] || 'Animation';
                button.title = `${name} (Press A to toggle)`;
            } else {
                button.title = 'Toggle animation (Press A)';
            }
        };

        // Set initial tooltip
        updateTooltip();

        button.addEventListener('click', () => {
            this.enabled = !this.enabled;
            localStorage.setItem('bg-animation-enabled', this.enabled);

            if (this.enabled) {
                // Cycle through animations
                const types = Object.keys(this.animations).filter(t => t !== 'none');
                const currentIndex = types.indexOf(this.currentType);
                this.currentType = types[(currentIndex + 1) % types.length];
                localStorage.setItem('bg-animation-type', this.currentType);

                this.start(this.currentType);
                this.canvas.classList.remove('hidden');
                this.canvas.classList.add('active');

                // Change symbol
                symbolIndex = (symbolIndex + 1) % symbols.length;
                button.querySelector('.symbol').textContent = symbols[symbolIndex];
            } else {
                this.stop();
                this.canvas.classList.add('hidden');
                this.canvas.classList.remove('active');
            }

            // Update tooltip after toggle
            updateTooltip();

            console.log('[animations.js] Animation toggled:', this.enabled, this.currentType);
        });
    }

    setupKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Press 'A' to toggle animations
            if (e.key === 'a' || e.key === 'A') {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    const button = document.getElementById('animation-toggle');
                    if (button && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                        button.click();
                    }
                }
            }
        });
    }

    start(type) {
        this.stop();
        this.currentAnimation = this.animations[type];
        if (this.currentAnimation) {
            console.log('[animations.js] Starting animation:', type);

            // Ensure canvas is visible (remove hidden class if present)
            this.canvas.style.display = 'block';
            this.canvas.style.visibility = 'visible';
            this.canvas.classList.remove('hidden');
            // Let CSS handle opacity for subtlety

            // Start the actual animation
            this.currentAnimation();
        } else {
            console.error('[animations.js] No animation found for type:', type);
        }
    }

    stop() {
        // Reset current animation reference FIRST to signal animations to stop
        this.currentAnimation = null;

        // Cancel animation frame
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Cancel timeout (for Rule30 and similar animations)
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        // FULLY clear canvas - no fade, complete reset
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // ==========================================
    // ANIMATION 1: Conway's Game of Life
    // Clean, simple implementation
    // ==========================================
    gameOfLife() {
        const cellSize = 12;
        const cols = Math.floor(this.canvas.width / cellSize);
        const rows = Math.floor(this.canvas.height / cellSize);

        // Initialize grid - simple and straightforward
        let grid = Array(rows).fill().map(() =>
            Array(cols).fill().map(() => Math.random() < 0.15 ? 1 : 0)
        );

        const countNeighbors = (x, y) => {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const row = (y + i + rows) % rows;
                    const col = (x + j + cols) % cols;
                    count += grid[row][col];
                }
            }
            return count;
        };

        let frameCount = 0;

        const animate = () => {
            frameCount++;

            // Update every 8 frames
            if (frameCount % 8 === 0) {
                // Compute next generation
                const nextGrid = grid.map((row, y) =>
                    row.map((cell, x) => {
                        const neighbors = countNeighbors(x, y);
                        return cell === 1
                            ? (neighbors === 2 || neighbors === 3 ? 1 : 0)
                            : (neighbors === 3 ? 1 : 0);
                    })
                );
                grid = nextGrid;

                // Clear canvas
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // Draw cells
                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        if (grid[y][x] === 1) {
                            const gradient = this.ctx.createRadialGradient(
                                x * cellSize + cellSize / 2,
                                y * cellSize + cellSize / 2,
                                0,
                                x * cellSize + cellSize / 2,
                                y * cellSize + cellSize / 2,
                                cellSize / 2
                            );
                            gradient.addColorStop(0, 'rgba(139, 0, 0, 0.30)'); // Was 0.15 - increased for better visibility
                            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.16)');   // Was 0.08 - increased for better visibility
                            this.ctx.fillStyle = gradient;
                            this.ctx.beginPath();
                            this.ctx.arc(
                                x * cellSize + cellSize / 2,
                                y * cellSize + cellSize / 2,
                                cellSize / 3,
                                0,
                                Math.PI * 2
                            );
                            this.ctx.fill();
                        }
                    }
                }

                // Reseed to prevent extinction
                if (frameCount % 400 === 0) {
                    for (let i = 0; i < 5; i++) {
                        const x = Math.floor(Math.random() * cols);
                        const y = Math.floor(Math.random() * rows);
                        grid[y][x] = 1;
                    }
                }
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 2: Fibonacci Spiral
    // ==========================================
    fibonacciSpiral() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width, this.canvas.height) / 60; // Smaller scale = tighter spiral

        let angle = 0;
        let progress = 0;
        const maxProgress = 15; // Draw up to F(15)

        const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

        const animate = () => {
            // Clear with fade effect
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw spiral with red accent
            this.ctx.strokeStyle = '#8B0000'; // Dark red
            this.ctx.lineWidth = 2; // Thicker line
            this.ctx.shadowBlur = 3;
            this.ctx.shadowColor = 'rgba(139, 0, 0, 0.5)';
            this.ctx.beginPath();

            for (let i = 0; i <= progress * 70; i++) { // More iterations
                const theta = i * 0.08; // Smaller angle increment = tighter spiral
                const r = scale * Math.pow(phi, theta / (Math.PI / 2));
                const x = centerX + r * Math.cos(theta + angle);
                const y = centerY + r * Math.sin(theta + angle);

                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.stroke();
            this.ctx.shadowBlur = 0; // Clear shadow

            // Slowly grow and rotate
            progress += 0.01;
            angle += 0.001;

            if (progress > maxProgress) {
                progress = 0;
                angle = 0;
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 3: Prime Number Spiral (Ulam)
    // ==========================================
    primeSpiral() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const spacing = 8;

        // Sieve of Eratosthenes for prime checking
        const maxN = 2000;
        const isPrime = Array(maxN).fill(true);
        isPrime[0] = isPrime[1] = false;

        for (let i = 2; i * i < maxN; i++) {
            if (isPrime[i]) {
                for (let j = i * i; j < maxN; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        let currentN = 1;
        let x = 0, y = 0;
        let dx = 0, dy = -1;
        let segmentLength = 1;
        let segmentPassed = 0;
        let directionChanges = 0;

        const animate = () => {
            // Clear with fade
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw next batch of numbers
            for (let i = 0; i < 5; i++) {
                if (currentN < maxN) {
                    if (isPrime[currentN]) {
                        // Red dots with glow for primes
                        const gradient = this.ctx.createRadialGradient(
                            centerX + x * spacing,
                            centerY + y * spacing,
                            0,
                            centerX + x * spacing,
                            centerY + y * spacing,
                            4
                        );
                        gradient.addColorStop(0, '#8B0000');
                        gradient.addColorStop(0.5, '#CD5C5C');
                        gradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
                        this.ctx.fillStyle = gradient;

                        this.ctx.beginPath();
                        this.ctx.arc(
                            centerX + x * spacing,
                            centerY + y * spacing,
                            3.5, // Larger radius
                            0,
                            Math.PI * 2
                        );
                        this.ctx.fill();
                    }

                    // Spiral movement
                    x += dx;
                    y += dy;
                    segmentPassed++;

                    if (segmentPassed === segmentLength) {
                        segmentPassed = 0;
                        const temp = dx;
                        dx = -dy;
                        dy = temp;
                        directionChanges++;

                        if (directionChanges % 2 === 0) {
                            segmentLength++;
                        }
                    }

                    currentN++;
                }
            }

            // Reset after full spiral
            if (currentN >= maxN) {
                setTimeout(() => {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    currentN = 1;
                    x = y = 0;
                    dx = 0; dy = -1;
                    segmentLength = 1;
                    segmentPassed = 0;
                    directionChanges = 0;
                }, 2000);
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 4: Riemann Zeta Polar Plot
    // Single evolving curve using Dirichlet eta series
    // ==========================================
    riemannZeta() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const pxPerUnit = Math.min(this.canvas.width, this.canvas.height) / 8; // Scale

        const T_ZERO = 14.134725; // First non-trivial zero
        let t = T_ZERO + 0.001; // Start just above first zero
        const tMax = 50; // Upper limit for t
        const sigma = 0.5; // Critical line Re(s) = 1/2
        const N = 500; // Number of series terms

        let path = []; // Store traced path points

        // Complex number helpers
        const cadd = (a, b) => ({re: a.re + b.re, im: a.im + b.im});
        const cmul = (a, b) => ({
            re: a.re * b.re - a.im * b.im,
            im: a.re * b.im + a.im * b.re
        });
        const cdiv = (a, b) => {
            const d = b.re * b.re + b.im * b.im;
            return {
                re: (a.re * b.re + a.im * b.im) / d,
                im: (a.im * b.re - a.re * b.im) / d
            };
        };
        const cabs = (a) => Math.hypot(a.re, a.im);
        const carg = (a) => Math.atan2(a.im, a.re);

        // Compute Dirichlet eta: η(s) = Σ(-1)^(n-1) n^(-s)
        const etaOf = (sigma, t, N) => {
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
        };

        // Compute zeta: ζ(s) = η(s) / (1 - 2^(1-s))
        const zetaOf = (sigma, t, N) => {
            const eta = etaOf(sigma, t, N);
            // denom = 1 - 2^(1-σ) * e^(-it ln 2)
            const A = Math.pow(2, 1 - sigma);
            const th2 = t * Math.log(2);
            const denom = {
                re: 1 - A * Math.cos(th2),
                im: A * Math.sin(th2)
            };
            return cdiv(eta, denom);
        };

        // Convert polar to canvas coordinates
        const polarToXY = (r, th) => ({
            x: centerX + pxPerUnit * r * Math.cos(th),
            y: centerY - pxPerUnit * r * Math.sin(th) // Flip Y for canvas
        });

        const animate = () => {
            // Subtle fade instead of full clear
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
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
            if (t < tMax) {
                const z = zetaOf(sigma, t, N);
                const r = cabs(z);
                const th = carg(z);
                const pt = polarToXY(r, th);

                path.push({x: pt.x, y: pt.y, r, t});

                // Mark zeros (where r ≈ 0)
                if (r < 0.08) {
                    // Large red dot at zero
                    this.ctx.fillStyle = 'rgba(139, 0, 0, 0.9)';
                    this.ctx.beginPath();
                    this.ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
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

                t += 0.12; // Speed of animation
            }

            // Limit path length to prevent memory issues
            if (path.length > 2000) path.shift();

            // Draw the traced path (RED)
            if (path.length > 1) {
                this.ctx.strokeStyle = 'rgba(139, 0, 0, 0.6)';
                this.ctx.lineWidth = 2.5;
                this.ctx.beginPath();
                this.ctx.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    this.ctx.lineTo(path[i].x, path[i].y);
                }
                this.ctx.stroke();

                // Current point marker
                const curr = path[path.length - 1];
                this.ctx.fillStyle = 'rgba(139, 0, 0, 0.8)';
                this.ctx.beginPath();
                this.ctx.arc(curr.x, curr.y, 3.5, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Loop indefinitely - reset immediately when reaching tMax
            if (t >= tMax) {
                t = T_ZERO + 0.001;
                path = [];
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 5: Mandelbrot Set Zoom
    // Only the inner set boundary visible
    // ==========================================
    mandelbrotZoom() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        let zoom = 1;
        let centerRe = -0.7;
        let centerIm = 0;
        const maxIterations = 200; // High precision for boundary detection
        const zoomSpeed = 0.018; // Was 0.006 - increased 3x for faster, more noticeable zoom

        const mandelbrot = (cRe, cIm) => {
            let zRe = 0, zIm = 0;
            let iteration = 0;

            while (zRe * zRe + zIm * zIm <= 4 && iteration < maxIterations) {
                const temp = zRe * zRe - zIm * zIm + cRe;
                zIm = 2 * zRe * zIm + cIm;
                zRe = temp;
                iteration++;
            }

            return iteration;
        };

        // Detect if a point is on the INNER boundary (edge of the Mandelbrot set)
        const isInnerBoundary = (x, y) => {
            const cRe = centerRe + (x - centerX) / (zoom * 200);
            const cIm = centerIm + (y - centerY) / (zoom * 200);

            const centerIter = mandelbrot(cRe, cIm);

            // If this point is IN the set, check if neighbors are OUT
            if (centerIter === maxIterations) {
                // Check 4 neighbors (up, down, left, right)
                const neighbors = [
                    [x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]
                ];

                for (const [nx, ny] of neighbors) {
                    const nRe = centerRe + (nx - centerX) / (zoom * 200);
                    const nIm = centerIm + (ny - centerY) / (zoom * 200);
                    const nIter = mandelbrot(nRe, nIm);

                    // If any neighbor is NOT in the set, we're on the boundary
                    if (nIter < maxIterations) {
                        return true;
                    }
                }
            }

            return false;
        };

        let frameCount = 0;

        const animate = () => {
            frameCount++;

            // Clear to pure white
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Enable high-quality rendering
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';

            // Detect and draw only inner boundary
            const step = 1; // Pixel-perfect for smooth curves

            // Collect boundary pixels
            const boundaryPixels = [];

            for (let x = 0; x < this.canvas.width; x += step) {
                for (let y = 0; y < this.canvas.height; y += step) {
                    if (isInnerBoundary(x, y)) {
                        boundaryPixels.push({ x, y });
                    }
                }
            }

            // Draw boundary pixels with subtle red
            boundaryPixels.forEach(({ x, y }) => {
                // Subtle red for the inner boundary
                this.ctx.fillStyle = 'rgba(139, 0, 0, 0.50)'; // Was 0.35 - increased for better visibility
                this.ctx.fillRect(x - 0.5, y - 0.5, step + 1, step + 1);
            });

            // Apply light blur for smooth curves
            this.ctx.filter = 'blur(0.8px)';
            this.ctx.drawImage(this.canvas, 0, 0);
            this.ctx.filter = 'none';

            // Zoom
            zoom *= (1 + zoomSpeed);

            // Reset
            if (zoom > 120) {
                zoom = 1;
                const regions = [
                    { re: -0.7, im: 0 },
                    { re: -0.5, im: 0.5 },
                    { re: 0.285, im: 0.01 },
                    { re: -0.8, im: 0.156 },
                    { re: -0.4, im: 0.6 },
                    { re: -0.7269, im: 0.1889 }
                ];
                const region = regions[Math.floor(Math.random() * regions.length)];
                centerRe = region.re;
                centerIm = region.im;
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 6: Logic Proof Tree
    // Growing inference tree with logical symbols
    // ==========================================
    proofTree() {
        const centerX = this.canvas.width / 2;
        const startY = 100;

        // Logical symbols and rules
        const symbols = ['⊢', '→', '∧', '∨', '¬', '∀', '∃', 'P', 'Q', 'R'];
        const rules = ['MP', 'MT', '∧I', '∧E', '→I', '∀I', '∃E'];

        // Tree structure
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

        let tree = null;
        let allNodes = [];
        let time = 0;

        const generateTree = (x, y, depth, maxDepth) => {
            if (depth > maxDepth) return null;

            const formula = symbols[Math.floor(Math.random() * symbols.length)];
            const rule = rules[Math.floor(Math.random() * rules.length)];
            const node = new ProofNode(x, y, formula, rule, depth);

            allNodes.push(node);

            // Binary branching with probability
            const numChildren = depth < maxDepth ? (Math.random() < 0.7 ? 2 : Math.random() < 0.5 ? 1 : 0) : 0;
            const spacing = 120 / (depth + 1);

            if (numChildren >= 1) {
                node.children.push(generateTree(x - spacing, y + 80, depth + 1, maxDepth));
            }
            if (numChildren === 2) {
                node.children.push(generateTree(x + spacing, y + 80, depth + 1, maxDepth));
            }

            return node;
        };

        const drawNode = (node) => {
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
            this.ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
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
            node.children.forEach(child => drawNode(child));
        };

        const animate = () => {
            // Clear with fade
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Generate new tree periodically - FASTER
            if (!tree || time % 300 === 0) { // CHANGED from 600 - regenerates 2x faster
                allNodes = [];
                tree = generateTree(centerX, startY, 0, 3);
                time = 0;
            }

            // Gradually fade in nodes based on depth and time - FASTER
            allNodes.forEach((node, index) => {
                const appearTime = node.depth * 30 + index * 3; // CHANGED from depth * 60 + index * 5
                if (time > appearTime && node.opacity < 1) {
                    node.opacity = Math.min(1, node.opacity + 0.05); // CHANGED from 0.02 - fades in 2.5x faster
                }
            });

            // Draw tree
            if (tree) {
                drawNode(tree);
            }

            time++;
            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 7: Pac-Man Arcade Game
    // Nostalgic arcade game with Pac-Man, ghosts, and pellets
    // ==========================================
    pacmanGame() {
        // Game entities
        class PacMan {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 35; // CHANGED from 20 - bigger Pac-Man
                this.speed = 2.5; // CHANGED from 1.5 - faster movement
                this.direction = 0; // 0=right, 1=down, 2=left, 3=up
                this.mouthAngle = 0;
                this.mouthOpening = true;
                this.changeDirectionCounter = 0;
            }

            update(width, height) {
                // Animate mouth MORE DRAMATICALLY
                if (this.mouthOpening) {
                    this.mouthAngle += 0.08; // CHANGED from 0.05
                    if (this.mouthAngle > 0.6) this.mouthOpening = false; // CHANGED from 0.4
                } else {
                    this.mouthAngle -= 0.08; // CHANGED from 0.05
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
                this.size = 30; // CHANGED from 18 - bigger ghosts
                this.speed = 1.5; // CHANGED from 0.8 - faster movement
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

                // Wavy bottom - MORE DRAMATIC
                ctx.lineTo(this.x + this.size, this.y);
                for (let i = 0; i <= 4; i++) {
                    const waveX = this.x + this.size - (i * this.size / 2);
                    const waveY = this.y + Math.sin(this.waveOffset + i) * 5; // CHANGED from * 3
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

        // Initialize game entities
        const pacman = new PacMan(this.canvas.width / 2, this.canvas.height / 2);

        const ghosts = [
            new Ghost(this.canvas.width * 0.3, this.canvas.height * 0.3, 'rgba(139, 0, 0, 0.7)'),
            new Ghost(this.canvas.width * 0.7, this.canvas.height * 0.3, 'rgba(165, 42, 42, 0.7)'),
            new Ghost(this.canvas.width * 0.3, this.canvas.height * 0.7, 'rgba(178, 34, 34, 0.7)'),
            new Ghost(this.canvas.width * 0.7, this.canvas.height * 0.7, 'rgba(205, 92, 92, 0.7)')
        ];

        let frameCount = 0;

        const animate = () => {
            frameCount++;

            // Clear canvas with fade effect
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Occasionally draw subtle maze-like lines
            if (frameCount % 120 === 0) {
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
            ghosts.forEach(ghost => {
                ghost.update(this.canvas.width, this.canvas.height);
                ghost.draw(this.ctx);
            });

            // Update and draw Pac-Man
            pacman.update(this.canvas.width, this.canvas.height);
            pacman.draw(this.ctx);

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // ANIMATION 8: Rule 30 Cellular Automaton
    // Classic Wolfram style with red-to-gray fade
    // ==========================================
    rule30() {
        const cellSize = 8; // Classic square size
        const cols = Math.floor(this.canvas.width / cellSize);
        const rows = Math.floor(this.canvas.height / cellSize);

        // Rule 30: [111, 110, 101, 100, 011, 010, 001, 000] -> [0, 0, 0, 1, 1, 1, 1, 0]
        const rule30 = [0, 1, 1, 1, 1, 0, 0, 0];

        // Current generation
        let cells = new Array(cols).fill(0);
        cells[Math.floor(cols / 2)] = 1; // Single cell in center

        let currentRow = 0;
        let generation = 0;

        // Track when each cell was born (generation number)
        let cellBirthGen = Array(rows).fill(null).map(() => Array(cols).fill(-1));

        const applyRule = (left, center, right) => {
            const index = (left << 2) | (center << 1) | right;
            return rule30[index];
        };

        const drawCell = (x, y, birthGen) => {
            // Bounds checking
            if (y < 0 || y >= rows || x < 0 || x >= cols) {
                return;
            }

            const px = x * cellSize;
            const py = y * cellSize;

            // Calculate age: how many generations have passed since this cell was born
            const age = generation - birthGen;

            // Color fade from RED (new) to GRAY (old)
            // Latest 5 generations: Bright red
            // Next 10 generations: Fade red to dark gray
            // After 15 generations: Medium gray (subtle)

            let red, green, blue, alpha;

            if (age < 5) {
                // NEWEST: Bright red (classic Wolfram red)
                red = 200;
                green = 0;
                blue = 0;
                alpha = 0.85; // Strong but not overwhelming
            } else if (age < 15) {
                // FADING: Red to dark red to gray
                const fadeProgress = (age - 5) / 10; // 0 to 1
                red = 200 - fadeProgress * 120; // 200 -> 80
                green = fadeProgress * 60; // 0 -> 60
                blue = fadeProgress * 60; // 0 -> 60
                alpha = 0.85 - fadeProgress * 0.45; // 0.85 -> 0.4
            } else if (age < 30) {
                // GRAY: Darker gray fading to lighter
                const fadeProgress = (age - 15) / 15; // 0 to 1
                const grayValue = 80 + fadeProgress * 60; // 80 -> 140
                red = grayValue;
                green = grayValue;
                blue = grayValue;
                alpha = 0.4 - fadeProgress * 0.2; // 0.4 -> 0.2
            } else {
                // OLD: Very light gray (almost invisible)
                red = 160;
                green = 160;
                blue = 160;
                alpha = 0.15; // Very subtle
            }

            // Draw classic Wolfram-style SQUARE (no glow, no gradients)
            this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            this.ctx.fillRect(px, py, cellSize, cellSize);

            // Optional: Add very subtle border for definition (classic look)
            // Only on newer cells
            if (age < 10) {
                this.ctx.strokeStyle = `rgba(${red * 0.7}, ${green * 0.7}, ${blue * 0.7}, ${alpha * 0.5})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.strokeRect(px, py, cellSize, cellSize);
            }
        };

        const drawAllCells = () => {
            // Draw ALL cells that have been generated so far
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (cellBirthGen[row][col] >= 0) {
                        drawCell(col, row, cellBirthGen[row][col]);
                    }
                }
            }
        };

        const computeNextGeneration = () => {
            const newCells = new Array(cols).fill(0);

            for (let i = 0; i < cols; i++) {
                const left = cells[(i - 1 + cols) % cols];
                const center = cells[i];
                const right = cells[(i + 1) % cols];
                newCells[i] = applyRule(left, center, right);
            }

            cells = newCells;
        };

        const animate = () => {
            // GUARD: Stop if animation was cancelled
            if (!this.currentAnimation) {
                return;
            }

            // LESS INVASIVE: Gentle fade instead of harsh clear
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; // Subtle fade
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Only draw and compute if we're within bounds
            if (currentRow < rows) {
                const y = currentRow;

                // Mark current generation's live cells
                for (let x = 0; x < cols; x++) {
                    if (cells[x] === 1) {
                        cellBirthGen[y][x] = generation;
                    }
                }

                // Redraw ALL cells with updated ages
                drawAllCells();

                // Compute next generation
                computeNextGeneration();
                currentRow++;
                generation++;
            }

            // When animation reaches the bottom, RESTART FROM BEGINNING
            if (currentRow >= rows) {
                this.timeoutId = setTimeout(() => {
                    // COMPLETE RESTART: Clear everything and start fresh
                    this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                    // Reset to initial state
                    cells = new Array(cols).fill(0);
                    cells[Math.floor(cols / 2)] = 1;
                    currentRow = 0;
                    generation = 0;
                    cellBirthGen = Array(rows).fill(null).map(() => Array(cols).fill(-1));

                    // Resume animation
                    animate();
                }, 1500); // Longer pause before restart

                return; // Stop this animation loop
            }

            // SLOWER: 100ms between generations
            this.timeoutId = setTimeout(() => {
                this.animationId = requestAnimationFrame(animate);
            }, 100);
        };

        // Initial clear
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        animate();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.backgroundAnimations = new BackgroundAnimations();
});

console.log('[animations.js] loaded - Phase 2 spectacular animations ready');
