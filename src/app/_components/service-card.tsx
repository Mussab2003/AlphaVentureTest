"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  icon: LucideIcon
  number: number
  onClick: () => void
}

export default function ServiceCard({ title, icon: Icon, number, onClick }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-sky-50 p-6 rounded-md h-72 flex flex-col justify-between cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-auto">
        <div className="w-20 h-20 flex items-center justify-center text-navy-700">
          <Icon size={48} strokeWidth={1.5} />
        </div>
        <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
          {number.toString().padStart(2, "0")}
        </div>
      </div>
      <h3 className="text-xl font-bold mt-6">{title}</h3>
    </motion.div>
  )
}

