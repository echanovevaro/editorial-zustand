import { useCallback } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom"
// import { createPortal } from "react-dom"

export default function Modal({ children, onClose }) {
  return createPortal(
    <>
      <div
        className="backdrop"
        onClick={onClose}
      ></div>
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="customModal"
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  )
}
