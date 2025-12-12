# DUNIA Web

Landing page, auth callbacks, and Universal Links for the DUNIA iOS app.

## Structure

```
dunia-web/
├── index.html                    # Landing page
├── auth/callback/index.html      # Auth redirect handler
├── privacy/index.html            # Privacy policy
├── terms/index.html              # Terms of service
├── public/
│   └── .well-known/
│       └── apple-app-site-association  # Universal Links
└── vercel.json                   # Vercel config
```

## Deployment

1. Push to GitHub
2. Import in Vercel
3. Configure domain: `dunia.one` + `app.dunia.one`

## Universal Links Setup

Update `public/.well-known/apple-app-site-association`:
- Replace `TEAMID` with your Apple Developer Team ID

## Domain Configuration

- `dunia.one` → Landing page
- `www.dunia.one` → Redirect to `dunia.one`
- `app.dunia.one` → Auth callbacks, Universal Links




