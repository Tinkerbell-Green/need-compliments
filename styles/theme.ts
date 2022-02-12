import { palette } from "./palette"

const defaultTheme = {
    media: {
        // 0 <= sm < 600px
        sm: 600, // 600px <= md < 960px
        md: 960, //   960px <= lg < 1440px
        lg: 1440, //  1440px <= xl
    }
}

export const themes = {
    light: {
        ...defaultTheme,
        name: "light",
        colors: {
            ...palette,
            primary: palette["primary-500"],
            text: palette["gray-900"],
            textHint: palette["gray-700"],
            textDisabled: palette["gray-400"],
            textAlternative: palette["white"],
        },
    },
}

export type Theme = typeof themes.light