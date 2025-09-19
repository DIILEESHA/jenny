import "./ac.css";import { motion, AnimatePresence } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const About = () => {
  return (
    <div className="abo">
      <h2 className="welcome_title">Wedding Day Itinerary</h2>

      <div className="abo_grid">
        <div className="abo_sub ee">
          <img
            src="https://i.imgur.com/d3L3HZw.png"
            alt=""
            className="abo_img"
          />
          <h2 className="abo_time">4.00PM</h2>
          <h1 className="actual">Guests arrive and take seats</h1>
        </div>
        <div className="abo_sub"></div>

        <div className="abo_sub"></div>

        <div className="abo_sub bb">
          <img
            src="https://i.imgur.com/GBN5LhQ.png"
            alt=""
            className="abo_img"
          />
          <h2 className="abo_time">4.30PM</h2>
          <h1 className="actual">Wedding ceremony with Pastor Cho</h1>
        </div>
        <div className="abo_sub"></div>
        <div className="abo_sub"></div>

        <div className="abo_sub ee">
          <img
            src="https://i.imgur.com/Svdt4um.png"
            alt=""
            className="abo_img"
          />
          <h2 className="abo_time">5.00PM</h2>
          <h1 className="actual">Cocktail hour</h1>
        </div>
        <div className="abo_sub"></div>
        <div className="abo_sub"></div>

        <div className="abo_sub bb">
          <img
            src="https://i.imgur.com/tNFjgEI.png"
            alt=""
            className="abo_img"
          />
          <h2 className="abo_time">6.00PM</h2>
          <h1 className="actual">Dinner & dancing</h1>
        </div>
      </div>

           {/* Accordion section with details */}
      <motion.div
        className="details_wrap"
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="welcome_title">More Details</h3>

        <Accordion type="single" className="" collapsible defaultValue="">
          <AccordionItem className="halo" value="attire">
            <AccordionTrigger className="hp">Attire</AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  Dress to impress for a winter evening in San Francisco.
                  Polished enough for a cocktail party, comfortable enough to
                  dance the night away.
                </li>
                <li>
                  Nights can be chilly — we encourage guests to dress warmly
                  while still bringing their sparkle!
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="parking">
            <AccordionTrigger className="hp">
              Parking &amp; Transportation
            </AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  Recommended: 3 Embarcadero Center Garage (wider spaces).
                </li>
                <li>
                  Alternative: 4 Embarcadero Center Garage (in same building as
                  restaurant).
                </li>
                <li>
                  Prepaid parking tickets will be available from us — please
                  pick one up before you leave.
                </li>
                <li>
                  Staying nearby? If you’re at the Hyatt Regency San Francisco,
                  the restaurant is just next door in the same plaza.
                </li>
                <li>
                  For travel and hotel recommendations, please see our{" "}
                  <a href="/travel" className="details_link">
                    Travel &amp; Accommodations
                  </a>{" "}
                  page.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="dinner">
            <AccordionTrigger className="hp">
              Dinner &amp; Drinks
            </AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  We’re honored to be serving a ten-course Chinese banquet — a
                  celebratory tradition symbolizing luck, prosperity, and
                  togetherness.
                </li>
                <li>
                  Expect a variety of flavors, family-style dining, and a few
                  surprises along the way.
                </li>
                <li>
                  If you have food allergies or dietary restrictions, please
                  note them on your RSVP.
                </li>
                <li>An open bar will be available throughout the evening.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="music">
            <AccordionTrigger className="hp">
              Music &amp; Entertainment
            </AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  After dinner we’ll turn up the volume — bring your best dance
                  moves!
                </li>
                <li>A photobooth will capture laughter and memories.</li>
                <li>DJ will keep the energy high all night long.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="children">
            <AccordionTrigger className="hp">Children</AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>Kids are welcome to join the celebration!</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="halo" value="sharing">
            <AccordionTrigger className="hp">Sharing Memories</AccordionTrigger>
            <AccordionContent>
              <ul className="details_list">
                <li>
                  We’ll have a photographer and videographer capturing the day —
                  so relax and enjoy.
                </li>
                <li>
                  A photo-sharing site will be available where guests can upload
                  favorite snapshots from the celebration. More details to come.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
};

export default About;
