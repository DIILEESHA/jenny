import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Trave = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75;
      if (inView) {
        controls.start("visible");
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    // Check on mount in case already in view
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);

  return (
    <div className="h">
      <motion.div
        className="d"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeUpVariant}
      >
        <div className="detail_grid vv">
          <motion.div className="detail_sub a f" variants={fadeUpVariant}>
            <motion.div className="couple_section" variants={fadeUpVariant}>
              <h2 className="couple_name">Travel & Accommodations</h2>

              <p className="d_p">
                Whether you’re coming from near or far, we want your trip to San
                Francisco to be as smooth and memorable as our big day itself.
                Below you’ll find hotel details, travel tips, parking info, and
                a few nearby favorites to explore. Make a weekend of it — we
                can’t wait to celebrate and share this beautiful city with you
              </p>
            </motion.div>
          </motion.div>

          
        </div>
      </motion.div>
    </div>
  );
};

export default Trave;
