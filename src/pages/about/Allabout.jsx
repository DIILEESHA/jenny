import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import "./a.css";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Allabout = () => {
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
              <h2 className="couple_name">Wedding Details</h2>

              <p className="d_p">
                Here you’ll find everything you need to know for our big day —
                from when and where it all happens to attire, dinner, and
                special touches. We can’t wait to celebrate a cozy winter
                evening in San Francisco surrounded by love, laughter, and all
                of you
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="detail_sub ham cc"
            variants={fadeUpVariant}
            transition={{ delay: 0.2 }}
          >
            <motion.div className="ham_sub dirt" variants={fadeUpVariant}>
              <img
                src="https://i.imgur.com/8ygwIhd.png"
                className="d_img"
                alt="wedding time"
              />
              <h2 className="d_title">wedding day</h2>
              <div className="timo">4:00 PM</div>
              <div className="d_time">December 6, 2025</div>
            </motion.div>

            <motion.div
              className="ham_sub dirts"
              variants={fadeUpVariant}
              transition={{ delay: 0.2 }}
            >
              <img
                src="https://i.imgur.com/naGjprS.png"
                className="d_img"
                alt="wedding venue"
              />
              <h2 className="d_title">venue</h2>
              <div className="timo">Harborview Restaurant &amp; Bar</div>
              <div className="d_time">Get Direction</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Allabout;
