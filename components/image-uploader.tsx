"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void
  currentImage?: string | null
  aspectRatio?: "square" | "portrait" | "landscape"
  className?: string
}

export function ImageUploader({ onImageUploaded, currentImage, aspectRatio = "square", className }: ImageUploaderProps) {
  const { t } = useLanguage()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aspectRatioClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }[aspectRatio]

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setIsUploading(true)

    // Create a URL for the file
    const imageUrl = URL.createObjectURL(file)

    // Simulate upload delay
    setTimeout(() => {
      onImageUploaded(imageUrl)
      setIsUploading(false)
    }, 1000)
  }

  const handleRemoveImage = () => {
    onImageUploaded("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {!currentImage ? (
        <div
          className={cn(
            aspectRatioClass,
            "w-full border-2 border-dashed rounded-lg",
            isDragging ? "border-primary bg-primary/10" : "border-border",
            "flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <Upload className={cn("h-4 w-4 md:h-7 md:w-7 mb-1", isDragging ? "text-primary" : "text-muted-foreground")} />
          <p className="text-xs md:text-xs font-medium text-center">{isUploading ? t("tryon.generating") : t("tryon.dragDrop")}</p>
          <p className="text-[7px] md:text-xs text-muted-foreground mt-1 text-center">{t("tryon.fileTypes")}</p>
        </div>
      ) : (
        <div className={cn(aspectRatioClass, "relative w-full rounded-lg overflow-hidden border shadow-md")}>
          <Image src={currentImage || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
