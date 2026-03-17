# Google Analytics Setup Guide for ToolVerse

**Last Updated:** March 17, 2026

---

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Start measuring"** button
3. Sign in with your Google account (create one if you don't have it)
4. Click **"Create"** to set up a new account

---

## Step 2: Set Up Your Property

1. **Account Name:** Enter "ToolVerse" (or your preferred name)
2. Click **"Next"** to proceed
3. **Property Name:** Enter "ToolVerse Website"
4. **Reporting Time Zone:** Select your country/timezone
5. **Currency:** Select your preferred currency (USD recommended)
6. Click **"Create"** to create the property

---

## Step 3: Get Your Measurement ID

1. After creating the property, you'll see a page with your **Measurement ID**
2. The ID will look like this: **G-XXXXXXXXXX** (10 characters after "G-")
3. **Copy this ID** - you'll need it in the next step
4. Keep this page open or note the ID somewhere safe

---

## Step 4: Update Your Website Code

1. Go to your ToolVerse project files
2. Open the file: `client/index.html`
3. Find this line:
   ```html
   <script
     defer
     src="%VITE_ANALYTICS_ENDPOINT%/umami"
     data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"
   ></script>
   ```

4. **Replace it with your Google Analytics code:**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

5. **Replace `G-XXXXXXXXXX` with your actual Measurement ID** (the one you copied in Step 3)
6. Save the file

---

## Step 5: Deploy Your Website

1. After updating the code, deploy your website using the **Publish** button in the Management UI
2. Wait for the deployment to complete (usually 2-5 minutes)
3. Your website will now start tracking analytics data

---

## Step 6: Verify Analytics is Working

1. Go back to [Google Analytics](https://analytics.google.com/)
2. Select your property "ToolVerse Website"
3. Click on **"Real-time"** in the left sidebar
4. Open your website in a new tab: `https://toolverse.manus.space`
5. You should see **1 active user** in Google Analytics within a few seconds
6. This confirms that analytics tracking is working correctly

---

## Step 7: Set Up Google Search Console (Optional but Recommended)

Google Search Console helps you monitor how your website appears in Google Search results.

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add property"**
3. Enter your website URL: `https://toolverse.manus.space`
4. Choose **"URL prefix"** option
5. Click **"Continue"**
6. Follow the verification steps (you'll need to add a DNS record or HTML file)
7. Once verified, submit your sitemap:
   - Go to **"Sitemaps"** in the left menu
   - Enter: `https://toolverse.manus.space/sitemap.xml`
   - Click **"Submit"**

---

## Step 8: Monitor Your Traffic

Now that analytics is set up, you can monitor your website's performance:

### Daily Monitoring
- Check **Real-time** to see active users
- Check **Audience** → **Overview** to see daily visitors
- Check **Engagement** to see which pages are most popular

### Weekly Monitoring
- Review traffic sources (organic, direct, referral)
- Check which tools are most used
- Identify pages with high bounce rates

### Monthly Monitoring
- Analyze traffic trends
- Review top-performing tools and pages
- Plan content improvements based on user behavior

---

## Important Notes

### When to Apply for Google AdSense

- **Wait at least 1 month** after deployment before applying for AdSense
- You should have at least 100-200 daily visitors
- Your website should have quality content and proper legal pages (✅ Already done)
- Google will review your analytics data during the approval process

### What Google Analytics Tracks

- **Page Views:** How many times each page is visited
- **Users:** How many unique visitors you have
- **Bounce Rate:** Percentage of visitors who leave without interacting
- **Session Duration:** How long visitors stay on your site
- **Traffic Sources:** Where your visitors come from (Google, direct, etc.)

### Privacy & Data

- Google Analytics collects anonymized data
- Your visitors' privacy is protected
- You should mention Google Analytics in your Privacy Policy (✅ Already done)
- All data is stored securely by Google

---

## Troubleshooting

### Analytics Not Showing Data

1. **Check your Measurement ID** - Make sure you copied it correctly
2. **Clear browser cache** - Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
3. **Wait 24 hours** - Sometimes it takes time for data to appear
4. **Check real-time** - Open your website and check if you appear in real-time users

### Measurement ID Not Found

1. Go back to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Click **"Admin"** (gear icon) at the bottom left
4. Go to **"Property"** → **"Property settings"**
5. Your Measurement ID will be displayed at the top

### Still Having Issues?

1. Check that your website is deployed (not just in development)
2. Make sure the Measurement ID is correctly placed in `client/index.html`
3. Verify that your website is accessible at `https://toolverse.manus.space`
4. Wait 24-48 hours for initial data to appear

---

## Next Steps After Analytics Setup

1. **Monitor for 1 month** - Let your website collect traffic data
2. **Apply for Google AdSense** - After 1 month, apply at [adsense.google.com](https://adsense.google.com)
3. **Publish more content** - Add more blog posts to drive organic traffic
4. **Optimize based on data** - Use analytics insights to improve your content

---

## Quick Reference

| Item | Value |
|------|-------|
| Analytics URL | https://analytics.google.com |
| Measurement ID Format | G-XXXXXXXXXX |
| Website URL | https://toolverse.manus.space |
| Sitemap URL | https://toolverse.manus.space/sitemap.xml |
| Robots.txt URL | https://toolverse.manus.space/robots.txt |
| Minimum traffic for AdSense | 100-200 daily visitors |
| Recommended wait before AdSense | 1 month |

---

## Support

If you need help with Google Analytics setup:
- Visit [Google Analytics Help Center](https://support.google.com/analytics)
- Check [Google Analytics Documentation](https://developers.google.com/analytics/devguides/collection/gtagjs)
- Contact Google Support through your Analytics account

---

**Your website is now ready to track analytics and prepare for Google AdSense approval!**
