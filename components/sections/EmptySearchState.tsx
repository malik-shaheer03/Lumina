"use client"

import type React from "react"

import { Box, Container, Typography, Button, TextField, InputAdornment } from "@mui/material"
import { Search as SearchIcon, Home as HomeIcon, Lightbulb as LightbulbIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import { slideInUp, scaleIn } from "@/components/theme/animations"
import { useState } from "react"

const searchSuggestions = [
  "nature",
  "mountains",
  "ocean",
  "sunset",
  "abstract",
  "minimalist",
  "space",
  "city",
  "forest",
  "flowers",
  "architecture",
  "technology",
  "animals",
  "landscape",
  "art",
]

export default function EmptySearchState() {
  const { searchQuery, selectedCategory, handleSearch, returnToHome } = useWallpaper()
  const [newSearchQuery, setNewSearchQuery] = useState("")

  const displayQuery = searchQuery || selectedCategory

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
  }

  const handleNewSearch = () => {
    if (newSearchQuery.trim()) {
      handleSearch(newSearchQuery.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNewSearch()
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Box
        sx={{
          animation: `${slideInUp} 0.8s ease-out`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Empty State Icon */}
        <Box
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            opacity: 0.6,
            animation: `${scaleIn} 1s ease-out 0.3s both`,
          }}
        >
          😕
        </Box>

        {/* Main Message */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
              animation: `${slideInUp} 0.8s ease-out 0.1s both`,
            }}
          >
            No wallpapers found for "{displayQuery}"
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: "500px",
              mx: "auto",
              lineHeight: 1.6,
              animation: `${slideInUp} 0.8s ease-out 0.2s both`,
            }}
          >
            Don't worry! Try searching with different keywords or explore our suggestions below.
          </Typography>
        </Box>

        {/* New Search Bar */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            animation: `${slideInUp} 0.8s ease-out 0.3s both`,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Try a different search..."
            value={newSearchQuery}
            onChange={(e) => setNewSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(139, 92, 246, 0.8)" }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
                "&.Mui-focused": {
                  bgcolor: "rgba(255,255,255,0.15)",
                  boxShadow: "0 5px 20px rgba(139, 92, 246, 0.3)",
                },
                "& input::placeholder": {
                  color: "rgba(255,255,255,0.6)",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleNewSearch}
            disabled={!newSearchQuery.trim()}
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              px: 4,
              py: 1.5,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.5)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Search Again
          </Button>
        </Box>

        {/* Search Suggestions */}
        <Box sx={{ animation: `${slideInUp} 0.8s ease-out 0.4s both` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, justifyContent: "center" }}>
            <LightbulbIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 500,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Try these popular searches:
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            {searchSuggestions.map((suggestion, index) => (
              <Button
                key={suggestion}
                variant="outlined"
                size="small"
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 3,
                  px: 2,
                  py: 0.5,
                  fontSize: "0.85rem",
                  textTransform: "lowercase",
                  animation: `${scaleIn} 0.5s ease-out ${0.5 + index * 0.05}s both`,
                  "&:hover": {
                    borderColor: "rgba(139, 92, 246, 0.8)",
                    bgcolor: "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-2px) scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {suggestion}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Back to Home Button */}
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={returnToHome}
          sx={{
            background: "linear-gradient(45deg, #ec4899, #f97316)",
            px: 4,
            py: 1.5,
            fontSize: { xs: "0.9rem", md: "1rem" },
            animation: `${slideInUp} 0.8s ease-out 0.5s both`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}
