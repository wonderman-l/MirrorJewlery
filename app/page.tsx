"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useCustomTheme } from "@/contexts/theme-context"
import { RotatingRing } from "@/components/rotating-ring"

export default function Home() {
  const { t } = useLanguage()
  const { theme } = useCustomTheme()

  return (
    <div className="flex flex-col min-h-screen theme-background">
      <header className="border-b sticky top-0 z-50 theme-header shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Logo"
              className="rounded-full"
            />
            <span className="text-xl font-bold">MirrorJewelry</span>
            <span className="text-xl font-bold text-muted-foreground">百搭饰界</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {t("landing.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("landing.subtitle")}</p>
              </div>

              {/* 顶部使用旋转光圈组件 */}
              <RotatingRing buttonText={t("landing.getStarted")} href="/try-on" />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 theme-section-alt">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("landing.howItWorks")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("landing.howItWorksSubtitle")}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-1.5 bg-primary"></div>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-primary"
                      >
                        <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                        <path d="m12 15 3-3-3-3-3 3 3 3Z" />
                        <path d="M11.95 15.05 9.1 17.9c-.9.9-2.4.9-3.3 0l-.8-.8c-.9-.9-.9-2.4 0-3.3l2.85-2.85" />
                        <path d="M12.05 15.05 14.9 17.9c.9.9 2.4.9 3.3 0l.8-.8c.9-.9.9-2.4 0-3.3l-2.85-2.85" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{t("landing.step1Title")}</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">{t("landing.step1Desc")}</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-1.5 bg-primary"></div>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-primary"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{t("landing.step2Title")}</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">{t("landing.step2Desc")}</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-1.5 bg-primary"></div>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-primary"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{t("landing.step3Title")}</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">{t("landing.step3Desc")}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("landing.exampleResults")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("landing.exampleResultsSubtitle")}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                <div className="space-y-2 group">
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        width={400}
                        height={300}
                        alt="Jewelry Example"
                        className="aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{t("landing.earrings")}</h3>
                </div>
                <div className="space-y-2 group">
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        width={400}
                        height={300}
                        alt="Necklace Example"
                        className="aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{t("landing.necklaces")}</h3>
                </div>
                <div className="space-y-2 group">
                  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        width={400}
                        height={300}
                        alt="Pendant Example"
                        className="aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{t("landing.pendants")}</h3>
                </div>
              </div>

              {/* 底部使用普通按钮 */}
              <div className="w-full max-w-sm space-y-2 pt-6">
                <Link href="/try-on">
                  <Button className="w-full" size="lg">
                    {t("landing.tryItNow")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 theme-footer">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">{t("landing.footer")}</p>
          {/* 移除了页脚的语言和主题切换按钮 */}
        </div>
      </footer>
    </div>
  )
}
