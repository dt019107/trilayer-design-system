/**
 * TRILAYER DESIGN SYSTEM — UNIVERSAL COPY-CODE UTILITY
 * Safely copies text/code to clipboard with visual trigger feedback and Toast notifications.
 */

import { Toast } from "../components/feedback.js";

export function copyToClipboard(text, customMessage = null, triggerElement = null) {
  if (!text) return;

  const performCopy = () => {
    const msg = customMessage || "Copied to clipboard!";
    Toast.show({ message: msg, type: "success" });

    if (triggerElement) {
      triggerElement.classList.add("is-copied");
      const originalText = triggerElement.innerHTML;
      
      // Temporary checkmark feedback
      setTimeout(() => {
        triggerElement.classList.remove("is-copied");
      }, 2000);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(performCopy)
      .catch(() => fallbackCopy(text, performCopy));
  } else {
    fallbackCopy(text, performCopy);
  }
}

function fallbackCopy(text, callback) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    if (callback) callback();
  } catch (err) {
    Toast.show({ message: "Failed to copy to clipboard", type: "error" });
  } finally {
    document.body.removeChild(textarea);
  }
}

// Global browser helper
if (typeof window !== "undefined") {
  window.copyToClipboard = copyToClipboard;
}

