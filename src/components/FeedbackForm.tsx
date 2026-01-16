import { useState } from 'react'
import { Link } from 'react-router-dom'

interface FeedbackFormProps {
  onBack: () => void
}

export default function FeedbackForm({ onBack }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    rating: '',
    feedback: '',
    suggestions: '',
    contactPermission: false
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In production, send to backend API
    // For now, store in localStorage and show success
    const feedbacks = JSON.parse(localStorage.getItem('demo_feedbacks') || '[]')
    feedbacks.push({
      ...formData,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('demo_feedbacks', JSON.stringify(feedbacks))
    
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center px-6">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-light text-white mb-4">
            Thank You!
          </h2>
          <p className="text-gray-300 mb-8">
            Your feedback has been recorded. We appreciate your time and insights.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 border border-gray-600"
            >
              Back to Demo
            </button>
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 border border-cyan-400/30"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-8">
          <h2 className="text-3xl font-light text-white mb-2">
            Share Your Feedback
          </h2>
          <p className="text-gray-300 mb-8">
            Your opinion helps us improve. Please share your thoughts about the demo experience.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Manager, Director, CEO"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Overall Rating *
              </label>
              <select
                required
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              >
                <option value="">Select rating...</option>
                <option value="excellent">Excellent</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Feedback *
              </label>
              <textarea
                required
                rows={5}
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                placeholder="What did you think about the demo? What worked well? What could be improved?"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Suggestions for Improvement
              </label>
              <textarea
                rows={4}
                value={formData.suggestions}
                onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                placeholder="Any specific features or improvements you'd like to see?"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="contactPermission"
                checked={formData.contactPermission}
                onChange={(e) => setFormData({ ...formData, contactPermission: e.target.checked })}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="contactPermission" className="ml-2 block text-sm text-gray-300">
                I'm open to being contacted for follow-up discussions
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 border border-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 border border-cyan-400/30"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
