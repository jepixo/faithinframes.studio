import { color } from "framer-motion"
import { useEffect, useState } from "react"

const BLADES = 8
const MAX_ROT = Math.PI / 3
type ShutterProps = {
  onOpened: () => void
}

export default function Shutter({onOpened }: ShutterProps) {
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
        // Phase 1: 40 → 0
        const t = Math.min(elapsed / PHASE1, 1)
        const e = easeOutCubic(t)
        setAngle(40 * (1 - e))
        } else if (elapsed <= TOTAL) {
        // Phase 2: 0 → 40
        const t = (elapsed - PHASE1) / PHASE2
        const e = easeInCubic(Math.min(t, 1))
        setAngle(40 * e)
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

  function Blade({
    baseAngle,
    driveAngle,
    radius,
    }: {
    baseAngle: number
    driveAngle: number
    radius: string
    }) {
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
            rotate(${driveAngle}deg)
            `,
            transformOrigin: "50% 0%",
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



  const N = 7
  const R = "150vmax" // radius of the circle

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
      }}
    >
      {Array.from({ length: N }).map((_, i) => (
        <Blade
          baseAngle={(360 / N) * i}
          driveAngle={angle}
          radius={R}
        />
      ))}
    </div>
  )
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}
function easeInCubic(t: number) {
  return t * t * t
}