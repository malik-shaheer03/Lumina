"use client"

import type React from "react"

import { Card, CardMedia, CardActions, Button, IconButton, Typography, Box, Tooltip } from "@mui/material"
import {
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Check as CheckIcon,
} from "@mui/icons-material"
import { useWallpaper, type PexelsPhoto } from "@/components/context/WallpaperContext"
import { useToast } from "@/components/context/ToastContext"
import { scaleIn } from "@/components/theme/animations"
import { useState } from "react"

interface FavoriteCardProps {
  photo: PexelsPhoto
  index: number
}

export default function FavoriteCard({ photo, index }: FavoriteCardProps) {
  const { handlePhotoClick, handleDownloadClick, toggleFavorite } = useWallpaper()
  const { showSharePopup } = useToast()
  const [shareSuccess, setShareSuccess] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()

    const shareUrl = photo.url || `https://www.pexels.com/photo/${photo.id}/`
    const shareText = `Check out this amazing wallpaper by ${photo.photographer}`

    try {
      // Check if Web Share API is supported and available
      if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
        const shareData = {
          title: photo.alt || "Beautiful Wallpaper from Lumina",
          text: shareText,
          url: shareUrl,
        }

        // Check if the data can be shared
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
          showSharePopup("🚀 Wallpaper shared successfully!\nThanks for spreading the beauty!")
          return
        }
      }

      // Fallback to clipboard
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareText} - ${shareUrl}`)
        setShareSuccess(true)
        showSharePopup()
        setTimeout(() => setShareSuccess(false), 1000)
      } else {
        // Final fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = `${shareText} - ${shareUrl}`
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        setShareSuccess(true)
        showSharePopup()
        setTimeout(() => setShareSuccess(false), 1000)
      }
    } catch (err) {
      console.error("Share failed:", err)
      // Silent fallback to clipboard
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl)
          setShareSuccess(true)
          showSharePopup()
          setTimeout(() => setShareSuccess(false), 1000)
        }
      } catch (clipboardErr) {
        console.error("Clipboard fallback failed:", clipboardErr)
      }
    }
  }

  // Remove the handleDownload function - just use handleDownloadClick directly
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDownloadClick(photo) // This opens the resolution modal
  }

  return (
    <Card
      sx={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 4,
        overflow: "hidden",
        animation: `${scaleIn} ${0.5 + (index % 12) * 0.1}s ease-out`,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        width: "100%",
        height: "100%", // Fill the aspect ratio container
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          zIndex: 2, // Ensure hovered card appears above others
          "& .photo-overlay": {
            opacity: 1,
          },
          "& .photo-image": {
            transform: "scale(1.1)",
          },
        },
      }}
      onClick={() => handlePhotoClick(photo)}
    >
      <CardMedia
        className="photo-image"
        component="img"
        image={photo.src.medium}
        alt={photo.alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures image covers the entire container
          objectPosition: "center", // Centers the image within the container
          transition: "transform 0.4s ease",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Box
        className="photo-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { xs: 2, sm: 2.5, md: 3 }, // Responsive padding
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Tooltip title="Remove from favorites" arrow>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(photo.id)
              }}
              sx={{
                bgcolor: "rgba(239, 68, 68, 0.8)",
                backdropFilter: "blur(10px)",
                color: "white",
                width: { xs: 32, sm: 36 }, // Responsive button size
                height: { xs: 32, sm: 36 },
                "&:hover": {
                  bgcolor: "rgba(239, 68, 68, 1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              mb: { xs: 1.5, sm: 2 },
              fontWeight: 500,
              fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font size
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            By {photo.photographer}
          </Typography>
          <CardActions
            sx={{
              p: 0,
              gap: { xs: 0.5, sm: 1 }, // Responsive gap
              flexWrap: "wrap",
            }}
          >
            <Button
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={(e) => {
                e.stopPropagation()
                handlePhotoClick(photo)
              }}
              sx={{
                background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                color: "white",
                borderRadius: 2,
                px: { xs: 1.5, sm: 2 }, // Responsive padding
                fontSize: { xs: "0.7rem", sm: "0.875rem" }, // Responsive font size
                minWidth: { xs: "auto", sm: "auto" },
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                View
              </Box>
            </Button>
            <IconButton
              size="small"
              onClick={handleDownload}
              sx={{
                bgcolor: "rgba(34, 197, 94, 0.8)",
                backdropFilter: "blur(10px)",
                color: "white",
                width: { xs: 28, sm: 32 }, // Responsive button size
                height: { xs: 28, sm: 32 },
                "&:hover": {
                  bgcolor: "rgba(34, 197, 94, 1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
            <Tooltip title="Share wallpaper" arrow>
              <IconButton
                size="small"
                onClick={handleShare}
                sx={{
                  bgcolor: shareSuccess ? "rgba(16, 185, 129, 0.8)" : "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  width: { xs: 28, sm: 32 }, // Responsive button size
                  height: { xs: 28, sm: 32 },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: shareSuccess ? "rgba(16, 185, 129, 1)" : "rgba(255,255,255,0.3)",
                    transform: "scale(1.1)",
                  },
                  ...(shareSuccess && {
                    animation: "successPulse 0.6s ease-out",
                    "@keyframes successPulse": {
                      "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)" },
                      "70%": { transform: "scale(1.05)", boxShadow: "0 0 0 10px rgba(16, 185, 129, 0)" },
                      "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" },
                    },
                  }),
                }}
              >
                {shareSuccess ? <CheckIcon fontSize="small" /> : <ShareIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </CardActions>
        </Box>
      </Box>
    </Card>
  )
}
