# PANDUAN SETUP API KEY CHATBOT

## ERROR TELAH DIPERBAIKI

Chatbot Anda sudah saya perbaiki dan berikut adalah status perbaikan yang telah dilakukan:

1. ✅ **.clasp.json** - Diupdate dengan scriptId yang benar: `1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri`
2. ✅ **Code.gs** - Diperbaiki masalah API key (sekarang menggunakan Script Properties, bukan hardcoded)
3. ✅ **Deployment** - Script sudah dideploy dengan URL: `https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec`
4. ✅ **Frontend** - index.html sudah diupdate dengan URL deployment yang benar

## MENGAPA CHATBOT MASIH ERROR?

Chatbot Anda masih error karena **API key Gemini belum diatur di Script Properties**. Ini adalah masalah keamanan yang disengaja - API key tidak boleh disimpan dalam kode sumber (hardcoded) karena bisa bocor ke publik.

## LANGKAH-LANGKAH SETUP API KEY:

### OPTION 1: Setup via Google Apps Script Editor (Recommended)

1. **Buka Google Apps Script Editor:**
   - Buka https://script.google.com/
   - Login dengan akun Google Anda
   - Cari project "Chat Bot Qwen" atau klik link: https://script.google.com/d/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit

2. **Setup API Key:**
   - Di editor, klik dropdown fungsi di toolbar (icon "Select function")
   - Pilih fungsi `setApiKey`
   - Klik tombol **Run** (ikon segitiga hijau)
   - Akan muncul popup untuk memasukkan API Key
   - Masukkan **Google Gemini API Key** Anda
   - Klik **OK**

3. **Verifikasi API Key:**
   - Pilih fungsi `checkApiKey` dari dropdown
   - Klik **Run**
   - Lihat log untuk memastikan API key sudah tersimpan

### OPTION 2: Dapatkan API Key Gemini (Jika Belum Punya)

1. **Buat API Key Gemini:**
   - Buka https://makersuite.google.com/app/apikey
   - Login dengan akun Google
   - Klik "Create API Key"
   - Pilih project atau buat baru
   - Salin API Key yang dihasilkan

2. **Syarat API Key:**
   - Pastikan billing aktif di Google Cloud Console
   - Gemini API tidak sepenuhnya gratis, ada batas penggunaan gratis
   - Untuk testing, Anda bisa gunakan free tier

### OPTION 3: Testing Setelah Setup

1. **Test Chatbot:**
   - Buka `index.html` di browser (double-click file)
   - Ketik pesan di chatbot
   - Jika berhasil, akan mendapat respons dari Gemini AI

2. **Test API Langsung:**
   ```powershell
   Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec" -Method POST -ContentType "text/plain;charset=utf-8" -Body '{"message":"Halo"}'
   ```

## FUNGSI TERSEDIA DI SCRIPT:

### 1. `setApiKey()`
Fungsi untuk menyimpan API key via UI popup. Panggil via GAS Editor.

### 2. `setApiKeyManual(apiKey)`
Fungsi untuk automation jika ingin setup via kode.

### 3. `checkApiKey()`
Fungsi untuk mengecek status API key.

### 4. `doGet()`
Endpoint untuk testing via browser. Bisa diakses langsung: https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec

## TROUBLESHOOTING:

### Error "API Key tidak ditemukan":
- Pastikan sudah menjalankan `setApiKey()` di GAS Editor
- Refresh browser setelah setup API key
- Coba panggil `checkApiKey()` untuk verifikasi

### Error "Gemini API Error 403/429":
- Cek billing di Google Cloud Console
- Cek quota usage
- API key mungkin expired atau tidak valid

### Chatbot tidak responsive di browser:
- Cek Developer Tools > Console untuk error CORS
- Pastikan URL deployment sudah benar di index.html
- Testing dengan command Invoke-RestMethod untuk isolasi masalah

## FITUR CHATBOT:

- Model: Gemini 1.5 Flash (stabil & free tier)
- Domain: SPKLU (Stasiun Pengisian Kendaraan Listrik Umum)
- Knowledge Base: Data lengkap TCS EV Consultant
- Tampilan: UI modern dengan CSS
- Backend: Google Apps Script dengan deployment web app

## CONTACT:

Jika masih ada masalah, hubungi:
- WhatsApp: 0811-1460-707
- Phone: 021-2126 6084
- Email: cs@titiscahayasejahtera.com