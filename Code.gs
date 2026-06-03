// ==========================================
// CHATBOT MASTER - GOOGLE APPS SCRIPT BACKEND
// Model: gemini-2.5-flash
// ==========================================

const CONFIG = {
  MODEL: "gemini-2.5-flash",
  BUSINESS_NAME: "Nama Bisnis Anda",
  BOT_NAME: "Chat Assistant",
  PHONE: "021-0000-0000",
  WHATSAPP: "0811-0000-0000",
  EMAIL: "hello@example.com",
  LANGUAGE: "id",
  MAX_OUTPUT_TOKENS: 1200,
  TEMPERATURE: 0.2
};

const KNOWLEDGE_BASE = `
[PROFIL BISNIS]
Tulis profil singkat bisnis di sini.
Contoh: PT Contoh Sejahtera adalah perusahaan penyedia layanan teknologi untuk UMKM.

[PRODUK ATAU LAYANAN]
- Layanan 1: Jelaskan manfaat, target pengguna, dan harga jika ada.
- Layanan 2: Jelaskan manfaat, target pengguna, dan harga jika ada.
- Layanan 3: Jelaskan manfaat, target pengguna, dan harga jika ada.

[FAQ]
- Jam operasional: Senin-Jumat 08.00-17.00 WIB.
- Area layanan: Tulis area layanan bisnis.
- Cara order: Tulis cara order atau konsultasi.
- Garansi: Tulis aturan garansi jika ada.

[KONTAK]
- Telepon: 021-0000-0000
- WhatsApp: 0811-0000-0000
- Email: hello@example.com
`;

const SYSTEM_PROMPT_TEMPLATE = `
Anda adalah {BOT_NAME} dari {BUSINESS_NAME}.

TUGAS UTAMA:
Bantu user memahami informasi bisnis, produk, layanan, harga, proses, dan kontak berdasarkan knowledge base.

SUMBER DATA:
{KNOWLEDGE_BASE}

ATURAN JAWABAN:
1. Jawab hanya berdasarkan SUMBER DATA.
2. Jika informasi tidak ada di SUMBER DATA, jawab: "Untuk info detail, silakan hubungi tim kami."
3. Jangan mengarang harga, fitur, promo, alamat, legalitas, atau janji layanan.
4. Jangan membahas politik, agama, SARA, konten dewasa, aktivitas ilegal, atau topik di luar bisnis.
5. Gunakan bahasa Indonesia yang ramah, profesional, singkat, dan jelas.
6. Maksimal 5-8 kalimat, kecuali user meminta rincian panjang.
7. Jika user terlihat ingin membeli, daftar, booking, atau konsultasi, arahkan ke kontak resmi.
8. Jika diminta kontak, berikan: Telepon {PHONE} | WhatsApp {WHATSAPP} | Email {EMAIL}.
9. Akhiri dengan pertanyaan lanjutan yang relevan jika cocok.

FORMAT:
Jawab langsung tanpa menyebut "berdasarkan knowledge base".
`;

function doPost(e) {
  try {
    var body = parseRequestBody(e);
    var action = String(body.action || "chat").trim();

    if (action === "set_knowledge") {
      return handleSetKnowledge(body);
    }

    if (action === "get_knowledge") {
      return handleGetKnowledge();
    }

    if (action === "upload_file") {
      return handleUploadFile(body);
    }

    var userMessage = String(body.message || "").trim();

    if (!userMessage) {
      return jsonResponse({
        response: "Silakan tulis pesan terlebih dahulu.",
        source: "validation"
      });
    }

    var reply = callGeminiAPI(userMessage);

    return jsonResponse({
      response: reply,
      source: CONFIG.MODEL
    });
  } catch (err) {
    Logger.log("ERROR: " + err.toString());

    return jsonResponse({
      response: "Maaf, sistem sedang gangguan. Silakan hubungi:\nTelepon: " + CONFIG.PHONE + "\nWhatsApp: " + CONFIG.WHATSAPP + "\nEmail: " + CONFIG.EMAIL,
      source: "error",
      error: err.toString()
    });
  }
}

function handleSetKnowledge(body) {
  var knowledge = String(body.kb_text || "").trim();

  if (!knowledge) {
    return jsonResponse({
      response: "Knowledge base tidak boleh kosong.",
      source: "validation"
    });
  }

  saveKnowledgeBase(knowledge);

  return jsonResponse({
    response: "Knowledge base berhasil diperbarui.",
    source: "admin"
  });
}

function handleGetKnowledge() {
  var knowledge = getKnowledgeBase();
  return jsonResponse({
    response: knowledge,
    source: "admin"
  });
}

function doGet(e) {
  return HtmlService.createHtmlOutput(
    "<h1>Chatbot Master Backend</h1>" +
    "<p>Status: <strong>Running</strong></p>" +
    "<p>Business: " + escapeHtml(CONFIG.BUSINESS_NAME) + "</p>" +
    "<p>Model: " + escapeHtml(CONFIG.MODEL) + "</p>" +
    "<p>API Key: " + escapeHtml(checkApiKey()) + "</p>" +
    '<p>Send POST JSON: {"message":"Halo"}</p>'
  );
}

function callGeminiAPI(userMessage) {
  var apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");

  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Simpan GEMINI_API_KEY di Script Properties.");
  }

  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + CONFIG.MODEL + ":generateContent";
  var systemPrompt = buildSystemPrompt();
  var payload = {
    contents: [{
      role: "user",
      parts: [{
        text: systemPrompt + "\n\nPERTANYAAN USER:\n" + userMessage
      }]
    }],
    generationConfig: {
      temperature: CONFIG.TEMPERATURE,
      maxOutputTokens: CONFIG.MAX_OUTPUT_TOKENS,
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-goog-api-key": apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var httpCode = response.getResponseCode();
  var responseText = response.getContentText();

  Logger.log("Gemini HTTP Code: " + httpCode);

  if (httpCode !== 200) {
    Logger.log("Gemini Error Response: " + responseText);
    throw new Error("Gemini API Error " + httpCode + ": " + responseText);
  }

  var result = JSON.parse(responseText);
  var text = extractGeminiText(result);

  if (!text) {
    throw new Error("Respons Gemini kosong atau tidak valid.");
  }

  return text;
}

function buildSystemPrompt() {
  return SYSTEM_PROMPT_TEMPLATE
    .replaceAll("{BOT_NAME}", CONFIG.BOT_NAME)
    .replaceAll("{BUSINESS_NAME}", CONFIG.BUSINESS_NAME)
    .replaceAll("{KNOWLEDGE_BASE}", getKnowledgeBase())
    .replaceAll("{PHONE}", CONFIG.PHONE)
    .replaceAll("{WHATSAPP}", CONFIG.WHATSAPP)
    .replaceAll("{EMAIL}", CONFIG.EMAIL);
}

function getKnowledgeBase() {
  var saved = PropertiesService.getScriptProperties().getProperty("KNOWLEDGE_BASE_TEXT");
  if (saved && String(saved).trim().length > 0) {
    return String(saved).trim();
  }
  return KNOWLEDGE_BASE;
}

function saveKnowledgeBase(text) {
  PropertiesService.getScriptProperties().setProperty("KNOWLEDGE_BASE_TEXT", String(text).trim());
}

function handleUploadFile(body) {
  var filename = String(body.filename || "").trim();
  var fileData = String(body.file_data || "").trim();
  var contentType = String(body.content_type || "application/octet-stream");

  if (!filename || !fileData) {
    return jsonResponse({
      response: "Nama file dan data file harus diberikan.",
      source: "validation"
    });
  }

  var bytes = Utilities.base64Decode(fileData);
  var blob = Utilities.newBlob(bytes, contentType, filename);
  var file = DriveApp.createFile(blob);
  var parsedText = parseUploadedFile(file, filename);

  if (parsedText) {
    appendKnowledgeBase("[File: " + filename + "]\n" + parsedText);
  }

  return jsonResponse({
    response: "File '" + filename + "' berhasil diunggah." + (parsedText ? " Isi teks berhasil ditambahkan ke knowledge base." : " Tekstualisasi file belum didukung untuk jenis file ini."),
    source: "admin"
  });
}

function parseUploadedFile(file, filename) {
  var ext = String(filename).split('.').pop().toLowerCase();
  try {
    if (ext === 'txt' || ext === 'md' || ext === 'csv' || ext === 'json') {
      return file.getBlob().getDataAsString();
    }
    return null;
  } catch (err) {
    Logger.log('parseUploadedFile error: ' + err.toString());
    return null;
  }
}

function appendKnowledgeBase(text) {
  var current = getKnowledgeBase();
  saveKnowledgeBase(truncateKnowledgeBase(current + '\n\n' + text));
}

function truncateKnowledgeBase(text) {
  var maxLength = 25000;
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(text.length - maxLength);
}

function extractGeminiText(result) {
  if (!result.candidates || !result.candidates.length) {
    return "";
  }

  var candidate = result.candidates[0];

  if (!candidate.content || !candidate.content.parts) {
    return "";
  }

  return candidate.content.parts
    .map(function(part) {
      return part.text || "";
    })
    .join("")
    .trim();
}

function parseRequestBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  return JSON.parse(e.postData.contents);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function setApiKeyManual(apiKey) {
  if (!apiKey || String(apiKey).trim() === "") {
    throw new Error('API Key harus diberikan. Contoh: setApiKeyManual("AIzaSy...")');
  }

  PropertiesService.getScriptProperties().setProperty("GEMINI_API_KEY", String(apiKey).trim());
  return "API Key berhasil disimpan. Panjang: " + String(apiKey).trim().length + " karakter.";
}

function checkApiKey() {
  var apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");

  if (apiKey) {
    return "Sudah diatur (panjang: " + apiKey.length + " karakter)";
  }

  return "Belum diatur";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

