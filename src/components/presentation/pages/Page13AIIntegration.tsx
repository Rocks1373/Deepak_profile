import { useEffect, useRef, useState } from 'react'

export default function Page13AIIntegration() {
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

  const principles = [
    { title: 'AI Executes', desc: 'Handles repetitive tasks', icon: '⚙️' },
    { title: 'Humans Decide', desc: 'Critical decisions remain human', icon: '👤' },
    { title: 'Full Control', desc: 'We control what AI sees and does', icon: '🔒' },
    { title: 'Security First', desc: 'Data protection is paramount', icon: '🛡️' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">AI Integration</h2>
          <p className="text-2xl text-slate-300 font-light">Intelligent Support, Human Control</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{principle.icon}</div>
              <h3 className="text-2xl text-slate-100 mb-3 font-medium">{principle.title}</h3>
              <p className="text-slate-300 font-light">{principle.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">AI Capabilities</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>• Document OCR and extraction</li>
              <li>• Pattern recognition</li>
              <li>• Automated data validation</li>
              <li>• Intelligent suggestions</li>
              <li>• Predictive analytics</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Human Oversight</h3>
            <ul className="space-y-3 text-slate-300 font-light">
              <li>• All critical decisions require approval</li>
              <li>• AI recommendations are suggestions only</li>
              <li>• Complete transparency in AI actions</li>
              <li>• Ability to override AI decisions</li>
              <li>• Full audit trail of AI involvement</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-blue-900/30 to-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-700/30">
          <p className="text-xl text-slate-200 text-center leading-relaxed font-light">
            <span className="font-medium">Important:</span> AI is growing very fast. We must use it wisely. 
            This application will not replace SAP. SAP remains our audit and sensitive system.
          </p>
        </div>
      </div>
    </section>
  )
}
