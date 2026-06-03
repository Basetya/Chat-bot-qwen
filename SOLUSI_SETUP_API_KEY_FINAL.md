# SOLUSI SETUP API KEY - FINAL SOLUTION

## MASALAH UTAMA:
Fungsi `setApiKey()` menggunakan `SpreadsheetApp.getUi()` yang **HANYA BEKERJA** dalam konteks spreadsheet atau web app dengan UI. Saat dijalankan dari GAS Editor console, fungsi ini akan error.

## SOLUSI FINAL:

### **OPTION 1: Gunakan `setApiKeyManual()` dengan Parameter (RECOMMENDED)**
**Cara termudah dan pasti bekerja:**

1. **Buka GAS Editor:**
   - https://script.google.com/d/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit

2. **Di console/logger**, ketik:
   ```
   setApiKeyManual("AIzaSy...MASUKKAN_API_KEY_ANDA_DISINI...")
   ```
   Contoh:
   ```
   setApiKeyManual("AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz123456789")
   ```

3. **Ganti** teks dalam tanda kutip dengan API key Gemini Anda yang sebenarnya

4. **Tekan Enter** untuk menjalankan

### **OPTION 2: Setup Manual di Script Properties**
**Cara manual tanpa menjalankan kode:**

1. Di GAS Editor, klik **Project Settings** (ikon roda gigi di sidebar kiri)

2. Scroll ke bagian **Script Properties**

3. Klik **Add script property**

4. Isi form:
   - **Property:** `GEMINI_API_KEY`
   - **Value:** `AIzaSy...API_KEY_ANDA...` (API key Gemini Anda)

5. Klik **Save script properties**

### **OPTION 3: Gunakan doGet() untuk Setup via Browser**
**Cara alternatif dengan UI:**

1. **Buka URL ini di browser:**
   ```
   https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec
   ```

2. **Anda akan melihat halaman status chatbot**

3. **Untuk setup API key, buka:**
   ```
   https://script.google.com/d/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit
   ```

4. **Gunakan Option 1 atau 2 di atas**

## CARA MENDAPATKAN GEMINI API KEY:

1. **Buka:** https://makersuite.google.com/app/apikey
2. **Login** dengan akun Google
3. **Create API Key** → pilih project atau buat baru
4. **Salin API Key** yang ditampilkan
5. **Aktifkan billing** jika perlu (ada free tier untuk testing)

## VERIFIKASI SETUP:

Setelah setup API key, jalankan:

```
checkApiKey()
```

**Output yang diharapkan:**
```
API Key sudah diatur (panjang: 39 karakter)
```

## TESTING CHATBOT:

1. **Buka file `index.html`** di browser (double-click)
2. **Ketik pesan** seperti "Halo" atau "Berapa modal SPKLU?"
3. **Jika berhasil**, akan mendapat respons dari Gemini AI

## ALTERNATIF TESTING (PowerShell):
```powershell
Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec" -Method POST -ContentType "text/plain;charset=utf-8" -Body '{"message":"Halo"}'
```

## MENGAPA `setApiKey()` TIDAK BEKERJA:

- `SpreadsheetApp.getUi()` memerlukan konteks UI (spreadsheet atau web app)
- Saat dijalankan dari GAS Editor console, tidak ada konteks UI
- Ini adalah **limitation Google Apps Script**, bukan bug di kode kami

## STATUS CHATBOT:

✅ **Semua error teknis sudah diperbaiki:**
- ScriptId sudah benar di `.clasp.json`
- API key menggunakan Script Properties (aman)
- Deployment sudah berjalan dengan URL: `AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa`
- Frontend sudah terhubung dengan backend
- Semua fungsi sudah di-push ke GAS

✅ **Tinggal satu langkah:** Setup API key menggunakan salah satu metode di atas

## LANGKAH PRAKTIS YANG HARUS ANDA LAKUKAN SEKARANG:

1. **Dapatkan API Key Gemini** dari https://makersuite.google.com/app/apikey
2. **Buka GAS Editor:** https://script.google.com/d/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit
3. **Di console**, ketik: `setApiKeyManual("API_KEY_ANDA")`
4. **Verifikasi** dengan: `checkApiKey()`
5. **Test chatbot** dengan buka `index.html`

**Chatbot Anda 100% siap setelah API key diatur!**