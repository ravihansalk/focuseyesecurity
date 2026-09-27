// ==========================================================================
// FocusEye Security — Shared JS
// ==========================================================================

// ---------- Tawk.to live chat ----------
// From the Tawk.to dashboard: Administration > Channels > Chat Widget.
// The widget code contains "https://embed.tawk.to/PROPERTY_ID/WIDGET_ID".
var TAWK_PROPERTY_ID = "6ab972f1daffc73446b7fec9";
var TAWK_WIDGET_ID = "1k3i6hvrt";

if (TAWK_PROPERTY_ID.indexOf("YOUR_") !== 0) {
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/" + TAWK_PROPERTY_ID + "/" + TAWK_WIDGET_ID;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.head.appendChild(s1);
  })();
}

document.addEventListener("DOMContentLoaded", function () {
  // Render Lucide icons
  if (window.lucide) lucide.createIcons();

  // ---------- Mobile nav toggle ----------
  var hamburger = document.querySelector(".hamburger");
  var navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---------- Hero Slideshow ----------
  var heroTrack = document.getElementById("hero-slides");
  if (heroTrack) {
    var heroSlides = Array.prototype.slice.call(heroTrack.querySelectorAll(".hero-slide"));
    var heroDotsWrap = document.getElementById("hero-dots");
    var heroCurrent = 0;
    var heroTimer = null;

    heroSlides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () { heroGoTo(i); heroResetTimer(); });
      heroDotsWrap.appendChild(dot);
    });
    var heroDots = Array.prototype.slice.call(heroDotsWrap.querySelectorAll("button"));

    function heroGoTo(index) {
      heroCurrent = (index + heroSlides.length) % heroSlides.length;
      heroTrack.style.transform = "translateX(-" + (heroCurrent * 100) + "%)";
      heroDots.forEach(function (dot, i) { dot.classList.toggle("active", i === heroCurrent); });
    }

    function heroResetTimer() {
      if (heroTimer) clearInterval(heroTimer);
      heroTimer = setInterval(function () { heroGoTo(heroCurrent + 1); }, 6000);
    }

    heroResetTimer();
  }

  // ---------- Dynamic Deals Gallery (auto-probes assets/img/MainDeales) ----------
  // Naming convention: deal-1.jpg, deal-2.png, deal-3.webp, ... (any of the
  // extensions below). Just drop numbered files into MainDeales — no HTML edits needed.
  // Any element with [data-deals-gallery] gets populated. The attribute value is
  // either "all" or a number N, showing only the last N images found (e.g. the
  // homepage teaser uses data-deals-gallery="4").
  var dealsGalleryEls = Array.prototype.slice.call(document.querySelectorAll("[data-deals-gallery]"));
  if (dealsGalleryEls.length) {
    var GALLERY_PATH = "assets/img/MainDeales/";
    var GALLERY_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
    var GALLERY_MAX_INDEX = 30;
    var GALLERY_MAX_CONSECUTIVE_MISSES = 3;

    function probeImage(src) {
      return new Promise(function (resolve) {
        var img = new Image();
        img.onload = function () { resolve(src); };
        img.onerror = function () { resolve(null); };
        img.src = src;
      });
    }

    function findImageForIndex(index) {
      var candidates = GALLERY_EXTENSIONS.map(function (ext) {
        return GALLERY_PATH + "deal-" + index + "." + ext;
      });
      return Promise.all(candidates.map(probeImage)).then(function (results) {
        return results.filter(Boolean)[0] || null;
      });
    }

    function renderGalleryInto(container, images) {
      if (!images.length) {
        container.innerHTML = '<p class="deals-gallery-empty">New deals are coming soon &mdash; check back shortly.</p>';
        return;
      }
      container.innerHTML = images.map(function (src, i) {
        return '<figure><img src="' + src + '" alt="Deal ' + (i + 1) + '" loading="lazy"></figure>';
      }).join("");
    }

    (function scanGallery() {
      var found = [];
      var misses = 0;
      var index = 1;

      function next() {
        if (index > GALLERY_MAX_INDEX || misses >= GALLERY_MAX_CONSECUTIVE_MISSES) {
          finish();
          return;
        }
        findImageForIndex(index).then(function (src) {
          if (src) {
            found.push(src);
            misses = 0;
          } else {
            misses++;
          }
          index++;
          next();
        });
      }

      function finish() {
        dealsGalleryEls.forEach(function (container) {
          var limitAttr = container.getAttribute("data-deals-gallery");
          var limit = limitAttr === "all" ? null : parseInt(limitAttr, 10);
          var images = limit ? found.slice(-limit) : found;
          renderGalleryInto(container, images);
        });
      }

      next();
    })();

    // ---------- Deals Lightbox (click a deal image to view it large, centered) ----------
    var lightboxOverlay = document.getElementById("lightbox-overlay");
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxClose = document.getElementById("lightbox-close");

    if (lightboxOverlay && lightboxImage) {
      function openLightbox(src, alt) {
        lightboxImage.src = src;
        lightboxImage.alt = alt || "";
        lightboxOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
      }

      function closeLightbox() {
        lightboxOverlay.classList.remove("open");
        lightboxImage.src = "";
        document.body.style.overflow = "";
      }

      dealsGalleryEls.forEach(function (container) {
        container.addEventListener("click", function (e) {
          var img = e.target.closest("img");
          if (img) openLightbox(img.src, img.alt);
        });
      });

      lightboxClose.addEventListener("click", closeLightbox);
      lightboxOverlay.addEventListener("click", function (e) {
        if (e.target === lightboxOverlay) closeLightbox();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightboxOverlay.classList.contains("open")) closeLightbox();
      });
    }
  }

  // ---------- Contact form (emails info@focuseye.co.nz via FormSubmit) ----------
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var successMsg = document.getElementById("form-success");
      var errorMsg = document.getElementById("form-error");
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var btnText = submitBtn.textContent;

      if (successMsg) successMsg.classList.remove("show");
      if (errorMsg) errorMsg.classList.remove("show");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(contactForm.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(contactForm)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "Send failed");
          });
        })
        .then(function () {
          if (successMsg) {
            successMsg.classList.add("show");
            successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          contactForm.reset();
        })
        .catch(function () {
          if (errorMsg) {
            errorMsg.classList.add("show");
            errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = btnText;
        });
    });
  }

  // ---------- Combo Kit Configurator ----------
  var configurator = document.getElementById("configurator");
  if (configurator) {
    var cameraCountEl = document.getElementById("cfg-camera-count");
    var cameraTypeEl = document.getElementById("cfg-camera-type");
    var nvrEl = document.getElementById("cfg-nvr");
    var storageEl = document.getElementById("cfg-storage");
    var accessoriesEls = configurator.querySelectorAll('input[name="cfg-accessory"]');

    var summaryCameraCount = document.getElementById("summary-camera-count");
    var summaryCameraType = document.getElementById("summary-camera-type");
    var summaryNvr = document.getElementById("summary-nvr");
    var summaryStorage = document.getElementById("summary-storage");
    var summaryAccessories = document.getElementById("summary-accessories");
    var summaryTotal = document.getElementById("summary-total");

    var cameraPrices = { "dome-4mp": 89, "bullet-5mp": 119, "wifi": 149, "4k": 199 };
    var nvrPrices = { "4ch": 149, "8ch": 229, "16ch": 349, "32ch": 599 };
    var storagePrices = { "1tb": 0, "2tb": 60, "4tb": 130, "8tb": 260 };
    var accessoryPrices = { "poe-switch": 89, "rack-cabinet": 149, "cabling-kit": 45, "monitor": 179 };

    function formatCurrency(amount) {
      return "$" + amount.toLocaleString("en-NZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function recalc() {
      var count = parseInt(cameraCountEl.value, 10) || 0;
      var cameraType = cameraTypeEl.value;
      var nvr = nvrEl.value;
      var storage = storageEl.value;

      var cameraTotal = count * (cameraPrices[cameraType] || 0);
      var nvrTotal = nvrPrices[nvr] || 0;
      var storageTotal = storagePrices[storage] || 0;

      var selectedAccessories = [];
      var accessoriesTotal = 0;
      accessoriesEls.forEach(function (el) {
        if (el.checked) {
          selectedAccessories.push(el.dataset.label);
          accessoriesTotal += accessoryPrices[el.value] || 0;
        }
      });

      var grandTotal = cameraTotal + nvrTotal + storageTotal + accessoriesTotal;

      if (summaryCameraCount) summaryCameraCount.textContent = count + "x " + cameraTypeEl.options[cameraTypeEl.selectedIndex].text;
      if (summaryCameraType) summaryCameraType.textContent = formatCurrency(cameraTotal);
      if (summaryNvr) summaryNvr.textContent = nvrEl.options[nvrEl.selectedIndex].text + " — " + formatCurrency(nvrTotal);
      if (summaryStorage) summaryStorage.textContent = storageEl.options[storageEl.selectedIndex].text + (storageTotal ? " — " + formatCurrency(storageTotal) : " — Included");
      if (summaryAccessories) summaryAccessories.textContent = selectedAccessories.length ? selectedAccessories.join(", ") + " — " + formatCurrency(accessoriesTotal) : "None selected";
      if (summaryTotal) summaryTotal.textContent = formatCurrency(grandTotal);
    }

    [cameraCountEl, cameraTypeEl, nvrEl, storageEl].forEach(function (el) {
      if (el) el.addEventListener("input", recalc);
    });
    accessoriesEls.forEach(function (el) { el.addEventListener("change", recalc); });

    recalc();
  }

  // ---------- Products filter (client-side demo) ----------
  var productGrid = document.getElementById("product-grid");
  if (productGrid) {
    var filterInputs = document.querySelectorAll(".filter-panel input[type='checkbox']");
    var sortSelect = document.getElementById("sort-select");
    var resultCount = document.getElementById("result-count");
    var cards = Array.prototype.slice.call(productGrid.querySelectorAll(".product-card"));

    function applyFilters() {
      var activeCategories = [];
      var activeBrands = [];
      filterInputs.forEach(function (input) {
        if (input.checked) {
          if (input.name === "category") activeCategories.push(input.value);
          if (input.name === "brand") activeBrands.push(input.value);
        }
      });

      var visibleCount = 0;
      cards.forEach(function (card) {
        var cat = card.dataset.category;
        var brand = card.dataset.brand;
        var matchesCategory = activeCategories.length === 0 || activeCategories.indexOf(cat) !== -1;
        var matchesBrand = activeBrands.length === 0 || activeBrands.indexOf(brand) !== -1;
        var visible = matchesCategory && matchesBrand;
        card.style.display = visible ? "" : "none";
        if (visible) visibleCount++;
      });

      if (resultCount) resultCount.textContent = visibleCount + " product" + (visibleCount === 1 ? "" : "s") + " found";
    }

    function applySort() {
      var value = sortSelect.value;
      var sorted = cards.slice().sort(function (a, b) {
        if (value === "price-asc") return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        if (value === "price-desc") return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        if (value === "newest") return parseInt(b.dataset.newest, 10) - parseInt(a.dataset.newest, 10);
        return parseInt(b.dataset.popularity, 10) - parseInt(a.dataset.popularity, 10);
      });
      sorted.forEach(function (card) { productGrid.appendChild(card); });
    }

    filterInputs.forEach(function (input) { input.addEventListener("change", applyFilters); });
    if (sortSelect) sortSelect.addEventListener("change", applySort);
    applyFilters();
  }
});
