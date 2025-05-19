"use client"

import { useCustomTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { theme, setTheme } = useCustomTheme()
  const { t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Palette className="h-4 w-4" />
          <span className="sr-only">{t("settings.theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t("settings.theme")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme("default")}
          className={`flex items-center gap-2 ${theme === "default" ? "bg-accent" : ""}`}
        >
          <div className="w-4 h-4 rounded-full bg-[#f8fafc] border border-gray-200"></div>
          <span>{t("settings.theme.default")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("purple")}
          className={`flex items-center gap-2 ${theme === "purple" ? "bg-accent" : ""}`}
        >
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <span>{t("settings.theme.purple")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("blue")}
          className={`flex items-center gap-2 ${theme === "blue" ? "bg-accent" : ""}`}
        >
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span>{t("settings.theme.blue")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("green")}
          className={`flex items-center gap-2 ${theme === "green" ? "bg-accent" : ""}`}
        >
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span>{t("settings.theme.green")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("pink")}
          className={`flex items-center gap-2 ${theme === "pink" ? "bg-accent" : ""}`}
        >
          <div className="w-4 h-4 rounded-full bg-pink-500"></div>
          <span>{t("settings.theme.pink")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 ${theme === "dark" ? "bg-accent" : ""}`}
        >
          <div className="w-4 h-4 rounded-full bg-gray-900"></div>
          <span>{t("settings.theme.dark")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
