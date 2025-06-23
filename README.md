# 🌟 Lumina - Premium Wallpaper Collection

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*A stunning wallpaper discovery platform with cinematic browsing experience*

**🎨 Premium Quality | 📱 Mobile Responsive | ⚡ Lightning Fast**

</div>

## 🚀 Overview

**Lumina** is a premium wallpaper collection platform that transforms the way users discover and download high-quality wallpapers. Built with cutting-edge web technologies, it delivers a cinematic browsing experience with advanced features and a glassmorphism UI design.

### ✨ Key Features

- 🔍 **Smart Search**: Real-time search with instant results
- 🎛️ **Advanced Filtering**: Filter by orientation, categories, and quality
- 📥 **Multi-Resolution Downloads**: Choose from various resolution options
- ❤️ **Favorites System**: Save wallpapers with local storage persistence
- 📱 **Mobile Responsive**: Optimized for all devices and screen sizes
- 🎨 **Glassmorphism UI**: Modern, elegant design with smooth animations
- 🔔 **Custom Notifications**: Beautiful toast notifications for user feedback
- 🔄 **Infinite Scroll**: Seamless browsing without pagination

## 🏗️ Technical Architecture

### Tech Stack

| Technology | Purpose | Features |
|------------|---------|----------|
| **Next.js** | React Framework | SSR, Routing, Optimization |
| **React** | Frontend Library | Component-based Architecture |
| **TypeScript** | Type Safety | Enhanced Development Experience |
| **Material-UI** | Component Library | Pre-built UI Components |
| **Tailwind CSS** | Utility-first CSS | Responsive Design System |
| **Pexels API** | Image Source | High-quality Wallpapers |

### Core Components

1. **Search Engine**: Real-time search with debouncing
2. **Filter System**: Multi-criteria filtering capabilities
3. **Download Manager**: Resolution selector and download handling
4. **Favorites Manager**: Local storage-based favorites system
5. **Responsive Grid**: Adaptive 3x3 layout system

## 🎨 User Experience Features

### Visual Design

- 🌈 **Glassmorphism Effects**: Modern glass-like UI elements
- ✨ **Smooth Animations**: CSS transitions and micro-interactions
- 🎭 **Hover Effects**: Interactive previews and button states
- 📐 **Responsive Grid**: Optimized viewing across all devices

### Interactive Elements

- 🖱️ **Click to Preview**: Full-screen wallpaper preview
- 📱 **Touch Gestures**: Mobile-optimized interactions
- 🔗 **Share Functionality**: Web Share API with fallback options
- 💾 **Download Modal**: Custom resolution selection interface

## 📱 Responsive Design

### Device Optimization

| Device Type | Layout | Features |
|-------------|--------|----------|
| 📱 **Mobile** | Single column | Touch-optimized controls |
| 📟 **Tablet** | 2-column grid | Adaptive spacing |
| 💻 **Desktop** | 3-column grid | Full feature set |
| 🖥️ **Large Screens** | Enhanced grid | Maximum visual impact |

## 🔧 Advanced Features

### Search & Discovery

```typescript
// Smart search implementation
✅ Real-time search suggestions
✅ Debounced API calls for performance
✅ Category-based filtering
✅ Orientation filters (Portrait/Landscape)
✅ Quality-based sorting
```

### Download System

- 📏 **Multiple Resolutions**: Original, Large, Medium, Small
- 💾 **One-click Downloads**: Streamlined download process
- 📊 **Progress Indicators**: Visual download feedback
- 🎯 **Quality Selection**: Choose optimal resolution for use case

### Favorites Management

- ❤️ **Local Storage**: Persistent favorites across sessions
- 🔄 **Sync Across Tabs**: Real-time favorites updates
- 📱 **Mobile Optimized**: Touch-friendly favorites interface
- 🗂️ **Easy Management**: Add/remove with single tap

## 🚀 Getting Started

### Prerequisites

```bash
# Node.js (v16 or higher)
node --version

# npm or yarn
npm --version
```

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/malik-shaheer03/lumina.git

# Navigate to project directory
cd lumina

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Pexels API key to .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Configuration

```env
# .env.local
NEXT_PUBLIC_PEXELS_API_KEY=your-pexels-api-key
```

## 💡 Usage Examples

### Search & Filter

```javascript
// Example search flow
1. User types search query
2. Real-time suggestions appear
3. Apply filters (orientation, category)
4. Infinite scroll loads more results
5. Click for full preview
6. Download in preferred resolution
```

### Favorites Workflow

```javascript
// Favorites management
1. Click heart icon to add to favorites
2. Toast notification confirms action
3. Access favorites from navigation
4. Remove from favorites with single click
5. Persistent across browser sessions
```

## 🌟 Performance Highlights

### Optimization Features

- ⚡ **Lazy Loading**: Images load as needed
- 🔄 **Infinite Scroll**: Smooth pagination
- 💾 **Caching**: Smart API response caching
- 📱 **Mobile Performance**: Optimized for mobile devices
- 🎯 **SEO Optimized**: Next.js SSR benefits

### Metrics

- **First Paint**: < 1.5 seconds
- **Interactive**: < 2 seconds
- **Image Loading**: Progressive with placeholders
- **Mobile Score**: 95+ Lighthouse
- **Desktop Score**: 98+ Lighthouse

## 🎯 Project Structure

```
lumina/
├── components/
│   ├── Search/
│   ├── Gallery/
│   ├── Download/
│   └── Favorites/
├── pages/
│   ├── api/
│   ├── favorites/
│   └── search/
├── hooks/
├── utils/
├── types/
└── styles/
```

## 📊 API Integration

### Pexels API Features

- 🖼️ **High-Quality Images**: Up to 8K resolution
- 🔍 **Advanced Search**: Comprehensive search capabilities
- 📱 **Multiple Formats**: Various aspect ratios
- 🎨 **Curated Collections**: Hand-picked quality content
- 🆓 **Free Usage**: No attribution required

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author
**Muhammad Shaheer Malik**  
- 🌐 [Portfolio](https://shaheer-portfolio-omega.vercel.app)  
- 💼 [LinkedIn](https://linkedin.com/in/malik-shaheer03)  
- 🐙 [GitHub](https://github.com/malik-shaheer03)  
- 📸 [Instagram](https://instagram.com/malik_shaheer03)  
- 📧 [Email Me](mailto:shaheermalik03@gmail.com)  
---

<div align="center">

**⭐ Star this repository if you found it helpful!**

*Discover premium wallpapers with style* 🎨

</div>
