import { useEffect, useRef, useState } from 'react'

export default function WhyThisMatters() {
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
    {
      icon: '🏢',
      text: 'Every company has its own rules and working process'
    },
    {
      icon: '🔧',
      text: 'One single generic application can never fit all'
    },
    {
      icon: '📈',
      text: 'Growth demands flexibility without losing control'
    },
    {
      icon: '🔄',
      text: 'Systems must adapt to the company — not the other way around'
    }
  ]

  return (
    <section
      id="why-matters"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6"
    >
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* PPT-style heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-slate-100 mb-4">
            Why This Matters
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
        </div>

        {/* Bullet points with icons */}
        <div className="grid md:grid-cols-2 gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl flex-shrink-0">{point.icon}</div>
              <p className="text-xl text-slate-200 leading-relaxed font-light">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
