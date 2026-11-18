/**
 * Inline `style` for the floating toolbar. Journal needs none (in-flow, above
 * the content); plain mobile follows the
 * on-screen keyboard/cursor via `rect.y`; desktop needs no positioning.
 */
export function useToolbarPosition({ isMobile, isJournal, rect, height }) {
  // Journal: toolbar stays in normal flow above the content on every device.
  if (isJournal) return {};

  if (isMobile) {
    return {
      bottom: `calc(100% - ${height - rect.y}px + var(--tt-mobile-tab-clearance, 0px))`,
    };
  }

  return {};
}
