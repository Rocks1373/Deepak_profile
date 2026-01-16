import { useEffect, useRef, useState } from 'react'

export default function Page7GulfApplication() {
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

  const capabilities = [
    { title: 'Custom Workflows', desc: 'Designed for our company operations', icon: '⚙️' },
    { title: 'Rule Enforcement', desc: 'Our rules, our process, our control', icon: '📋' },
    { title: 'Flexible Operations', desc: 'Adapts to workload variations', icon: '🔄' },
    { title: 'Consistent Path', desc: 'One standard way for everyone', icon: '🛤️' },
    { title: 'Company-Specific', desc: 'Built exclusively for our needs', icon: '🏢' },
    { title: 'Integrated System', desc: 'Works seamlessly with HMS and other modules', icon: '🔗' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Gulf Application</h2>
          <p className="text-2xl text-slate-300 font-light">Our Company's Custom Application</p>
        </div>

        <div className="mb-16 p-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border-2 border-slate-600/50">
          <h3 className="text-4xl text-slate-100 mb-6 text-center font-light leading-relaxed">
            Gulf Application is our company's own application
            <br />
            <span className="text-slate-300">designed exactly around our working pattern</span>
          </h3>
          <p className="text-xl text-slate-300 text-center leading-relaxed font-light max-w-4xl mx-auto">
            It's not a generic solution. It's our solution. Built for our rules, our processes, 
            and our way of doing business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{cap.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{cap.title}</h3>
              <p className="text-slate-400 font-light">{cap.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Key Principles</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">•</span>
                <span>Our own rules and processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">•</span>
                <span>Enforced when required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">•</span>
                <span>Relaxed when load increases</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">•</span>
                <span>One consistent path for everyone</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Integration</h3>
            <p className="text-slate-300 mb-4 font-light leading-relaxed">
              Gulf Application works seamlessly with HMS for Huawei orders, handling the 
              company-specific workflows after HMS matching is complete.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="px-4 py-2 bg-slate-700 rounded-lg text-slate-200">HMS</div>
              <div className="text-slate-400">→</div>
              <div className="px-4 py-2 bg-slate-700 rounded-lg text-slate-200">Gulf App</div>
              <div className="text-slate-400">→</div>
              <div className="px-4 py-2 bg-slate-700 rounded-lg text-slate-200">Logistics</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
