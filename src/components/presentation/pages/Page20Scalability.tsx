import { useEffect, useRef, useState } from 'react'

export default function Page20Scalability() {
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Scalability</h2>
          <p className="text-2xl text-slate-300 font-light">Grows With Your Company</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-3xl text-slate-100 mb-6 font-light">Current Capacity</h3>
            <div className="space-y-4 text-slate-300 font-light">
              <div className="text-2xl">✓ Handles current operations</div>
              <div className="text-2xl">✓ Supports all warehouses</div>
              <div className="text-2xl">✓ Manages all order types</div>
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-3xl text-slate-100 mb-6 font-light">Future Growth</h3>
            <div className="space-y-4 text-slate-300 font-light">
              <div className="text-2xl">✓ Add new warehouses easily</div>
              <div className="text-2xl">✓ Scale to 10x order volume</div>
              <div className="text-2xl">✓ Expand without major changes</div>
            </div>
          </div>
        </div>

        <div className="p-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border-2 border-slate-600/50">
          <h3 className="text-3xl text-slate-100 mb-6 text-center font-light">Key Advantage</h3>
          <p className="text-2xl text-slate-200 text-center leading-relaxed font-light max-w-4xl mx-auto">
            The system handles growth without proportional headcount increases. 
            As order volume doubles, the system scales automatically. 
            Humans focus on strategy, relationships, and judgment.
          </p>
        </div>
      </div>
    </section>
  )
}
