"use client"

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Close as CloseIcon, Download as DownloadIcon, Monitor as MonitorIcon } from "@mui/icons-material"
import { useWallpaper } from "@/components/context/WallpaperContext"
import { useToast } from "@/components/context/ToastContext"
import { useEffect, useState } from "react"

interface ResolutionOption {
  label: string
  url: string
  size: string
  recommended?: boolean
  fileSize?: string
}

export default function DownloadModal() {
  const { downloadModalOpen, setDownloadModalOpen, selectedDownloadPhoto, handleDownload } = useWallpaper()
  const { showDownloadPopup } = useToast()
  const [screenResolution, setScreenResolution] = useState<string>("")
  const [deviceInfo, setDeviceInfo] = useState<string>("")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenInfo = () => {
        const width = window.screen.width
        const height = window.screen.height
        const pixelRatio = window.devicePixelRatio || 1
        const actualWidth = Math.round(width * pixelRatio)
        const actualHeight = Math.round(height * pixelRatio)

        setScreenResolution(`${width}x${height}`)

        // Detect device type
        let deviceType = "Desktop"
        if (width <= 768) {
          deviceType = "Mobile"
        } else if (width <= 1024) {
          deviceType = "Tablet"
        }

        setDeviceInfo(`${deviceType} • ${actualWidth}x${actualHeight} (${pixelRatio}x DPI)`)
      }

      updateScreenInfo()
      window.addEventListener("resize", updateScreenInfo)
      window.addEventListener("orientationchange", updateScreenInfo)

      return () => {
        window.removeEventListener("resize", updateScreenInfo)
        window.removeEventListener("orientationchange", updateScreenInfo)
      }
    }
  }, [])

  if (!selectedDownloadPhoto) return null

  const getResolutionOptions = (): ResolutionOption[] => {
    const photo = selectedDownloadPhoto
    const options: ResolutionOption[] = []

    // Get current screen resolution for recommendation
    const screenWidth = typeof window !== "undefined" ? window.screen.width : 1920
    const screenHeight = typeof window !== "undefined" ? window.screen.height : 1080
    const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

    // Calculate actual screen resolution
    const actualScreenWidth = Math.round(screenWidth * pixelRatio)
    const actualScreenHeight = Math.round(screenHeight * pixelRatio)

    // Add available resolutions with estimated file sizes
    if (photo.src.original) {
      const isRecommended = photo.width >= actualScreenWidth && photo.height >= actualScreenHeight
      options.push({
        label: "Original",
        url: photo.src.original,
        size: `${photo.width}x${photo.height}`,
        fileSize: "~2-5 MB",
        recommended: isRecommended,
      })
    }

    if (photo.src.large2x) {
      options.push({
        label: "Large 2x",
        url: photo.src.large2x,
        size: "1920x1280",
        fileSize: "~1-3 MB",
        recommended: !options.some((opt) => opt.recommended) && actualScreenWidth <= 1920,
      })
    }

    if (photo.src.large) {
      options.push({
        label: "Large",
        url: photo.src.large,
        size: "1024x683",
        fileSize: "~500 KB",
        recommended: !options.some((opt) => opt.recommended) && actualScreenWidth <= 1024,
      })
    }

    if (photo.src.medium) {
      options.push({
        label: "Medium",
        url: photo.src.medium,
        size: "640x427",
        fileSize: "~200 KB",
        recommended: !options.some((opt) => opt.recommended),
      })
    }

    return options
  }

  const resolutionOptions = getResolutionOptions()

  const handleDownloadWithUrl = async (url: string, label: string, showPopup = true) => {
    try {
      // Show the download popup first if requested
      if (showPopup) {
        showDownloadPopup(`📥 Downloading ${label} quality...\nYour wallpaper will be ready in a few seconds!`)

        // Small delay to show the popup before starting download
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `lumina-wallpaper-${selectedDownloadPhoto.id}-${label.toLowerCase().replace(" ", "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      setDownloadModalOpen(false)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  const handleRecommendedDownload = async () => {
    const recommendedOption = resolutionOptions.find((opt) => opt.recommended) || resolutionOptions[0]
    if (recommendedOption) {
      await handleDownloadWithUrl(recommendedOption.url, recommendedOption.label, true)
    }
  }

  return (
    <Modal
      open={downloadModalOpen}
      onClose={() => setDownloadModalOpen(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: isMobile ? 1 : 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: isMobile ? "95vw" : isTablet ? "80vw" : "500px",
          maxHeight: isMobile ? "90vh" : "85vh",
          bgcolor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: isMobile ? 3 : 4,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          outline: "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: isMobile ? 2 : 3,
            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexShrink: 0,
          }}
        >
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: isMobile ? "1.1rem" : "1.25rem",
                lineHeight: 1.2,
              }}
            >
              Choose Download Quality
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, flexWrap: "wrap" }}>
              <MonitorIcon sx={{ color: "rgba(255,255,255,0.6)", fontSize: isMobile ? "0.9rem" : "1rem" }} />
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                }}
              >
                {deviceInfo}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setDownloadModalOpen(false)}
            sx={{
              color: "white",
              p: isMobile ? 1 : 1.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <CloseIcon fontSize={isMobile ? "medium" : "large"} />
          </IconButton>
        </Box>

        {/* Photo Preview */}
        <Box
          sx={{
            p: isMobile ? 2 : 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={selectedDownloadPhoto.src.small}
            alt={selectedDownloadPhoto.alt}
            sx={{
              width: isMobile ? 50 : 60,
              height: isMobile ? 50 : 60,
              objectFit: "cover",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "white",
                fontWeight: 500,
                fontSize: isMobile ? "0.9rem" : "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedDownloadPhoto.alt || "Wallpaper"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: isMobile ? "0.75rem" : "0.875rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              By {selectedDownloadPhoto.photographer}
            </Typography>
          </Box>
        </Box>

        {/* Resolution Options */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <List sx={{ p: 0 }}>
            {resolutionOptions.map((option, index) => (
              <ListItem key={index} sx={{ p: 0 }}>
                <ListItemButton
                  onClick={() => handleDownloadWithUrl(option.url, option.label, true)}
                  sx={{
                    py: isMobile ? 1.5 : 2,
                    px: isMobile ? 2 : 3,
                    "&:hover": {
                      bgcolor: "rgba(139, 92, 246, 0.1)",
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
                      <Box
                        component="span"
                        sx={{
                          color: "white",
                          fontWeight: 500,
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          fontFamily: theme.typography.subtitle1.fontFamily,
                        }}
                      >
                        {option.label}
                      </Box>
                      {option.recommended && (
                        <Chip
                          label="Recommended"
                          size="small"
                          sx={{
                            bgcolor: "rgba(139, 92, 246, 0.2)",
                            color: "#a78bfa",
                            fontSize: isMobile ? "0.65rem" : "0.75rem",
                            height: isMobile ? "20px" : "24px",
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 0 : 2 }}>
                      <Box
                        component="span"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: isMobile ? "0.75rem" : "0.875rem",
                          fontFamily: theme.typography.body2.fontFamily,
                        }}
                      >
                        {option.size}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: isMobile ? "0.7rem" : "0.8rem",
                          fontFamily: theme.typography.body2.fontFamily,
                        }}
                      >
                        {option.fileSize}
                      </Box>
                    </Box>
                  </Box>
                  <DownloadIcon
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: isMobile ? "1.2rem" : "1.5rem",
                    }}
                  />
                </ListItemButton>
                {index < resolutionOptions.length - 1 && <Divider sx={{ bgcolor: "rgba(148, 163, 184, 0.1)" }} />}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: isMobile ? 2 : 3,
            borderTop: "1px solid rgba(148, 163, 184, 0.1)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "flex-end",
            gap: isMobile ? 1.5 : 2,
            flexShrink: 0,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setDownloadModalOpen(false)}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              fontSize: isMobile ? "0.85rem" : "0.875rem",
              py: isMobile ? 1.5 : 1,
              order: isMobile ? 2 : 1,
              "&:hover": {
                borderColor: "rgba(255,255,255,0.5)",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleRecommendedDownload}
            sx={{
              background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              fontSize: isMobile ? "0.85rem" : "0.875rem",
              py: isMobile ? 1.5 : 1,
              order: isMobile ? 1 : 2,
              "&:hover": {
                boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Download Recommended
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
