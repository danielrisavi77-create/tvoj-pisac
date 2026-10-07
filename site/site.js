(() => {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const email = window.TVOJ_PISAC_CONFIG?.contactEmail?.trim();
  const link = document.querySelector("#contact-email-link");
  const status = document.querySelector("#contact-status");

  if (!link || !status) return;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  if (validEmail) {
    const subject = encodeURIComponent("Upit za akademske konzultacije");
    link.href = `mailto:${email}?subject=${subject}`;
    link.removeAttribute("aria-disabled");
    status.textContent = "Otvorit će se tvoj e-mail program s pripremljenim naslovom upita.";
  } else {
    link.href = "#kontakt";
    link.setAttribute("aria-disabled", "true");
    status.textContent = "Kontaktna adresa postavit će se prije objave stranice.";
  }

  link.addEventListener("click", (event) => {
    if (!validEmail) {
      event.preventDefault();
      status.textContent = "Ova probna stranica još nema aktivnu kontaktnu adresu.";
    }
  });
})();
