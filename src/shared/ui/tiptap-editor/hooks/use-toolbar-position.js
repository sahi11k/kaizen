/**
 * Inline `style` for the floating toolbar. Journal mobile pins it above the
 * mobile tab bar via `--tt-mobile-tab-clearance`; plain mobile follows the
 * on-screen keyboard/cursor via `rect.y`; desktop needs no positioning.
 */
export function useToolbarPosition({ isMobile, isJournal, rect, height }) {
  if (isMobile && isJournal) {
    return {
      position: "fixed",
      // Override sticky `top: 0` from toolbar.scss — without this, `top` + `bottom` stretch the bar full viewport height.
      top: "auto",
      bottom: "var(--tt-mobile-tab-clearance, 0px)",
      left: "var(--tt-journal-toolbar-inline, 0rem)",
      right: "auto",
      zIndex: 65,
    };
  }

  if (isMobile) {
    return {
      bottom: `calc(100% - ${height - rect.y}px + var(--tt-mobile-tab-clearance, 0px))`,
    };
  }

  return {};
}
