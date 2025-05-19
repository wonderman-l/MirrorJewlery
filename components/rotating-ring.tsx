"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCustomTheme } from "@/contexts/theme-context"

interface RotatingRingProps {
  buttonText: string
  href: string
}

export function RotatingRing({ buttonText, href }: RotatingRingProps) {
  const { theme } = useCustomTheme()
  const [isHovering, setIsHovering] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [rotation, setRotation] = useState(0)

  // 确保组件在客户端渲染后再显示动画效果
  useEffect(() => {
    setMounted(true)

    // 添加旋转动画
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.05) % 360)
    }, 20)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return null
  }

  // 根据主题设置光圈颜色
  const getRingColor = () => {
    switch (theme) {
      case "purple":
        return "#9D8FFF"
      case "blue":
        return "#64C7FF"
      case "green":
        return "#64FFDA"
      case "pink":
        return "#FF64B4"
      case "dark":
        return "#AAAAAA"
      default:
        return "#DDDDDD"
    }
  }

  // 根据主题设置按钮样式
  const getButtonStyle = () => {
    switch (theme) {
      case "purple":
        return "bg-purple-600 hover:bg-purple-700"
      case "blue":
        return "bg-blue-600 hover:bg-blue-700"
      case "green":
        return "bg-green-600 hover:bg-green-700"
      case "pink":
        return "bg-pink-600 hover:bg-pink-700"
      case "dark":
        return "bg-gray-700 hover:bg-gray-800"
      default:
        return "bg-gray-800 hover:bg-gray-900"
    }
  }

  // 计算图标在圆环上的位置
  const calculatePosition = (degrees) => {
    const radius = 160 // 圆环半径
    const radians = (degrees + rotation) * (Math.PI / 180)
    const x = Math.cos(radians) * radius
    const y = Math.sin(radians) * radius
    return { x, y }
  }

  // 获取闪烁动画样式
  const getTwinkleStyle = (index) => {
    // 为每个元素设置不同的动画延迟，创造错落有致的闪烁效果
    const delay = index * 0.5 // 每个元素延迟0.5秒
    return {
      animation: `twinkle 3s ease-in-out infinite ${delay}s, sparkle 4s ease-in-out infinite ${delay + 0.7}s`,
    }
  }

  // 获取发光效果样式
  const getGlowStyle = (color) => {
    return {
      filter: `drop-shadow(0 0 3px ${color})`,
    }
  }

  return (
    <div
      className="relative w-[380px] h-[380px] mx-auto my-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="-190 -190 380 380">
        {/* 单个圆环 */}
        <circle cx="0" cy="0" r="160" fill="none" stroke={getRingColor()} strokeWidth="1.5" className="opacity-80" />

        {/* 钻石戒指 - 0度位置 */}
        <g transform={`translate(${calculatePosition(0).x}, ${calculatePosition(0).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(79, 155, 255, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(0)}>
            <circle cx="16" cy="16" r="10" stroke="#4F9BFF" strokeWidth="2.5" fill="none" />
            <path d="M16 6L20 10L16 14L12 10L16 6Z" fill="#4F9BFF" style={getGlowStyle("#4F9BFF")} />
          </svg>
        </g>

        {/* 钻石耳环 - 45度位置 */}
        <g transform={`translate(${calculatePosition(45).x}, ${calculatePosition(45).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(157, 143, 255, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(1)}>
            <path d="M10 6C10 6 10 10 10 12C10 14 8 16 8 16" stroke="#9D8FFF" strokeWidth="2.5" />
            <path d="M10 6C10 6 10 8 12 8C14 8 14 6 14 6" stroke="#9D8FFF" strokeWidth="2.5" />
            <path d="M8 16L6 22" stroke="#9D8FFF" strokeWidth="2.5" />
            <path d="M22 6C22 6 22 10 22 12C22 14 24 16 24 16" stroke="#9D8FFF" strokeWidth="2.5" />
            <path d="M22 6C22 6 22 8 20 8C18 8 18 6 18 6" stroke="#9D8FFF" strokeWidth="2.5" />
            <path d="M24 16L26 22" stroke="#9D8FFF" strokeWidth="2.5" />
            <path d="M6 22L8 26L12 22L6 22Z" fill="#9D8FFF" style={getGlowStyle("#9D8FFF")} />
            <path d="M26 22L24 26L20 22L26 22Z" fill="#9D8FFF" style={getGlowStyle("#9D8FFF")} />
          </svg>
        </g>

        {/* 金项链 - 90度位置 */}
        <g transform={`translate(${calculatePosition(90).x}, ${calculatePosition(90).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(255, 159, 100, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(2)}>
            <path d="M6 12C6 12 16 24 26 12" stroke="#FF9F64" strokeWidth="2.5" />
            <path d="M10 12C10 12 16 18 22 12" stroke="#FF9F64" strokeWidth="2.5" />
            <circle cx="16" cy="18" r="4" fill="#FF9F64" style={getGlowStyle("#FF9F64")} />
            <path d="M16 22L16 26" stroke="#FF9F64" strokeWidth="2.5" />
          </svg>
        </g>

        {/* 宝石胸针 - 135度位置 */}
        <g transform={`translate(${calculatePosition(135).x}, ${calculatePosition(135).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(255, 100, 100, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(3)}>
            <path d="M16 6L24 14L16 22L8 14L16 6Z" fill="#FF6464" style={getGlowStyle("#FF6464")} />
            <path d="M16 22L16 26" stroke="#FF6464" strokeWidth="2.5" />
            <path d="M8 14L4 14" stroke="#FF6464" strokeWidth="2.5" />
            <path d="M24 14L28 14" stroke="#FF6464" strokeWidth="2.5" />
          </svg>
        </g>

        {/* 钻石项链 - 180度位置 */}
        <g transform={`translate(${calculatePosition(180).x}, ${calculatePosition(180).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(255, 100, 180, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(4)}>
            <path d="M8 8C8 8 16 16 16 20C16 24 8 32 8 32" stroke="#FF64B4" strokeWidth="2.5" />
            <path d="M24 8C24 8 16 16 16 20C16 24 24 32 24 32" stroke="#FF64B4" strokeWidth="2.5" />
            <path d="M16 14L20 18L16 22L12 18L16 14Z" fill="#FF64B4" style={getGlowStyle("#FF64B4")} />
          </svg>
        </g>

        {/* 手镯/手链 - 225度位置 */}
        <g transform={`translate(${calculatePosition(225).x}, ${calculatePosition(225).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(100, 255, 218, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(5)}>
            <ellipse cx="16" cy="16" rx="12" ry="8" stroke="#64FFDA" strokeWidth="2.5" fill="none" />
            <path d="M10 16C10 16 12 20 16 20C20 20 22 16 22 16" stroke="#64FFDA" strokeWidth="2.5" />
            <circle cx="16" cy="12" r="2" fill="#64FFDA" style={getGlowStyle("#64FFDA")} />
          </svg>
        </g>

        {/* 皇冠/王冠 - 270度位置 */}
        <g transform={`translate(${calculatePosition(270).x}, ${calculatePosition(270).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(255, 100, 224, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(6)}>
            <path d="M4 20L8 8L16 14L24 8L28 20H4Z" fill="#FF64E0" style={getGlowStyle("#FF64E0")} />
            <circle cx="8" cy="8" r="2" fill="#FFFFFF" />
            <circle cx="16" cy="14" r="2" fill="#FFFFFF" />
            <circle cx="24" cy="8" r="2" fill="#FFFFFF" />
            <path d="M4 24H28" stroke="#FF64E0" strokeWidth="2.5" />
          </svg>
        </g>

        {/* 珍珠项链 - 315度位置 */}
        <g transform={`translate(${calculatePosition(315).x}, ${calculatePosition(315).y})`}>
          <circle
            r="18"
            fill={isHovering ? "rgba(100, 199, 255, 0.2)" : "transparent"}
            className="transition-all duration-300"
          />
          <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 32 32" fill="none" style={getTwinkleStyle(7)}>
            <path d="M6 12C6 12 16 24 26 12" stroke="#64C7FF" strokeWidth="2.5" />
            <circle cx="10" cy="14" r="2.5" fill="#64C7FF" style={getGlowStyle("#64C7FF")} />
            <circle cx="16" cy="18" r="2.5" fill="#64C7FF" style={getGlowStyle("#64C7FF")} />
            <circle cx="22" cy="14" r="2.5" fill="#64C7FF" style={getGlowStyle("#64C7FF")} />
            <circle cx="6" cy="12" r="2" fill="#64C7FF" style={getGlowStyle("#64C7FF")} />
            <circle cx="26" cy="12" r="2" fill="#64C7FF" style={getGlowStyle("#64C7FF")} />
          </svg>
        </g>
      </svg>

      {/* 中心按钮 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <Link href={href} className="relative z-10 w-24 h-24">
            <Button
              className={`w-full h-full rounded-full shadow-lg ${getButtonStyle()} text-white font-medium transition-all duration-300 ${
                isHovering ? "scale-110" : "scale-100"
              }`}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
