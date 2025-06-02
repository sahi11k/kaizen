export function getTemplate(innerHtml) {
  const $template = document.createElement("template");
  $template.innerHTML = innerHtml;
  return $template;
}

export function deepCopy(obj = {}) {
  if (!window.structuredClone) {
    return JSON.parse(JSON.stringify(obj));
  }
  return window.structuredClone(obj);
}
