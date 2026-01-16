import { useEffect, useRef, useState } from 'react'

export default function TheVision() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const points = [
    'Our own rules',
    'Our own process',
    'Enforced when required',
    'Relaxed when load increases',
    'One consistent path for everyone'
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6"
    >
      <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left: Text content */}
        <div>
          <h2 className="text-5xl md:text-6xl font-light text-slate-100 mb-8 leading-tight">
            The Vision
          </h2>
          
          <p className="text-2xl md:text-3xl text-slate-300 mb-12 leading-relaxed font-light">
            I envision a simple, common application
            <br />
            <span className="text-slate-100 font-medium">designed exactly around our company's working pattern.</span>
          </p>

          <div className="space-y-4">
            {points.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-lg text-slate-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="font-light">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated workflow illustration */}
        <div className="relative">
          <div className="relative w-full h-96 bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8 overflow-hidden">
            {/* Workflow nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Flow lines */}
                <path
                  d="M 50 150 Q 150 100, 200 150 T 350 150"
                  stroke="rgba(148, 163, 184, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-flow-line"
                />
                
                {/* Nodes */}
                <circle cx="50" cy="150" r="20" fill="rgba(59, 130, 246, 0.3)" className="animate-pulse" />
                <circle cx="200" cy="150" r="25" fill="rgba(59, 130, 246, 0.4)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <circle cx="350" cy="150" r="20" fill="rgba(59, 130, 246, 0.3)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Connecting lines */}
                <line x1="70" y1="150" x2="175" y2="150" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
                <line x1="225" y1="150" x2="330" y2="150" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flow-line {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 20; }
        }
        .animate-flow-line {
          stroke-dasharray: 5 5;
          animation: flow-line 3s linear infinite;
        }
      `}</style>
    </section>
  )
}
