import { useState, useEffect, useRef } from 'react';
import { philosophyTree, type PhiloNode } from '../data/philosophy-tree';

// ── Layout constants ──────────────────────────────────────────────────────────
const LEAF_W  = 64;   // horizontal space allocated per leaf node
const GAP     = 12;   // gap between siblings
const LEVEL_H = 112;  // vertical distance between depth levels
const PAD_T   = 36;
const PAD_B   = 52;   // extra bottom padding for leaf labels
const PAD_L   = 24;
const PAD_R   = 24;

// ── Node visual properties ────────────────────────────────────────────────────
function nodeR(n: PhiloNode): number {
  if (n.type === 'root')   return 14;
  if (n.type === 'region') return 9;
  if (n.type === 'era')    return 6;
  if (n.type === 'school') return 4;
  const i = n.importance ?? 1;
  return i === 3 ? 7 : i === 2 ? 5 : 3;
}

function nodeFS(n: PhiloNode): number {
  if (n.type === 'root')   return 17;
  if (n.type === 'region') return 13;
  if (n.type === 'era')    return 11;
  if (n.type === 'school') return 10;
  const i = n.importance ?? 1;
  return i === 3 ? 12 : i === 2 ? 10 : 8;
}

function nodeFW(n: PhiloNode): string {
  if (n.type === 'root' || n.type === 'region') return '700';
  if (n.importance === 3) return '600';
  return '400';
}

function nodeOpacity(n: PhiloNode): number {
  if (n.type !== 'philosopher') return 0.9;
  const i = n.importance ?? 1;
  return i === 3 ? 1 : i === 2 ? 0.78 : 0.40;
}

// ── Subtree width ─────────────────────────────────────────────────────────────
function treeW(n: PhiloNode): number {
  if (!n.children?.length) return LEAF_W;
  return n.children.reduce((s, c, i) => s + treeW(c) + (i > 0 ? GAP : 0), 0);
}

// ── Layout node ───────────────────────────────────────────────────────────────
interface LN {
  node: PhiloNode;
  x: number;
  y: number;
  px?: number;   // parent x
  py?: number;   // parent y
  color: string;
  depth: number;
}

function build(
  n: PhiloNode,
  sx: number,
  depth: number,
  px: number | undefined,
  py: number | undefined,
  ic: string,
  out: LN[],
) {
  const w = treeW(n);
  const x = sx + w / 2;
  const y = PAD_T + depth * LEVEL_H;
  const color = n.color ?? ic;
  out.push({ node: n, x, y, px, py, color, depth });

  if (n.children?.length) {
    let cx = sx;
    for (const ch of n.children) {
      const cw = treeW(ch);
      build(ch, cx, depth + 1, x, y, color, out);
      cx += cw + GAP;
    }
  }
}

// ── Tooltip state ─────────────────────────────────────────────────────────────
interface TipState {
  node: PhiloNode;
  color: string;
  cx: number;   // client X
  cy: number;   // client Y
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PhilosophyTree() {
  const [tip, setTip] = useState<TipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lnodes: LN[] = [];
  build(philosophyTree, PAD_L, 0, undefined, undefined, '#88c0d0', lnodes);

  const SW = treeW(philosophyTree) + PAD_L + PAD_R;
  const maxY = Math.max(...lnodes.map(ln => ln.y));
  const SH = maxY + 40 + PAD_B;

  // Scroll to center on root node on first load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rootX = PAD_L + treeW(philosophyTree) / 2;
    el.scrollLeft = rootX - el.clientWidth / 2;
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${SW} ${SH}`}
        width={SW}
        height={SH}
        style={{ display: 'block', minWidth: SW, fontFamily: "'JetBrains Mono', monospace" }}
        onMouseLeave={() => setTip(null)}
      >
        {/* ── Edges ── */}
        {lnodes.map(({ node, x, y, px, py, color, depth }) => {
          if (px == null) return null;
          const my = ((py ?? 0) + y) / 2;
          // Depth-based edge weight: shallower = thicker & more opaque
          const strokeW = depth <= 1 ? 2.0 : depth <= 2 ? 1.5 : depth <= 3 ? 1.2 : 0.8;
          const edgeOp  = depth <= 1 ? 0.55 : depth <= 2 ? 0.48 : depth <= 3 ? 0.40 : 0.35;
          return (
            <path
              key={'e-' + node.id}
              d={`M${px},${py} C${px},${my} ${x},${my} ${x},${y}`}
              fill="none"
              stroke={color}
              strokeWidth={strokeW}
              opacity={edgeOp}
            />
          );
        })}

        {/* ── Nodes ── */}
        {lnodes.map(({ node, x, y, color }) => {
          const r = nodeR(node);
          const fs = nodeFS(node);
          const fw = nodeFW(node);
          const op = nodeOpacity(node);
          const isLeaf = node.type === 'philosopher';
          const hoverable = isLeaf && (node.importance ?? 1) >= 2;

          // Label: below leaf nodes, above internal nodes
          const labelY = isLeaf ? y + r + 4 : y - r - 4;
          const baseline = isLeaf ? 'hanging' : 'auto';

          return (
            <g
              key={node.id}
              style={{ cursor: hoverable ? 'pointer' : 'default' }}
              onMouseEnter={hoverable
                ? e => setTip({ node, color, cx: e.clientX, cy: e.clientY })
                : undefined}
              onMouseLeave={hoverable ? () => setTip(null) : undefined}
            >
              {/* Soft glow for major philosophers */}
              {node.importance === 3 && (
                <circle cx={x} cy={y} r={r + 6} fill={color} opacity={0.20} />
              )}
              {/* Main circle */}
              <circle
                cx={x} cy={y} r={r}
                fill={color}
                opacity={op}
                stroke={node.type === 'root' ? 'rgba(255,255,255,0.3)' : 'none'}
                strokeWidth="1.5"
              />
              {/* Label */}
              <text
                x={x}
                y={labelY}
                textAnchor="middle"
                dominantBaseline={baseline}
                fontSize={fs}
                fontWeight={fw}
                fill={color}
                opacity={op}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Tooltip (fixed position HTML overlay) ── */}
      {tip && (
        <div
          style={{
            position: 'fixed',
            left: Math.min(tip.cx + 16, (typeof window !== 'undefined' ? window.innerWidth : 1280) - 250),
            top: Math.max(tip.cy - 80, 8),
            width: 228,
            background: 'rgba(46, 52, 64, 0.96)',
            border: `1px solid ${tip.color}`,
            borderRadius: 8,
            padding: '11px 14px',
            pointerEvents: 'none',
            zIndex: 9999,
            fontFamily: "'JetBrains Mono', monospace",
            backdropFilter: 'blur(10px)',
            boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px ${tip.color}22`,
          }}
        >
          {/* Name */}
          <div style={{ fontSize: 14, fontWeight: 700, color: tip.color, marginBottom: 2 }}>
            {tip.node.label}
          </div>
          {/* EN + years */}
          {(tip.node.nameEn || tip.node.years) && (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>
              {tip.node.nameEn}{tip.node.years ? ` · ${tip.node.years}` : ''}
            </div>
          )}
          {/* Quote */}
          {tip.node.quote && (
            <div style={{
              fontSize: 11,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.75)',
              borderLeft: `2px solid ${tip.color}`,
              paddingLeft: 8,
              marginBottom: 8,
              lineHeight: 1.55,
            }}>
              「{tip.node.quote}」
            </div>
          )}
          {/* Bio */}
          {tip.node.bio && (
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
              {tip.node.bio}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
