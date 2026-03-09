// ==========================================
// ACHILLES AND THE TORTOISE
// Zeno's paradox as shrinking catch-up intervals
// ==========================================
import { AnimationBase } from './AnimationBase.js';

export class AchillesAndTortoise extends AnimationBase {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    this.config = {
      trackOpacity: 0.22,
      startOffset: 0.12,
      headStart: 0.22,
      speedRatio: 0.42,
      stageCount: 7,
      stageDuration: 950,
      pauseDuration: 140,
      resolutionDuration: 1100,
      resetPause: 700,
      trackPadding: 84
    };

    this.segments = this.buildSegments();
    this.phase = 'segment';
    this.segmentIndex = 0;
    this.phaseElapsed = 0;
    this.lastTimestamp = null;
  }

  static getMetadata() {
    return {
      name: 'Achilles and the Tortoise',
      key: 'achillesAndTortoise',
      description: "Zeno's paradox shown as shrinking catch-up intervals"
    };
  }

  buildSegments() {
    const segments = [];
    let achillesStart = this.config.startOffset;
    let tortoiseStart = this.config.startOffset + this.config.headStart;

    for (let index = 0; index < this.config.stageCount; index++) {
      const catchUpPoint = tortoiseStart;
      const achillesDistance = catchUpPoint - achillesStart;
      const tortoiseEnd = tortoiseStart + achillesDistance * this.config.speedRatio;

      segments.push({
        achillesStart,
        catchUpPoint,
        tortoiseStart,
        tortoiseEnd,
        achillesDistance,
        tortoiseDistance: tortoiseEnd - tortoiseStart
      });

      achillesStart = catchUpPoint;
      tortoiseStart = tortoiseEnd;
    }

    this.limitPosition = this.config.startOffset + this.config.headStart / (1 - this.config.speedRatio);
    this.finalAchillesPosition = Math.min(0.94, this.limitPosition + this.config.headStart * 0.055);
    this.finalTortoisePosition = Math.min(0.92, this.limitPosition + this.config.headStart * 0.02);
    this.resolutionStart = {
      achilles: achillesStart,
      tortoise: tortoiseStart
    };

    return segments;
  }

  resetCycle() {
    this.phase = 'segment';
    this.segmentIndex = 0;
    this.phaseElapsed = 0;
    this.lastTimestamp = null;
  }

  getCurrentPhaseDuration() {
    switch (this.phase) {
      case 'segment':
        return Math.max(480, this.config.stageDuration * Math.pow(0.9, this.segmentIndex));
      case 'pause':
        return this.config.pauseDuration;
      case 'resolution':
        return this.config.resolutionDuration;
      case 'resetPause':
        return this.config.resetPause;
      default:
        return this.config.stageDuration;
    }
  }

  advancePhase() {
    if (this.phase === 'segment') {
      this.phase = 'pause';
      return;
    }

    if (this.phase === 'pause') {
      if (this.segmentIndex < this.segments.length - 1) {
        this.segmentIndex += 1;
        this.phase = 'segment';
      } else {
        this.phase = 'resolution';
      }
      return;
    }

    if (this.phase === 'resolution') {
      this.phase = 'resetPause';
      return;
    }

    this.resetCycle();
  }

  updateState(currentTime) {
    if (this.lastTimestamp === null) {
      this.lastTimestamp = currentTime;
      return;
    }

    let remaining = Math.min(120, currentTime - this.lastTimestamp);
    this.lastTimestamp = currentTime;

    while (remaining > 0) {
      const phaseDuration = this.getCurrentPhaseDuration();
      const available = phaseDuration - this.phaseElapsed;
      const slice = Math.min(remaining, available);

      this.phaseElapsed += slice;
      remaining -= slice;

      if (this.phaseElapsed >= phaseDuration) {
        this.phaseElapsed = 0;
        this.advancePhase();
      }
    }
  }

  easeInOut(progress) {
    if (progress <= 0) {
      return 0;
    }

    if (progress >= 1) {
      return 1;
    }

    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  lerp(start, end, progress) {
    return start + (end - start) * progress;
  }

  getCompletedSegmentCount() {
    if (this.phase === 'segment') {
      return this.segmentIndex;
    }

    if (this.phase === 'pause') {
      return this.segmentIndex + 1;
    }

    return this.segments.length;
  }

  getCurrentPositions() {
    if (this.phase === 'segment') {
      const segment = this.segments[this.segmentIndex];
      const progress = this.easeInOut(this.phaseElapsed / this.getCurrentPhaseDuration());

      return {
        achilles: this.lerp(segment.achillesStart, segment.catchUpPoint, progress),
        tortoise: this.lerp(segment.tortoiseStart, segment.tortoiseEnd, progress),
        currentSegment: segment
      };
    }

    if (this.phase === 'pause') {
      const segment = this.segments[this.segmentIndex];

      return {
        achilles: segment.catchUpPoint,
        tortoise: segment.tortoiseEnd,
        currentSegment: null
      };
    }

    if (this.phase === 'resolution') {
      const progress = this.easeInOut(this.phaseElapsed / this.getCurrentPhaseDuration());

      return {
        achilles: this.lerp(this.resolutionStart.achilles, this.finalAchillesPosition, progress),
        tortoise: this.lerp(this.resolutionStart.tortoise, this.finalTortoisePosition, progress),
        currentSegment: null
      };
    }

    return {
      achilles: this.finalAchillesPosition,
      tortoise: this.finalTortoisePosition,
      currentSegment: null
    };
  }

  drawGuideSegment(trackStartX, trackWidth, trackY, start, end, color, alpha, offsetY, width) {
    const x1 = trackStartX + start * trackWidth;
    const x2 = trackStartX + end * trackWidth;

    this.ctx.strokeStyle = `rgba(${color}, ${alpha})`;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(x1, trackY + offsetY);
    this.ctx.lineTo(x2, trackY + offsetY);
    this.ctx.stroke();
  }

  drawRunner(x, y, radius, fillColor, label, labelOffsetY) {
    this.ctx.fillStyle = fillColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = fillColor;
    this.ctx.font = 'bold 12px "Fira Code", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(label, x, y + labelOffsetY);
  }

  animate(currentTime) {
    if (!this.isRunning) {
      return;
    }

    this.updateState(currentTime);

    const width = this.canvas.width;
    const height = this.canvas.height;
    const trackY = height * 0.58;
    const trackPadding = Math.max(48, Math.min(this.config.trackPadding, width * 0.08));
    const trackStartX = trackPadding;
    const trackWidth = width - trackPadding * 2;
    const positions = this.getCurrentPositions();
    const completedSegments = this.getCompletedSegmentCount();
    const achillesX = trackStartX + positions.achilles * trackWidth;
    const tortoiseX = trackStartX + positions.tortoise * trackWidth;
    const limitX = trackStartX + this.limitPosition * trackWidth;

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.strokeStyle = `rgba(101, 82, 73, ${this.config.trackOpacity})`;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(trackStartX, trackY);
    this.ctx.lineTo(trackStartX + trackWidth, trackY);
    this.ctx.stroke();

    this.ctx.setLineDash([6, 8]);
    this.ctx.strokeStyle = 'rgba(132, 92, 73, 0.34)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(limitX, trackY - 54);
    this.ctx.lineTo(limitX, trackY + 54);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.ctx.fillStyle = 'rgba(132, 92, 73, 0.5)';
    this.ctx.font = '11px "Fira Code", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('limit', limitX, trackY - 66);

    for (let index = 0; index < this.segments.length; index++) {
      const segment = this.segments[index];
      const isCompleted = index < completedSegments;
      const isCurrent = this.phase === 'segment' && index === this.segmentIndex;
      const opacity = isCompleted ? 0.3 : (isCurrent ? 0.52 : 0.1);

      this.drawGuideSegment(
        trackStartX,
        trackWidth,
        trackY,
        segment.achillesStart,
        segment.catchUpPoint,
        '132, 92, 73',
        opacity,
        -18,
        isCurrent ? 4 : 2.5
      );

      this.drawGuideSegment(
        trackStartX,
        trackWidth,
        trackY,
        segment.tortoiseStart,
        segment.tortoiseEnd,
        '88, 123, 103',
        isCompleted ? 0.28 : (isCurrent ? 0.46 : 0.08),
        18,
        isCurrent ? 3.2 : 2
      );

      if ((isCompleted || isCurrent) && index < 4) {
        const labelX = trackStartX + (segment.achillesStart + segment.catchUpPoint) * trackWidth / 2;
        this.ctx.fillStyle = `rgba(132, 92, 73, ${Math.max(0.22, opacity + 0.06)})`;
        this.ctx.font = '10px "Fira Code", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${index + 1}`, labelX, trackY - 32);
      }
    }

    if (this.segments.length > 4) {
      this.ctx.fillStyle = 'rgba(132, 92, 73, 0.3)';
      this.ctx.font = '12px "Fira Code", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('...', limitX - 22, trackY - 24);
    }

    this.drawRunner(
      achillesX,
      trackY,
      8,
      'rgba(132, 92, 73, 0.82)',
      'A',
      -20
    );

    this.drawRunner(
      tortoiseX,
      trackY,
      7,
      'rgba(88, 123, 103, 0.78)',
      'T',
      20
    );

  }
}
