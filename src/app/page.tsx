"use client";

import usePreloder from "@/utils/hooks/usePreloder";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [shouldStartPreloading, setShouldStartPreloading] = useState(false);

  const { fileUrls, isPreloaded, progress } = usePreloder(
    shouldStartPreloading
  );

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800 as full">
      <div
        style={{ width: `${progress}%` }}
        className={
          "fixed bg-gray-700  h-4 text-center text-slate-50 bottom-5 left-0"
        }
      />

      <div className="fixed left-0 z-10 w-full h-4 text-xs text-center bottom-5">
        {progress}%
      </div>

      <AnimatePresence mode="sync">
        {isPreloaded && (
          <motion.video
            layout
            className="rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="videoPlayer"
            muted
            autoPlay
            playsInline
            src={fileUrls}
          ></motion.video>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setShouldStartPreloading(true)}
        className="px-12 py-2 mt-5 text-gray-800 transition-all duration-300 rounded-md bg-slate-300 hover:bg-slate-50"
      >
        Preload
      </motion.button>
    </div>
  );
}
