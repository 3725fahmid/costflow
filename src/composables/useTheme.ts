import { inject, type Ref } from "vue"

type Theme = "dark" | "light" | "system"

type ThemeContext = {
  theme: Ref<Theme>
  setTheme: (theme: Theme) => void
}

export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>("theme")

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}