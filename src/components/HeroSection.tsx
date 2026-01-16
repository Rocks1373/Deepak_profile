import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)`,
          transition: 'background 0.3s ease-out'
        }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating orbs with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float-1" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float-2" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-slate-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float-3" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float-4" />
      </div>

      {/* Particle effect overlay */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-cyan-500/30 mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300 font-medium">AI-Powered Business Solutions</span>
        </div>

        {/* Main heading with typing effect */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight">
          <span className={`inline-block transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            AI does not replace people.
          </span>
          <br />
          <span className={`inline-block font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            It amplifies human capability.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className={`text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Vision-led systems where AI executes,
          <br />
          <span className="text-white font-medium">humans decide</span>, and businesses scale.
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Link
            to="/demo"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 overflow-hidden border border-cyan-400/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Live Business Demo
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <a
            href="#insights"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md text-gray-200 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 border border-gray-500/30 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Read Insights
          </a>
        </div>

        {/* Stats or features preview */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-1300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {[
            { label: 'Time Saved', value: '70%' },
            { label: 'Error Reduction', value: '95%' },
            { label: 'Scalability', value: '10x' },
            { label: 'Efficiency', value: '3x' }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* Enhanced animations */}
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -80px) scale(1.1); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60px, -50px) scale(1.15); }
          66% { transform: translate(40px, 60px) scale(0.85); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(70px, 50px) scale(1.2); }
          66% { transform: translate(-50px, -30px) scale(0.8); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 70px) scale(1.05); }
          66% { transform: translate(60px, -40px) scale(0.95); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-float-1 {
          animation: float-1 15s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 18s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-3 {
          animation: float-3 20s ease-in-out infinite;
          animation-delay: 4s;
        }
        .animate-float-4 {
          animation: float-4 16s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
