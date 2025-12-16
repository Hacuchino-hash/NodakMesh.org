# Azure Static Web Apps Deployment Guide

This guide covers deploying NodakMesh.org to Azure Static Web Apps (free tier).

## Prerequisites

- GitHub account with this repository
- Azure account (free tier works)
- Azure CLI installed (optional, for CLI deployment)

## Option 1: Deploy via Azure Portal (Recommended)

### Step 1: Create Azure Static Web App

1. Log in to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource**
3. Search for **Static Web App** and select it
4. Click **Create**

### Step 2: Configure Basic Settings

| Setting | Value |
|---------|-------|
| Subscription | Your Azure subscription |
| Resource Group | Create new: `nodakmesh-rg` |
| Name | `nodakmesh` |
| Plan type | **Free** |
| Region | Select closest to North Dakota (e.g., Central US) |

### Step 3: Connect to GitHub

1. Click **Sign in with GitHub**
2. Authorize Azure to access your GitHub
3. Select:
   - **Organization:** Your GitHub username/org
   - **Repository:** `NodakMesh.org`
   - **Branch:** `main`

### Step 4: Build Configuration

| Setting | Value |
|---------|-------|
| Build Presets | **Astro** |
| App location | `/` |
| API location | Leave empty |
| Output location | `dist` |

### Step 5: Review and Create

1. Click **Review + create**
2. Click **Create**
3. Wait for deployment to complete (2-3 minutes)

Azure will automatically:
- Create a GitHub Actions workflow file in your repository
- Trigger the first build and deployment
- Provide you with a URL like `https://nodakmesh.azurestaticapps.net`

## Option 2: Deploy via Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name nodakmesh-rg --location centralus

# Create static web app (replace with your GitHub repo URL)
az staticwebapp create \
  --name nodakmesh \
  --resource-group nodakmesh-rg \
  --source https://github.com/YOUR_USERNAME/NodakMesh.org \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

## Custom Domain Setup

### Step 1: Add Custom Domain in Azure

1. Go to your Static Web App in Azure Portal
2. Click **Custom domains** in the left menu
3. Click **+ Add**
4. Enter `nodakmesh.org`

### Step 2: Configure DNS

Add these DNS records at your domain registrar:

**For root domain (nodakmesh.org):**
| Type | Name | Value |
|------|------|-------|
| ALIAS/ANAME | @ | `nodakmesh.azurestaticapps.net` |

*If ALIAS not supported, use:*
| Type | Name | Value |
|------|------|-------|
| A | @ | Azure's IP (shown in portal) |

**For www subdomain:**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | `nodakmesh.azurestaticapps.net` |

### Step 3: Validate Domain

1. Return to Azure Portal
2. Click **Validate** next to your domain
3. Wait for DNS propagation (can take up to 48 hours, usually 10-30 minutes)
4. SSL certificate is automatically provisioned

## GitHub Actions Workflow

Azure automatically creates `.github/workflows/azure-static-web-apps-*.yml`. If you need to customize:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false
          
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "dist"

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

## Build Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Azure Static Web App created
- [ ] GitHub Actions workflow running
- [ ] Initial deployment successful
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] All pages loading correctly
- [ ] QR codes working
- [ ] Maps loading properly

## Troubleshooting

### Build Fails
- Check GitHub Actions logs for errors
- Ensure `npm run build` works locally
- Verify `astro.config.mjs` has correct settings

### 404 Errors on Refresh
- Verify `staticwebapp.config.json` has correct `navigationFallback`
- Check that routes are properly configured

### Custom Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check domain validation status in Azure Portal

### Images Not Loading
- Ensure images are in `public/images/`
- Check file paths are correct (case-sensitive on Azure)

## Azure Free Tier Limits

| Feature | Limit |
|---------|-------|
| Bandwidth | 100 GB/month |
| Custom domains | 2 |
| SSL certificates | Free (auto-provisioned) |
| Staging environments | 3 |

For a community site like NodakMesh, the free tier is more than sufficient.

## Support

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/microsoft-azure/)
- [NodakMesh Discord](https://discord.gg/JUBrZepkaM)
