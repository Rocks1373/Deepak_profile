import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  features: string[]
  status: 'active' | 'completed' | 'in-progress'
}

const projects: Project[] = [
  {
    id: 'gulf-app',
    title: 'Gulf Application - HMS Integration',
    description: 'Enterprise order management system with HMS integration for seamless operations',
    longDescription: 'A comprehensive order management system designed specifically for Gulf companies, featuring deep HMS (Huawei Matching System) integration. This application streamlines the entire order lifecycle from creation to delivery, with intelligent automation and real-time visibility.',
    technologies: ['React', 'TypeScript', 'Node.js', 'SAP Integration', 'HMS API', 'Mobile App'],
    category: 'Enterprise Software',
    demoUrl: '/demo',
    features: [
      'Order Management',
      'HMS Integration',
      'Mobile Application',
      'Real-time Tracking',
      'AI-powered Automation',
      'SAP Integration'
    ],
    status: 'active'
  },
  {
    id: 'ai-vision-website',
    title: 'AI Vision Website',
    description: 'Modern portfolio and presentation platform showcasing AI-powered business solutions',
    longDescription: 'A cutting-edge website built to demonstrate AI-powered business solutions and portfolio showcase. Features interactive demos, presentation modes, and comprehensive business impact visualizations.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    category: 'Web Application',
    demoUrl: '/',
    githubUrl: 'https://github.com/Rocks1373/Deepak_profile',
    features: [
      'Interactive Demos',
      'Presentation Mode',
      'Mobile UI Showcase',
      'Responsive Design',
      'Modern UI/UX'
    ],
    status: 'active'
  },
  {
    id: 'mobile-order-app',
    title: 'Mobile Order Management App',
    description: 'On-the-go order processing and warehouse management mobile application',
    longDescription: 'A fully-featured mobile application enabling field workers and warehouse staff to manage orders, track inventory, and process deliveries in real-time. Built with cross-platform compatibility and offline capabilities.',
    technologies: ['React Native', 'TypeScript', 'Mobile UI', 'Offline Sync', 'Real-time Updates'],
    category: 'Mobile Application',
    demoUrl: '/mobile-ui',
    features: [
      'Order Processing',
      'Inventory Management',
      'Delivery Tracking',
      'Offline Mode',
      'Push Notifications'
    ],
    status: 'active'
  },
  {
    id: 'gapp-demo',
    title: 'GAPP Demo Platform',
    description: 'Interactive demonstration platform for Gulf Application features and workflows',
    longDescription: 'A comprehensive demo platform that allows users to experience the full capabilities of the Gulf Application. Includes guided tours, interactive workflows, and detailed feature showcases.',
    technologies: ['React', 'TypeScript', 'Interactive UI', 'Demo Engine'],
    category: 'Demo Platform',
    demoUrl: '/gapp-demo',
    features: [
      'Guided Tours',
      'Interactive Workflows',
      'Feature Showcases',
      'User Onboarding'
    ],
    status: 'completed'
  }
]

export default function PortfolioShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float-1" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float-2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm text-cyan-300 font-medium">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
            Project <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Showcase</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A collection of projects demonstrating expertise in enterprise software, AI integration, and modern web development
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status === 'active' && '●'}
                  {project.status === 'completed' && '✓'}
                  {project.status === 'in-progress' && '⟳'}
                  <span className="ml-2 capitalize">{project.status}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">{project.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs text-cyan-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-lg text-xs text-slate-400 font-medium">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-2">Key Features:</p>
                <ul className="grid grid-cols-2 gap-2">
                  {project.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {project.demoUrl && (
                  <Link
                    to={project.demoUrl}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Demo
                  </Link>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-lg font-medium hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { label: 'Projects', value: projects.length.toString() },
            { label: 'Technologies', value: '15+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Success Rate', value: '100%' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        .animate-float-1 {
          animation: float-1 15s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
