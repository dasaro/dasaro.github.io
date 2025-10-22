# Image Setup Guide

**Project:** dasaro.github.io
**Date Created:** October 2025
**Purpose:** Manual guide for downloading and optimizing images from Google Sites

---

## Overview

This guide will help you manually download images from your Google Sites profile page and integrate them into your academic website. Since automated download of binary files isn't possible, this guide provides step-by-step instructions for manual setup.

**Source:** https://sites.google.com/view/fdasaro

---

## Directory Structure (Already Created)

```
images/
├── profile/          # Profile photos
├── research/         # Research diagrams and visualizations
├── institutions/     # University/lab logos
├── misc/            # Other images
└── favicon/         # Favicon files (all sizes)
```

✅ **Status:** All directories have been created and are ready for images.

---

## Step 1: Download Profile Photo

### From Google Sites

1. Visit https://sites.google.com/view/fdasaro
2. Look for your profile photo (typically in the header or about section)
3. Right-click on the image → "Save image as..."
4. Save as: `profile-fabio-dasaro-original.jpg` (to your Downloads folder)

### Optimize the Image

**Option A: Online Tool (Recommended for simplicity)**

1. Go to https://squoosh.app
2. Upload `profile-fabio-dasaro-original.jpg`
3. Settings:
   - Resize: Width 400px (maintain aspect ratio)
   - Format: JPEG (MozJPEG)
   - Quality: 85%
4. Download the optimized image
5. Rename to: `profile-fabio-dasaro.jpg`

**Option B: Command Line (ImageMagick)**

```bash
# Install ImageMagick (if not already installed)
brew install imagemagick

# Resize and optimize
convert profile-fabio-dasaro-original.jpg \
  -resize 400x400^ \
  -gravity center \
  -extent 400x400 \
  -quality 85 \
  profile-fabio-dasaro.jpg
```

### Place the Image

```bash
# Move optimized image to profile directory
mv ~/Downloads/profile-fabio-dasaro.jpg images/profile/
```

---

## Step 2: Create Favicon Files

You'll need to create multiple sizes of the favicon from your profile photo (or a custom icon).

### Using Online Tool (Easiest)

1. Go to https://realfavicongenerator.net
2. Upload your profile photo or a custom icon
3. Configure settings:
   - iOS: Use original image, no background
   - Android: Use original image
   - Theme color: `#8B0000` (dark red)
4. Generate and download the favicon package
5. Extract files to `images/favicon/`

### Using ImageMagick (Command Line)

```bash
cd images/favicon/

# Start with your profile photo or a custom icon
SOURCE="../../downloads/profile-fabio-dasaro-original.jpg"

# Generate all required sizes
convert "$SOURCE" -resize 512x512 -quality 90 favicon-512x512.png
convert "$SOURCE" -resize 192x192 -quality 90 favicon-192x192.png
convert "$SOURCE" -resize 180x180 -quality 90 apple-touch-icon.png
convert "$SOURCE" -resize 32x32 -quality 90 favicon-32x32.png
convert "$SOURCE" -resize 16x16 -quality 90 favicon-16x16.png
```

### Verify Favicon Files

```bash
ls -lh images/favicon/
```

**Expected output:**
```
favicon-512x512.png       (~50KB)
favicon-192x192.png       (~20KB)
favicon-32x32.png         (~2KB)
favicon-16x16.png         (~1KB)
apple-touch-icon.png      (~30KB)
site.webmanifest          (~1KB) ✅ Already created
```

---

## Step 3: Optional - Download Institutional Logos

If your Google Sites page has institutional logos (University of Salento, Verona, UCL), download them:

### For Each Logo:

1. Right-click on logo → "Save image as..."
2. Save with descriptive name: `logo-[institution]-original.png`
3. Optimize:
   ```bash
   # Resize to max height 200px
   convert logo-unisalento-original.png \
     -resize x200 \
     -quality 90 \
     logo-unisalento.png

   # Move to institutions directory
   mv logo-unisalento.png images/institutions/
   ```

4. Repeat for other institutions:
   - `logo-univr.png` (University of Verona)
   - `logo-ucl.png` (UCL)

---

## Step 4: Optional - Download Research Images

If you have diagrams or visualizations on your Google Sites:

1. Right-click each image → "Save image as..."
2. Use descriptive names: `diagram-[topic].png`
3. Optimize:
   ```bash
   # For diagrams, use PNG to preserve quality
   convert diagram-event-calculus-original.png \
     -resize 1200x \
     -quality 95 \
     diagram-event-calculus.png

   mv diagram-event-calculus.png images/research/
   ```

---

## Step 5: Verify Image Integration

### Check Profile Photo

1. Open the website locally or on GitHub Pages
2. Visit the homepage
3. You should see:
   - Profile photo in hero section (circular, 200x200)
   - Hover effect (slight zoom)
   - Mobile responsive (centered on small screens)

### Check Favicon

1. Open the website in a browser
2. Look at the browser tab - you should see your favicon
3. Test on different devices:
   - Desktop browsers (Chrome, Firefox, Safari)
   - Mobile browsers (iOS Safari, Android Chrome)
   - Check bookmark/home screen icon appearance

### Troubleshooting

**Profile photo not showing:**
- Check file name: Must be exactly `profile-fabio-dasaro.jpg`
- Check location: Must be in `images/profile/`
- Check file size: Should be < 100KB for good performance
- Clear browser cache and reload

**Favicon not showing:**
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check all required files exist in `images/favicon/`
- Wait a few minutes - browsers cache favicons aggressively

---

## Image Optimization Quick Reference

### Recommended Tools

1. **Squoosh.app** (Web-based, easiest)
   - No installation required
   - Visual quality comparison
   - Supports all formats

2. **ImageOptim** (Mac only, drag-and-drop)
   - https://imageoptim.com
   - Lossless optimization
   - Batch processing

3. **ImageMagick** (Command line, most powerful)
   - Install: `brew install imagemagick`
   - Scriptable and automatable

### Compression Targets

| Image Type | Max Size | Target File Size | Format |
|------------|----------|------------------|--------|
| Profile photo | 400x400 | 50-80KB | JPEG |
| Institutional logo | 200px height | 20-30KB | PNG |
| Research diagram | 1200px width | 100-150KB | PNG/SVG |
| Favicon 512 | 512x512 | 40-60KB | PNG |
| Favicon 192 | 192x192 | 15-25KB | PNG |
| Favicon 32 | 32x32 | 1-3KB | PNG |
| Favicon 16 | 16x16 | <1KB | PNG |

---

## HTML/CSS Implementation (Already Done)

✅ **Hero section updated** with profile photo container
✅ **CSS styling added** for circular profile photo with hover effect
✅ **Favicon links added** to index.html `<head>`
✅ **Responsive layout** configured for mobile/desktop
✅ **Site manifest** created for PWA support

---

## Next Steps

### 1. Download & Place Profile Photo (Priority 1)

```bash
# After downloading and optimizing
mv profile-fabio-dasaro.jpg images/profile/
```

### 2. Create Favicon Files (Priority 2)

```bash
# Use realfavicongenerator.net or ImageMagick commands above
# Place all files in images/favicon/
```

### 3. Test Locally

```bash
# If using Python's simple HTTP server
cd /Users/fdasaro/Desktop/dasaro.github.io
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### 4. Commit & Deploy

```bash
git add images/
git commit -m "feat: Add profile photo and favicon

- Add optimized profile photo (profile-fabio-dasaro.jpg)
- Generate favicon files in all required sizes
- Integrate profile photo in hero section with circular styling
- Add favicon support for all platforms (iOS, Android, desktop)

🖼️ Images follow standards defined in CLAUDE.md"

git push origin main
```

### 5. Verify on GitHub Pages

1. Wait 1-2 minutes for GitHub Pages to rebuild
2. Visit https://dasaro.github.io
3. Check profile photo and favicon display correctly
4. Test on mobile device

---

## Standards Compliance

All image integration follows the standards defined in `CLAUDE.md` under **"Image Architecture & Standards"**:

- ✅ Proper directory structure
- ✅ Naming conventions followed
- ✅ Optimization guidelines applied
- ✅ Accessibility (alt text) configured
- ✅ Responsive design implemented
- ✅ Performance optimized (lazy loading)
- ✅ Cross-browser compatibility

---

## Support

**Questions?** Refer to:
- `CLAUDE.md` - Section "Image Architecture & Standards"
- `css/COMPONENTS.md` - Component usage examples
- `css/main.css` - Lines 736-775 for image styling

**Optimization Issues?**
- Try different tools (Squoosh vs ImageMagick)
- Balance quality vs file size (target 85% quality for photos)
- Use PNG for graphics, JPEG for photos

---

**Last Updated:** October 2025
**Status:** Infrastructure ready, awaiting manual image placement
