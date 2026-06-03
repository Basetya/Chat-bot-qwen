# Mulai Dari Sini

Ini adalah urutan paling praktis untuk memakai Chatbot Master.

## 1. Siapkan Backend

Buka:

```text
backend/Code.gs
```

Ganti:

- `BUSINESS_NAME`
- `BOT_NAME`
- `PHONE`
- `WHATSAPP`
- `EMAIL`
- isi `KNOWLEDGE_BASE`

## 2. Buat Apps Script Baru

Masuk ke folder:

```powershell
cd "D:\Chat Bot Qwen\Chatbot Master"
```

Buat project:

```powershell
clasp create --title "Nama Chatbot Backend" --type standalone --rootDir ./backend
```

Push:

```powershell
$env:NODE_OPTIONS='--use-system-ca'; clasp push
```

## 3. Pasang API Key

Di Apps Script Project Settings, buat Script Property:

```text
GEMINI_API_KEY = API_KEY_ANDA
```

## 4. Deploy Web App

Deploy sebagai Web App:

- Execute as: Me
- Who has access: Anyone

Copy URL yang berakhiran `/exec`.

## 5. Tempel Widget Ke Web

Tambahkan:

```html
<link rel="stylesheet" href="./chatbot-widget.css">
<script src="./chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    endpoint: "URL_EXEC_APPS_SCRIPT",
    title: "Chat Assistant",
    brandName: "Nama Bisnis"
  });
</script>
```

Panduan lengkap ada di folder `docs`.

