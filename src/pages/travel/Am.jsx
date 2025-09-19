import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./am.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Am = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const inView1 = useInView(ref1, { once: true, amount: 0.3 });
  const inView2 = useInView(ref2, { once: true, amount: 0.3 });
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    if (inView1) {
      controls1.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
      });
    }
    if (inView2) {
      controls2.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
      });
    }
  }, [inView1, inView2, controls1, controls2]);

  return (
    <div>
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        animate={controls1}
        className="details_wrap"
      >
        <h2 className="welcome_title">Hotel Accommodations</h2>
        <p className="welocome_p">
          We’re delighted to have reserved a block of rooms at the Hyatt Regency
          San Francisco, located just steps away from our wedding venue. Staying
          here means you’ll be right in the heart of the celebration, with the
          city’s charm at your doorstep.
        </p>

        <div className="am_grid">
          <div className="am_sub">
            <img
              src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/11/17/0931/SFORS-P0318-Upper-Atrium-Cocktail-Set.jpg/SFORS-P0318-Upper-Atrium-Cocktail-Set.4x3.jpg?imwidth=1280"
              alt="Hyatt Regency San Francisco"
              className="am_img"
            />
          </div>

          <div className="am_sub">
            <h2 className="dalsi">Hyatt Regency - Hotel in San Francisco</h2>

            <div className="hotel_info">
              <h2 className="hotel_title">
                <p className="pp">
                  Hyatt Regency San Francisco — 5 Embarcadero Center, San
                  Francisco, CA 94111
                </p>
              </h2>
              <p className="hotel_title">
                <p className="pp">(415) 788-1234</p>
              </p>

              <a
                href="https://maps.app.goo.gl/SiHm9vscYKmdYj4j9"
                target="_blank"
              >
                <button className="rsvp_btn">get location</button>
              </a>
            </div>

            <br />

            <div className="hotel_info">
              <h2 className="hotel_title">
                <p className="pp">
                  There are two other Hyatt Regency hotels in San Francisco.
                  Please be sure to book{" "}
                  <strong>
                    Hyatt Regency San Francisco at 5 Embarcadero Center
                  </strong>{" "}
                  — it’s right next door to our wedding venue, Harborview
                  Restaurant.
                </p>
              </h2>
            </div>

            <br />
            <div className="hotel_info">
              <h2 className="hotel_title">
                <p className="pp">Booking Code: [will provide]</p>
              </h2>
              <p className="hotel_title">
                <p className="pp">Booking Link: [will provide]</p>
              </p>

              <p className="hotel_title">
                <p className="pp">Deadline: [will provide]</p>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        animate={controls2}
        style={{ background: "#fff" }}
        className="details_wrap"
      >
        <h3 className="welcome_title">More Details</h3>

        <Accordion type="single" collapsible defaultValue="">
          <AccordionItem className="halo" value="getting-here">
            <AccordionTrigger className="hp">Getting Here</AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  If you’re flying in, both <strong>SFO (San Francisco)</strong>{" "}
                  and <strong>OAK (Oakland)</strong> are convenient options.
                </li>
                <li>
                  Ride-shares (Uber / Lyft) and BART make it easy to get
                  downtown.
                </li>
                <li>
                  If you’d like help arranging a pickup or drop-off from the
                  airport, please text John:{" "}
                  <a className="details_link" href="tel:+12026300757">
                    202-630-0757
                  </a>
                  .
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="parking">
            <AccordionTrigger className="hp">Parking</AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  Recommended: <strong>3 Embarcadero Center Garage</strong> —
                  wider spaces.
                </li>
                <li>
                  Alternative: <strong>4 Embarcadero Center Garage</strong> —
                  parking directly below the restaurant.
                </li>
                <li>
                  We will provide prepaid parking tickets — please remember to
                  pick one up before you leave.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="things-to-do">
            <AccordionTrigger className="hp">
              Things to Do Nearby
            </AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  <strong>Ferry Building Marketplace</strong> — local shops and
                  great bites.
                </li>
                <li>
                  <strong>Union Square</strong> — shopping and city bustle.
                </li>
                <li>
                  <strong>Pier 39 &amp; Fisherman’s Wharf</strong> — classic SF
                  fun (don’t miss the clam chowder in a sourdough bowl).
                </li>
                <li>
                  Make a weekend of it — these spots are just steps away from
                  the hotel and venue.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
};

export default Am;
