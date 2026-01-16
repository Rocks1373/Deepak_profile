export default function PhilosophySection() {
  const principles = [
    {
      title: "Human-in-the-Loop",
      description: "Every critical decision requires human judgment. AI executes, humans decide."
    },
    {
      title: "Rule Boundaries",
      description: "AI operates within clearly defined rules. It cannot bypass approval gates or override policies."
    },
    {
      title: "Transparency",
      description: "Every AI action is visible, traceable, and explainable. No black boxes."
    },
    {
      title: "Auditability",
      description: "Complete audit trails for compliance, learning, and continuous improvement."
    },
    {
      title: "Ethics and Control",
      description: "Humans maintain ultimate control. AI supports, never replaces, human responsibility."
    }
  ]

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
          Design Philosophy
        </h2>
        
        <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
          AI positioned as executor, analyzer, and assistant—never as decision-maker.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {principle.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-primary-50 px-8 py-6 rounded-lg border-l-4 border-primary-600">
            <p className="text-lg text-gray-800 font-medium">
              AI is the tool. Humans are the craftsmen.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
