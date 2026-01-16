import { useEffect, useRef, useState } from 'react'

export default function Page2CompanyVision() {
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
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-8">Our Company Vision</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
              <h3 className="text-3xl text-slate-100 mb-4 font-light">Core Principle</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Every company has unique rules, processes, and working patterns. 
                A generic solution can never truly fit our specific needs.
              </p>
            </div>

            <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
              <h3 className="text-3xl text-slate-100 mb-4 font-light">Our Approach</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                We build systems that adapt to our company — not the other way around. 
                Flexibility without losing control. Growth without complexity.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600/30">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-2xl text-slate-100 mb-2 font-medium">Customized Solutions</h4>
              <p className="text-slate-300 font-light">Built for our operations</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600/30">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-2xl text-slate-100 mb-2 font-medium">Operational Excellence</h4>
              <p className="text-slate-300 font-light">Streamlined workflows</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600/30">
              <div className="text-4xl mb-4">📈</div>
              <h4 className="text-2xl text-slate-100 mb-2 font-medium">Scalable Growth</h4>
              <p className="text-slate-300 font-light">Grows with the company</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
