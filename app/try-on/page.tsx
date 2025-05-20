"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertCircle } from "lucide-react"
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
  const [jewelryImages, setJewelryImages] = useState<string[]>([])
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const [modelImages, setModelImages] = useState<string[]>([])
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleJewelryUpload = (imageUrl: string) => {
    setJewelryImages(prev => [...prev, imageUrl])
    toast({
      title: t("tryon.jewelryUploaded"),
      description: t("tryon.jewelryUploadedDesc"),
    })
  }

  const handleJewelryRemove = (index: number) => {
    setJewelryImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleFaceUpload = (imageUrl: string) => {
    setFaceImage(imageUrl)
    toast({
      title: t("tryon.faceUploaded"),
      description: t("tryon.faceUploadedDesc"),
    })
  }

  const handleModelUpload = (imageUrl: string) => {
    setModelImages(prev => [...prev, imageUrl])
    toast({
      title: t("tryon.modelUploaded"),
      description: t("tryon.modelUploadedDesc"),
    })
  }

  const handleModelRemove = (index: number) => {
    setModelImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (jewelryImages.length === 0 || !faceImage) {
      toast({
        title: t("tryon.missingImages"),
        description: t("tryon.missingImagesDesc"),
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setResultImage("/placeholder.svg?height=600&width=400")
      setIsGenerating(false)
    }, 3000)
  }

  const handleReset = (type: 'jewelry' | 'face' | 'model') => {
    switch (type) {
      case 'jewelry':
        setJewelryImages([])
        break
      case 'face':
        setFaceImage(null)
        break
      case 'model':
        setModelImages([])
        break
    }
  }

  const handleDownload = () => {
    if (!resultImage) return
    // 实现下载逻辑
    toast({
      title: t("tryon.downloadSuccess"),
      description: t("tryon.downloadSuccessDesc"),
    })
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

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 欢迎部分 */}
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

          {/* 提示信息 */}
          {/* {jewelryImages.length === 0 || !faceImage ? (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("tryon.missingImages")}</AlertTitle>
              <AlertDescription>
                {t("tryon.missingImagesDesc")}
              </AlertDescription>
            </Alert>
          ) : null} */}

          {/* 操作按钮 */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={handleGenerate}
              disabled={jewelryImages.length === 0 || !faceImage || isGenerating}
              className="min-w-[150px]"
            >
              {isGenerating ? t("tryon.generating") : t("tryon.generateResult")}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!resultImage}
              variant="outline"
              className="min-w-[150px]"
            >
              {t("tryon.download")}
            </Button>
          </div>

          <div ></div>

        </div>


        {/* 左右布局区域 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 justify-center">
            {/* 左侧：上传区域 */}
            <div className="flex-[6] min-w-0">
              <Card className="overflow-hidden shadow-md mb-8 h-full">
                <div className="h-1.5 bg-primary"></div>
                <CardHeader className="bg-secondary/50 py-3">
                  <CardTitle className="text-md">{t("tryon.originalMaterials")}</CardTitle>
                </CardHeader>
                <div className="h-[calc(100%-3rem)] grid grid-rows-3 gap-4 p-4">
                  {/* 珠宝图片上传 */}
                  <Card className="flex flex-col min-h-0 overflow-hidden shadow-md">
                    <CardHeader className="bg-muted/30 py-2 shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                              <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                              <path d="m12 15 3-3-3-3-3 3 3 3Z" />
                              <path d="M11.95 15.05 9.1 17.9c-.9.9-2.4.9-3.3 0l-.8-.8c-.9-.9-.9-2.4 0-3.3l2.85-2.85" />
                              <path d="M12.05 15.05 14.9 17.9c.9.9 2.4.9 3.3 0l.8-.8c.9-.9.9-2.4 0-3.3l-2.85-2.85" />
                            </svg>
                          </div>
                          <CardTitle className="text-base">{t("tryon.uploadJewelry")}</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleReset('jewelry')} disabled={jewelryImages.length === 0}>{t("tryon.clearAll")}</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 flex flex-col p-2 overflow-auto">
                      <p className="text-xs text-muted-foreground mb-1">{t("tryon.uploadJewelryDesc")}</p>
                      <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
                        {jewelryImages.map((image, index) => (
                          <div key={index} className="relative group h-full max-h-[120px] max-w-[120px] w-full flex-1">
                            <div className="rounded-md border overflow-hidden h-full w-full">
                              <Image src={image} width={120} height={120} alt={`Jewelry ${index + 1}`} className="h-full w-full object-cover" />
                            </div>
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleJewelryRemove(index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </Button>
                          </div>
                        ))}
                        <div className="h-full max-h-[120px] max-w-[120px] w-full flex-1 flex items-center justify-center">
                          <ImageUploader onImageUploaded={handleJewelryUpload} aspectRatio="square" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 人像图片上传 */}
                  <Card className="flex flex-col min-h-0 overflow-hidden shadow-md">
                    <CardHeader className="bg-muted/30 py-2 shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                          <CardTitle className="text-base">{t("tryon.uploadFace")}</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleReset('face')} disabled={!faceImage}>{t("tryon.clearAll")}</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 flex flex-col p-2 overflow-auto">
                      <p className="text-xs text-muted-foreground mb-1">{t("tryon.uploadFaceDesc")}</p>
                      <div className="flex-1 flex items-center justify-center">
                        {faceImage ? (
                          <div className="relative group h-full max-h-[120px] max-w-[120px] w-full flex-1">
                            <div className="rounded-md border overflow-hidden h-full w-full">
                              <Image src={faceImage} width={120} height={120} alt="Your face" className="h-full w-full object-cover" />
                            </div>
                          </div>
                        ) : (
                          <div className="h-full max-h-[120px] max-w-[120px] w-full flex-1 flex items-center justify-center">
                            <ImageUploader onImageUploaded={handleFaceUpload} aspectRatio="square" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 模特参考图片上传 */}
                  <Card className="flex flex-col min-h-0 overflow-hidden shadow-md">
                    <CardHeader className="bg-muted/30 py-2 shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                              <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                              <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                              <path d="M12 6v12" />
                              <path d="M3 12h18" />
                            </svg>
                          </div>
                          <CardTitle className="text-base">{t("tryon.uploadModel")}</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleReset('model')} disabled={modelImages.length === 0}>{t("tryon.clearAll")}</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 flex flex-col p-2 overflow-auto">
                      <p className="text-xs text-muted-foreground mb-1">{t("tryon.uploadModelDesc")}</p>
                      <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
                        {modelImages.map((image, index) => (
                          <div key={index} className="relative group h-full max-h-[120px] max-w-[120px] w-full flex-1">
                            <div className="rounded-md border overflow-hidden h-full w-full">
                              <Image src={image} width={120} height={120} alt={`Model ${index + 1}`} className="h-full w-full object-cover" />
                            </div>
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleModelRemove(index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </Button>
                          </div>
                        ))}
                        <div className="h-full max-h-[120px] max-w-[120px] w-full flex-1 flex items-center justify-center">
                          <ImageUploader onImageUploaded={handleModelUpload} aspectRatio="square" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            </div>
            {/* 右侧：结果展示区域 */}
            <div className="flex-[4] min-w-0 flex flex-col">
              <Card className="overflow-hidden shadow-lg h-full flex flex-col">
                <div className="h-1.5 bg-primary"></div>
                <CardHeader className="bg-secondary/50 py-3">
                  <CardTitle className="text-md">{t("tryon.result")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex items-center justify-center">
                  {resultImage ? (
                    <div className="aspect-[9/16] rounded-md border overflow-hidden shadow-sm w-full max-w-[90%] max-h-[60vh] flex items-center justify-center">
                      <Image
                        src={resultImage}
                        width={400}
                        height={300}
                        alt="Generated result"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
                      {jewelryImages.length === 0 || !faceImage ? (
                        <>
                          <div className="rounded-full bg-muted p-4">
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
                              className="h-8 w-8 text-muted-foreground"
                            >
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">{t("tryon.waitingForUpload")}</h3>
                            <p className="text-sm text-muted-foreground">{t("tryon.uploadPrompt")}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="rounded-full bg-primary/10 p-4">
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
                              className="h-8 w-8 text-muted-foreground"
                            >
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">{t("tryon.readyToGenerate")}</h3>
                            <p className="text-sm text-muted-foreground">{t("tryon.clickGenerate")}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </main>
      <footer className="border-t py-6 md:py-0 theme-footer">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t("landing.footer")}
          </p>
        </div>
      </footer>
    </div>
  )
}
