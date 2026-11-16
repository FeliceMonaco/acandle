"use strict";

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const filterStatus = document.querySelector(".filter-status");
const cartButton = document.querySelector(".cart-button");
const cartCount = document.querySelector(".cart-count");
const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const toast = document.querySelector(".toast");

let itemCount = 0;
let toastTimeout;

function showMessage(message) {
  if (!toast) return;
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      const isVisible = category === "tutte" || card.dataset.category === category;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "prodotto visibile" : "prodotti visibili"}.`;
    }
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    if (cartCount) cartCount.textContent = String(itemCount);
    if (cartButton) cartButton.setAttribute("aria-label", `Carrello dimostrativo, ${itemCount} ${itemCount === 1 ? "articolo" : "articoli"}`);
    showMessage(`${button.dataset.product} aggiunta alla selezione dimostrativa. Nessun ordine effettuato.`);
  });
});

if (cartButton) {
  cartButton.addEventListener("click", () => {
    const summary = itemCount === 0
      ? "La selezione dimostrativa è vuota."
      : `Selezione dimostrativa: ${itemCount} ${itemCount === 1 ? "articolo" : "articoli"}.`;
    showMessage(`${summary} Acquisto e pagamento non sono attivi.`);
    if (siteNavigation?.classList.contains("is-open")) {
      siteNavigation.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
}

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNavigation.classList.toggle("is-open", !isOpen);
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNavigation.classList.contains("is-open")) {
      siteNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}
