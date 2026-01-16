import { useEffect, useRef, useState } from 'react'

export default function Page29FutureRoadmap() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  const roadmap = [
    { phase: 'Phase 1', focus: 'Core Operations', status: 'Complete', icon: '✅' },
    { phase: 'Phase 2', focus: 'Advanced Features', status: 'In Progress', icon: '🚀' },
    { phase: 'Phase 3', focus: 'AI Enhancement', status: 'Planned', icon: '🤖' },
    { phase: 'Phase 4', focus: 'Expansion', status: 'Future', icon: '📈' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Future Roadmap</h2>
          <p className="text-2xl text-slate-300 font-light">Continuous Improvement & Growth</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {roadmap.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl text-slate-100 mb-2 font-medium">{item.phase}</h3>
              <p className="text-xl text-slate-300 mb-2 font-light">{item.focus}</p>
              <p className="text-slate-400 font-light">{item.status}</p>
            </div>
          ))}
        </div>

        <div className="p-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border-2 border-slate-600/50">
          <h3 className="text-3xl text-slate-100 mb-6 text-center font-light">Continuous Evolution</h3>
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light max-w-4xl mx-auto">
            The system evolves with our company. New features, improvements, and capabilities 
            are added based on operational needs and feedback. This is a living system, 
            designed to grow with us.
          </p>
        </div>
      </div>
    </section>
  )
}
