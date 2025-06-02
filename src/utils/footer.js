export function initFooter() {
  const $currentYear = document.querySelector("#current-year");
  $currentYear.textContent = new Date().getFullYear();
}
