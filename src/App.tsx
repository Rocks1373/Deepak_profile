import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DemoPage from './pages/DemoPage'
import MobileUIPage from './pages/MobileUIPage'
import GappDemoPage from './pages/GappDemoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/mobile-ui" element={<MobileUIPage />} />
        <Route path="/gapp-demo" element={<GappDemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
