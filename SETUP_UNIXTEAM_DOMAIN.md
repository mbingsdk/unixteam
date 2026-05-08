# Quick Setup: unixteam.my.id Domain

## 🚀 TL;DR - 5 Langkah Setup

### Step 1: Prepare Repository (2 menit)
```bash
cd /path/to/unix-team
git init
git add .
git commit -m "UNIX-TEAM website with unixteam.my.id domain"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/unix-team.git
git push -u origin main
```

### Step 2: Enable GitHub Pages (3 menit)
1. Go to: `github.com/YOUR_USERNAME/unix-team`
2. Click: **Settings** → **Pages**
3. Select: `Deploy from a branch`
4. Branch: `main` | Folder: `/ (root)`
5. Click: **Save**

### Step 3: Add Custom Domain in GitHub (1 menit)
1. Still in **Settings** → **Pages**
2. Under "Custom domain", enter: `unixteam.my.id`
3. Click: **Save**
4. GitHub creates CNAME file automatically

### Step 4: Update DNS at Domain Registrar (5 menit)

**If using GitHub Pages (A Records method):**

Login ke domain control panel (Namecheap, IDwebhost, etc):

1. Find: **DNS Settings** atau **Advanced DNS**
2. **Delete** existing A records untuk `unixteam.my.id` (jika ada)
3. **Add** 4 new A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

4. **Add** 1 CNAME record untuk www:
```
Host: www
Value: YOUR_USERNAME.github.io
```

5. **Save**

**Verification:**
```bash
dig unixteam.my.id +short
# Should show 4 GitHub IPs above
```

### Step 5: Deploy Website (2 menit)
```bash
# Build static files
pnpm build

# Deploy to GitHub Pages
pnpm deploy

# Or: pnpm build-and-deploy
```

**Wait 10-60 minutes for DNS propagation**, then visit: `https://unixteam.my.id`

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Domain resolves: `dig unixteam.my.id` shows GitHub IPs
- [ ] Website loads: `https://unixteam.my.id` works
- [ ] HTTPS works: Green lock icon in browser
- [ ] No 404: All pages load correctly
- [ ] Mobile works: Test on mobile device

---

## 🔧 Common Issues

### Domain shows "Pending" in GitHub
- DNS hasn't propagated yet
- Wait 24 hours
- Check DNS: `dig unixteam.my.id`

### Still getting GitHub's default domain
- Make sure CNAME file exists in `public/CNAME`
- Make sure you ran `pnpm deploy` or `pnpm build-and-deploy`
- Check: GitHub Settings → Pages → Custom domain field

### HTTPS not working
- GitHub provisioning SSL (takes 24 hours)
- After HTTPS is ready, enable: Settings → Pages → "Enforce HTTPS"

### DNS shows wrong IP
- Wait for propagation (can take 48 hours)
- Use: https://www.whatsmydns.net/?q=unixteam.my.id to check global propagation

---

## 📋 What's Already Configured

✅ `public/CNAME` contains `unixteam.my.id`
✅ `app/layout.tsx` updated with domain
✅ `next.config.mjs` set for static export
✅ `.nojekyll` created for GitHub Pages
✅ `.github/workflows/deploy.yml` ready for auto-deploy
✅ All pages pre-rendered statically

**No additional code changes needed!**

---

## 📚 Full Documentation

For more details, see:
- **CUSTOM_DOMAIN_SETUP.md** - Complete guide with all options
- **DEPLOYMENT.md** - Full deployment guide for all platforms
- **QUICK_START.md** - Quick reference for all commands

---

## ⏱️ Timeline

- **Setup time:** ~15 minutes
- **DNS propagation:** 10 minutes to 48 hours (usually 1-2 hours)
- **HTTPS provisioning:** Automatic (usually 1-24 hours)
- **Total to live:** ~30 minutes to 48 hours

---

## 🎯 Next Steps After Going Live

1. ✅ Verify site is accessible at unixteam.my.id
2. 📝 Update social media links to unixteam.my.id
3. 🔍 Add to Google Search Console
4. 📊 Setup Google Analytics
5. 🚀 Announce launch on Discord/social media

---

**That's it! Your website is live at unixteam.my.id** 🎉

Questions? Check CUSTOM_DOMAIN_SETUP.md for detailed troubleshooting.
