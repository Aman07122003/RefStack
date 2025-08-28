import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Marker from "./Marker";

export default function ParallaxHeadings() {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const yLogo = useTransform(scrollY, [0, 250], [0, 30]); // slow
  const yHeading = useTransform(scrollY, [0, 250], [0, 60]); // medium
  const yText = useTransform(scrollY, [0, 250], [0, 90]); // faster
  const yButtons = useTransform(scrollY, [0, 250], [0, 120]); // fastest

  return (
    <div className="relative h-screen md:h-[90vh] w-full flex items-center justify-center px-4">
      <div className="max-w-6xl w-full text-center">
        {/* Marker (decoration) */}
        <Marker />

        {/* Logo */}
        <motion.h1
          style={{ y: yLogo }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-black font-extrabold tracking-tight mb-4"
        >
          RefStack<span className="text-green-400">.</span>
        </motion.h1>

        {/* Heading */}
        <motion.h2
          style={{ y: yHeading }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black"
        >
          Streamline Your Reference{" "}<span className="text-green-400">Management</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          style={{ y: yText }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 px-2"
        >
          RefStack helps companies and employees manage professional references
          efficiently and securely.
        </motion.p>

        {/* Buttons */}
        <motion.div
          style={{ y: yButtons }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => navigate("/companies/new")}
            className="px-6 sm:px-8 md:px-10 py-3 md:py-4 border text-green-500 font-medium rounded-md bg-white hover:bg-green-100 text-sm sm:text-base md:text-lg transition duration-300"
          >
            Register Your Company
          </button>
          <button
            onClick={() => navigate("/git-repo")}
            className="px-6 sm:px-8 md:px-10 py-3 md:py-4 border border-transparent font-medium rounded-md text-white bg-green-500 hover:bg-green-600 text-sm sm:text-base md:text-lg transition duration-300"
          >
            GitHub Arcives
          </button>
        </motion.div>
      </div>
    </div>
  );
}
