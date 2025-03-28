"use client";

import React from "react";
import { motion } from "motion/react";

const TwoText = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 89.34 179.69"
      className="h-24 md:h-36 lg:h-48"
      initial={{ fill: "#fffbeb00" }}
      animate={{ fill: "#fffbeb" }}
      transition={{ duration: 1, delay: 4.5, ease: "anticipate" }}
    >
      <motion.polygon
        className="stroke-amber-50 stroke-2"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
        points="1 73.28 28.11 73.28 28.11 28.11 61.23 28.11 61.23 61.23 53.71 61.23 53.71 76.29 46.18 76.29 46.18 91.35 38.65 91.35 38.65 106.41 31.12 106.41 31.12 121.47 23.59 121.47 23.59 136.53 16.06 136.53 16.06 151.59 1 151.59 1 178.69 88.34 178.69 88.34 151.59 43.16 151.59 43.16 148.58 50.69 148.58 50.69 133.52 58.22 133.52 58.22 118.46 65.75 118.46 65.75 103.4 73.28 103.4 73.28 88.34 80.81 88.34 80.81 73.28 88.34 73.28 88.34 16.06 73.28 16.06 73.28 1 16.06 1 16.06 16.06 1 16.06 1 73.28"
      />
    </motion.svg>
  );
};

export default TwoText;
