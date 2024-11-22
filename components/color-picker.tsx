import { useState, useRef, useEffect } from 'react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  isSelected: boolean
}

export function ColorPicker({ value, onChange, isSelected }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Sample color palette - you can expand this
  const colorPalette = [
    '#ff0000', '#ff4500', '#ffa500', '#ffff00', '#9acd32',
    '#008000', '#40e0d0', '#0000ff', '#4b0082', '#800080',
    '#ff69b4', '#ffffff', '#808080', '#000000'
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={pickerRef}>
      <div
        onClick={() => setShowPicker(!showPicker)}
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-white dark:border-gray-800"
        style={{
          background: value,
          outline: isSelected ? "2px solid rgb(var(--primary))" : "none",
        }}
      />
      
      {showPicker && (
        <div className="absolute top-12 left-0 z-50 p-2 bg-background border rounded-lg shadow-lg grid grid-cols-7 gap-1">
          {colorPalette.map((color) => (
            <div
              key={color}
              onClick={() => {
                onChange(color)
                setShowPicker(false)
              }}
              className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{ background: color }}
            />
          ))}
        </div>
      )}
    </div>
  )
}