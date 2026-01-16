import { useEffect, useRef, useState } from 'react'

export default function Page28DataAnalytics() {
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

  const analytics = [
    { metric: 'Order Trends', desc: 'Historical order patterns', icon: '📈' },
    { metric: 'Performance KPIs', desc: 'Key performance indicators', icon: '🎯' },
    { metric: 'Efficiency Metrics', desc: 'Operational efficiency data', icon: '⚡' },
    { metric: 'Cost Analysis', desc: 'Cost breakdown and trends', icon: '💰' },
    { metric: 'Predictive Insights', desc: 'AI-powered predictions', icon: '🔮' },
    { metric: 'Custom Dashboards', desc: 'Tailored views per role', icon: '📊' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Data Analytics</h2>
          <p className="text-2xl text-slate-300 font-light">Data-Driven Decision Making</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {analytics.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{item.metric}</h3>
              <p className="text-slate-400 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border-2 border-slate-600/50">
          <h3 className="text-3xl text-slate-100 mb-6 text-center font-light">Business Intelligence</h3>
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light max-w-4xl mx-auto">
            Transform raw data into actionable insights. Understand trends, identify bottlenecks, 
            optimize operations, and make informed decisions based on real data, not assumptions.
          </p>
        </div>
      </div>
    </section>
  )
}
