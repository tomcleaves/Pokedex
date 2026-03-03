# Deployment Guide

## GitHub Pages Deployment

### Quick Deploy (Recommended)

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/your-username/rotom-dex.git
   cd rotom-dex
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** > **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://your-username.github.io/rotom-dex/`

### Custom Domain (Optional)

1. Add a `CNAME` file to the root:
   ```bash
   echo "your-domain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. Configure DNS:
   - Add A records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a CNAME record pointing to `your-username.github.io`

3. Enable HTTPS in GitHub Pages settings

## Alternative Hosting Options

### Netlify

1. **Deploy via Git**
   - Connect your GitHub repository
   - Build command: (leave empty)
   - Publish directory: `/`
   - Deploy!

2. **Deploy via Drag & Drop**
   - Zip the project files (index.html, styles.css, app.js)
   - Drag to Netlify drop zone
   - Done!

### Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy.

### Cloudflare Pages

1. Connect your GitHub repository
2. Build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
3. Deploy!

## Local Testing

### Simple HTTP Server

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

### VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Performance Optimization

### Enable Caching

Add these headers (if using custom server):

```
Cache-Control: public, max-age=31536000, immutable
```

For:
- `styles.css`
- `app.js`

### Enable Compression

Enable gzip/brotli compression on your server for:
- HTML files
- CSS files
- JavaScript files

### CDN (Optional)

For better global performance, consider using a CDN:
- Cloudflare (free tier available)
- AWS CloudFront
- Google Cloud CDN

## Security Headers

If using a custom server, add these headers:

```
Content-Security-Policy: default-src 'self' https://pokeapi.co https://raw.githubusercontent.com; style-src 'self' 'unsafe-inline'; script-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Monitoring

### Google Analytics (Optional)

Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Optional)

Consider adding:
- Sentry
- Rollbar
- LogRocket

## Troubleshooting

### Issue: Blank page after deployment

**Solution:** Check browser console for errors. Ensure all file paths are relative (no leading `/`).

### Issue: API calls failing

**Solution:** Ensure you're using HTTPS. PokeAPI requires HTTPS connections.

### Issue: Images not loading

**Solution:** Check that image URLs are correct and accessible. GitHub's raw content URLs should work.

### Issue: Styles not applying

**Solution:** Clear browser cache or do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R).

## Post-Deployment Checklist

- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Verify all images load correctly
- [ ] Test search functionality
- [ ] Test type filtering
- [ ] Test comparison mode
- [ ] Test theme toggle
- [ ] Check console for errors
- [ ] Verify responsive design on different screen sizes
- [ ] Test keyboard navigation
- [ ] Test accessibility with screen reader

## Updating the Site

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes within a few minutes.

## Rollback

If you need to rollback to a previous version:

```bash
git log  # Find the commit hash you want to rollback to
git revert <commit-hash>
git push origin main
```

## Support

For deployment issues:
- GitHub Pages: https://docs.github.com/en/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs

---

Happy deploying! 🚀
