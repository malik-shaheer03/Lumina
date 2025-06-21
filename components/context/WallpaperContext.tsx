"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  alt: string
}

interface PexelsResponse {
  photos: PexelsPhoto[]
  total_results: number
  page: number
  per_page: number
  next_page?: string
}

interface WallpaperContextType {
  photos: PexelsPhoto[]
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string | null
  selectedPhoto: PexelsPhoto | null
  modalOpen: boolean
  downloadModalOpen: boolean
  selectedDownloadPhoto: PexelsPhoto | null
  showFavorites: boolean
  page: number
  hasMore: boolean
  orientation: string
  favorites: Set<number>
  isSearchMode: boolean
  searchResultsCount: number
  screenInfo: {
    width: number
    height: number
    pixelRatio: number
    deviceType: string
  }
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string | null) => void
  setSelectedPhoto: (photo: PexelsPhoto | null) => void
  setModalOpen: (open: boolean) => void
  setDownloadModalOpen: (open: boolean) => void
  setSelectedDownloadPhoto: (photo: PexelsPhoto | null) => void
  setShowFavorites: (show: boolean) => void
  setOrientation: (orientation: string) => void
  handleSearch: (query: string) => void
  handleCategoryClick: (category: string) => void
  handleOrientationChange: (orientation: string) => void
  handlePhotoClick: (photo: PexelsPhoto) => void
  handleDownload: (photo: PexelsPhoto) => Promise<void>
  handleDownloadClick: (photo: PexelsPhoto) => void
  toggleFavorite: (photoId: number) => void
  loadMore: () => void
  clearSearch: () => void
  returnToHome: () => void
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined)

const PEXELS_API_KEY = "AeKl9RPEq9UtbUfw7M7iT0aNqRL4WtwBvHE2XZ3ALHJ0l73bRJjIrGdl"

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [selectedDownloadPhoto, setSelectedDownloadPhoto] = useState<PexelsPhoto | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [orientation, setOrientation] = useState<string>("all")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchResultsCount, setSearchResultsCount] = useState(0)
  const [screenInfo, setScreenInfo] = useState({
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    deviceType: "Desktop",
  })

  // Enhanced screen detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenInfo = () => {
        const width = window.screen.width
        const height = window.screen.height
        const pixelRatio = window.devicePixelRatio || 1

        let deviceType = "Desktop"
        if (width <= 768) {
          deviceType = "Mobile"
        } else if (width <= 1024) {
          deviceType = "Tablet"
        }

        setScreenInfo({
          width,
          height,
          pixelRatio,
          deviceType,
        })
      }

      updateScreenInfo()

      // Listen for screen changes
      window.addEventListener("resize", updateScreenInfo)
      window.addEventListener("orientationchange", () => {
        setTimeout(updateScreenInfo, 100)
      })

      return () => {
        window.removeEventListener("resize", updateScreenInfo)
        window.removeEventListener("orientationchange", updateScreenInfo)
      }
    }
  }, [])

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFavorites = localStorage.getItem("lumina-favorites")
        if (savedFavorites) {
          const favoriteIds = JSON.parse(savedFavorites)
          setFavorites(new Set(favoriteIds))
        }
      } catch (err) {
        console.error("Failed to load favorites:", err)
      }
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("lumina-favorites", JSON.stringify(Array.from(favorites)))
      } catch (err) {
        console.error("Failed to save favorites:", err)
      }
    }
  }, [favorites])

  const fetchPhotos = useCallback(async (query = "", pageNum = 1, reset = false, orientationFilter = "all") => {
    try {
      setLoading(true)
      setError(null)

      const baseUrl = query ? "https://api.pexels.com/v1/search" : "https://api.pexels.com/v1/curated"
      const params = new URLSearchParams({
        page: pageNum.toString(),
        per_page: "24",
      })

      if (query) {
        params.append("query", query)
      }

      if (orientationFilter !== "all") {
        params.append("orientation", orientationFilter)
      }

      const response = await fetch(`${baseUrl}?${params}`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch photos")
      }

      const data: PexelsResponse = await response.json()

      if (reset) {
        setPhotos(data.photos || [])
        setSearchResultsCount(data.total_results || 0)
      } else {
        setPhotos((prev) => [...prev, ...(data.photos || [])])
      }

      setHasMore((data.photos || []).length === 24)

      // Set search mode based on whether we have a query
      setIsSearchMode(!!query)

      // Auto-scroll to top when displaying new search results
      if (reset && query && typeof window !== "undefined") {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPhotos()
    }, 100)

    return () => clearTimeout(timer)
  }, [fetchPhotos])

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim()
    setSearchQuery(trimmedQuery)
    setSelectedCategory(null)
    setPage(1)
    setShowFavorites(false)

    if (trimmedQuery) {
      fetchPhotos(trimmedQuery, 1, true, orientation)
    } else {
      // If empty search, return to home
      returnToHome()
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery("")
    setPage(1)
    setShowFavorites(false)
    setIsSearchMode(true) // Category search is also search mode
    fetchPhotos(category.toLowerCase(), 1, true, orientation)
  }

  const handleOrientationChange = (newOrientation: string) => {
    setOrientation(newOrientation)
    setPage(1)
    setShowFavorites(false)
    const query = searchQuery || (selectedCategory ? selectedCategory.toLowerCase() : "")
    fetchPhotos(query, 1, true, newOrientation)
  }

  const handlePhotoClick = (photo: PexelsPhoto) => {
    if (photo) {
      setSelectedPhoto(photo)
      setModalOpen(true)
    }
  }

  const handleDownloadClick = (photo: PexelsPhoto) => {
    if (photo) {
      setSelectedDownloadPhoto(photo)
      setDownloadModalOpen(true)
    }
  }

  const handleDownload = async (photo: PexelsPhoto) => {
    if (!photo?.src?.original) return

    try {
      const response = await fetch(photo.src.original)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `lumina-wallpaper-${photo.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  const toggleFavorite = (photoId: number) => {
    if (typeof photoId === "number") {
      setFavorites((prev) => {
        const newFavorites = new Set(prev)
        if (newFavorites.has(photoId)) {
          newFavorites.delete(photoId)
        } else {
          newFavorites.add(photoId)
        }
        return newFavorites
      })
    }
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    const query = searchQuery || (selectedCategory ? selectedCategory.toLowerCase() : "")
    fetchPhotos(query, nextPage, false, orientation)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setIsSearchMode(false)
    setPage(1)
    setShowFavorites(false)
    fetchPhotos("", 1, true, orientation)

    // Auto-scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const returnToHome = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setIsSearchMode(false)
    setPage(1)
    setShowFavorites(false)
    setOrientation("all")
    fetchPhotos("", 1, true, "all")

    // Auto-scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <WallpaperContext.Provider
      value={{
        photos,
        loading,
        error,
        searchQuery,
        selectedCategory,
        selectedPhoto,
        modalOpen,
        downloadModalOpen,
        selectedDownloadPhoto,
        showFavorites,
        page,
        hasMore,
        orientation,
        favorites,
        isSearchMode,
        searchResultsCount,
        screenInfo,
        setSearchQuery,
        setSelectedCategory,
        setSelectedPhoto,
        setModalOpen,
        setDownloadModalOpen,
        setSelectedDownloadPhoto,
        setShowFavorites,
        setOrientation,
        handleSearch,
        handleCategoryClick,
        handleOrientationChange,
        handlePhotoClick,
        handleDownload,
        handleDownloadClick,
        toggleFavorite,
        loadMore,
        clearSearch,
        returnToHome,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  )
}

export function useWallpaper() {
  const context = useContext(WallpaperContext)
  if (context === undefined) {
    throw new Error("useWallpaper must be used within a WallpaperProvider")
  }
  return context
}

export type { PexelsPhoto }
