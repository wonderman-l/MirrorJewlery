"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertCircle, ArrowLeft, Check } from "lucide-react"
import { ImageUploader } from "@/components/image-uploader"
import { useToast } from "@/hooks/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useCustomTheme } from "@/contexts/theme-context"

export default function TryOnPage() {
  const { t } = useLanguage()
  const { theme } = useCustomTheme()
  const { toast } = useToast()
  const [step, setStep] = useState<"upload" | "result">("upload")
  const [jewelryImage, setJewelryImage] = useState<string | null>(null)
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const [modelImage, setModelImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleJewelryUpload = (imageUrl: string) => {
    setJewelryImage(imageUrl)
    toast({
      title: "Jewelry image uploaded",
      description: "Your jewelry image has been successfully uploaded.",
    })
  }

  const handleFaceUpload = (imageUrl: string) => {
    setFaceImage(imageUrl)
    toast({
      title: "Face image uploaded",
      description: "Your face image has been successfully uploaded.",
    })
  }

  const handleModelUpload = (imageUrl: string) => {
    setModelImage(imageUrl)
    toast({
      title: "Model image uploaded",
      description: "The model reference image has been successfully uploaded.",
    })
  }

  const handleGenerate = async () => {
    if (!jewelryImage || !faceImage) {
      toast({
        title: "Missing images",
        description: "Please upload both jewelry and face images to continue.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setResultImage("/placeholder.svg?height=600&width=400")
      setIsGenerating(false)
      setStep("result")
    }, 3000)
  }

  const handleReset = () => {
    setJewelryImage(null)
    setFaceImage(null)
    setModelImage(null)
    setResultImage(null)
    setStep("upload")
  }

  return (
    <div className="flex flex-col min-h-screen theme-background">
      <header className="border-b sticky top-0 z-50 theme-header shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Logo"
              className="rounded-full"
            />
            <span className="text-xl font-bold">MirrorJewelry</span>
            <span className="text-xl font-bold text-muted-foreground">百搭饰界</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        {step === "upload" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="overflow-hidden shadow-md mb-8">
              <div className="h-1.5 bg-primary"></div>
              <div className="p-8 bg-muted/30">
                <h1 className="text-3xl font-bold mb-2">{t("tryon.welcome")}</h1>
                <p className="text-muted-foreground">{t("tryon.welcomeDesc")}</p>
              </div>
            </Card>

            <Alert className="bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-primary" />
              <AlertTitle className="font-medium text-primary">{t("tryon.howItWorks")}</AlertTitle>
              <AlertDescription className="text-primary/80">{t("tryon.howItWorksDesc")}</AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-primary/10 p-3">
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
                <h3 className="font-medium text-primary">{t("tryon.jewelryPhoto")}</h3>
                <p className="text-sm text-muted-foreground">{t("tryon.jewelryPhotoDesc")}</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-primary/10 p-3">
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
                <h3 className="font-medium text-primary">{t("tryon.yourPhoto")}</h3>
                <p className="text-sm text-muted-foreground">{t("tryon.yourPhotoDesc")}</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-primary/10 p-3">
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
                    <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                    <path d="M12 6v12" />
                    <path d="M3 12h18" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary">{t("tryon.modelPhoto")}</h3>
                <p className="text-sm text-muted-foreground">{t("tryon.modelPhotoDesc")}</p>
              </div>
            </div>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("tryon.important")}</AlertTitle>
              <AlertDescription>{t("tryon.importantDesc")}</AlertDescription>
            </Alert>

            <Tabs defaultValue="jewelry" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="jewelry">
                  {t("tryon.jewelry")} {jewelryImage && <Check className="ml-2 h-4 w-4" />}
                </TabsTrigger>
                <TabsTrigger value="face">
                  {t("tryon.face")} {faceImage && <Check className="ml-2 h-4 w-4" />}
                </TabsTrigger>
                <TabsTrigger value="model">
                  {t("tryon.model")} {modelImage && <Check className="ml-2 h-4 w-4" />}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="jewelry" className="p-6 border rounded-md mt-2 bg-card shadow-md">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-primary">{t("tryon.uploadJewelry")}</h3>
                    <p className="text-sm text-muted-foreground">{t("tryon.uploadJewelryDesc")}</p>
                  </div>
                  <ImageUploader
                    onImageUploaded={handleJewelryUpload}
                    currentImage={jewelryImage}
                    aspectRatio="square"
                  />
                </div>
              </TabsContent>
              <TabsContent value="face" className="p-6 border rounded-md mt-2 bg-card shadow-md">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-primary">{t("tryon.uploadFace")}</h3>
                    <p className="text-sm text-muted-foreground">{t("tryon.uploadFaceDesc")}</p>
                  </div>
                  <ImageUploader onImageUploaded={handleFaceUpload} currentImage={faceImage} aspectRatio="portrait" />
                </div>
              </TabsContent>
              <TabsContent value="model" className="p-6 border rounded-md mt-2 bg-card shadow-md">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-primary">{t("tryon.uploadModel")}</h3>
                    <p className="text-sm text-muted-foreground">{t("tryon.uploadModelDesc")}</p>
                  </div>
                  <ImageUploader onImageUploaded={handleModelUpload} currentImage={modelImage} aspectRatio="portrait" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button
                onClick={handleGenerate}
                disabled={!jewelryImage || !faceImage || isGenerating}
                className="min-w-[150px]"
              >
                {isGenerating ? t("tryon.generating") : t("tryon.generateResult")}
              </Button>
            </div>
          </div>
        )}

        {step === "result" && resultImage && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleReset} className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">{t("tryon.result")}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden shadow-lg">
                <div className="h-1.5 bg-primary"></div>
                <CardHeader className="bg-secondary/50">
                  <CardTitle>{t("tryon.originalImages")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {jewelryImage && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-primary">{t("tryon.jewelry")}</h3>
                        <div className="aspect-square rounded-md border overflow-hidden shadow-sm">
                          <Image
                            src={jewelryImage || "/placeholder.svg"}
                            width={200}
                            height={200}
                            alt="Jewelry"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {faceImage && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-primary">{t("tryon.face")}</h3>
                        <div className="aspect-square rounded-md border overflow-hidden shadow-sm">
                          <Image
                            src={faceImage || "/placeholder.svg"}
                            width={200}
                            height={200}
                            alt="Your face"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {modelImage && (
                      <div className="space-y-2 col-span-2">
                        <h3 className="text-sm font-medium text-primary">{t("tryon.model")}</h3>
                        <div className="aspect-video rounded-md border overflow-hidden shadow-sm">
                          <Image
                            src={modelImage || "/placeholder.svg"}
                            width={400}
                            height={200}
                            alt="Model reference"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-lg">
                <div className="h-1.5 bg-primary"></div>
                <CardHeader className="bg-secondary/50">
                  <CardTitle>{t("tryon.generatedResult")}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="aspect-[3/4] rounded-md border overflow-hidden shadow-sm">
                    <Image
                      src={resultImage || "/placeholder.svg"}
                      width={400}
                      height={600}
                      alt="Generated result"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-secondary/50">
                  <Button variant="outline" onClick={handleReset}>
                    {t("tryon.tryAgain")}
                  </Button>
                  <Button>{t("tryon.download")}</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
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
