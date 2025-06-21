"use client"

import { Box } from "@mui/material"

export default function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
        `,
        zIndex: -2,
      }}
    />
  )
}
