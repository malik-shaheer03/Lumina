"use client"

import { useState, useEffect } from "react"
import { Fab } from "@mui/material"
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material"

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowScrollTop(window.scrollY > 400)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!showScrollTop) return null

  return (
    <Fab
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
        },
        transition: "all 0.3s ease",
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  )
}
