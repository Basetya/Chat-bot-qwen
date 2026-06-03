# SETUP CHATBOT TCS EV CONSULTANT - FINAL

## LINK GAS EDITOR:
**Gunakan link ini untuk membuka GAS Editor:**
```
https://script.google.com/home/projects/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit
```

Atau jalankan dari terminal:
```bash
clasp open-script
```

## LANGKAH-LANGKAH SETUP:

### 1. BUKA GAS EDITOR
- Buka link di atas di browser
- Login dengan akun Google yang sama dengan yang digunakan untuk membuat proyek

### 2. DAPATKAN GEMINI API KEY
- Buka: https://makersuite.google.com/app/apikey
- Login dengan akun Google
- Klik "Create API Key"
- Salin API Key yang ditampilkan (format: `AIzaSy...`)

### 3. SETUP API KEY (PILIH SALAH SATU):

#### OPTION A: Menggunakan Console (RECOMMENDED)
1. Di GAS Editor, klik tab **"Logs"** atau **"Executions"**
2. Di bagian **"Run function"**, pilih `setApiKeyManual`
3. Di kolom **"Function parameters"**, masukkan API key dalam tanda kutip:
   ```
   "AIzaSy...MASUKKAN_API_KEY_ANDA_DISINI..."
   ```
4. Klik **"Run"**

#### OPTION B: Menggunakan Script Properties
1. Di GAS Editor, klik **Project Settings** (ikon roda gigi)
2. Scroll ke **Script Properties**
3. Klik **"Add script property"**
4. Isi:
   - **Property:** `GEMINI_API_KEY`
   - **Value:** `AIzaSy...API_KEY_ANDA...`
5. Klik **"Save script properties"**

### 4. VERIFIKASI API KEY
1. Di GAS Editor, pilih fungsi `checkApiKey` dari dropdown
2. Klik **"Run"**
3. Lihat Logs untuk pesan: `"API Key sudah diatur (panjang: XX karakter)"`

### 5. TEST CHATBOT
1. **Buka file `index.html`** di browser (double-click file)
2. **Ketik pesan** seperti "Halo" atau "Berapa modal SPKLU?"
3. **Jika berhasil**, akan mendapat respons dari Gemini AI

## TESTING API LANGSUNG:
```powershell
Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec" -Method POST -ContentType "text/plain;charset=utf-8" -Body '{"message":"Halo"}'
```

## TROUBLESHOOTING:

### Jika GAS Editor tidak bisa dibuka:
- Pastikan Anda login dengan akun Google yang benar
- Coba buka: https://script.google.com/home
- Cari proyek "Chat Bot Qwen" atau "TCS Backend Web App"

### Jika error "Cannot call Browser.inputBox()":
- Itu normal! Fungsi `setApiKey()` memerlukan konteks UI
- Gunakan **Option A** atau **Option B** di atas

### Jika chatbot masih error setelah setup:
1. Jalankan `checkApiKey()` untuk verifikasi
2. Pastikan API key valid di https://makersuite.google.com/app/apikey
3. Cek Logs untuk error detail

## STATUS TEKNIS:
✅ **Semua sudah diperbaiki:**
- ScriptId: `1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri`
- Deployment URL: `AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa`
- Frontend sudah terhubung
- Backend sudah responsif
- API key system sudah aman

## CONTACT SUPPORT:
Jika masih ada masalah:
- WhatsApp: 0811-1460-707
- Phone: 021-2126 6084
- Email: cs@titiscahayasejahtera.com

**Chatbot 100% siap setelah API key diatur!**