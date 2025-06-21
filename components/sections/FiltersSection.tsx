"use client"

import { Box, Container, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { Landscape as LandscapeIcon, Portrait as PortraitIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"

export default function FiltersSection() {
  const { orientation, handleOrientationChange } = useWallpaper()

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={orientation}
          exclusive
          onChange={(_, newOrientation) => newOrientation && handleOrientationChange(newOrientation)}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.2)",
            "& .MuiToggleButton-root": {
              color: "white",
              border: "none",
              "&.Mui-selected": {
                background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                color: "white",
              },
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="landscape">
            <LandscapeIcon sx={{ mr: 1 }} />
            Landscape
          </ToggleButton>
          <ToggleButton value="portrait">
            <PortraitIcon sx={{ mr: 1 }} />
            Portrait
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Container>
  )
}
