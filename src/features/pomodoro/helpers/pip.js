import usePipStore from "@/features/pomodoro/store/pip";
import { THEME } from "@/features/theme/constants";

/**
 * Checks whether the Document Picture-in-Picture API is available.
 * @returns {boolean}
 */
export const isPipSupported = () => "documentPictureInPicture" in window;

/**
 * Copies stylesheets, font links, and CSS custom properties from the main
 * document into the PIP window so Tailwind classes render correctly.
 */
const copyStyles = (pipWindow) => {
  // Copy Google Fonts <link> tags
  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const clone = link.cloneNode(true);
    pipWindow.document.head.appendChild(clone);
  });

  // Copy all stylesheet rules (Tailwind, global CSS, etc.)
  [...document.styleSheets].forEach((sheet) => {
    try {
      const rules = [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
      const style = pipWindow.document.createElement("style");
      style.textContent = rules;
      pipWindow.document.head.appendChild(style);
    } catch {
      // CORS-restricted sheets are handled by the <link> clone above
    }
  });

  // Mirror the dark class on PiP's <html> so .dark overrides :root on the same element
  if (document.documentElement.classList.contains(THEME.DARK)) {
    pipWindow.document.documentElement.classList.add(THEME.DARK);
  }
};

/**
 * Opens a Document Picture-in-Picture window, copies styles into it,
 * creates a React render container, and updates the pip store.
 *
 * MUST be called within a transient user activation context (click handler
 * or shortly after) for the browser to allow it.
 *
 * @returns {Promise<boolean>} Whether the PIP window was opened successfully.
 */
export const openPipWindow = async () => {
  if (!isPipSupported()) return false;

  const { pipWindow: existing } = usePipStore.getState();
  if (existing) return true;

  try {
    const pipWindow = await documentPictureInPicture.requestWindow({
      width: 420,
      height: 240,
    });

    copyStyles(pipWindow);

    // Prevent default body margin in the PIP window
    const resetStyle = pipWindow.document.createElement("style");
    resetStyle.textContent = "body { margin: 0; }";
    pipWindow.document.head.appendChild(resetStyle);

    const container = pipWindow.document.createElement("div");
    container.id = "pip-root";
    pipWindow.document.body.appendChild(container);

    // When the PIP window is closed by the user (via the browser chrome),
    // clean up the store so React stops rendering the portal.
    pipWindow.addEventListener("pagehide", () => {
      usePipStore.getState().clearPipState();
    });

    usePipStore.getState().setPipState(pipWindow, container);
    return true;
  } catch (err) {
    console.warn("PiP open failed:", err);
    return false;
  }
};

/**
 * Syncs the PIP window's theme with the main document.
 * Call this whenever the theme changes.
 */
export const syncPipTheme = (isDark) => {
  const { pipWindow } = usePipStore.getState();
  if (!pipWindow) return;
  const pipRoot = pipWindow.document.documentElement;
  if (isDark) {
    pipRoot.classList.add(THEME.DARK);
  } else {
    pipRoot.classList.remove(THEME.DARK);
  }
};

/**
 * Closes the PIP window (if open) and clears the store.
 */
export const closePipWindow = () => {
  const { pipWindow } = usePipStore.getState();
  if (pipWindow) {
    try {
      pipWindow.close();
    } catch {
      // Window may already be closed
    }
  }
  usePipStore.getState().clearPipState();
};
