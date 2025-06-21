"use client"

import { Container, Alert, Button, Box, CircularProgress } from "@mui/material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import PhotoCard from "@/components/cards/PhotoCard"

export default function PhotoGrid() {
  const { photos, loading, error, hasMore, loadMore } = useWallpaper()

  return (
    <Container maxWidth="xl" sx={{ pb: 8 }}>
      {/* Error Display */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 4,
            bgcolor: "rgba(239, 68, 68, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "white",
          }}
        >
          {error}
        </Alert>
      )}

      {/* Photo Grid - Uniform 3x3 responsive layout */}
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
        {photos.map((photo, index) => (
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
            <PhotoCard photo={photo} index={index} />
          </Box>
        ))}
      </Box>

      {/* Load More Button */}
      {hasMore && !loading && photos.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <Button
            variant="contained"
            size="large"
            onClick={loadMore}
            sx={{
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              borderRadius: 4,
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Load More Wallpapers
          </Button>
        </Box>
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress
            size={60}
            sx={{
              color: "#8b5cf6",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>
      )}
    </Container>
  )
}
