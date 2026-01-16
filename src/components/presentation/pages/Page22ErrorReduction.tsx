import { useEffect, useRef, useState } from 'react'

export default function Page22ErrorReduction() {
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

  const errorPrevention = [
    { method: 'Automated Validation', impact: 'Catches errors before processing', icon: '✓' },
    { method: 'Data Consistency', impact: 'No duplicate entries', icon: '🔄' },
    { method: 'Multi-Level Checks', impact: 'Multiple verification points', icon: '✅' },
    { method: 'Real-Time Validation', impact: 'Instant error detection', icon: '⚡' },
    { method: 'Approval Gates', impact: 'Human oversight at critical steps', icon: '🚪' },
    { method: 'Audit Trails', impact: 'Track and learn from mistakes', icon: '📜' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Error Reduction</h2>
          <p className="text-2xl text-slate-300 font-light">95% Reduction in Manual Errors</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {errorPrevention.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.method}</h3>
              <p className="text-slate-400 font-light text-sm">{item.impact}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Before</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>• Manual data entry errors</li>
              <li>• Missing information</li>
              <li>• Inconsistent formats</li>
              <li>• Delayed error detection</li>
              <li>• Costly corrections</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">After</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ Automated validation</li>
              <li>✓ Required fields enforced</li>
              <li>✓ Standardized formats</li>
              <li>✓ Real-time error detection</li>
              <li>✓ Prevention over correction</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <p className="text-2xl text-slate-200 text-center leading-relaxed font-light">
            Early error detection prevents downstream issues and delays. 
            <span className="font-medium"> Catches errors 10x faster than manual review.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
