"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function ReadMoreButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex items-center">
      <motion.button
        className="flex items-center px-4 py-2 bg-navy-700 text-white rounded-md"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          backgroundColor: isHovered ? "#38b2ac" : "#1e3a8a",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="mr-2">Read More</span>
        <ArrowUpRight size={16} />
      </motion.button>
    </div>
  )
}

