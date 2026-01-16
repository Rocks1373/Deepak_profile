export default function BusinessValueSection() {
  const values = [
    {
      icon: "⏱️",
      title: "Time Savings",
      description: "Automated execution frees teams to focus on strategy and relationships."
    },
    {
      icon: "✅",
      title: "Reduced Errors",
      description: "AI consistency eliminates human error in repetitive tasks."
    },
    {
      icon: "👁️",
      title: "Visibility",
      description: "Real-time insights across all teams, processes, and operations."
    },
    {
      icon: "📈",
      title: "Scalability",
      description: "Handle growth without proportional headcount increases."
    },
    {
      icon: "💰",
      title: "Cost Control",
      description: "Optimize operations while maintaining quality and compliance."
    },
    {
      icon: "⚡",
      title: "Faster Decisions",
      description: "AI provides data instantly, humans decide with confidence."
    }
  ]

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-gray-900 mb-16 text-center">
          Business Value
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
