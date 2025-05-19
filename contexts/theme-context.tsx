"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeType = "default" | "purple" | "blue" | "green" | "pink" | "dark"

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("default")

  // Load theme preference from localStorage on client side
  useEffect(() => {
    const savedTheme = localStorage.getItem("custom-theme") as ThemeType
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])

  // Save theme preference to localStorage and update data-theme attribute
  useEffect(() => {
    localStorage.setItem("custom-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useCustomTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")
  }
  return context
}
