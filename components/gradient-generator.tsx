"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function GradientGenerator() {
  const [colors, setColors] = useState<string[]>(["#FF69B4", "#98FB98", "#FFFFFF"])
  const [angle, setAngle] = useState<number>(45)
  const [selectedColor, setSelectedColor] = useState<number>(0)

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
  }

  const generateRandomAngle = () => {
    return Math.floor(Math.random() * 361)
  }

  const generateRandomGradient = () => {
    const numColors = Math.floor(Math.random() * 3) + 2
    const newColors = Array(numColors).fill(0).map(() => generateRandomColor())
    setColors(newColors)
    setAngle(generateRandomAngle())
  }

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
    borderRadius: "0.75rem",
    width: "100%",
    height: "300px",
    transition: "all 0.5s ease",
  }

  useEffect(() => {
    generateRandomGradient()
  }, [generateRandomGradient])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gradient Generator</h1>
        <ThemeToggle />
      </div>
      <Card className="overflow-hidden">
        <div style={gradientStyle} />
      </Card>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative"
              onClick={() => setSelectedColor(index)}
            >
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-white dark:border-gray-800"
                style={{
                  background: color,
                  outline: index === selectedColor ? "2px solid rgb(var(--primary))" : "none",
                }}
              />
            </div>
          ))}
        </div>
        
        <Button
          onClick={generateRandomGradient}
          className="ml-4"
        >
          Random Gradient
        </Button>
      </div>

      <div className="text-sm font-mono bg-muted p-3 rounded-lg">
        background: linear-gradient({angle}deg, {colors.join(", ")});
      </div>
    </div>
  )
}

