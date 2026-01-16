import { useEffect, useRef, useState } from 'react'

export default function MobileAppIntro() {
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

  const features = [
    'Fully customizable',
    'Designed for our operations',
    'Smooth workflow',
    'Simple UI',
    'Huge operational impact'
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6"
    >
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* PPT slide style heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-slate-100 mb-6">
            Introducing Our Own Mobile App
          </h2>
          <p className="text-2xl text-slate-300 font-light">
            I am introducing our own self-made company mobile application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: App mockup illustration */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-[500px] bg-slate-800 rounded-[3rem] p-4 border-8 border-slate-700 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-[2rem] p-6 flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xs text-slate-400">9:41</div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* App content placeholder */}
                <div className="flex-1 bg-slate-600/30 rounded-xl p-4 flex items-center justify-center">
                  <div className="text-slate-400 text-sm">App Interface</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features list */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl text-slate-200 font-light">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
