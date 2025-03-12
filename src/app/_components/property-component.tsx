"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReadMoreButton from "./read-more-button"
import ServiceCard from "./service-card"
import { buyerServices, sellerServices } from "@/lib/data"

const PropertyComponent = () => {
  const [activeView, setActiveView] = useState<"buyers" | "sellers">("buyers")
  const [highlightOpposite, setHighlightOpposite] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  // Update the font size based on window width
  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCardClick = () => {
    setHighlightOpposite(true)
    setTimeout(() => setHighlightOpposite(false), 1000)
  }

  // Get font size based on screen width and active state
  const getFontSize = (isActive: boolean) => {
    if (isActive) {
      return windowWidth < 640 ? "30px" : windowWidth < 768 ? "36px" : "60px"
    } else {
      return windowWidth < 640 ? "16px" : windowWidth < 768 ? "20px" : "24px"
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-baseline mb-8">
        <h2 className="text-sm sm:text-base md:text-lg uppercase tracking-wide font-semibold">WORKING WITH</h2>
      </div>
      {/* Buyer Seller Button Transition */}
      <div className="flex md:items-end mb-12 flex-col md:flex-row gap-6 md:gap-10">
        <div className="flex items-end relative">
          <div className="relative">
            {/* Background highlight for Buyers */}
            {activeView === "sellers" && highlightOpposite && (
              <motion.div
                className="absolute inset-0 bg-sky-50 rounded-md z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Buyers button */}
            <motion.button
              className={`text-3xl sm:text-4xl md:text-6xl font-bold relative z-10 ${
                activeView === "buyers" ? "text-black" : "font-normal text-base sm:text-xl md:text-2xl text-black"
              }`}
              onClick={() => setActiveView("buyers")}
              animate={{
                fontSize: getFontSize(activeView === "buyers"),
                y: activeView === "buyers" ? 0 : 8,
              }}
              transition={{ duration: 0.4 }}
            >
              Buyers
            </motion.button>
          </div>

          <span className="text-xl sm:text-2xl md:text-3xl font-light mx-1 sm:mx-2 mb-1 z-10">/</span>

          <div className="relative">
            {/* Background highlight for Sellers */}
            {activeView === "buyers" && highlightOpposite && (
              <motion.div
                className="absolute inset-0 bg-sky-50 rounded-md z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Sellers button */}
            <motion.button
              className={`relative z-10 ${
                activeView === "sellers"
                  ? "text-black text-3xl sm:text-4xl md:text-6xl font-bold"
                  : "text-black font-normal text-base sm:text-xl md:text-2xl"
              }`}
              onClick={() => setActiveView("sellers")}
              animate={{
                fontSize: getFontSize(activeView === "sellers"),
                y: activeView === "sellers" ? 0 : 8,
              }}
              transition={{ duration: 0.4 }}
            >
              Sellers
            </motion.button>
          </div>
        </div>
        
        {/* Read More Button */}
        <div className="md:ml-auto">
          <ReadMoreButton />
        </div>
      </div>
      
      {/* Paragraph Description */}
      <div className="mb-12">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Horizon Property Lawyers works with {activeView === "buyers" ? "buyers" : "sellers"} to ensure their
          {activeView === "buyers" ? " purchase" : " sale"} is made efficiently and that their interests are reflected
          and protected in the agreement of {activeView === "buyers" ? "purchase" : "sale"}. When you work with Horizon
          Property Lawyers, we include the following services for residential property
          {activeView === "buyers" ? " buyers:" : " sellers:"}
        </p>
      </div>

      {/* Grid container for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AnimatePresence mode="wait">
          {(activeView === "buyers" ? buyerServices : sellerServices).map((service) => (
            <div key={service.id} className="perspective-1000">
              <motion.div
                initial={{
                  rotateY: activeView === "buyers" ? -90 : 90,
                  opacity: 0,
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                }}
                exit={{
                  rotateY: activeView === "buyers" ? 90 : -90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="preserve-3d h-full"
              >
                <ServiceCard title={service.title} icon={service.icon} number={service.id} onClick={handleCardClick} />
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PropertyComponent

