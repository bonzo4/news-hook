import { THEMES } from "../theming/constants";
import { DARK_THEME } from "../theming/darkTheme";
import { LIGHT_THEME } from "../theming/lightTheme";
import type { Preferences } from "./Preferences";

export const DEFAULT_PREFERENCES: Preferences = {
  color: "dark",
  display: "cozy",
  fontSize: 16,
  confirmExit: false,
  expandSections: false,
};

export const DEFAULT_THEME = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
  background: DARK_THEME,
  text: {
    normal: "#ffffff",
  },
  font: {
    sans: "Inter, sans-serif",
  },
  scrollbar: {
    auto: {
      thumb: "#4f545c",
      track: "#2f3136",
    },
  },
  interactive: {
    muted: "#4f545c",
  },
  appearance: {
    color: "dark",
    display: "compact",
    fontSize: 16,
  },
};
