# User Guide Chatbot Master

Panduan ini menjelaskan cara memakai Chatbot Master untuk proyek web app atau mobile app.

## Konsep Utama

Chatbot Master terdiri dari dua bagian:

1. Backend Google Apps Script (`backend/Code.gs`)
2. Widget frontend (`web-widget/chatbot-widget.js` dan `web-widget/chatbot-widget.css`)

Frontend tidak menyimpan API key. API key hanya disimpan di Google Apps Script Script Properties.

## Alur Kerja

```text
User mengetik pesan
-> Widget mengirim POST ke GAS
-> GAS membaca prompt + knowledge base
-> GAS memanggil Gemini API
-> GAS mengembalikan JSON
-> Widget menampilkan jawaban
```

## File Yang Perlu Diganti Per Proyek

Di `backend/Code.gs`, ganti:

```js
const CONFIG = {
  BUSINESS_NAME: "Nama Bisnis Anda",
  BOT_NAME: "Chat Assistant",
  PHONE: "021-0000-0000",
  WHATSAPP: "0811-0000-0000",
  EMAIL: "hello@example.com"
};
```

Lalu ganti isi:

```js
const KNOWLEDGE_BASE = `
...
`;
```

Isi knowledge base dengan data bisnis yang benar. Chatbot akan diarahkan untuk tidak mengarang informasi di luar data itu.

## Format Response Backend

Backend mengembalikan JSON:

```json
{
  "response": "Jawaban chatbot",
  "source": "gemini-2.5-flash"
}
```

Jika error:

```json
{
  "response": "Maaf, sistem sedang gangguan...",
  "source": "error",
  "error": "Detail error"
}
```

## Checklist Sebelum Dipakai

- API key Gemini sudah dibuat di Google AI Studio.
- API key sudah disimpan sebagai `GEMINI_API_KEY` di Script Properties.
- Apps Script sudah dideploy sebagai Web App.
- Access Web App diset ke `Anyone`.
- URL `/exec` sudah dipasang ke widget.
- Knowledge base sudah sesuai proyek.

