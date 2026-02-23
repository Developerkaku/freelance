(function () {
  // Footer utilities: set year and lightweight behavior
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hook privacy/terms placeholders: if CMS provides URLs via window.__CMS or data attributes, replace links
  const privacyLink = document.getElementById('privacyLink');
  const termsLink = document.getElementById('termsLink');
  if (window.__CMS && window.__CMS.privacy) { privacyLink.href = window.__CMS.privacy; }
  if (window.__CMS && window.__CMS.terms) { termsLink.href = window.__CMS.terms; }

})();