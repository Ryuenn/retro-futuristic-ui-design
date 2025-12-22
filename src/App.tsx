import { useState } from 'react'
import CRTTerminal from './components/CRTTerminal'
import './App.css'

function App() {
  const [scale, setScale] = useState<number>(1)

  const scaleOptions = [
    { value: 0.4, label: '40%' },
    { value: 0.5, label: '50%' },
    { value: 0.6, label: '60%' },
    { value: 0.75, label: '75%' },
    { value: 1, label: '100% (Default)' },
    { value: 1.25, label: '125%' },
    { value: 1.5, label: '150%' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#1a1a1a' }}>
      {/* Control Panel */}
      <div style={{
        width: '250px',
        padding: '30px 20px',
        background: '#0a0a0a',
        borderRight: '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>
        <h2 style={{
          color: '#ff6a00',
          fontFamily: 'monospace',
          fontSize: '18px',
          marginBottom: '10px',
          textShadow: '0 0 10px rgba(255, 106, 0, 0.5)',
        }}>
          SCALE CONTROL
        </h2>
        
        <div style={{
          color: '#994400',
          fontFamily: 'monospace',
          fontSize: '12px',
          marginBottom: '10px',
        }}>
          Current: {(scale * 100).toFixed(0)}%
        </div>

        {scaleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setScale(option.value)}
            style={{
              padding: '12px 15px',
              background: scale === option.value ? 'rgba(255, 106, 0, 0.2)' : 'transparent',
              border: scale === option.value ? '1px solid #ff6a00' : '1px solid #333',
              color: scale === option.value ? '#ff6a00' : '#666',
              fontFamily: 'monospace',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              boxShadow: scale === option.value ? '0 0 10px rgba(255, 106, 0, 0.3)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (scale !== option.value) {
                e.currentTarget.style.borderColor = '#555'
                e.currentTarget.style.color = '#999'
              }
            }}
            onMouseLeave={(e) => {
              if (scale !== option.value) {
                e.currentTarget.style.borderColor = '#333'
                e.currentTarget.style.color = '#666'
              }
            }}
          >
            {option.label}
          </button>
        ))}

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(255, 106, 0, 0.05)',
          border: '1px solid #331a00',
          color: '#994400',
          fontFamily: 'monospace',
          fontSize: '11px',
          lineHeight: '1.6',
        }}>
          <strong style={{ color: '#ff6a00' }}>TIP:</strong><br />
          Use smaller scales (40-75%) for embedding in sidebars or widgets.
        </div>
      </div>

      {/* Terminal Display */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CRTTerminal scale={scale} />
      </div>
    </div>
  )
}

export default App