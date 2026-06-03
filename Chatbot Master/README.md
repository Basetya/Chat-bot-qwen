# Chatbot Master

Template master chatbot untuk web app dan mobile app.

Arsitektur:

```text
Web/Mobile App -> Chatbot Endpoint GAS -> Gemini API -> JSON Response
```

Isi folder:

- `backend/Code.gs` - backend Google Apps Script.
- `backend/appsscript.json` - manifest Apps Script.
- `backend/.clasp.example.json` - contoh konfigurasi clasp.
- `web-widget/chatbot-widget.css` - style widget reusable.
- `web-widget/chatbot-widget.js` - script widget yang bisa ditempel ke web apa pun.
- `demo/demo.html` - contoh halaman web yang memakai widget.
- `prompts/master-system-prompt.md` - prompt master yang dipakai backend.
- `docs/USER_GUIDE.md` - panduan pemakaian lengkap.
- `docs/DEPLOY_GAS_WITH_CLASP.md` - panduan deploy memakai clasp.
- `docs/INTEGRATION_WEB.md` - panduan integrasi web app.
- `docs/INTEGRATION_MOBILE.md` - panduan integrasi mobile app.

Mulai cepat:

1. Copy folder `backend` ke project Apps Script baru.
2. Simpan API key Gemini di Script Properties dengan nama `GEMINI_API_KEY`.
3. Deploy sebagai Web App.
4. Copy URL `/exec` hasil deploy.
5. Pasang URL itu ke `ChatbotWidget.init({ endpoint: "URL_ANDA" })`.

Contoh integrasi web:

```html
<link rel="stylesheet" href="./web-widget/chatbot-widget.css">
<script src="./web-widget/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    endpoint: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec",
    title: "Chat Assistant",
    subtitle: "Online",
    brandName: "Nama Bisnis",
    primaryColor: "#0d6efd"
  });
</script>
```

