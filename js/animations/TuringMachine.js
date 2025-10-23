import { AnimationBase } from './AnimationBase.js';

/**
 * Turing Machine Animation
 *
 * Visualizes an infinitely looping Turing machine performing unary addition.
 * The machine adds two unary numbers (represented as sequences of |) and loops forever.
 *
 * Machine operation:
 * - Input: |||_||| (two unary numbers separated by blank)
 * - Output: |||||| (their sum)
 * - Then resets and repeats
 */
export class TuringMachine extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    // Tape configuration
    this.tape = [];
    this.headPosition = 0;
    this.state = 'q0'; // Current state

    // Visual configuration
    this.cellWidth = 40;
    this.cellHeight = 50;
    this.headColor = '#8B0000'; // Dark red
    this.symbolColor = '#1a1a1a';
    this.tapeY = 0; // Will be set in initialize
    this.scrollOffset = 0; // For smooth scrolling

    // State colors
    this.stateColors = {
      'q0': '#2980B9',  // Blue - scanning right
      'q1': '#27AE60',  // Green - found separator
      'q2': '#E67E22',  // Orange - moving right
      'q3': '#9B59B6',  // Purple - converting
      'q4': '#C0392B',  // Red - cleanup
      'q5': '#16A085',  // Teal - resetting
      'HALT': '#95A5A6'  // Gray - done (temporary before reset)
    };

    // Animation timing
    this.transitionSpeed = 300; // ms per step
    this.lastStepTime = 0;
    this.stepProgress = 0;

    // Define the Turing machine transitions
    // Format: transitions[state][symbol] = [newState, writeSymbol, direction]
    // Direction: 'L' = left, 'R' = right, 'N' = no move
    this.transitions = {
      // State q0: Move right to find the separator '_'
      'q0': {
        '|': ['q0', '|', 'R'],
        '_': ['q1', '_', 'R'],
        ' ': ['q5', ' ', 'L'] // If we hit blank, reset
      },
      // State q1: Found separator, move right through second number
      'q1': {
        '|': ['q1', '|', 'R'],
        ' ': ['q2', '|', 'L'] // Found end, write | and go back
      },
      // State q2: Move left to find separator
      'q2': {
        '|': ['q2', '|', 'L'],
        '_': ['q3', '|', 'R'] // Convert separator to | and move right
      },
      // State q3: Skip to end
      'q3': {
        '|': ['q3', '|', 'R'],
        ' ': ['q4', ' ', 'L'] // Found end, start cleanup
      },
      // State q4: Move to start for next iteration
      'q4': {
        '|': ['q4', '|', 'L'],
        ' ': ['q5', ' ', 'R'] // Found start, prepare to reset
      },
      // State q5: Reset - prepare new input
      'q5': {
        '|': ['q5', ' ', 'R'], // Clear the tape
        ' ': ['RESET', ' ', 'R']
      }
    };

    this.resetTape();
  }

  /**
   * Reset the tape with new unary addition problem
   */
  resetTape() {
    // Generate two random unary numbers (2-7 marks each)
    const num1 = 2 + Math.floor(Math.random() * 6);
    const num2 = 2 + Math.floor(Math.random() * 6);

    // Create tape: spaces + first number + separator + second number + spaces
    this.tape = Array(10).fill(' '); // Leading spaces
    for (let i = 0; i < num1; i++) this.tape.push('|');
    this.tape.push('_'); // Separator
    for (let i = 0; i < num2; i++) this.tape.push('|');
    this.tape.push(...Array(20).fill(' ')); // Trailing spaces

    this.headPosition = 10; // Start at first |
    this.state = 'q0';
    this.scrollOffset = 0;
  }

  /**
   * Execute one step of the Turing machine
   */
  executeStep() {
    // Extend tape if needed
    if (this.headPosition < 5) {
      this.tape = Array(10).fill(' ').concat(this.tape);
      this.headPosition += 10;
    }
    if (this.headPosition >= this.tape.length - 5) {
      this.tape = this.tape.concat(Array(10).fill(' '));
    }

    // Handle reset
    if (this.state === 'RESET') {
      this.resetTape();
      return;
    }

    // Get current symbol
    const currentSymbol = this.tape[this.headPosition];

    // Get transition
    const transition = this.transitions[this.state]?.[currentSymbol];

    if (!transition) {
      // No transition defined - reset
      this.state = 'RESET';
      return;
    }

    const [newState, writeSymbol, direction] = transition;

    // Execute transition
    this.tape[this.headPosition] = writeSymbol;
    this.state = newState;

    // Move head
    if (direction === 'L') this.headPosition--;
    else if (direction === 'R') this.headPosition++;

    // Update scroll offset to follow head
    const targetScroll = this.headPosition * this.cellWidth;
    this.scrollOffset += (targetScroll - this.scrollOffset) * 0.1;
  }

  animate(currentTime) {
    const ctx = this.ctx;
    const { width, height } = this.canvas;

    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Calculate timing
    if (!this.lastStepTime) this.lastStepTime = currentTime;
    const elapsed = currentTime - this.lastStepTime;
    this.stepProgress = Math.min(elapsed / this.transitionSpeed, 1);

    // Execute step when ready
    if (elapsed >= this.transitionSpeed) {
      this.executeStep();
      this.lastStepTime = currentTime;
      this.stepProgress = 0;
    }

    // Calculate tape position
    this.tapeY = height / 2;
    const centerX = width / 2;

    // Draw tape cells
    const visibleStart = Math.max(0, Math.floor((this.scrollOffset - centerX) / this.cellWidth) - 2);
    const visibleEnd = Math.min(this.tape.length, Math.ceil((this.scrollOffset + centerX) / this.cellWidth) + 2);

    for (let i = visibleStart; i < visibleEnd; i++) {
      const x = centerX + (i * this.cellWidth) - this.scrollOffset;
      const isHead = i === this.headPosition;

      // Draw cell background
      ctx.fillStyle = isHead ? 'rgba(139, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(x - this.cellWidth/2, this.tapeY - this.cellHeight/2, this.cellWidth, this.cellHeight);

      // Draw cell border
      ctx.strokeStyle = isHead ? this.headColor : 'rgba(139, 0, 0, 0.2)';
      ctx.lineWidth = isHead ? 2 : 1;
      ctx.strokeRect(x - this.cellWidth/2, this.tapeY - this.cellHeight/2, this.cellWidth, this.cellHeight);

      // Draw symbol
      const symbol = this.tape[i];
      if (symbol !== ' ') {
        ctx.fillStyle = this.symbolColor;
        ctx.font = symbol === '_' ? '20px "Fira Code", monospace' : '24px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.6;
        ctx.fillText(symbol, x, this.tapeY);
        ctx.globalAlpha = 1;
      }
    }

    // Draw read/write head indicator
    const headX = centerX + (this.headPosition * this.cellWidth) - this.scrollOffset;
    ctx.fillStyle = this.headColor;
    ctx.globalAlpha = 0.7;

    // Triangle pointing down
    ctx.beginPath();
    ctx.moveTo(headX, this.tapeY - this.cellHeight/2 - 15);
    ctx.lineTo(headX - 8, this.tapeY - this.cellHeight/2 - 5);
    ctx.lineTo(headX + 8, this.tapeY - this.cellHeight/2 - 5);
    ctx.closePath();
    ctx.fill();

    // Triangle pointing up
    ctx.beginPath();
    ctx.moveTo(headX, this.tapeY + this.cellHeight/2 + 15);
    ctx.lineTo(headX - 8, this.tapeY + this.cellHeight/2 + 5);
    ctx.lineTo(headX + 8, this.tapeY + this.cellHeight/2 + 5);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1;

    // Draw state indicator
    const stateY = this.tapeY - this.cellHeight/2 - 40;
    const stateColor = this.stateColors[this.state] || '#95A5A6';

    ctx.fillStyle = stateColor;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(headX - 40, stateY - 15, 80, 30);
    ctx.globalAlpha = 1;

    ctx.strokeStyle = stateColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(headX - 40, stateY - 15, 80, 30);

    ctx.fillStyle = stateColor;
    ctx.font = 'bold 14px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.state, headX, stateY);

    // Draw operation label
    ctx.fillStyle = 'rgba(26, 26, 26, 0.5)';
    ctx.font = '12px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Unary Addition on Infinite Tape', centerX, 30);

    // Draw step counter
    ctx.textAlign = 'right';
    ctx.fillText(`Tape: [${visibleStart}..${visibleEnd}]`, width - 20, 30);

    // Continue animation loop
    if (this.isRunning) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  cleanup() {
    this.tape = [];
    super.cleanup();
  }
}
