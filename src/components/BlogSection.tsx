export default function BlogSection() {
  // This section can be expanded with actual blog functionality later
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Business Operations",
      excerpt: "Exploring how AI transforms traditional workflows while maintaining human oversight and control.",
      date: "January 2024",
      category: "AI Strategy"
    },
    {
      id: 2,
      title: "Building Scalable Systems with Human-AI Collaboration",
      excerpt: "Lessons learned from implementing AI-assisted systems that amplify human capability rather than replace it.",
      date: "December 2023",
      category: "Technology"
    },
    {
      id: 3,
      title: "Why Delaying AI Adoption is a Competitive Risk",
      excerpt: "The strategic imperative of early AI adoption and the cost of waiting.",
      date: "November 2023",
      category: "Business Strategy"
    }
  ]

  return (
    <section id="insights" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
          Insights & Articles
        </h2>
        
        <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
          Thoughts on AI, business operations, and the future of work.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-sm text-primary-600 mb-2">{post.category}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
