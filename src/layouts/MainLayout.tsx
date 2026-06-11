import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-night-800 focus:px-4 focus:py-2 focus:text-sm focus:text-haze-100"
      >
        Skip to content
      </a>
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="relative z-10 flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
