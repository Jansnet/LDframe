/**
 * SVG-based skill radar — quarterly snapshot only, never a dashboard KPI.
 *
 * Why SVG and not a chart library:
 *   - Tiny: ~2KB, zero external dependencies.
 *   - Server-rendered: prints/exports trivially.
 *   - Honest visual: each spoke is one self-positioned skill level (1..4),
 *     no smoothing, no false precision.
 *
 * Anti-pattern guard: the radar is deliberately small (320×320) and lives
 * on its own /snapshot page. It does not appear on the home page, the plan
 * view, or the skill page. The empirical literature is clear: radars used
 * as dashboard KPIs anchor users on self-rating and crowd out behavior
 * evidence.
 */
export interface RadarDatum {
  label: string;
  level: number;         // 1..4 self-positioning
  previousLevel?: number; // optional: previous quarter
}

interface Props {
  data: RadarDatum[];
  size?: number;
}

export function SkillRadar({ data, size = 320 }: Props) {
  const N = data.length;
  if (N < 3) return null;

  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.7; // outer radius, leaves room for labels

  // Compute spoke vectors at evenly-spaced angles, top-first.
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const point = (i: number, scale: number) => ({
    x: cx + r * scale * Math.cos(angle(i)),
    y: cy + r * scale * Math.sin(angle(i)),
  });

  // Concentric rings — one per level (1..4).
  const rings = [1, 2, 3, 4].map((level) => {
    const scale = level / 4;
    const points = data.map((_, i) => point(i, scale));
    return { level, d: pointsToPath(points) };
  });

  const spokes = data.map((_, i) => point(i, 1));

  const currentShape = pointsToPath(data.map((d, i) => point(i, d.level / 4)));
  const previousShape = data.some((d) => d.previousLevel != null)
    ? pointsToPath(data.map((d, i) => point(i, (d.previousLevel ?? d.level) / 4)))
    : null;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Skill-Radar">
      {/* Rings */}
      {rings.map((ring) => (
        <path key={ring.level} d={ring.d} fill="none" stroke="#E0D1B4" strokeWidth={1} />
      ))}

      {/* Spokes */}
      {spokes.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E0D1B4" strokeWidth={1} />
      ))}

      {/* Previous quarter (clay, dashed) */}
      {previousShape && (
        <path d={previousShape} fill="rgba(166,122,88,0.10)" stroke="#A67A58" strokeDasharray="4 4" strokeWidth={1.5} />
      )}

      {/* Current quarter (rust, solid) */}
      <path d={currentShape} fill="rgba(204,120,92,0.18)" stroke="#CC785C" strokeWidth={2} />

      {/* Labels */}
      {data.map((d, i) => {
        const p = point(i, 1.18);
        return (
          <text
            key={d.label}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#262521"
            fontFamily="Inter, sans-serif"
            fontSize={12}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

function pointsToPath(points: { x: number; y: number }[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ") + " Z";
}
