import { Link } from 'react-router-dom'

export default function FutureVisionSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-light mb-8">
          The Future Vision
        </h2>
        
        <div className="space-y-6 text-lg leading-relaxed text-gray-200 mb-12">
          <p>
            Imagine AI ecosystems where multiple specialized AIs cooperate seamlessly. Where each AI handles what it does best, and humans orchestrate the symphony.
          </p>
          
          <p>
            Humans become <strong className="text-white">super-capable</strong>—not replaced, but amplified. We focus on vision, strategy, and relationships while AI handles execution, analysis, and pattern recognition.
          </p>
          
          <p>
            This is not science fiction. This is the next 18 months. Businesses that adopt now will have a decisive advantage. Those that delay will struggle to catch up.
          </p>
          
          <p className="text-xl font-medium text-white pt-4">
            The future is peaceful, efficient, and balanced. Growth with responsibility. Scale with control.
          </p>
        </div>
        
        <Link
          to="/demo"
          className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Experience the Demo
        </Link>
      </div>
    </section>
  )
}
