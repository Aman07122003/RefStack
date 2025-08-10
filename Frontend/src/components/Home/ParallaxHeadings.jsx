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
    <div className="relative h-[90vh] w-full flex items-center justify-center">
      <div className="">
        <Marker />
        <motion.h1
            style={{ y: yLogo }}
            className="text-3xl text-black flex items-center mt-2 justify-center font-extrabold tracking-tight sm:text-4xl lg:text-9xl mb-4"
        >
            RefStack<span className="text-green-400">.</span>
        </motion.h1> 
        <motion.h1
            style={{ y: yHeading }}
            className="text-4xl text-black font-bold sm:text-5xl lg:text-6xl"
        >
            Streamline Your Reference <span className="text-green-400">Management</span>
        </motion.h1>

        <motion.p
            style={{ y: yText }}
            className="mt-6 max-w-3xl mx-auto text-xl text-gray-500 text-center"
        >
            RefStack helps companies and employees manage professional references efficiently and securely.
        </motion.p>

        <motion.div
            style={{ y: yButtons }}
            className="mt-10 flex justify-center gap-4"
        >
            <button
            onClick={() => navigate("/companies/new")}
            className="px-8 py-3 border text-base text-green-500 font-medium rounded-md  bg-white hover:bg-green-100 md:py-4 md:text-lg md:px-10 transition duration-300"
            >
            Register Your Company
            </button>
            <button
            onClick={() => navigate("/companies")}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-500 md:py-4 md:text-lg md:px-10 transition duration-300"
            >
            Browse Companies
            </button>
        </motion.div>
      </div>
    </div>
  );
}