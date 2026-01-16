interface DemoEntryProps {
  onConfirm: (isMrAhmed: boolean) => void
}

export default function DemoEntry({ onConfirm }: DemoEntryProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-6">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-2xl font-light text-white mb-2">
            Welcome to the Demo
          </h2>
          <p className="text-gray-300">
            Are you Mr. Ahmed?
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => onConfirm(true)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 shadow-lg border border-cyan-400/30"
          >
            Yes, I am Mr. Ahmed
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="flex-1 px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 border border-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
