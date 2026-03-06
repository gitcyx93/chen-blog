import { useState, useRef } from 'react';
import { schools, influences, type Philosopher, type School } from '../data/philosophy-tree';

// ─── Canvas constants ────────────────────────────────────────────────────────
const TIME_START  = -650;
const TIME_END    = 2030;
const TIME_SPAN   = TIME_END - TIME_START;

const SVG_W       = 2400;
const LANE_H      = 44;
const LANE_GAP    = 18;   // gap between lanes — school labels live here
const LANE_STEP   = LANE_H + LANE_GAP;
const PADDING_TOP = 60;   // space for time axis + first label
const PADDING_BOT = 28;
const PADDING_L   = 10;
const PADDING_R   = 10;

const NUM_LANES   = Math.max(...schools.map(s => s.lane)) + 1;
const SVG_H       = PADDING_TOP + NUM_LANES * LANE_STEP + PADDING_BOT;

const INNER_W = SVG_W - PADDING_L - PADDING_R;

function tx(year: number): number {
  return PADDING_L + ((year - TIME_START) / TIME_SPAN) * INNER_W;
}
function ty(lane: number): number {
  return PADDING_TOP + lane * LANE_STEP;
}

// ─── Time axis ticks ─────────────────────────────────────────────────────────
const TICKS: Array<{ year: number; label: string }> = [
  { year: -600, label: 'BC 600' },
  { year: -400, label: 'BC 400' },
  { year: -200, label: 'BC 200' },
  { year:    0, label:      '0' },
  { year:  400, label:   '400' },
  { year:  800, label:   '800' },
  { year: 1200, label:  '1200' },
  { year: 1500, label:  '1500' },
  { year: 1700, label:  '1700' },
  { year: 1900, label:  '1900' },
  { year: 2000, label:  '2000' },
];

// ─── Tooltip card ────────────────────────────────────────────────────────────
interface TooltipData {
  x: number;       // SVG coords
  y: number;
  philosopher: Philosopher;
  school: School;
}

// ─── Bezier influence arrows ─────────────────────────────────────────────────
function schoolMidX(s: School): number {
  return tx((s.yearRange[0] + s.yearRange[1]) / 2);
}
function schoolEndX(s: School): number {
  return tx(s.yearRange[1]);
}
function schoolStartX(s: School): number {
  return tx(s.yearRange[0]);
}

function InfluenceArrows() {
  const byId = Object.fromEntries(schools.map(s => [s.id, s]));
  return (
    <>
      {influences.map(({ from, to }) => {
        const src = byId[from];
        const dst = byId[to];
        if (!src || !dst) return null;

        // Arrow goes from end of source to start of destination
        const x1 = Math.min(schoolEndX(src), schoolMidX(src) + 60);
        const y1 = ty(src.lane) + LANE_H / 2;
        const x2 = Math.max(schoolStartX(dst), tx(dst.yearRange[0]));
        const y2 = ty(dst.lane) + LANE_H / 2;

        // Control points: horizontal exit + horizontal entry
        const cx1 = x1 + (x2 - x1) * 0.45;
        const cy1 = y1;
        const cx2 = x2 - (x2 - x1) * 0.45;
        const cy2 = y2;

        const d = `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
        return (
          <path
            key={`${from}->${to}`}
            d={d}
            fill="none"
            stroke={src.strokeColor}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.35"
            markerEnd="url(#arrowhead)"
          />
        );
      })}
    </>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PhilosophyTree() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoveredSchool, setHoveredSchool] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function handlePhilosopherEnter(
    e: React.MouseEvent<SVGCircleElement>,
    p: Philosopher,
    school: School,
  ) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const svgX = tx(p.birthYear);
    const svgY = ty(school.lane) + LANE_H / 2;
    setTooltip({ x: svgX, y: svgY, philosopher: p, school });
  }

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        style={{ display: 'block', minWidth: SVG_W, fontFamily: "'JetBrains Mono', monospace" }}
        onMouseLeave={() => { setTooltip(null); setHoveredSchool(null); }}
      >
        {/* ── Defs ── */}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6"
            refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(136,192,208,0.45)" />
          </marker>
          {schools.map(s => (
            <linearGradient key={s.id + '-grad'} id={s.id + '-grad'}
              x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={s.color} stopOpacity="0.0" />
              <stop offset="8%"   stopColor={s.color} stopOpacity="0.85" />
              <stop offset="92%"  stopColor={s.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
            </linearGradient>
          ))}
        </defs>

        {/* ── Background grid lines ── */}
        {TICKS.map(({ year }) => (
          <line
            key={'grid-' + year}
            x1={tx(year)} y1={PADDING_TOP - 8}
            x2={tx(year)} y2={SVG_H - PADDING_BOT}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* ── Time axis ── */}
        <line
          x1={PADDING_L} y1={PADDING_TOP - 14}
          x2={SVG_W - PADDING_R} y2={PADDING_TOP - 14}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1"
        />
        {TICKS.map(({ year, label }) => (
          <g key={'tick-' + year}>
            <line
              x1={tx(year)} y1={PADDING_TOP - 18}
              x2={tx(year)} y2={PADDING_TOP - 10}
              stroke="rgba(255,255,255,0.25)" strokeWidth="1"
            />
            <text
              x={tx(year)} y={PADDING_TOP - 24}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(255,255,255,0.35)"
            >{label}</text>
          </g>
        ))}

        {/* ── Influence arrows (drawn behind lanes) ── */}
        <InfluenceArrows />

        {/* ── Schools ── */}
        {schools.map(school => {
          const x = tx(school.yearRange[0]);
          const w = tx(school.yearRange[1]) - x;
          const y = ty(school.lane);
          const isHovered = hoveredSchool === school.id;

          return (
            <g key={school.id}
              onMouseEnter={() => setHoveredSchool(school.id)}
              style={{ cursor: 'default' }}>

              {/* Lane band */}
              <rect
                x={x} y={y}
                width={w} height={LANE_H}
                rx="4"
                fill={`url(#${school.id}-grad)`}
                stroke={school.strokeColor}
                strokeWidth={isHovered ? 1.2 : 0.7}
                strokeOpacity={isHovered ? 0.7 : 0.35}
              />

              {/* School label – floats above the band in the gap */}
              <text
                x={x + 8} y={y - 5}
                textAnchor="start"
                fontSize="9"
                fontWeight="600"
                fill={school.strokeColor}
                opacity={isHovered ? 1 : 0.65}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {school.nameZh}
              </text>

              {/* Philosopher dots – sort by birthYear, stagger above/below, enforce min spacing */}
              {(() => {
                const py = y + LANE_H / 2;

                // 1. Sort by birthYear so neighbouring philosophers alternate rows
                const sorted = [...school.philosophers]
                  .sort((a, b) => a.birthYear - b.birthYear);

                // 2. Dot X positions
                const dotXs = sorted.map(p => {
                  const px = tx(p.birthYear);
                  const inBand = px >= x && px <= x + w;
                  return inBand ? px : Math.max(x + 60, Math.min(px, x + w - 8));
                });

                // 3. Assign row: even sorted-index → above, odd → below
                const isAboves = sorted.map((_, i) => i % 2 === 0);

                // 4. Enforce minimum horizontal gap (30 px) between labels in same row
                const MIN_GAP = 30;
                const labelXs = [...dotXs];
                const aboveIs = sorted.map((_, i) => i).filter(i =>  isAboves[i]);
                const belowIs = sorted.map((_, i) => i).filter(i => !isAboves[i]);
                for (let k = 1; k < aboveIs.length; k++) {
                  const [pi, ci] = [aboveIs[k - 1], aboveIs[k]];
                  if (labelXs[ci] - labelXs[pi] < MIN_GAP) labelXs[ci] = labelXs[pi] + MIN_GAP;
                }
                for (let k = 1; k < belowIs.length; k++) {
                  const [pi, ci] = [belowIs[k - 1], belowIs[k]];
                  if (labelXs[ci] - labelXs[pi] < MIN_GAP) labelXs[ci] = labelXs[pi] + MIN_GAP;
                }

                // 5. Smaller font for dense schools
                const fSize = school.philosophers.length > 4 ? 8 : 9;

                return sorted.map((p, si) => {
                  const dotX  = dotXs[si];
                  const labelX = labelXs[si];
                  const isAbove = isAboves[si];
                  const labelY = isAbove ? py - 10 : py + 10;

                  return (
                    <g key={p.id}>
                      <circle
                        cx={dotX} cy={py} r={4}
                        fill={school.strokeColor}
                        opacity={tooltip?.philosopher.id === p.id ? 1 : 0.8}
                        stroke="rgba(0,0,0,0.4)"
                        strokeWidth="0.8"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={e => handlePhilosopherEnter(e, p, school)}
                        onMouseLeave={() => setTooltip(null)}
                      />
                      <text
                        x={labelX} y={labelY}
                        textAnchor="middle"
                        dominantBaseline={isAbove ? 'auto' : 'hanging'}
                        fontSize={fSize}
                        fill={school.strokeColor}
                        opacity={isHovered || tooltip?.philosopher.id === p.id ? 0.9 : 0.5}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {p.nameZh}
                      </text>
                    </g>
                  );
                });
              })()}
            </g>
          );
        })}

        {/* ── Tooltip ── */}
        {tooltip && (() => {
          const padX = 14, padY = 10;
          const boxW = 220, boxH = 88;
          const rawX = tooltip.x + 12;
          const rawY = tooltip.y - boxH / 2;
          const bx = Math.min(rawX, SVG_W - boxW - 8);
          const by = Math.max(8, Math.min(rawY, SVG_H - boxH - 8));

          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                x={bx} y={by} width={boxW} height={boxH} rx="5"
                fill="#2e3440" stroke={tooltip.school.strokeColor}
                strokeWidth="1" opacity="0.97"
              />
              {/* Philosopher name */}
              <text x={bx + padX} y={by + padY + 11}
                fontSize="12" fontWeight="700"
                fill={tooltip.school.strokeColor}>
                {tooltip.philosopher.nameZh}
              </text>
              {/* English name + years */}
              <text x={bx + padX} y={by + padY + 25}
                fontSize="9" fill="rgba(255,255,255,0.45)">
                {tooltip.philosopher.name} · {tooltip.philosopher.years}
              </text>
              {/* Bio – wrap at ~34 chars */}
              {wrapText(tooltip.philosopher.bio, 34).map((line, i) => (
                <text key={i}
                  x={bx + padX} y={by + padY + 44 + i * 15}
                  fontSize="10" fill="rgba(255,255,255,0.75)">
                  {line}
                </text>
              ))}
            </g>
          );
        })()}
      </svg>

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px 16px',
        marginTop: '12px', fontSize: '11px',
        fontFamily: "'JetBrains Mono', monospace",
        opacity: 0.7,
      }}>
        {schools.map(s => (
          <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              display: 'inline-block', width: 10, height: 10, borderRadius: 2,
              background: s.strokeColor, opacity: 0.85,
            }} />
            <span style={{ color: s.strokeColor }}>{s.nameZh}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function wrapText(text: string, maxLen: number): string[] {
  const words = text.split('');
  const lines: string[] = [];
  let cur = '';
  for (const ch of words) {
    cur += ch;
    if (cur.length >= maxLen) { lines.push(cur); cur = ''; }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}
