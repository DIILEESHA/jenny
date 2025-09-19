import { motion } from "framer-motion";
import "./h.css";
import Nav from "../nav/Nav";

const containerVariant = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const textFadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const bgFadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 0.3, transition: { duration: 2, ease: "easeOut" } },
};

const Headre = () => {
  return (
    <div>
      <motion.div
        className="h"
        initial="initial"
        animate="animate"
        variants={containerVariant}
      >
        {/* Animated fading background overlay */}
        <motion.div className="header_background" variants={bgFadeVariant} />

        <motion.div className="header_container" variants={containerVariant}>
          <motion.div className="couple_section" variants={containerVariant}>
            <motion.h2 className="couple_name" variants={textFadeSlide}>
              Jenny Yu &amp; John Jaejoon Cho
            </motion.h2>
            <motion.p className="located" variants={textFadeSlide}>
              December 6, 2025 | San Francisco, CA
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Headre;
