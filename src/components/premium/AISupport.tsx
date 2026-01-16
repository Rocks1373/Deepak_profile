import { useEffect, useRef, useState } from 'react'

export default function AISupport() {
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

  const principles = [
    'AI executes, humans decide',
    'Full control on what AI sees and does',
    'Security first',
    'We must use it wisely'
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6"
    >
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-slate-100 mb-6">
            AI as Support
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-4">
            AI is growing very fast. We must use it wisely.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <p className="text-lg text-slate-200 font-light">{principle}</p>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-8 border-2 border-slate-500/50">
          <p className="text-2xl md:text-3xl text-slate-100 text-center leading-relaxed font-light">
            <span className="font-medium">This application will not replace SAP.</span>
            <br />
            <span className="text-slate-300">SAP remains our audit and sensitive system.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
