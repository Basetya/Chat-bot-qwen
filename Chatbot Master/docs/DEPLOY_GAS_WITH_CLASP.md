# Deploy GAS Dengan Clasp

Panduan ini memakai `clasp` untuk mengirim backend ke Google Apps Script.

## 1. Login Clasp

```powershell
clasp login
```

## 2. Buat Project Apps Script Baru

Masuk ke folder `Chatbot Master`:

```powershell
cd "D:\Chat Bot Qwen\Chatbot Master"
```

Buat project:

```powershell
clasp create --title "Chatbot Master Backend" --type standalone --rootDir ./backend
```

Perintah ini akan membuat file `.clasp.json`.

## 3. Push Backend

Jika di Windows muncul error certificate, gunakan:

```powershell
$env:NODE_OPTIONS='--use-system-ca'; clasp push
```

Jika tidak ada error certificate:

```powershell
clasp push
```

## 4. Simpan API Key Gemini

Di Apps Script Editor:

1. Buka Project Settings.
2. Cari Script Properties.
3. Tambahkan property:

```text
GEMINI_API_KEY = API_KEY_ANDA
```

Alternatif: buka `Code.gs`, jalankan:

```js
setApiKeyManual("API_KEY_ANDA")
```

## 5. Deploy Web App

Deploy dari Apps Script Editor:

1. Klik Deploy.
2. New deployment.
3. Pilih type: Web app.
4. Execute as: Me.
5. Who has access: Anyone.
6. Deploy.
7. Copy Web App URL yang berakhiran `/exec`.

Atau via clasp:

```powershell
$env:NODE_OPTIONS='--use-system-ca'; clasp deploy -d "Initial Chatbot Master Deploy"
```

## 6. Pasang URL Ke Widget

Di web app:

```js
ChatbotWidget.init({
  endpoint: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
});
```

## Catatan Penting

Jangan memakai `.clasp.json` dari proyek lain. Setiap backend GAS punya `scriptId` sendiri.

