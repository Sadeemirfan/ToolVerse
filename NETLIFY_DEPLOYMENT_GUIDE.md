# ToolVerse - Netlify Deployment Guide

**Complete Step-by-Step Guide to Deploy Your Website on Netlify**

---

## Prerequisites

Before starting, make sure you have:
- [ ] GitHub account (github.com)
- [ ] Netlify account (netlify.com)
- [ ] Domain name (toolsbox.io or your chosen domain)
- [ ] Domain registrar account (Namecheap, Cloudflare, etc.)

---

## Step 1: Prepare Your Code for Deployment

### 1.1 Build Your Project Locally
```bash
cd /home/ubuntu/toolverse
pnpm install
pnpm build
```

This creates a `dist` folder with your production-ready code.

### 1.2 Verify Build Output
Check that the `dist` folder contains:
- `index.html` - Main entry point
- `assets/` - CSS and JavaScript files
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Search engine instructions

---

## Step 2: Push Code to GitHub

### 2.1 Create GitHub Repository
1. Go to github.com and log in
2. Click "+" icon → "New repository"
3. Name it: `ToolVerse`
4. Description: "Free online tools for productivity, SEO, and development"
5. Choose "Public" (for better SEO)
6. Click "Create repository"

### 2.2 Push Your Code
```bash
cd /home/ubuntu/toolverse
git remote set-url origin https://github.com/Sadeemirfan/ToolVerse.git
git branch -M main
git push -u origin main
```

**If you get authentication errors:**
1. Go to github.com/settings/tokens
2. Create "Personal access token"
3. Use token as password when prompted

---

## Step 3: Deploy to Netlify

### 3.1 Connect GitHub to Netlify
1. Go to netlify.com and log in
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your GitHub account
5. Select "Sadeemirfan/ToolVerse" repository
6. Click "Install"

### 3.2 Configure Build Settings
Netlify will auto-detect your build settings:
- **Build command:** `pnpm build`
- **Publish directory:** `dist`
- **Node version:** 22.13.0

If not auto-detected, set manually:
1. Click "Site settings"
2. Go to "Build & deploy" → "Build settings"
3. Set:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. Save

### 3.3 Deploy
1. Click "Deploy site"
2. Wait for build to complete (2-5 minutes)
3. Your site is now live at: `https://[random-name].netlify.app`

---

## Step 4: Connect Custom Domain

### 4.1 Add Domain to Netlify
1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain: `toolsbox.io` (or your chosen domain)
4. Click "Verify"
5. Netlify will check if you own the domain

### 4.2 Update DNS Records
Netlify will provide DNS records to add to your registrar.

**If using Namecheap:**
1. Go to namecheap.com and log in
2. Go to "My Domains"
3. Click "Manage" next to your domain
4. Go to "Advanced DNS" tab
5. Add Netlify's DNS records:
   - Type: `CNAME`
   - Host: `www`
   - Value: `[your-site].netlify.app`
6. Save changes
7. Wait 24-48 hours for DNS propagation

**If using Cloudflare:**
1. Go to cloudflare.com and log in
2. Select your domain
3. Go to "DNS" tab
4. Add Netlify's DNS records
5. Save changes

### 4.3 Enable HTTPS
1. In Netlify, go to "Domain management"
2. Click your domain
3. Scroll to "HTTPS"
4. Click "Verify DNS configuration"
5. Netlify automatically provisions SSL certificate (free)
6. Enable "Force HTTPS" for security

### 4.4 Verify Domain Connection
1. Wait 24-48 hours for DNS propagation
2. Visit `https://yourdomain.com`
3. Your ToolVerse site should load
4. Check SSL certificate (green lock icon)

---

## Step 5: Configure Environment Variables (Optional)

If you have environment variables:
1. Go to "Site settings" → "Build & deploy" → "Environment"
2. Click "Edit variables"
3. Add your variables:
   - `VITE_ANALYTICS_WEBSITE_ID` - Your analytics ID
   - `VITE_APP_TITLE` - App title
   - etc.
4. Redeploy site

---

## Step 6: Set Up Continuous Deployment

### 6.1 Auto-Deploy on GitHub Push
Netlify automatically deploys when you push to GitHub:
1. Make changes to your code
2. Commit and push to GitHub: `git push origin main`
3. Netlify automatically builds and deploys
4. Your site updates in 2-5 minutes

### 6.2 Preview Deploys
Netlify creates preview deploys for pull requests:
1. Create a new branch: `git checkout -b feature/new-tool`
2. Make changes and commit
3. Push to GitHub: `git push origin feature/new-tool`
4. Create pull request on GitHub
5. Netlify creates preview URL
6. Test before merging to main

---

## Step 7: Configure SEO & Analytics

### 7.1 Update Meta Tags
1. Edit `client/index.html`
2. Update title and meta description
3. Add Open Graph tags for social sharing
4. Commit and push to GitHub

### 7.2 Set Up Google Search Console
1. Go to search.google.com/search-console
2. Click "URL prefix" property
3. Enter your domain: `https://yourdomain.com`
4. Verify ownership (add DNS record)
5. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 7.3 Set Up Google Analytics
1. Go to analytics.google.com
2. Create new property for your domain
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `client/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
5. Commit and push to GitHub

---

## Step 8: Optimize Performance

### 8.1 Enable Netlify Caching
1. Go to "Site settings" → "Build & deploy" → "Cache"
2. Click "Clear cache and retry"
3. This clears old builds

### 8.2 Configure Cache Headers
Create `netlify.toml` in your project root:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 8.3 Enable Gzip Compression
Netlify automatically enables gzip compression for all files.

---

## Step 9: Monitor & Maintain

### 9.1 Monitor Deployments
1. Go to "Deploys" tab in Netlify
2. View deployment history
3. Check build logs for errors
4. Rollback to previous version if needed

### 9.2 Monitor Performance
1. Go to "Analytics" tab in Netlify
2. View traffic, bandwidth, and build times
3. Monitor error rates

### 9.3 Regular Updates
1. Update tools and content regularly
2. Push changes to GitHub
3. Netlify automatically deploys
4. Monitor performance and rankings

---

## Step 10: Set Up AdSense

### 10.1 Prepare for AdSense
1. Ensure your domain is live for 30+ days
2. Have 100+ monthly visitors
3. Have original content (blog posts)
4. Have privacy policy and terms of service
5. No prohibited content

### 10.2 Apply for AdSense
1. Go to adsense.google.com
2. Click "Sign up"
3. Enter your domain
4. Add AdSense code to your site
5. Wait for approval (24-48 hours)

### 10.3 Add AdSense Code
Add to `client/index.html` in `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

---

## Troubleshooting

### Build Fails
**Error:** "pnpm: command not found"
**Solution:** Netlify uses npm by default. Add `netlify.toml`:
```toml
[build]
  command = "npm install -g pnpm && pnpm install && pnpm build"
  publish = "dist"
```

### Domain Not Connecting
**Error:** "DNS configuration not found"
**Solution:** 
1. Wait 24-48 hours for DNS propagation
2. Check DNS records are correct in registrar
3. Use DNS checker: dnschecker.org

### Site Shows Blank Page
**Error:** "404 Not Found"
**Solution:**
1. Check build logs for errors
2. Verify `dist` folder has `index.html`
3. Rebuild site: Click "Trigger deploy" → "Deploy site"

### Slow Performance
**Error:** "Site takes too long to load"
**Solution:**
1. Optimize images
2. Enable caching headers
3. Use CDN (Netlify CDN is automatic)
4. Minify CSS/JavaScript (Vite does this)

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify connected to GitHub
- [ ] Build settings configured
- [ ] Site deployed successfully
- [ ] Custom domain added
- [ ] DNS records updated
- [ ] HTTPS enabled
- [ ] Domain verified
- [ ] Google Search Console set up
- [ ] Google Analytics installed
- [ ] Sitemap submitted
- [ ] AdSense code added
- [ ] Performance optimized
- [ ] SEO optimized

---

## Next Steps After Deployment

1. **Monitor Traffic** - Check Google Analytics daily
2. **Build Backlinks** - Submit to tool directories
3. **Create Content** - Write 10-15 more blog posts
4. **Engage on Social** - Share tools on Twitter, Reddit, LinkedIn
5. **Apply for AdSense** - After 30 days and 100+ visitors
6. **Optimize Content** - Update based on search rankings
7. **Add More Tools** - Expand your tool collection
8. **Build Email List** - Collect emails for promotions

---

## Support Resources

- **Netlify Docs:** netlify.com/docs
- **GitHub Help:** docs.github.com
- **Google Search Console Help:** support.google.com/webmasters
- **Google Analytics Help:** support.google.com/analytics

---

**Your ToolVerse website is now live on Netlify with your custom domain!**
**Start building traffic and earning with AdSense!**
