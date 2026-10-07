import { motion } from 'framer-motion';

const NODES = [
  { id: 1, x: 680, y: 90, r: 3.5 },
  { id: 2, x: 820, y: 65, r: 2.5 },
  { id: 3, x: 960, y: 120, r: 4 },
  { id: 4, x: 740, y: 195, r: 3 },
  { id: 5, x: 890, y: 215, r: 3.5 },
  { id: 6, x: 1050, y: 185, r: 2.5 },
  { id: 7, x: 640, y: 295, r: 2.5 },
  { id: 8, x: 810, y: 310, r: 4 },
  { id: 9, x: 975, y: 325, r: 3 },
  { id: 10, x: 1110, y: 280, r: 3 },
  { id: 11, x: 730, y: 400, r: 3 },
  { id: 12, x: 900, y: 415, r: 2.5 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [3, 6],
  [3, 7],
  [4, 7],
  [4, 8],
  [5, 9],
  [6, 7],
  [7, 8],
  [8, 9],
  [7, 10],
  [8, 11],
  [10, 11],
];

export default function DataFlowVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <svg
        viewBox="0 0 1200 520"
        fill="none"
        className="w-full h-full object-cover opacity-70"
      >
        {/* Subtle flowing curves in Warm Brown (#6B4F3A) and Espresso (#23170F) */}
        <motion.path
          d="M 520 420 C 690 360, 780 160, 1160 110"
          stroke="#6B4F3A"
          strokeOpacity="0.16"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0.4, opacity: 0.3 }}
          animate={{ pathLength: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 580 120 C 750 180, 860 340, 1180 370"
          stroke="#23170F"
          strokeOpacity="0.09"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0.5, opacity: 0.25 }}
          animate={{ pathLength: [0.5, 1, 0.5], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Thin connecting network lines */}
        {EDGES.map(([a, b], idx) => {
          const n1 = NODES[a];
          const n2 = NODES[b];
          return (
            <line
              key={idx}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="#6B4F3A"
              strokeOpacity="0.13"
              strokeWidth="1"
            />
          );
        })}

        {/* Minimal data nodes with slow, gentle drift */}
        {NODES.map((node, idx) => (
          <motion.g
            key={node.id}
            initial={{ y: 0, x: 0 }}
            animate={{
              y: [0, idx % 2 === 0 ? -6 : 6, 0],
              x: [0, idx % 3 === 0 ? 4 : -4, 0],
            }}
            transition={{
              duration: 9 + (idx % 4) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 5}
              fill="#6B4F3A"
              fillOpacity={idx % 3 === 0 ? '0.08' : '0'}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={idx % 3 === 0 ? '#6B4F3A' : '#23170F'}
              fillOpacity={idx % 3 === 0 ? '0.55' : '0.28'}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
