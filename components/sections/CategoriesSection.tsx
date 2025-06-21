"use client"

import { Box, Container, Typography, Chip } from "@mui/material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import { slideInUp, scaleIn } from "@/components/theme/animations"

const categories = [
  { name: "Nature", emoji: "🌿" },
  { name: "Space", emoji: "🌌" },
  { name: "Abstract", emoji: "🎨" },
  { name: "Minimalist", emoji: "⚪" },
  { name: "Technology", emoji: "💻" },
  { name: "Ocean", emoji: "🌊" },
  { name: "Mountains", emoji: "🏔️" },
  { name: "Sunset", emoji: "🌅" },
  { name: "Architecture", emoji: "🏛️" },
  { name: "Animals", emoji: "🦋" },
]

export default function CategoriesSection() {
  const { selectedCategory, handleCategoryClick } = useWallpaper()

  return (
    <Container maxWidth="xl" sx={{ py: 8, position: "relative", zIndex: 1 }}>
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "white",
            mb: 4,
            textAlign: "center",
            fontWeight: 600,
            animation: `${slideInUp} 0.8s ease-out`,
          }}
        >
          Explore Categories
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 6,
          }}
        >
          {categories.map((category, index) => (
            <Chip
              key={category.name}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </Box>
              }
              onClick={() => handleCategoryClick(category.name)}
              color={selectedCategory === category.name ? "primary" : "default"}
              variant={selectedCategory === category.name ? "filled" : "outlined"}
              sx={{
                cursor: "pointer",
                fontSize: "1rem",
                py: 2,
                px: 3,
                borderRadius: 3,
                backdropFilter: "blur(10px)",
                background:
                  selectedCategory === category.name
                    ? "linear-gradient(45deg, #8b5cf6, #06b6d4)"
                    : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                animation: `${scaleIn} ${0.5 + index * 0.1}s ease-out`,
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  )
}
