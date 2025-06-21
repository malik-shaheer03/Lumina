"use client"

import { Container, Typography, Box, Button, IconButton } from "@mui/material"
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import FavoriteCard from "@/components/cards/FavoriteCard"

export default function FavoritesSection() {
  const { photos, favorites, setShowFavorites } = useWallpaper()

  const favoritePhotos = photos.filter((photo) => favorites.has(photo.id))

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <IconButton
          onClick={() => setShowFavorites(false)}
          sx={{
            color: "white",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 600,
            background: "linear-gradient(45deg, #ec4899, #f97316)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Favorites ({favorites.size})
        </Typography>
      </Box>

      {/* Empty State */}
      {favoritePhotos.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              fontSize: "4rem",
              opacity: 0.5,
            }}
          >
            💔
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 2,
            }}
          >
            No favorites yet
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              mb: 4,
              maxWidth: "400px",
            }}
          >
            Start exploring and click the heart icon on wallpapers you love to add them to your favorites!
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowFavorites(false)}
            sx={{
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              px: 4,
              py: 1.5,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Explore Wallpapers
          </Button>
        </Box>
      )}

      {/* Favorites Grid - Same uniform layout as PhotoGrid */}
      {favoritePhotos.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 column on mobile
              sm: "repeat(2, 1fr)", // 2 columns on tablet
              md: "repeat(3, 1fr)", // 3 columns on desktop
            },
            gap: {
              xs: 2, // 16px gap on mobile
              sm: 2.5, // 20px gap on tablet
              md: 3, // 24px gap on desktop
            },
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "600px", // Max width for 2-column layout
              md: "900px", // Max width for 3-column layout
              lg: "1200px", // Max width for larger screens
            },
            mx: "auto", // Center the grid
            px: {
              xs: 1,
              sm: 2,
              md: 0,
            },
          }}
        >
          {favoritePhotos.map((photo, index) => (
            <Box
              key={photo.id}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1", // Perfect square containers
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                // Ensure consistent sizing across all grid items
                minHeight: 0, // Allow grid items to shrink
                minWidth: 0, // Allow grid items to shrink
              }}
            >
              <FavoriteCard photo={photo} index={index} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  )
}
