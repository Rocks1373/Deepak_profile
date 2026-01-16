import { useEffect, useRef, useState } from 'react'

export default function Page17Reports() {
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

  const reportTypes = [
    { title: 'Order Reports', desc: 'Complete order history and status', icon: '📊' },
    { title: 'Stock Reports', desc: 'Inventory levels and movements', icon: '📦' },
    { title: 'Performance Reports', desc: 'Operational metrics and KPIs', icon: '📈' },
    { title: 'Approval Reports', desc: 'Approval history and pending items', icon: '✅' },
    { title: 'Delivery Reports', desc: 'Outbound and delivery tracking', icon: '🚚' },
    { title: 'Custom Reports', desc: 'Build your own reports', icon: '🔧' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Reports & Analytics</h2>
          <p className="text-2xl text-slate-300 font-light">Anytime, Anywhere, One Touch</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reportTypes.map((report, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{report.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{report.title}</h3>
              <p className="text-slate-400 font-light">{report.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Features</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>✓ Real-time data</li>
              <li>✓ Export to Excel/PDF</li>
              <li>✓ Scheduled reports</li>
              <li>✓ Mobile access</li>
              <li>✓ Custom date ranges</li>
              <li>✓ Filter by multiple criteria</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Business Value</h3>
            <p className="text-lg text-slate-300 mb-4 font-light leading-relaxed">
              Data-driven decision making. Access critical information instantly, 
              whether you're in the office, at a warehouse, or on the go.
            </p>
            <div className="text-2xl text-slate-200 font-light">Instant Insights</div>
          </div>
        </div>
      </div>
    </section>
  )
}
