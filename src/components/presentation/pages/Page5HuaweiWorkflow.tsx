import { useEffect, useRef, useState } from 'react'

export default function Page5HuaweiWorkflow() {
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Huawei Order Workflow</h2>
          <p className="text-2xl text-slate-300 font-light">Specialized Process for Huawei Orders</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
              <h3 className="text-3xl text-slate-100 mb-4 font-light">Why Separate Process?</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Huawei orders require specific matching and validation processes that differ from standard orders. 
                We use HMS (Huawei Matching System) and Gulf Application to handle these specialized requirements.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
              <h3 className="text-2xl text-slate-100 mb-3 font-medium">Two-Component System</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏭</div>
                  <div>
                    <div className="text-slate-200 font-medium">HMS</div>
                    <div className="text-slate-400 text-sm font-light">Huawei Matching System</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌊</div>
                  <div>
                    <div className="text-slate-200 font-medium">Gulf Application</div>
                    <div className="text-slate-400 text-sm font-light">Company-specific workflows</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
              <h3 className="text-2xl text-slate-100 mb-6 font-medium">Workflow Overview</h3>
              <div className="space-y-4">
                {[
                  'Order Upload',
                  'HMS Matching',
                  'Validation & Approval',
                  'Gulf Application Processing',
                  'Logistics Integration',
                  'Final Delivery'
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-200 font-medium">
                      {index + 1}
                    </div>
                    <span className="text-slate-300 font-light">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-r from-blue-900/30 to-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-700/30">
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light">
            <span className="font-medium">Important:</span> Huawei orders follow a specialized workflow 
            that ensures compliance with Huawei's requirements while maintaining our operational standards.
          </p>
        </div>
      </div>
    </section>
  )
}
