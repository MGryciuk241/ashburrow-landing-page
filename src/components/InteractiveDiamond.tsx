import React, { useEffect, useRef, useState } from 'react';

interface InteractiveDiamondProps {
  modalities: string[];
}

const InteractiveDiamond: React.FC<InteractiveDiamondProps> = ({ modalities }) => {
  const [activeModalities, setActiveModalities] = useState<Set<number>>(new Set());
  const animationFrameRef = useRef<number>();

  const getAdjacentModalities = (index: number): number[] => {
    const totalModalities = 6;
    const prev = (index - 1 + totalModalities) % totalModalities;
    const next = (index + 1) % totalModalities;
    return [prev, next];
  };

  const handleHover = (modalityIndex: number, isHovering: boolean) => {
    setActiveModalities(prev => {
      const newActive = new Set(prev);
      
      if (isHovering) {
        // Add current modality
        newActive.add(modalityIndex);
        // Add adjacent modalities
        const adjacent = getAdjacentModalities(modalityIndex);
        adjacent.forEach(adj => newActive.add(adj));
      } else {
        // Remove current modality
        newActive.delete(modalityIndex);
        // Check if adjacent should be removed
        const adjacent = getAdjacentModalities(modalityIndex);
        adjacent.forEach(adj => {
          const adjAdjacent = getAdjacentModalities(adj);
          const shouldStayActive = adjAdjacent.some(adjAdj => adjAdj !== modalityIndex && newActive.has(adjAdj));
          if (!shouldStayActive) {
            newActive.delete(adj);
          }
        });
      }
      
      return newActive;
    });
  };

  const updateGlow = () => {
    const center = document.getElementById('diamond-center');
    const sparkles = document.getElementById('sparkles');
    const facets = document.getElementById('diamond-facets');
    
    if (center && sparkles && facets) {
      const activeCount = activeModalities.size;
      const maxGlow = 6;
      const intensity = Math.min(activeCount / maxGlow, 1);
      const glowRadius = 10 + (intensity * 25);
      
      if (activeCount > 0) {
        const pulseIntensity = 1 + (Math.sin(Date.now() * 0.005) * 0.2);
        center.style.filter = `
          drop-shadow(0 0 ${glowRadius * pulseIntensity}px rgba(59, 130, 246, ${intensity}))
          drop-shadow(0 0 ${glowRadius * 2 * pulseIntensity}px rgba(147, 197, 253, ${intensity * 0.7}))
          drop-shadow(0 0 ${glowRadius * 3 * pulseIntensity}px rgba(191, 219, 254, ${intensity * 0.4}))
        `;
        sparkles.style.opacity = (0.3 + (intensity * 0.7)).toString();
        sparkles.style.filter = `brightness(${1 + intensity})`;
        facets.style.filter = `brightness(${1 + intensity * 0.3}) saturate(${1 + intensity * 0.5})`;
      } else {
        center.style.filter = 'none';
        sparkles.style.opacity = '0.3';
        sparkles.style.filter = 'brightness(1)';
        facets.style.filter = 'brightness(1) saturate(1)';
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(updateGlow);
  };

  useEffect(() => {
    updateGlow();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeModalities]);

  const isHighlighted = (index: number) => activeModalities.has(index);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <style>{`
        .diamond-center {
          opacity: 0.9;
          transition: all 300ms ease-in-out;
        }

        .diamond-facet {
          transition: all 300ms ease-in-out;
          cursor: pointer;
        }

        .diamond-facet:hover,
        .diamond-facet.highlighted {
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)) brightness(1.3);
        }

        .diamond-edge {
          fill: none;
          stroke: rgba(107, 114, 128, 0.3);
          stroke-width: 1;
          transition: all 300ms ease-in-out;
          cursor: pointer;
        }

        .diamond-edge:hover,
        .diamond-edge.highlighted {
          stroke: rgba(59, 130, 246, 0.8);
          stroke-width: 2;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6));
        }

        .modality-label {
          fill: #374151;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-anchor: middle;
          dominant-baseline: middle;
          cursor: pointer;
          transition: all 300ms ease-in-out;
          user-select: none;
        }

        .modality-label:hover,
        .modality-label.highlighted {
          fill: #1d4ed8;
          font-size: 18px;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 15px rgba(59, 130, 246, 0.4));
        }

        .shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .modality-label {
            font-size: 14px;
          }
          .modality-label:hover,
          .modality-label.highlighted {
            font-size: 16px;
          }
        }
      `}</style>
      
      <svg viewBox="0 0 500 480" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="topFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#dbeafe', stopOpacity:0.9}} />
            <stop offset="50%" style={{stopColor:'#bfdbfe', stopOpacity:0.7}} />
            <stop offset="100%" style={{stopColor:'#93c5fd', stopOpacity:0.5}} />
          </linearGradient>
          
          <linearGradient id="leftFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#f3e8ff', stopOpacity:0.6}} />
            <stop offset="50%" style={{stopColor:'#e9d5ff', stopOpacity:0.7}} />
            <stop offset="100%" style={{stopColor:'#c4b5fd', stopOpacity:0.5}} />
          </linearGradient>
          
          <linearGradient id="rightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#dcfce7', stopOpacity:0.6}} />
            <stop offset="50%" style={{stopColor:'#bbf7d0', stopOpacity:0.7}} />
            <stop offset="100%" style={{stopColor:'#86efac', stopOpacity:0.5}} />
          </linearGradient>
          
          <linearGradient id="bottomFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#fef3c7', stopOpacity:0.6}} />
            <stop offset="50%" style={{stopColor:'#fde68a', stopOpacity:0.7}} />
            <stop offset="100%" style={{stopColor:'#fbbf24', stopOpacity:0.5}} />
          </linearGradient>
          
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:0.9}} />
            <stop offset="30%" style={{stopColor:'#dbeafe', stopOpacity:0.7}} />
            <stop offset="70%" style={{stopColor:'#93c5fd', stopOpacity:0.5}} />
            <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0.3}} />
          </radialGradient>
          
          <filter id="sparkle" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g id="diamond-facets" className="shimmer">
          {/* Top Crown Facets */}
          <polygon 
            className={`diamond-facet ${isHighlighted(0) ? 'highlighted' : ''}`}
            points="250,80 300,110 275,140 225,140 200,110" 
            fill="url(#topFacet)" 
            onMouseEnter={() => handleHover(0, true)}
            onMouseLeave={() => handleHover(0, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(0) ? 'highlighted' : ''}`}
            points="300,110 330,130 320,160 275,140" 
            fill="url(#rightFacet)" 
            onMouseEnter={() => handleHover(0, true)}
            onMouseLeave={() => handleHover(0, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(5) ? 'highlighted' : ''}`}
            points="200,110 170,130 180,160 225,140" 
            fill="url(#leftFacet)" 
            onMouseEnter={() => handleHover(5, true)}
            onMouseLeave={() => handleHover(5, false)}
          />
          
          {/* Upper Side Facets */}
          <polygon 
            className={`diamond-facet ${isHighlighted(1) ? 'highlighted' : ''}`}
            points="330,130 370,160 360,200 320,160" 
            fill="url(#rightFacet)" 
            onMouseEnter={() => handleHover(1, true)}
            onMouseLeave={() => handleHover(1, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(5) ? 'highlighted' : ''}`}
            points="170,130 130,160 140,200 180,160" 
            fill="url(#leftFacet)" 
            onMouseEnter={() => handleHover(5, true)}
            onMouseLeave={() => handleHover(5, false)}
          />
          
          {/* Middle Side Facets */}
          <polygon 
            className={`diamond-facet ${isHighlighted(1) ? 'highlighted' : ''}`}
            points="370,160 375,220 365,240 360,200" 
            fill="url(#rightFacet)" 
            onMouseEnter={() => handleHover(1, true)}
            onMouseLeave={() => handleHover(1, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(4) ? 'highlighted' : ''}`}
            points="130,160 125,220 135,240 140,200" 
            fill="url(#leftFacet)" 
            onMouseEnter={() => handleHover(4, true)}
            onMouseLeave={() => handleHover(4, false)}
          />
          
          {/* Lower Side Facets */}
          <polygon 
            className={`diamond-facet ${isHighlighted(2) ? 'highlighted' : ''}`}
            points="365,240 360,280 320,300 330,260" 
            fill="url(#rightFacet)" 
            onMouseEnter={() => handleHover(2, true)}
            onMouseLeave={() => handleHover(2, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(4) ? 'highlighted' : ''}`}
            points="135,240 140,280 180,300 170,260" 
            fill="url(#leftFacet)" 
            onMouseEnter={() => handleHover(4, true)}
            onMouseLeave={() => handleHover(4, false)}
          />
          
          {/* Bottom Crown Facets */}
          <polygon 
            className={`diamond-facet ${isHighlighted(2) ? 'highlighted' : ''}`}
            points="320,300 300,330 275,310 320,300" 
            fill="url(#bottomFacet)" 
            onMouseEnter={() => handleHover(2, true)}
            onMouseLeave={() => handleHover(2, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(3) ? 'highlighted' : ''}`}
            points="180,300 200,330 225,310 180,300" 
            fill="url(#bottomFacet)" 
            onMouseEnter={() => handleHover(3, true)}
            onMouseLeave={() => handleHover(3, false)}
          />
          <polygon 
            className={`diamond-facet ${isHighlighted(3) ? 'highlighted' : ''}`}
            points="300,330 250,360 225,310 275,310" 
            fill="url(#bottomFacet)" 
            onMouseEnter={() => handleHover(3, true)}
            onMouseLeave={() => handleHover(3, false)}
          />
          
          {/* Center Table */}
          <polygon 
            id="diamond-center" 
            className="diamond-center"
            points="225,140 275,140 320,160 365,240 320,300 275,310 225,310 180,300 135,240 180,160" 
            fill="url(#centerGradient)" 
          />
        </g>

        {/* Diamond Edges (Outline) */}
        <g id="diamond-edges">
          <line className={`diamond-edge ${isHighlighted(0) ? 'highlighted' : ''}`} x1="250" y1="80" x2="330" y2="130" />
          <line className={`diamond-edge ${isHighlighted(0) ? 'highlighted' : ''}`} x1="330" y1="130" x2="275" y2="140" />
          <line className={`diamond-edge ${isHighlighted(0) ? 'highlighted' : ''}`} x1="275" y1="140" x2="225" y2="140" />
          <line className={`diamond-edge ${isHighlighted(5) ? 'highlighted' : ''}`} x1="225" y1="140" x2="170" y2="130" />
          <line className={`diamond-edge ${isHighlighted(5) ? 'highlighted' : ''}`} x1="170" y1="130" x2="250" y2="80" />
          
          <line className={`diamond-edge ${isHighlighted(1) ? 'highlighted' : ''}`} x1="330" y1="130" x2="375" y2="220" />
          <line className={`diamond-edge ${isHighlighted(1) ? 'highlighted' : ''}`} x1="375" y1="220" x2="360" y2="280" />
          
          <line className={`diamond-edge ${isHighlighted(2) ? 'highlighted' : ''}`} x1="360" y1="280" x2="250" y2="360" />
          
          <line className={`diamond-edge ${isHighlighted(3) ? 'highlighted' : ''}`} x1="250" y1="360" x2="140" y2="280" />
          
          <line className={`diamond-edge ${isHighlighted(4) ? 'highlighted' : ''}`} x1="140" y1="280" x2="125" y2="220" />
          <line className={`diamond-edge ${isHighlighted(4) ? 'highlighted' : ''}`} x1="125" y1="220" x2="170" y2="130" />
        </g>

        {/* Sparkle Elements */}
        <g id="sparkles" className="sparkle">
          <circle cx="250" cy="190" r="2" fill="#3b82f6" opacity="0.8" filter="url(#sparkle)"/>
          <circle cx="230" cy="220" r="1.5" fill="#3b82f6" opacity="0.6" filter="url(#sparkle)"/>
          <circle cx="270" cy="220" r="1.5" fill="#3b82f6" opacity="0.6" filter="url(#sparkle)"/>
          <circle cx="250" cy="260" r="2" fill="#3b82f6" opacity="0.8" filter="url(#sparkle)"/>
          <circle cx="210" cy="240" r="1" fill="#3b82f6" opacity="0.4" filter="url(#sparkle)"/>
          <circle cx="290" cy="240" r="1" fill="#3b82f6" opacity="0.4" filter="url(#sparkle)"/>
        </g>

        {/* Modality Labels */}
        <g id="modality-labels">
          <text 
            className={`modality-label ${isHighlighted(0) ? 'highlighted' : ''}`} 
            x="250" y="50" 
            onMouseEnter={() => handleHover(0, true)}
            onMouseLeave={() => handleHover(0, false)}
          >
            {modalities[0]}
          </text>
          <text 
            className={`modality-label ${isHighlighted(1) ? 'highlighted' : ''}`} 
            x="420" y="190" 
            onMouseEnter={() => handleHover(1, true)}
            onMouseLeave={() => handleHover(1, false)}
          >
            {modalities[1]}
          </text>
          <text 
            className={`modality-label ${isHighlighted(2) ? 'highlighted' : ''}`} 
            x="380" y="380" 
            onMouseEnter={() => handleHover(2, true)}
            onMouseLeave={() => handleHover(2, false)}
          >
            {modalities[2]}
          </text>
          <text 
            className={`modality-label ${isHighlighted(3) ? 'highlighted' : ''}`} 
            x="250" y="420" 
            onMouseEnter={() => handleHover(3, true)}
            onMouseLeave={() => handleHover(3, false)}
          >
            {modalities[3]}
          </text>
          <text 
            className={`modality-label ${isHighlighted(4) ? 'highlighted' : ''}`} 
            x="120" y="380" 
            onMouseEnter={() => handleHover(4, true)}
            onMouseLeave={() => handleHover(4, false)}
          >
            {modalities[4]}
          </text>
          <text 
            className={`modality-label ${isHighlighted(5) ? 'highlighted' : ''}`} 
            x="80" y="190" 
            onMouseEnter={() => handleHover(5, true)}
            onMouseLeave={() => handleHover(5, false)}
          >
            {modalities[5]}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default InteractiveDiamond; 