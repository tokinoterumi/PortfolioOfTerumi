# Unsplash API Integration Setup

This guide will help you connect your Unsplash account to display your photos in the gallery section.

## Prerequisites

1. **Unsplash Developer Account**: You need an Unsplash account with API access
2. **Access Key**: You'll need to create an application on Unsplash to get your Access Key

## Step 1: Get Your Unsplash API Access Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Sign in with your Unsplash account
3. Click **"New Application"**
4. Fill out the application form:
   - **Application name**: Your portfolio website name
   - **Description**: Brief description of your portfolio
   - **Accept the terms**: Check all the required boxes
5. Click **"Create Application"**
6. Copy your **Access Key** (not the Secret Key)

## Step 2: Configure Your Environment Variables

1. **Create `.env` file** in your project root (if it doesn't exist)
2. **Add your credentials**:
   ```env
   # Unsplash API Configuration
   UNSPLASH_ACCESS_KEY=your_actual_access_key_here
   UNSPLASH_USERNAME=your_unsplash_username
   ```
3. **Replace the values**:
   - Replace `your_actual_access_key_here` with your Access Key from Step 1
   - Replace `your_unsplash_username` with your actual Unsplash username

## Step 3: Update Username in Code (if needed)

The gallery is currently configured for username `driftingislander`. If you want to use a different username:

1. Open `src/routes/gallery/+page.server.js`
2. Change line 8 from:
   ```js
   const photos = await fetchUserPhotos('driftingislander', {
   ```
   to:
   ```js
   const photos = await fetchUserPhotos('your_username_here', {
   ```

## Step 4: Test Your Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```
2. **Visit the gallery page**: Navigate to `/gallery` on your local site
3. **Check for photos**: You should see your Unsplash photos loading

## File Structure

Your Unsplash integration includes these files:

```
src/
├── lib/
│   ├── config/
│   │   └── unsplash.js          # API configuration
│   └── services/
│       └── unsplash.js          # API service functions
└── routes/
    └── gallery/
        └── +page.server.js      # Server-side data loading
```

## Configuration Options

You can customize the photo fetching in `src/routes/gallery/+page.server.js`:

```js
const photos = await fetchUserPhotos('your_username', {
  per_page: 25,           // Number of photos (max 30)
  order_by: 'latest'      // Options: latest, oldest, popular, views, downloads
});
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `UNSPLASH_ACCESS_KEY` | Yes | Your Unsplash API Access Key |
| `UNSPLASH_USERNAME` | No | Your Unsplash username (can be set in code instead) |

## Security Notes

- **Never commit `.env` files** to version control
- The `.env.example` file shows the format without real credentials
- Your Access Key should be kept private
- Use environment variables in production (Vercel, Netlify, etc.)

## API Rate Limits

- Unsplash allows 5,000 requests per hour for demo applications
- For production applications, the limit is 5,000 requests per hour per Access Key
- The current setup caches photos server-side to minimize API calls

## Troubleshooting

### Common Issues:

1. **"Failed to load gallery images"**
   - Check your Access Key is correct
   - Verify your username exists on Unsplash
   - Ensure you have published photos

2. **"Cannot resolve symbol '$lib/services/unsplash.js'"**
   - Make sure all files were created in the correct locations
   - Restart your development server

3. **API Rate Limit Exceeded**
   - Wait for the rate limit to reset (1 hour)
   - Consider implementing caching for production

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add environment variables** in your hosting platform's settings
2. **Don't forget** to set both `UNSPLASH_ACCESS_KEY` and `UNSPLASH_USERNAME`
3. **Test** the gallery page after deployment

## Next Steps

- The gallery component (`src/lib/components/sections/Gallery.svelte`) is already set up to display your photos
- You can customize the gallery layout and styling as needed
- Consider adding photo metadata display (likes, downloads, etc.)