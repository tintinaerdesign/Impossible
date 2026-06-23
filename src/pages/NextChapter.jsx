import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

import Next1 from "../components/LearnPage/Next1.jsx";
import Next2 from "../components/LearnPage/Next2.jsx";

import Continue from "../components/LearnPage/Continue.jsx";

export default function NextChapter() {
  return (
    <section className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Chapter1 */}
      <Next1 />

      {/* Chapter2 */}
      <Next2 />

      {/* Continue */}
      <Continue />

      {/* Footer */}
      <Footer />
    </section>
  );
}
