import { useEffect, useRef, useState } from 'react'

export default function Page25VendorManagement() {
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

  const features = [
    { feature: 'Vendor Profiles', desc: 'Complete vendor information', icon: '🏢' },
    { feature: 'Payment Readiness', desc: 'Track payment status', icon: '💰' },
    { feature: 'Order History', desc: 'Complete order tracking', icon: '📋' },
    { feature: 'Performance Metrics', desc: 'Vendor performance analysis', icon: '📊' },
    { feature: 'Communication', desc: 'Integrated messaging', icon: '💬' },
    { feature: 'Document Management', desc: 'Store and access documents', icon: '📄' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Vendor Management</h2>
          <p className="text-2xl text-slate-300 font-light">Streamlined Vendor Operations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.feature}</h3>
              <p className="text-slate-400 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <h3 className="text-2xl text-slate-100 mb-4 text-center font-medium">Key Benefit</h3>
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light">
            Vendor payment readiness tracking ensures timely payments and better 
            vendor relationships, improving overall supply chain efficiency.
          </p>
        </div>
      </div>
    </section>
  )
}
