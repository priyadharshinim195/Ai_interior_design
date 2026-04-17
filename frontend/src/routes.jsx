import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import IntroSplash from "./pages/IntroSplash"
import Home from "./pages/Home"
import UploadPage from "./pages/UploadPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroSplash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/studio" element={<UploadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
