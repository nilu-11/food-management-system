import React, { useState, memo } from 'react'
import './Dock.css'

interface DockItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean // Property to track active state
}

interface DockProps {
  items: DockItem[]
  baseItemSize?: number
}

// Using memo to prevent unnecessary re-renders
const Dock: React.FC<DockProps> = memo(({ items, baseItemSize = 50 }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <div className='dock-outer'>
      <div className='dock-panel'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`dock-item ${item.active ? 'active' : ''}`}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            onTouchStart={() => setHoveredItem(index)}
            onTouchEnd={() => setTimeout(() => setHoveredItem(null), 500)}
            style={{
              width: baseItemSize,
              height: baseItemSize,
              transform: hoveredItem === index ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Active indicator dot */}

            <div className={`dock-icon ${item.active ? 'active-icon' : ''}`}>
              {item.icon}
            </div>
            <div
              className={`dock-label-permanent ${
                item.active ? 'active-label' : ''
              }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

// Add display name for debugging
Dock.displayName = 'Dock'

export default Dock
