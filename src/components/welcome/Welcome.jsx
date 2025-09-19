import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./w.css";

const targetDate = new Date("2025-12-06T00:00:00-08:00"); // December 6, 2025 PST

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const leavesAnimate = {
  animate: {
    rotate: [0, 10, 0, -10, 0],
    y: [0, -10, 0, 10, 0],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut",
    },
  },
};

const pulse = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.3, 1], transition: { duration: 0.5 } },
};

const CountdownNumber = ({ value }) => {
  // This component pulses when value changes
  const [animatePulse, setAnimatePulse] = useState(false);

  useEffect(() => {
    setAnimatePulse(true);
    const timeout = setTimeout(() => setAnimatePulse(false), 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <AnimatePresence mode="wait">
      <motion.h2
        key={value}
        className="date"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: animatePulse ? 1.3 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.h2>
    </AnimatePresence>
  );
};

const Welcome = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: "0", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: days.toString(),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="welcome"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h2 className="welcome_title" variants={fadeUp}>
        Welcome to Our Celebration
      </motion.h2>

      <motion.p
        className="welocome_p"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
      >
        We’re looking forward to sharing a winter evening in San Francisco — one
        filled with love, laughter, and celebration. Here you’ll find all the
        details for our big day, with more to come as we continue adding along
        the way.
      </motion.p>

      <motion.h2
        className="coupler_name"
        variants={fadeUp}
        transition={{ delay: 0.4 }}
      >
        "Jenny Yu &amp; John Jaejoon Cho"
      </motion.h2>

      <motion.div
        className="count_grid"
        variants={fadeUp}
        transition={{ delay: 0.6 }}
      >
        {/* Two continuous animated leaves */}
        <motion.div className="leaves" variants={leavesAnimate}>
          <div className="leaves_right">
            <img
              src="https://i.imgur.com/Cgat5uh.png"
              className="leave_img"
              alt="leaves decoration left"
            />
          </div>
        </motion.div>

        <motion.div
          className="leavest"
          variants={leavesAnimate}
          transition={{ delay: 0.3 }}
        >
          <div className="leaves_right">
            <img
              src="https://i.imgur.com/Cgat5uh.png"
              className="leave_imgt"
              alt="leaves decoration right"
            />
          </div>
        </motion.div>

        {/* Countdown numbers with pulse animation on change */}
        <div className="count_sub">
          <div className="fr"></div>
          <CountdownNumber value={timeLeft.days} />
          <motion.p className="days" variants={fadeUp}>
            days
          </motion.p>
        </div>

        <div className="count_sub">
          <CountdownNumber value={timeLeft.hours} />
          <motion.p className="days" variants={fadeUp}>
            Hours
          </motion.p>
        </div>

        <div className="count_sub">
          <CountdownNumber value={timeLeft.minutes} />
          <motion.p className="days" variants={fadeUp}>
            Minutes
          </motion.p>
        </div>

        <div className="count_sub">
          <CountdownNumber value={timeLeft.seconds} />
          <motion.p className="days" variants={fadeUp}>
            Seconds
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
