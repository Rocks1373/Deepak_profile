import React from "react";

export function SummaryPage() {
  return (
    <div id="demo-summary" className="max-w-4xl mx-auto my-8" style={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "1rem", border: "1px solid #e4e7ec" }}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You, Mr. Ahmed</h1>
        <p className="text-gray-600">Summary of GAPP Benefits</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">⏱️ Time Savings</h3>
          <p className="text-gray-700">
            Eliminates manual data entry and paperwork. Automated workflows reduce processing time by up to 70%.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-bold text-green-900 mb-3">✅ Reduced Errors</h3>
          <p className="text-gray-700">
            Validation rules and approval gates ensure accuracy at every step, preventing costly mistakes.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-900 mb-3">👁️ Complete Visibility</h3>
          <p className="text-gray-700">
            Real-time dashboards and tracking provide instant status updates for all stakeholders.
          </p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-xl font-bold text-orange-900 mb-3">📈 Scalability</h3>
          <p className="text-gray-700">
            System grows with your operations. Handles increasing vendors, shipments, and orders seamlessly.
          </p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-900 mb-3">💰 Cost Reduction</h3>
          <p className="text-gray-700">
            Reduces manpower pressure by automating routine tasks. Fewer errors mean fewer costly corrections.
          </p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-900 mb-3">🤖 AI-Assisted</h3>
          <p className="text-gray-700">
            AI handles document extraction and OCR, but all critical decisions require human approval for safety.
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Step-by-step approval workflows with configurable rules</li>
          <li>✓ Real-time stock visibility across all warehouses</li>
          <li>✓ Mobile and web access for all users</li>
          <li>✓ Role-based access control with granular permissions</li>
          <li>✓ Automated notifications and approval routing</li>
          <li>✓ Complete audit trail for all operations</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Return to Main Application
        </a>
      </div>
    </div>
  );
}
