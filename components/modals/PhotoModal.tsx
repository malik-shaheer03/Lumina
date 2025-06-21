"use client"

import { Modal, Box, IconButton, Typography, Button, Chip, useMediaQuery, useTheme } from "@mui/material"
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  AspectRatio as AspectRatioIcon,
  Person as PersonIcon,
  Check as CheckIcon,
} from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import { useToast } from "@/components/context/ToastContext"
import { useState } from "react"

export default function PhotoModal() {
  const { modalOpen, setModalOpen, selectedPhoto, favorites, handleDownloadClick, toggleFavorite } = useWallpaper()
  const { showSharePopup } = useToast()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  if (!selectedPhoto) return null

  const handleShare = async () => {
    const shareUrl = selectedPhoto.url || `https://www.pexels.com/photo/${selectedPhoto.id}/`
    const shareText = `Check out this amazing wallpaper by ${selectedPhoto.photographer}`

    try {
      // Check if Web Share API is supported and available
      if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
        const shareData = {
          title: selectedPhoto.alt || "Beautiful Wallpaper from Lumina",
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
        setTimeout(() => setShareSuccess(false), 1500)
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
        setTimeout(() => setShareSuccess(false), 1500)
      }
    } catch (err) {
      console.error("Share failed:", err)
      // Silent fallback to clipboard
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl)
          setShareSuccess(true)
          showSharePopup()
          setTimeout(() => setShareSuccess(false), 1500)
        }
      } catch (clipboardErr) {
        console.error("Clipboard fallback failed:", clipboardErr)
      }
    }
  }

  // Remove the handleDownload function - just use handleDownloadClick directly
  const handleDownload = () => {
    handleDownloadClick(selectedPhoto) // This opens the resolution modal
  }

  const getOrientationLabel = () => {
    const { width, height } = selectedPhoto
    if (width > height) return "Landscape"
    if (height > width) return "Portrait"
    return "Square"
  }

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false)
        setImageLoaded(false)
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "95vw" : "90vw",
          height: isMobile ? "90vh" : "85vh",
          maxWidth: "1200px",
          bgcolor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          outline: "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setModalOpen(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Image Section */}
        <Box
          sx={{
            flex: isMobile ? "0 0 60%" : "1 1 70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {!imageLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60px",
                height: "60px",
                border: "3px solid rgba(139, 92, 246, 0.3)",
                borderTop: "3px solid #8b5cf6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
                  "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
                },
              }}
            />
          )}
          <Box
            component="img"
            src={selectedPhoto.src.large}
            alt={selectedPhoto.alt}
            onLoad={() => setImageLoaded(true)}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 2,
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.5s ease",
              cursor: "zoom-in",
              "&:hover": {
                transform: "scale(1.02)",
              },
              transition: "all 0.3s ease",
            }}
          />
        </Box>

        {/* Details Section */}
        <Box
          sx={{
            flex: isMobile ? "1" : "0 0 30%",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderLeft: isMobile ? "none" : "1px solid rgba(148, 163, 184, 0.1)",
            borderTop: isMobile ? "1px solid rgba(148, 163, 184, 0.1)" : "none",
            overflow: "auto",
          }}
        >
          {/* Title and Photographer */}
          <Box>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                color: "white",
                fontWeight: 600,
                mb: 2,
                lineHeight: 1.3,
              }}
            >
              {selectedPhoto.alt || "Beautiful Wallpaper"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "1.2rem" }} />
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                }}
              >
                {selectedPhoto.photographer}
              </Typography>
            </Box>
          </Box>

          {/* Image Details */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AspectRatioIcon sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "1.2rem" }} />
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                {selectedPhoto.width} × {selectedPhoto.height}
              </Typography>
            </Box>
            <Chip
              label={getOrientationLabel()}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(139, 92, 246, 0.2)",
                color: "#a78bfa",
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: "auto" }}>
            {/* Favorite Button */}
            <Button
              variant="contained"
              startIcon={<FavoriteIcon />}
              onClick={() => toggleFavorite(selectedPhoto.id)}
              sx={{
                background: favorites.has(selectedPhoto.id)
                  ? "linear-gradient(45deg, #ec4899, #f97316)"
                  : "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: favorites.has(selectedPhoto.id) ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                py: 1.5,
                fontSize: isMobile ? "0.9rem" : "1rem",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: favorites.has(selectedPhoto.id)
                    ? "0 10px 30px rgba(236, 72, 153, 0.4)"
                    : "0 10px 30px rgba(255, 255, 255, 0.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {favorites.has(selectedPhoto.id) ? "Remove from Favorites" : "Add to Favorites"}
            </Button>

            {/* Download Button */}
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                color: "white",
                py: 1.5,
                fontSize: isMobile ? "0.9rem" : "1rem",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Download HD
            </Button>

            {/* Share Button */}
            <Button
              variant="outlined"
              startIcon={shareSuccess ? <CheckIcon /> : <ShareIcon />}
              onClick={handleShare}
              sx={{
                borderColor: shareSuccess ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.3)",
                color: shareSuccess ? "#10b981" : "white",
                bgcolor: shareSuccess ? "rgba(16, 185, 129, 0.1)" : "transparent",
                py: 1.5,
                fontSize: isMobile ? "0.9rem" : "1rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: shareSuccess ? "rgba(16, 185, 129, 0.7)" : "rgba(255, 255, 255, 0.5)",
                  bgcolor: shareSuccess ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  transform: "translateY(-2px)",
                },
                ...(shareSuccess && {
                  animation: "successGlow 0.8s ease-out",
                  "@keyframes successGlow": {
                    "0%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)" },
                    "70%": { boxShadow: "0 0 0 10px rgba(16, 185, 129, 0)" },
                    "100%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" },
                  },
                }),
              }}
            >
              {shareSuccess ? "Shared!" : "Share"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
