"use client"
import { Box } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { WallpaperProvider } from "@/components/context/WallpaperContext"
import { ToastProvider } from "@/components/context/ToastContext"
import Navigation from "@/components/layout/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import SearchResultsHeader from "@/components/sections/SearchResultsHeader"
import CategoriesSection from "@/components/sections/CategoriesSection"
import FiltersSection from "@/components/sections/FiltersSection"
import PhotoGrid from "@/components/sections/PhotoGrid"
import FavoritesSection from "@/components/sections/FavoritesSection"
import EmptySearchState from "@/components/sections/EmptySearchState"
import PhotoModal from "@/components/modals/PhotoModal"
import DownloadModal from "@/components/modals/DownloadModal"
import ScrollToTop from "@/components/ui/ScrollToTop"
import AnimatedBackground from "@/components/ui/AnimatedBackground"
import { theme } from "@/components/theme/theme"
import { useWallpaper } from "@/components/context/WallpaperContext"

function AppContent() {
  const { showFavorites, isSearchMode, photos } = useWallpaper()

  // Show favorites view
  if (showFavorites) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", position: "relative" }}>
        <AnimatedBackground />
        <Navigation />
        <FavoritesSection />
        <PhotoModal />
        <DownloadModal />
        <ScrollToTop />
      </Box>
    )
  }

  // Show search results (empty or with results)
  if (isSearchMode) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", position: "relative" }}>
        <AnimatedBackground />
        <Navigation />
        <HeroSection />
        <SearchResultsHeader />
        {photos.length === 0 ? (
          <EmptySearchState />
        ) : (
          <>
            <FiltersSection />
            <PhotoGrid />
          </>
        )}
        <PhotoModal />
        <DownloadModal />
        <ScrollToTop />
      </Box>
    )
  }

  // Show default home view
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", position: "relative" }}>
      <AnimatedBackground />
      <Navigation />
      <HeroSection />
      <CategoriesSection />
      <FiltersSection />
      <PhotoGrid />
      <PhotoModal />
      <DownloadModal />
      <ScrollToTop />
    </Box>
  )
}

export default function LuminaApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <WallpaperProvider>
          <AppContent />
        </WallpaperProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
