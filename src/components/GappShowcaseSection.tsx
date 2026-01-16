import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function GappShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const gappFeatures = [
    {
      icon: "⏱️",
      title: "Time Savings",
      description: "Eliminates manual data entry and paperwork. Automated workflows reduce processing time by up to 70%.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "✅",
      title: "Reduced Errors",
      description: "Validation rules and approval gates ensure accuracy at every step, preventing costly mistakes.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "👁️",
      title: "Complete Visibility",
      description: "Real-time dashboards and tracking provide instant status updates for all stakeholders.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📈",
      title: "Scalability",
      description: "System grows with your operations. Handles increasing vendors, shipments, and orders seamlessly.",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: "💰",
      title: "Cost Reduction",
      description: "Reduces manpower pressure by automating routine tasks. Fewer errors mean fewer costly corrections.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: "🤖",
      title: "AI-Assisted",
      description: "AI handles document extraction and OCR, but all critical decisions require human approval for safety.",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            GAPP - Ground-level Application
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            for Processing and Planning
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            A comprehensive warehouse management system designed to streamline operations, reduce errors, 
            and provide complete visibility across all processes.
          </p>
        </div>

        {/* GAPP Benefits Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {gappFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              <div className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Step-by-step approval workflows with configurable rules",
              "Real-time stock visibility across all warehouses",
              "Mobile and web access for all users",
              "Role-based access control with granular permissions",
              "Automated notifications and approval routing",
              "Complete audit trail for all operations"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Link
            to="/gapp-demo"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 border border-cyan-400/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Launch GAPP Demo
          </Link>
          <Link
            to="/mobile-ui"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md text-gray-200 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 border border-gray-500/30 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            See Mobile UI
          </Link>
        </div>
      </div>
    </section>
  )
}
