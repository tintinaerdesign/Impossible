import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Rome from "../assets/Rome.png";

import LearnHeader from "../components/LearnPage/LearnHeader";
import Chapter1 from "../components/LearnPage/Chapter1";
import Chapter2 from "../components/LearnPage/Chapter2";
import Chapter3 from "../components/LearnPage/Chapter3";
import Chapter4 from "../components/LearnPage/Chapter4";
import Chapter5 from "../components/LearnPage/Chapter5";
import Continue from "../components/LearnPage/Continue";

import NextChapter from "./NextChapter.jsx";

export default function LearnPage() {
  return (
    <section className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* LearnHeader */}
      <LearnHeader />

      {/* Chapter1 */}
      <Chapter1 />

      {/* Chapter2 */}
      <Chapter2 />

      {/* Chapter3 */}
      <Chapter3 />

      {/* Chapter4 */}
      <Chapter4 />

      {/* Chapter5 */}
      <Chapter5 />

      {/* Continue */}
      <Continue />

      {/* Footer */}
      <Footer />
    </section>
  );
}
