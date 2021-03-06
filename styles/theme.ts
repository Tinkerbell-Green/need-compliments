import {palette} from "./palette"

const defaultTheme = {
  media: {
    // 0 <= sm < 600px
    sm: 600, // 600px <= md < 1024px
    md: 1024, //   1024px <= lg < 1440px
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
      goals: {
        darkgray: "#808080",
        blue: "#3274F6",
        skyblue: "#4FA4E5",
        orchid: "#AD69ED",
        mediunslateblue: "#a3a6f7",
        lightseagreen: "#4E9198",
        mediumseagreen: "#5E9E68",
        green: "#aae67b",
        lightsalmon: "#ED9F8D",
        pink: "#ffa4dc",
        hotpink: "#ff6cb9",
        redpink: "#E25B62",
        yellow: "#fbdf7b",
        orange: "#feb86f",
        white: "#ffffff",
      }
    },
  },
}

export type Theme = typeof themes.dark