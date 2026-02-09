import React, { useEffect, useRef } from "react"

/* ══════════════════════════════════════════════════════════════════════════
   ORIGINAL VERSION (useState-based) - Commented out for reference
   Problem: setAngle() triggers React re-renders ~60x/sec
   ══════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from "react"

const BLADES = 8
const MAX_ROT = Math.PI / 3
type ShutterProps = {
  onOpened: () => void
}

export default function Shutter({ onOpened }: ShutterProps) {
  const [angle, setAngle] = useState(40)
  const TARGET = 40
  const DURATION = 1500

  useEffect(() => {
    const PHASE1 = 700
    const PHASE2 = 1000
    const TOTAL = PHASE1 + PHASE2

    let start: number | null = null
    let raf: number

    const loop = (time: number) => {
      if (start === null) start = time
      const elapsed = time - start

      if (elapsed <= PHASE1) {
        const t = Math.min(elapsed / PHASE1, 1)
        const e = easeOutCubic(t)
        setAngle(40 * (1 - e))  // <-- triggers re-render every frame!
      } else if (elapsed <= TOTAL) {
        const t = (elapsed - PHASE1) / PHASE2
        const e = easeInCubic(Math.min(t, 1))
        setAngle(40 * e)  // <-- triggers re-render every frame!
      } else {
        setAngle(40)
        cancelAnimationFrame(raf)
        return
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ... rest of component
}

══════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// OPTIMIZED VERSION - Uses CSS variables via ref (no React re-renders)
// ═══════════════════════════════════════════════════════════════════════════


const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInCubic = (t: number) => t * t * t

export default function Shutter() {
  const containerRef = useRef<HTMLDivElement>(null)

  const N = 7
  const R = "150vmax"

  useEffect(() => {
    const PHASE1 = 700
    const PHASE2 = 1000
    const TOTAL = PHASE1 + PHASE2

    let start: number | null = null
    let raf = 0
    let cancelled = false

    const loop = (time: number) => {
      if (cancelled) return

      if (start === null) start = time
      const elapsed = time - start

      let angle = 40

      if (elapsed <= PHASE1) {
        const t = elapsed / PHASE1
        angle = 40 * (1 - easeOutCubic(t))
      } else if (elapsed <= TOTAL) {
        const t = (elapsed - PHASE1) / PHASE2
        angle = 40 * easeInCubic(t)
      } else {
        containerRef.current?.style.setProperty("--drive", "40deg")
        return
      }

      containerRef.current?.style.setProperty("--drive", `${angle}deg`)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        "--drive": "40deg",
      } as React.CSSProperties}
    >
      {Array.from({ length: N }).map((_, i) => (
        <Blade baseAngle={(360 / N) * i} radius={R} />
      ))}
    </div>
  )
}

function Blade({ baseAngle, radius }: { baseAngle: number; radius: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `
          translate(-50%, 0%)
          rotate(${baseAngle}deg)
          translateY(-${radius})
          rotate(var(--drive))
        `,
        transformOrigin: "50% 0%",
        willChange: "transform",
      }}
    >
      {/* BORDER */}
      <div
        style={{
          width: "150vmax",
          height: "150vmax",
          background: "rgba(152, 152, 152, 1)",
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.6))",
        }}
      />

      {/* FILL */}
      <div
        style={{
          position: "absolute",
          inset: "0.2vw",
          background: "#111",
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
        }}
      />
    </div>
  )
}