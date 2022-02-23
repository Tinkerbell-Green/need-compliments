import {palette} from "./palette"

const defaultTheme = {
  media: {
    // 0 <= sm < 600px
    sm: 600, // 600px <= md < 960px
    md: 960, //   960px <= lg < 1440px
    lg: 1440, //  1440px <= xl
  }
}

export const themes = {
  dark: {
    ...defaultTheme,
    name: "dark",
    colors: {
      ...palette,
      text: palette["white"],
      textHint: palette["gray-400"],
      textDisabled: palette["gray-600"],
      textAlternative: palette["black"],
      icon: palette["white"],
    },
  },
}

export type Theme = typeof themes.dark