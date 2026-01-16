import { Link } from 'react-router-dom'

interface DemoSummaryProps {
  onRestart: () => void
  onFeedback?: () => void
}

export default function DemoSummary({ onRestart, onFeedback }: DemoSummaryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-8 mb-8">
          <h2 className="text-3xl font-light text-white mb-8 text-center">
            Demo Summary
          </h2>
          
          <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
            <p className="font-medium">
              <strong className="text-white">Mr. Ahmed,</strong> you've just experienced a complete order handling workflow powered by AI-human collaboration.
            </p>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-cyan-500">
              <h3 className="text-xl font-semibold text-white mb-4">
                Key Benefits Demonstrated:
              </h3>
              <ul className="space-y-2 list-disc list-inside text-gray-300 pl-4">
                <li className="font-medium">Complete workflow automation with human oversight at every critical step</li>
                <li className="font-medium">Time savings of 3-5 hours per order through automated execution</li>
                <li className="font-medium">Real-time visibility across all teams and processes</li>
                <li className="font-medium">Error reduction through automated validation and consistency</li>
                <li className="font-medium">Seamless integration between systems (HMS, Logistics, SAP)</li>
                <li className="font-medium">Complete audit trail for compliance and learning</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Why This Approach Scales:
              </h3>
              <p className="font-medium text-gray-300">
                This system handles growth without proportional headcount increases. As order volume doubles, the system scales automatically. Humans focus on strategy, relationships, and judgment—areas where AI cannot replace human capability.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-white mb-4">
                Why Delaying Adoption is Risky:
              </h3>
              <p className="font-medium text-gray-300">
                AI capabilities are advancing rapidly. Competitors who adopt now will have 12-18 months of operational advantage. The gap will widen, not narrow. Early adoption means early learning, early optimization, and early competitive advantage.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-cyan-500">
              <h3 className="text-xl font-semibold text-white mb-4">
                How AI Supports People, Not Replaces Them:
              </h3>
              <p className="font-medium text-gray-300">
                Every critical decision in this workflow required human judgment. AI executed, analyzed, and assisted—but humans decided. This is the future: humans as strategic decision-makers, AI as execution engine. Together, they create capabilities neither could achieve alone.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 shadow-md border border-gray-600"
          >
            Restart Demo
          </button>
          {onFeedback && (
            <button
              onClick={onFeedback}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 shadow-md border border-cyan-400/30"
            >
              Share Feedback
            </button>
          )}
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 shadow-md border border-cyan-400/30"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
