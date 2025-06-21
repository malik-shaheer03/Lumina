"use client"

import { AppBar, Toolbar, Typography, IconButton, Badge, Tooltip } from "@mui/material"
import { Favorite as FavoriteIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"

export default function Navigation() {
  const { favorites, setShowFavorites, showFavorites, returnToHome } = useWallpaper()

  const handleLogoClick = () => {
    setShowFavorites(false)
    returnToHome()
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              filter: "brightness(1.2)",
            },
          }}
          onClick={handleLogoClick}
        >
          Lumina
        </Typography>
        <Tooltip title="View Favorites" arrow>
          <IconButton
            onClick={() => setShowFavorites(!showFavorites)}
            sx={{
              color: showFavorites ? "#ec4899" : "white",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                color: "#ec4899",
              },
            }}
          >
            <Badge
              badgeContent={favorites.size}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  background: "linear-gradient(45deg, #ec4899, #f97316)",
                  color: "white",
                  fontWeight: 600,
                },
              }}
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
