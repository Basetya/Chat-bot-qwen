(function(window, document) {
  "use strict";

  var defaultOptions = {
    endpoint: "",
    title: "Chat Assistant",
    subtitle: "Online",
    brandName: "Chatbot",
    primaryColor: "#0d6efd",
    launcherText: "Chat",
    placeholder: "Ketik pesan...",
    sendText: "Kirim",
    greeting: "Halo, ada yang bisa saya bantu?",
    errorMessage: "Maaf, gagal terhubung ke server.",
    typingText: "Mengetik..."
  };

  var instance = null;

  function init(options) {
    if (instance) {
      destroy();
    }

    var config = assign({}, defaultOptions, options || {});

    if (!config.endpoint) {
      throw new Error("ChatbotWidget endpoint wajib diisi.");
    }

    document.documentElement.style.setProperty("--cbm-primary", config.primaryColor);
    instance = createWidget(config);
    document.body.appendChild(instance.panel);
    document.body.appendChild(instance.launcher);

    if (config.greeting) {
      addMessage(config.greeting, "bot");
    }

    return {
      open: open,
      close: close,
      destroy: destroy,
      send: function(message) {
        return sendMessage(String(message || ""));
      }
    };
  }

  function createWidget(config) {
    var launcher = document.createElement("button");
    launcher.className = "cbm-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Buka chat " + config.brandName);
    launcher.textContent = config.launcherText;

    var panel = document.createElement("section");
    panel.className = "cbm-panel";
    panel.setAttribute("aria-label", config.title);

    panel.innerHTML =
      '<div class="cbm-header">' +
        '<div>' +
          '<h2 class="cbm-title"></h2>' +
          '<p class="cbm-subtitle"></p>' +
        '</div>' +
        '<button class="cbm-close" type="button" aria-label="Tutup chat">&times;</button>' +
      '</div>' +
      '<div class="cbm-messages" role="log" aria-live="polite"></div>' +
      '<form class="cbm-form">' +
        '<input class="cbm-input" type="text" autocomplete="off">' +
        '<button class="cbm-send" type="submit"></button>' +
      '</form>';

    panel.querySelector(".cbm-title").textContent = config.title;
    panel.querySelector(".cbm-subtitle").textContent = config.subtitle;
    panel.querySelector(".cbm-input").placeholder = config.placeholder;
    panel.querySelector(".cbm-send").textContent = config.sendText;

    var form = panel.querySelector(".cbm-form");
    var input = panel.querySelector(".cbm-input");
    var closeButton = panel.querySelector(".cbm-close");

    launcher.addEventListener("click", open);
    closeButton.addEventListener("click", close);
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      sendMessage(input.value);
    });

    return {
      config: config,
      launcher: launcher,
      panel: panel,
      input: input,
      sendButton: panel.querySelector(".cbm-send"),
      messages: panel.querySelector(".cbm-messages")
    };
  }

  function open() {
    if (!instance) return;
    instance.panel.classList.add("cbm-open");
    instance.input.focus();
  }

  function close() {
    if (!instance) return;
    instance.panel.classList.remove("cbm-open");
  }

  function destroy() {
    if (!instance) return;
    instance.panel.remove();
    instance.launcher.remove();
    instance = null;
  }

  function addMessage(text, sender) {
    if (!instance) return;

    var div = document.createElement("div");
    div.className = "cbm-message cbm-message-" + sender;
    div.textContent = text;
    instance.messages.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    if (!instance || document.getElementById("cbm-typing")) return;

    var div = document.createElement("div");
    div.id = "cbm-typing";
    div.className = "cbm-typing";
    div.textContent = instance.config.typingText;
    instance.messages.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    var typing = document.getElementById("cbm-typing");
    if (typing) {
      typing.remove();
    }
  }

  function sendMessage(rawMessage) {
    if (!instance) return Promise.resolve();

    var message = String(rawMessage || "").trim();
    if (!message) return Promise.resolve();

    addMessage(message, "user");
    instance.input.value = "";
    instance.sendButton.disabled = true;
    showTyping();

    return fetch(instance.config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ message: message })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        hideTyping();
        addMessage(data.response || "Terjadi kesalahan.", "bot");
      })
      .catch(function(error) {
        hideTyping();
        addMessage(instance.config.errorMessage, "bot");
        if (window.console) {
          window.console.error(error);
        }
      })
      .finally(function() {
        instance.sendButton.disabled = false;
        instance.input.focus();
      });
  }

  function scrollToBottom() {
    instance.messages.scrollTop = instance.messages.scrollHeight;
  }

  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] || {};
      Object.keys(source).forEach(function(key) {
        target[key] = source[key];
      });
    }
    return target;
  }

  window.ChatbotWidget = {
    init: init
  };
})(window, document);

