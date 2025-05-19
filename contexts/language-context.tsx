"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "zh"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.tryOn": "Try On",

    // Landing Page
    "landing.title": "Virtual Jewelry Try-On",
    "landing.subtitle":
      "See how jewelry looks on you before you buy. Upload photos of jewelry and yourself to create a virtual try-on experience.",
    "landing.getStarted": "Get Started",
    "landing.howItWorks": "How It Works",
    "landing.howItWorksSubtitle": "Three simple steps to see how jewelry looks on you",
    "landing.step1Title": "1. Upload Jewelry",
    "landing.step1Desc": "Upload a clear photo of the jewelry item you want to try on (earrings, necklace, etc.)",
    "landing.step2Title": "2. Upload Your Photo",
    "landing.step2Desc": "Upload a clear front-facing photo of yourself to see how the jewelry looks on you",
    "landing.step3Title": "3. See Results",
    "landing.step3Desc":
      "Our system will generate an image of you wearing the jewelry to help you decide if it suits you",
    "landing.exampleResults": "Example Results",
    "landing.exampleResultsSubtitle": "See how our virtual try-on technology works with these examples",
    "landing.earrings": "Earrings",
    "landing.necklaces": "Necklaces",
    "landing.pendants": "Pendants",
    "landing.tryItNow": "Try It Now",
    "landing.footer": "© 2024 MirrorJewelry. All rights reserved.",

    // Try-on Page
    "tryon.welcome": "Welcome to MirrorJewelry",
    "tryon.welcomeDesc": "Virtual try-on for jewelry to help you make better purchasing decisions",
    "tryon.howItWorks": "How it works",
    "tryon.howItWorksDesc":
      "Upload photos of jewelry and yourself to see how they would look on you. For best results:",
    "tryon.jewelryPhoto": "Jewelry Photo",
    "tryon.jewelryPhotoDesc": "Upload a clear photo of the jewelry against a plain background",
    "tryon.yourPhoto": "Your Photo",
    "tryon.yourPhotoDesc": "Upload a front-facing photo with good lighting",
    "tryon.modelPhoto": "Model Photo (Optional)",
    "tryon.modelPhotoDesc": "Optionally upload a photo of a model wearing similar jewelry",
    "tryon.understand": "I Understand, Let's Start",
    "tryon.uploadImages": "Upload Your Images",
    "tryon.important": "Important",
    "tryon.importantDesc":
      "You must upload at least a jewelry image and your face photo to generate a result. The model image is optional but can help improve results.",
    "tryon.uploadJewelry": "Upload Jewelry Image",
    "tryon.uploadJewelryDesc":
      "Upload a clear photo of the jewelry item (earrings, necklace, etc.) against a plain background.",
    "tryon.uploadFace": "Upload Your Photo",
    "tryon.uploadFaceDesc": "Upload a clear front-facing photo of yourself with good lighting.",
    "tryon.uploadModel": "Upload Model Reference (Optional)",
    "tryon.uploadModelDesc": "Optionally upload a photo of a model wearing similar jewelry to help improve results.",
    "tryon.generating": "Generating...",
    "tryon.generateResult": "Generate Result",
    "tryon.result": "Your Result",
    "tryon.originalImages": "Original Images",
    "tryon.jewelry": "Jewelry",
    "tryon.face": "Your Photo",
    "tryon.model": "Model Reference",
    "tryon.generatedResult": "Generated Result",
    "tryon.tryAgain": "Try Again",
    "tryon.download": "Download",
    "tryon.dragDrop": "Click or drag image to upload",
    "tryon.fileTypes": "PNG, JPG or JPEG (max. 10MB)",

    // Theme and Language
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.theme.default": "Default",
    "settings.theme.purple": "Purple",
    "settings.theme.blue": "Blue",
    "settings.theme.green": "Green",
    "settings.theme.pink": "Pink",
    "settings.theme.dark": "Dark",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.tryOn": "试戴",

    // Landing Page
    "landing.title": "虚拟饰品试戴",
    "landing.subtitle": "在购买前看看饰品在您身上的效果。上传饰品和您自己的照片，创建虚拟试戴体验。",
    "landing.getStarted": "开始体验",
    "landing.howItWorks": "使用方法",
    "landing.howItWorksSubtitle": "三个简单步骤，看看饰品在您身上的效果",
    "landing.step1Title": "1. 上传饰品",
    "landing.step1Desc": "上传您想要试戴的饰品的清晰照片（耳环、项链等）",
    "landing.step2Title": "2. 上传您的照片",
    "landing.step2Desc": "上传您的正面清晰照片，看看饰品在您身上的效果",
    "landing.step3Title": "3. 查看结果",
    "landing.step3Desc": "我们的系统将生成您佩戴饰品的图像，帮助您决定是否适合您",
    "landing.exampleResults": "示例结果",
    "landing.exampleResultsSubtitle": "看看我们的虚拟试戴技术如何通过这些例子展示效果",
    "landing.earrings": "耳环",
    "landing.necklaces": "项链",
    "landing.pendants": "吊坠",
    "landing.tryItNow": "立即试用",
    "landing.footer": "© 2024 百搭饰界。保留所有权利。",

    // Try-on Page
    "tryon.welcome": "欢迎使用百搭饰界",
    "tryon.welcomeDesc": "饰品虚拟试戴，帮助您做出更好的购买决策",
    "tryon.howItWorks": "使用方法",
    "tryon.howItWorksDesc": "上传饰品和您自己的照片，看看它们在您身上的效果。为了获得最佳效果：",
    "tryon.jewelryPhoto": "饰品照片",
    "tryon.jewelryPhotoDesc": "上传饰品的清晰照片，最好是纯色背景",
    "tryon.yourPhoto": "您的照片",
    "tryon.yourPhotoDesc": "上传光线良好的正面照片",
    "tryon.modelPhoto": "模特照片（可选）",
    "tryon.modelPhotoDesc": "可选择上传佩戴类似饰品的模特照片",
    "tryon.understand": "我已了解，开始使用",
    "tryon.uploadImages": "上传您的图片",
    "tryon.important": "重要提示",
    "tryon.importantDesc":
      "您必须至少上传一张饰品图片和您的面部照片才能生成结果。模特图片是可选的，但可以帮助改善结果。",
    "tryon.uploadJewelry": "上传饰品图片",
    "tryon.uploadJewelryDesc": "上传饰品（耳环、项链等）的清晰照片，最好是纯色背景。",
    "tryon.uploadFace": "上传您的照片",
    "tryon.uploadFaceDesc": "上传您自己的清晰正面照片，光线良好。",
    "tryon.uploadModel": "上传模特参考（可选）",
    "tryon.uploadModelDesc": "可选择上传佩戴类似饰品的模特照片，以帮助改善结果。",
    "tryon.generating": "生成中...",
    "tryon.generateResult": "生成结果",
    "tryon.result": "您的结果",
    "tryon.originalImages": "原始图片",
    "tryon.jewelry": "饰品",
    "tryon.face": "您的照片",
    "tryon.model": "模特参考",
    "tryon.generatedResult": "生成结果",
    "tryon.tryAgain": "重试",
    "tryon.download": "下载",
    "tryon.dragDrop": "点击或拖拽图片上传",
    "tryon.fileTypes": "PNG、JPG 或 JPEG（最大 10MB）",

    // Theme and Language
    "settings.language": "语言",
    "settings.theme": "主题",
    "settings.theme.default": "默认",
    "settings.theme.purple": "紫色",
    "settings.theme.blue": "蓝色",
    "settings.theme.green": "绿色",
    "settings.theme.pink": "粉色",
    "settings.theme.dark": "暗黑",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
