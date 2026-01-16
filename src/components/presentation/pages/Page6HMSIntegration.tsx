import { useEffect, useRef, useState } from 'react'

export default function Page6HMSIntegration() {
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
    { title: 'Automated Matching', desc: 'System matches order data with Huawei requirements', icon: '🔍' },
    { title: 'Status Tracking', desc: 'Real-time matching status updates', icon: '📊' },
    { title: 'Issue Detection', desc: 'Automatically identifies discrepancies', icon: '⚠️' },
    { title: 'Report Generation', desc: 'Detailed matching reports', icon: '📄' },
    { title: 'Resubmission Support', desc: 'Easy correction and resubmission', icon: '🔄' },
    { title: 'Integration Ready', desc: 'Seamless connection with Gulf Application', icon: '🔗' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">HMS Integration</h2>
          <p className="text-2xl text-slate-300 font-light">Huawei Matching System</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl text-slate-100 mb-2 font-medium">{feature.title}</h3>
              <p className="text-slate-400 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">How It Works</h3>
            <ol className="space-y-3 text-slate-300 font-light">
              <li className="flex items-start gap-3">
                <span className="font-medium text-slate-200">1.</span>
                <span>Order uploaded to system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium text-slate-200">2.</span>
                <span>Data sent to HMS for matching</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium text-slate-200">3.</span>
                <span>System receives MATCHED, NOT_MATCHED, or ISSUE response</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium text-slate-200">4.</span>
                <span>Matching report generated automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium text-slate-200">5.</span>
                <span>User reviews and takes action</span>
              </li>
            </ol>
          </div>

          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Benefits</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Saves 1-2 hours of manual validation per order</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Ensures 100% compliance with Huawei requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Catches errors before processing begins</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Complete audit trail for all matching activities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
