import { useEffect, useRef, useState } from 'react'

export default function Page14SAPIntegration() {
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
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">SAP Integration</h2>
          <p className="text-2xl text-slate-300 font-light">Seamless Financial System Connection</p>
        </div>

        <div className="mb-12 p-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border-2 border-slate-600/50">
          <h3 className="text-4xl text-slate-100 mb-6 text-center font-light">
            SAP Remains Our Audit and Sensitive System
          </h3>
          <p className="text-xl text-slate-300 text-center leading-relaxed font-light max-w-4xl mx-auto">
            Our application works alongside SAP, handling operational workflows while SAP maintains 
            financial records and audit trails. This is not a replacement—it's a complement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Our Application</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ Operational workflows</li>
              <li>✓ Real-time logistics tracking</li>
              <li>✓ Mobile operations</li>
              <li>✓ Approval processes</li>
              <li>✓ Stock visibility</li>
            </ul>
          </div>
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">SAP System</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ Financial records</li>
              <li>✓ Audit trails</li>
              <li>✓ Sensitive data</li>
              <li>✓ Compliance reporting</li>
              <li>✓ Accounting integration</li>
            </ul>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
          <h3 className="text-2xl text-slate-100 mb-4 font-medium text-center">Synchronization</h3>
          <p className="text-lg text-slate-300 text-center leading-relaxed font-light">
            Key operational data (GR numbers, stock movements, order status) syncs with SAP 
            to ensure financial records stay accurate and up-to-date, while maintaining 
            complete separation of operational and financial systems.
          </p>
        </div>
      </div>
    </section>
  )
}
