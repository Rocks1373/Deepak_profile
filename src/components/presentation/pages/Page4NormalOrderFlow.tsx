import { useEffect, useRef, useState } from 'react'

export default function Page4NormalOrderFlow() {
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

  const steps = [
    { step: '01', title: 'Order Creation', desc: 'Order entered into system', icon: '📝' },
    { step: '02', title: 'Validation', desc: 'System validates order data', icon: '✓' },
    { step: '03', title: 'Approval', desc: 'Multi-level approval process', icon: '✅' },
    { step: '04', title: 'Processing', desc: 'Order moves to logistics', icon: '⚙️' },
    { step: '05', title: 'Fulfillment', desc: 'Items picked and prepared', icon: '📦' },
    { step: '06', title: 'Dispatch', desc: 'Order dispatched for delivery', icon: '🚚' },
    { step: '07', title: 'Delivery', desc: 'Customer receives order', icon: '🎯' },
    { step: '08', title: 'Completion', desc: 'Order closed and archived', icon: '✨' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Normal Order Flow</h2>
          <p className="text-2xl text-slate-300 font-light">Standard Order Processing Workflow</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((item, index) => (
              <div
                key={index}
                className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="text-3xl font-light text-slate-400 mb-2">{item.step}</div>
                </div>
                <h3 className="text-xl text-slate-100 mb-2 font-medium text-center">{item.title}</h3>
                <p className="text-slate-400 text-center font-light">{item.desc}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 bg-slate-700 rounded-full border-2 border-slate-800"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
          <h3 className="text-2xl text-slate-100 mb-4 font-medium">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-4 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span className="font-light">Automated validation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span className="font-light">Real-time tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span className="font-light">Complete audit trail</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
