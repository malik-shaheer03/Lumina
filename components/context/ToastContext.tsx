"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material"
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Link as LinkIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
} from "@mui/icons-material"

interface ToastMessage {
  id: string
  message: string
  type: "success" | "info" | "warning" | "error"
  icon?: React.ReactNode
  duration?: number
}

interface PopupMessage {
  id: string
  message: string
  type: "share" | "download"
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, type?: ToastMessage["type"], icon?: React.ReactNode, duration?: number) => void
  showShareSuccess: (message?: string) => void
  showSharePopup: (message?: string) => void
  showDownloadPopup: (message?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

function Toast({ toast, onClose, index }: { toast: ToastMessage; onClose: () => void; index: number }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const getTypeColor = () => {
    switch (toast.type) {
      case "success":
        return "#10b981"
      case "info":
        return "#06b6d4"
      case "warning":
        return "#f59e0b"
      case "error":
        return "#ef4444"
      default:
        return "#10b981"
    }
  }

  const getTypeGradient = () => {
    switch (toast.type) {
      case "success":
        return "linear-gradient(90deg, #10b981, #34d399)"
      case "info":
        return "linear-gradient(90deg, #06b6d4, #38bdf8)"
      case "warning":
        return "linear-gradient(90deg, #f59e0b, #fbbf24)"
      case "error":
        return "linear-gradient(90deg, #ef4444, #f87171)"
      default:
        return "linear-gradient(90deg, #10b981, #34d399)"
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 9999,
        top: isMobile ? "auto" : `${80 + index * 70}px`,
        bottom: isMobile ? `${20 + index * 70}px` : "auto",
        left: isMobile ? "50%" : "auto",
        right: isMobile ? "auto" : "20px",
        transform: isMobile ? "translateX(-50%)" : "none",
        width: isMobile ? "calc(100% - 32px)" : "auto",
        maxWidth: isMobile ? "400px" : "450px",
        minWidth: "300px",
        opacity: isVisible && !isExiting ? 1 : 0,
        transform: `
          ${isMobile ? "translateX(-50%)" : ""} 
          translateY(${isVisible && !isExiting ? "0" : isMobile ? "100px" : "-50px"}) 
          scale(${isVisible && !isExiting ? 1 : 0.9})
        `,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: 3,
          bgcolor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: getTypeGradient(),
            borderRadius: "3px 3px 0 0",
          },
        }}
      >
        <Box
          sx={{
            color: getTypeColor(),
            fontSize: "1.5rem",
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {toast.icon || <CheckCircleIcon fontSize="inherit" />}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? "0.9rem" : "1rem",
              lineHeight: 1.4,
              color: "white",
            }}
          >
            {toast.message}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            p: 0.5,
            flexShrink: 0,
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}

function CenterPopup({ popup, onClose }: { popup: PopupMessage; onClose: () => void }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (popup.duration && popup.duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, popup.duration)
      return () => clearTimeout(timer)
    }
  }, [popup.duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 400)
  }

  const getPopupConfig = () => {
    switch (popup.type) {
      case "share":
        return {
          icon: <ShareIcon sx={{ fontSize: "3rem", color: "#10b981" }} />,
          gradient: "linear-gradient(135deg, #10b981, #34d399)",
          bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))",
        }
      case "download":
        return {
          icon: <DownloadIcon sx={{ fontSize: "3rem", color: "#8b5cf6" }} />,
          gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
          bgGradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
        }
      default:
        return {
          icon: <CheckCircleIcon sx={{ fontSize: "3rem", color: "#10b981" }} />,
          gradient: "linear-gradient(135deg, #10b981, #34d399)",
          bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))",
        }
    }
  }

  const config = getPopupConfig()

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        opacity: isVisible && !isExiting ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: isExiting ? "none" : "auto",
      }}
      onClick={handleClose}
    >
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "90vw" : "400px",
          maxWidth: "400px",
          bgcolor: "rgba(15, 23, 42, 0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: 4,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1)",
          overflow: "hidden",
          transform: isVisible && !isExiting ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: config.bgGradient,
            opacity: 0.3,
          }}
        />

        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "rgba(255, 255, 255, 0.7)",
            zIndex: 1,
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Icon with Animation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: config.gradient,
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  boxShadow: "0 0 0 0 rgba(139, 92, 246, 0.7)",
                },
                "50%": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 0 20px rgba(139, 92, 246, 0)",
                },
              },
            }}
          >
            {config.icon}
          </Box>

          {/* Message */}
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: isMobile ? "1.1rem" : "1.25rem",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {popup.message}
          </Typography>

          {/* Loading Animation for Download */}
          {popup.type === "download" && (
            <Box
              sx={{
                width: "100%",
                height: "4px",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  background: config.gradient,
                  borderRadius: "2px",
                  animation: "loading 3s ease-in-out",
                  "@keyframes loading": {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [popups, setPopups] = useState<PopupMessage[]>([])

  const showToast = useCallback(
    (message: string, type: ToastMessage["type"] = "success", icon?: React.ReactNode, duration = 3000) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast: ToastMessage = { id, message, type, icon, duration }

      setToasts((prev) => [...prev, newToast])
    },
    [],
  )

  const showShareSuccess = useCallback(
    (message = "Link copied to clipboard!") => {
      const shareMessages = [
        "✅ Link copied to clipboard!",
        "🚀 Wallpaper link ready to share!",
        "🔗 You can now share this wallpaper!",
        "📋 Link copied successfully!",
        "✨ Ready to share this beauty!",
      ]

      const randomMessage =
        message === "Link copied to clipboard!"
          ? shareMessages[Math.floor(Math.random() * shareMessages.length)]
          : message

      showToast(randomMessage, "success", <LinkIcon sx={{ color: "#10b981" }} />, 2500)
    },
    [showToast],
  )

  const showSharePopup = useCallback(
    (message = "🔗 Link copied to clipboard!\nReady to share this amazing wallpaper!") => {
      const id = Math.random().toString(36).substr(2, 9)
      const newPopup: PopupMessage = { id, message, type: "share", duration: 3000 }
      setPopups((prev) => [...prev, newPopup])
    },
    [],
  )

  const showDownloadPopup = useCallback(
    (message = "📥 Your download will start in a few seconds...\nPreparing your wallpaper!") => {
      const id = Math.random().toString(36).substr(2, 9)
      const newPopup: PopupMessage = { id, message, type: "download", duration: 3500 }
      setPopups((prev) => [...prev, newPopup])
    },
    [],
  )

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const handleClosePopup = (id: string) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, showShareSuccess, showSharePopup, showDownloadPopup }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast key={toast.id} toast={toast} onClose={() => handleCloseToast(toast.id)} index={index} />
      ))}
      {popups.map((popup) => (
        <CenterPopup key={popup.id} popup={popup} onClose={() => handleClosePopup(popup.id)} />
      ))}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
