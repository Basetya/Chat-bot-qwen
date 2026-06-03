# Chatbot GAS Development with Clasp

This project uses clasp (Command Line Apps Script) to develop Google Apps Script locally.

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- Clasp installed globally: `npm install -g @google/clasp`
- Google account with Google Apps Script enabled
- Logged in to clasp: `clasp login`

### 2. Initialize a New Project
If you want to create a new GAS project:

```bash
# Navigate to your project directory
cd d:\Chat Bot Qwen

# Create a new script project
clasp create --type standalone --title "Chatbot Backend"

# This will create a new script and update .clasp.json with the script ID
```

### 3. Or Connect to Existing Project
If you already have a GAS project:

```bash
# Navigate to your project directory
cd d:\Chat Bot Qwen

# Pull code from an existing script
clasp clone <SCRIPT_ID>
```

### 4. Development Workflow
After making changes to your local files:

```bash
# Push your changes to the GAS project
clasp push

# Check the status of your files
clasp status

# View your script in the browser
clasp open
```

### 5. Files in this project:
- `Code.gs` - Main backend code for the chatbot
- `index.html` - Frontend code (not pushed to GAS)
- `.clasp.json` - Configuration file for clasp

### 6. Deploy the script
After pushing your code, you need to deploy it:

```bash
# Create a new deployment
clasp deploy

# Or update an existing deployment
clasp deploy --deploymentId <DEPLOYMENT_ID>
```

### 7. Update your frontend
After deployment, copy the deployment URL and update your `index.html` file:
```javascript
const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

## Important Notes:
- Remember to add your API key in the `Code.gs` file before pushing
- Don't commit/push your API key to public repositories
- Monitor your API usage to avoid unexpected charges
- Jika Anda ingin upload file seperti PDF, Excel, atau gambar, aktifkan Advanced Drive Service di Apps Script
  - Editor GAS → Services → Tambah `Drive API`

## Fiturs Terbaru (Gratis dengan GAS)
- Knowledge base dapat diedit langsung dari UI
- Upload file teks, PDF, Excel, Word, dan gambar untuk ditambahkan ke knowledge base
- Daftar file upload dapat ditampilkan dan dihapus
- Reset KB ke konten default kapan saja

## Deploy to GitHub and Vercel
1. Push your project to GitHub (already done):

```bash
git push origin main
```

2. Hubungkan repo GitHub Anda ke Vercel:
   - Buka https://vercel.com/dashboard
   - Klik "New Project" → pilih repo `Chat-Bot-Qwen`
   - Atur framework: `Other`
   - Build Command: kosong
   - Output Directory: kosong

3. Deploy pertama kali.

4. Jika Anda menggunakan API key, tambahkan environment variable di Vercel:
   - Settings → Environment Variables
   - Contoh: `OPENAI_API_KEY`
   - Pilih `Production` dan/atau `Preview`

5. Setelah deploy selesai, Vercel akan memberikan URL publik untuk aplikasi Anda.

## URL Admin
- Halaman user chat: `/` (index.html)
- Halaman admin (manage KB & file): `/admin` (admin.html)

Catatan: admin tidak dilindungi secara default — jangan publikasikan akses admin tanpa menambahkan otentikasi.

## Setup Google Sign-In untuk Admin

### Langkah 1: Buat OAuth 2.0 Client ID di Google Cloud
1. Buka https://console.cloud.google.com/
2. Pilih atau buat project baru.
3. Buka "APIs & Services" > "Credentials".
4. Klik "Create Credentials" > "OAuth client ID" > pilih "Web application".
5. Isi "Authorized JavaScript origins": tambahkan URL Vercel Anda (mis. https://your-app.vercel.app).
6. Isi "Authorized redirect URIs" (optional untuk SPA): https://your-app.vercel.app/admin.
7. Salin `Client ID`.

### Langkah 2: Update admin.html dengan Google Client ID
1. Buka file `admin.html` di editor.
2. Cari baris: `const GOOGLE_CLIENT_ID = 'REPLACE_WITH_GOOGLE_CLIENT_ID';`
3. Ganti dengan: `const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';`
4. Commit dan push ke GitHub, Vercel akan deploy otomatis.

### Langkah 3: Set Allowed Admin Emails
1. Di Google Apps Script editor (di project GAS Anda), buka Console.
2. Jalankan fungsi berikut di console:
   ```javascript
   setAdminAllowedEmails('bambang.setyanto@gmail.com, setyantobiz@gmail.com, humblebasty@gmail.com')
   ```
3. Atau set manual di Script Properties: Project Settings > Script Properties.
   - Key: `ADMIN_ALLOWED_EMAILS`
   - Value: `bambang.setyanto@gmail.com, setyantobiz@gmail.com, humblebasty@gmail.com`

Jika tidak diset, semua akun Google akan diterima (pastikan `ADMIN_GOOGLE_CLIENT_ID` cocok dengan aud token).

### Penggunaan Google Sign-In
- Buka `/admin` di deployment Anda.
- Klik tombol "Sign in with Google".
- Pilih akun Google yang email-nya ada di ADMIN_ALLOWED_EMAILS.
- Jika berhasil, token admin disimpan di localStorage (berlaku 8 jam).
- Fallback: masih bisa login dengan username `admin` dan password default `135711` (atau password yang sudah diubah).