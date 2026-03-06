import { useEffect, useState } from 'react';
import type { CycleInfo } from '@/types';
import { phaseLabels, phaseColors, phaseColorsSoft, getPhaseEmoji, getPhaseRanges } from '@/lib/cycle';

interface CycleRingProps {
  cycleInfo: CycleInfo;
}

const SIZE = 200;
const INACTIVE_STROKE = 12;
const ACTIVE_STROKE = 16;
const GAP_DEGREES = 3;

export function CycleRing({ cycleInfo }: CycleRingProps) {
  const { phase, currentDay, totalDays } = cycleInfo;
  const [drawn, setDrawn] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t1 = requestAnimationFrame(() => setDrawn(true));
    const t2 = setTimeout(() => setShowCursor(true), 850);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
    };
  }, []);

  const ranges = getPhaseRanges(totalDays);
  const center = SIZE / 2;
  const radius = (SIZE - ACTIVE_STROKE) / 2 - 2;
  const circumference = 2 * Math.PI * radius;

  // Build arcs for each phase
  const totalGap = GAP_DEGREES * 4;
  const availableDegrees = 360 - totalGap;

  const arcs = ranges.map((range) => {
    const phaseDays = range.end - range.start + 1;
    const fraction = phaseDays / totalDays;
    const degrees = fraction * availableDegrees;
    return { ...range, fraction, degrees };
  });

  // Calculate start angles
  let currentAngle = -90; // start from top
  const arcData = arcs.map((arc) => {
    const startAngle = currentAngle;
    currentAngle += arc.degrees + GAP_DEGREES;
    return { ...arc, startAngle };
  });

  // Cursor position based on current day
  const dayFraction = (currentDay - 0.5) / totalDays;
  const cursorAngleDeg = -90 + dayFraction * 360;
  const cursorAngleRad = (cursorAngleDeg * Math.PI) / 180;
  const cursorX = center + radius * Math.cos(cursorAngleRad);
  const cursorY = center + radius * Math.sin(cursorAngleRad);

  const softColor = phaseColorsSoft[phase];
  const phaseColor = phaseColors[phase];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Radial gradient background */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${softColor}40 0%, transparent 70%)`,
          }}
        />

        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {/* Phase arcs */}
          {arcData.map((arc) => {
            const isActive = arc.phase === phase;
            const strokeWidth = isActive ? ACTIVE_STROKE : INACTIVE_STROKE;
            const color = phaseColors[arc.phase];

            const startRad = (arc.startAngle * Math.PI) / 180;
            const endRad = ((arc.startAngle + arc.degrees) * Math.PI) / 180;

            const x1 = center + radius * Math.cos(startRad);
            const y1 = center + radius * Math.sin(startRad);
            const x2 = center + radius * Math.cos(endRad);
            const y2 = center + radius * Math.sin(endRad);

            const largeArc = arc.degrees > 180 ? 1 : 0;

            const arcLength = (arc.degrees / 360) * circumference;

            return (
              <path
                key={arc.phase}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.5}
                strokeDasharray={arcLength}
                strokeDashoffset={drawn ? 0 : arcLength}
                style={{
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
            );
          })}

          {/* Cursor dot */}
          <circle
            cx={cursorX}
            cy={cursorY}
            r={6}
            fill="white"
            stroke={phaseColor}
            strokeWidth={3}
            className={showCursor ? 'animate-fade-scale-in' : 'opacity-0'}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-data-lg font-medium text-text-primary">
            {currentDay}
          </span>
          <span className="text-caption text-text-muted">/{totalDays}</span>
          <span className="mt-0.5 text-lg">{getPhaseEmoji(phase)}</span>
        </div>
      </div>

      <div
        className="rounded-full px-3 py-1 text-caption font-semibold"
        style={{ backgroundColor: softColor, color: phaseColor }}
      >
        Phase {phaseLabels[phase]}
      </div>
    </div>
  );
}
