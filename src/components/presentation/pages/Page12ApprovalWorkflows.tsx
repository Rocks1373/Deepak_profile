import { useEffect, useRef, useState } from 'react'

export default function Page12ApprovalWorkflows() {
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

  const workflow = [
    { level: 'Level 1', role: 'User/Receiver', action: 'Initial Check & Submit', icon: '👤' },
    { level: 'Level 2', role: 'Supervisor', action: 'Review & Approve', icon: '👔' },
    { level: 'Level 3', role: 'Manager', action: 'Final Approval', icon: '🎯' },
    { level: 'Level 4', role: 'Head/Admin', action: 'Executive Decision', icon: '👑' }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-light text-slate-100 mb-4">Approval Workflows</h2>
          <p className="text-2xl text-slate-300 font-light">Multi-Level Approval System</p>
        </div>

        <div className="relative mb-12">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent transform -translate-y-1/2"></div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {workflow.map((step, index) => (
              <div
                key={index}
                className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-sm text-slate-400 mb-2 font-light">{step.level}</div>
                <h3 className="text-xl text-slate-100 mb-2 font-medium">{step.role}</h3>
                <p className="text-slate-400 font-light text-sm">{step.action}</p>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 bg-slate-700 rounded-full border-2 border-slate-800"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Configurable Rules</h3>
            <ul className="space-y-2 text-slate-300 font-light">
              <li>✓ Define approval steps per operation type</li>
              <li>✓ Set mandatory vs optional approvals</li>
              <li>✓ Configure approval limits by role</li>
              <li>✓ Customize workflow per department</li>
            </ul>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/30">
            <h3 className="text-2xl text-slate-100 mb-4 font-medium">Benefits</h3>
            <ul className="space-y-2 text-slate-300 font-light">
              <li>✓ Approval decisions in minutes, not days</li>
              <li>✓ Complete audit trail</li>
              <li>✓ Mobile approval support</li>
              <li>✓ Instant notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
