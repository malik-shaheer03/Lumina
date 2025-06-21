"use client"

import { Box, Container, Typography, Button, Chip } from "@mui/material"
import { ArrowBack as ArrowBackIcon, Clear as ClearIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import { slideInUp } from "@/components/theme/animations"

export default function SearchResultsHeader() {
  const { searchQuery, selectedCategory, isSearchMode, searchResultsCount, photos, clearSearch, returnToHome } =
    useWallpaper()

  if (!isSearchMode) return null

  const displayQuery = searchQuery || selectedCategory
  const hasResults = photos.length > 0

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 2 }}>
      <Box
        sx={{
          animation: `${slideInUp} 0.6s ease-out`,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 4,
        }}
      >
        {/* Search Results Info */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "1.5rem", md: "2rem" },
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            Search Results for:
            <Chip
              label={`"${displayQuery}"`}
              sx={{
                bgcolor: "rgba(139, 92, 246, 0.2)",
                color: "#a78bfa",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", md: "1rem" },
                px: 1,
                "& .MuiChip-label": {
                  px: 2,
                },
              }}
            />
          </Typography>

          {hasResults && (
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Found {searchResultsCount.toLocaleString()} wallpapers
              {photos.length < searchResultsCount && ` (showing ${photos.length})`}
            </Typography>
          )}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearSearch}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.3)",
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              px: { xs: 2, md: 3 },
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                bgcolor: "rgba(255, 255, 255, 0.05)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Clear Search
          </Button>

          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={returnToHome}
            sx={{
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              px: { xs: 2, md: 3 },
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
