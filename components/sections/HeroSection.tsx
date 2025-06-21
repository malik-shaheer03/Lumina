"use client"

import type React from "react"

import { Box, Container, Typography, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material"
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import { slideInUp, float } from "@/components/theme/animations"

export default function HeroSection() {
  const { searchQuery, setSearchQuery, handleSearch, clearSearch, isSearchMode } = useWallpaper()

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    clearSearch()
  }

  return (
    <Box
      sx={{
        height: isSearchMode ? "40vh" : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.4) 100%),
            url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          transform: "scale(1.1)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 10, 15, 0.4)",
        },
      }}
    >
      {/* Floating Elements - Hide in search mode */}
      {!isSearchMode && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "60px",
              height: "60px",
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              borderRadius: "50%",
              animation: `${float} 6s ease-in-out infinite`,
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: "40px",
              height: "40px",
              background: "linear-gradient(45deg, #06b6d4, #ec4899)",
              borderRadius: "50%",
              animation: `${float} 8s ease-in-out infinite reverse`,
              opacity: 0.6,
            }}
          />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Box sx={{ animation: `${slideInUp} 1s ease-out` }}>
          {/* Title - Smaller in search mode */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: isSearchMode
                ? { xs: "2rem", md: "3rem", lg: "3.5rem" }
                : { xs: "3rem", md: "5rem", lg: "6rem" },
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff, #cbd5e1)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
              mb: isSearchMode ? 1 : 2,
              lineHeight: 1.1,
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Lumina
          </Typography>

          {/* Subtitle - Hide in search mode */}
          {!isSearchMode && (
            <Typography
              variant="h4"
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 6,
                fontWeight: 300,
                fontSize: { xs: "1.2rem", md: "1.8rem" },
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                opacity: isSearchMode ? 0 : 1,
                transform: isSearchMode ? "translateY(-20px)" : "translateY(0)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Discover the world's most stunning wallpapers
            </Typography>
          )}

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: "auto", position: "relative" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for breathtaking wallpapers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => handleSearch(searchQuery)}
                      sx={{
                        color: "rgba(139, 92, 246, 0.8)",
                        "&:hover": {
                          color: "#8b5cf6",
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <Tooltip title="Clear search" arrow>
                      <IconButton
                        onClick={handleClearSearch}
                        size="small"
                        sx={{
                          color: "rgba(255, 255, 255, 0.6)",
                          "&:hover": {
                            color: "white",
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "1.1rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  },
                  "&.Mui-focused": {
                    bgcolor: "rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
                  },
                  transition: "all 0.3s ease",
                  "& input::placeholder": {
                    color: "rgba(255,255,255,0.7)",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
