import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import "./d.css";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Details = () => {
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
    <motion.div
      className="d"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUpVariant}
    >
      <div className="detail_grid">
        {/* <motion.div className="detail_sub a" variants={fadeUpVariant}>
          <motion.div className="couple_section" variants={fadeUpVariant}>
            <h2 className="couple_name">Wedding Details</h2>
          </motion.div>
        </motion.div> */}

        <motion.div className="detail_sub ham" variants={fadeUpVariant} transition={{ delay: 0.2 }}>
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

          <motion.div className="ham_sub dirts" variants={fadeUpVariant} transition={{ delay: 0.2 }}>
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

        <motion.div className="jk" variants={fadeUpVariant} transition={{ delay: 0.4 }}>
          <button className="rsvp_btn">see full details</button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Details;
