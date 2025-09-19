// src/components/RSVPForm.jsx
import React, { useState } from "react";
import "./rsvp.css";
import { Home } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveRSVP } from "./firebaseConfig"; // adjust path if needed

const initialState = {
  fullName: "",
  attending: "", // "accept" | "decline"
  additionalGuests: "",
  kidsNames: "",
  allergies: "",
  stayingHyatt: false,
  stayingElsewhere: false,
  drivingNeedTicket: false,
  songRequest: "",
  message: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: checked }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
    setErrors((err) => ({ ...err, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.attending) newErrors.attending = "Please tell us whether you'll attend.";

    // If accepting, require at least one of these (example): time or contact not required.
    if (form.attending === "accept") {
      // you may add more strict validations here if needed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors and try again.");
      return;
    }

    setIsSaving(true);

    try {
      // Prepare payload: store only relevant fields depending on attending
      const base = {
        fullName: form.fullName.trim(),
        attending: form.attending,
        message: form.message?.trim() || "",
      };

      let payload;
      if (form.attending === "accept") {
        // store everything
        payload = {
          ...base,
          additionalGuests: form.additionalGuests.trim(),
          kidsNames: form.kidsNames.trim(),
          allergies: form.allergies.trim(),
          stayingHyatt: !!form.stayingHyatt,
          stayingElsewhere: !!form.stayingElsewhere,
          drivingNeedTicket: !!form.drivingNeedTicket,
          songRequest: form.songRequest.trim(),
        };
      } else {
        // decline: only minimal info (name + message)
        payload = base;
      }

      // save to firestore
      await saveRSVP(payload);

      toast.success("Thanks — your RSVP has been submitted!");
      // reset form
      setForm(initialState);
      setErrors({});
    } catch (err) {
      console.error("Failed to save RSVP", err);
      toast.error("Something went wrong while saving — please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Conditionally render either the full input set (accept) or minimal (decline)
  const isAccepting = form.attending === "accept";
  const isDeclining = form.attending === "decline";

  return (
    <div className="r">
      <ToastContainer position="top-right" autoClose={3500} />
      <div className="rsvp_wrap" aria-live="polite">
        <div className="homey">
          <div className="homeies">
            <Home size={20} />
          </div>
          <div className="homeies">/</div>
          <div className="homeies">RSVP</div>
        </div>

        <form className="rsvp_card" onSubmit={handleSubmit} noValidate>
          <h2 className="rsvp_title">Please RSVP</h2>
          <p className="rsvp_note">
            Kindly RSVP by <strong>October 30th</strong>.
          </p>

          <div className="grid-two">
            {/* Full name */}
            <label className="label-playfair" htmlFor="fullName">
              Full Name(s)
              <span className="required"> *</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              className="input-poppins"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Olivia Bennett"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "err-fullName" : undefined}
            />
            {errors.fullName && (
              <div id="err-fullName" className="field_error">
                {errors.fullName}
              </div>
            )}

            {/* Attending */}
            <label className="label-playfair">Will you be attending?</label>
            <fieldset className="radio_group" role="radiogroup" aria-required="true">
              <label className="radio_label">
                <input
                  type="radio"
                  name="attending"
                  value="accept"
                  checked={form.attending === "accept"}
                  onChange={handleChange}
                />
                Accepts with pleasure
              </label>
              <label className="radio_label">
                <input
                  type="radio"
                  name="attending"
                  value="decline"
                  checked={form.attending === "decline"}
                  onChange={handleChange}
                />
                Declines with regret
              </label>
              {errors.attending && <div className="field_error">{errors.attending}</div>}
            </fieldset>

            {/* If accepting: show all fields */}
            {isAccepting && (
              <>
                {/* Additional guest(s) */}
                <label className="label-playfair" htmlFor="additionalGuests">
                  Additional Guest Name(s)
                </label>
                <input
                  id="additionalGuests"
                  name="additionalGuests"
                  className="input-poppins"
                  type="text"
                  value={form.additionalGuests}
                  onChange={handleChange}
                  placeholder="Name(s) of +1, separated by commas"
                />

                {/* Kids */}
                <label className="label-playfair" htmlFor="kidsNames">
                  Kids who will be joining
                </label>
                <input
                  id="kidsNames"
                  name="kidsNames"
                  className="input-poppins"
                  type="text"
                  value={form.kidsNames}
                  onChange={handleChange}
                  placeholder="Child name(s) & ages (optional)"
                />

                {/* Allergies */}
                <label className="label-playfair" htmlFor="allergies">
                  Name(s) & Allergies / Dietary Restrictions
                </label>
                <input
                  id="allergies"
                  name="allergies"
                  className="input-poppins"
                  type="text"
                  value={form.allergies}
                  onChange={handleChange}
                  placeholder="e.g. John Doe — nut allergy"
                />

                {/* Staying / Driving */}
                <label className="label-playfair">
                  Will you be staying at the hotel or driving?
                </label>
                <div className="checkbox_group">
                  <label className="checkbox_label">
                    <input
                      type="checkbox"
                      name="stayingHyatt"
                      checked={form.stayingHyatt}
                      onChange={handleChange}
                    />
                    Staying at the Hyatt Regency San Francisco
                  </label>
                  <label className="checkbox_label">
                    <input
                      type="checkbox"
                      name="stayingElsewhere"
                      checked={form.stayingElsewhere}
                      onChange={handleChange}
                    />
                    Staying elsewhere
                  </label>
                  <label className="checkbox_label">
                    <input
                      type="checkbox"
                      name="drivingNeedTicket"
                      checked={form.drivingNeedTicket}
                      onChange={handleChange}
                    />
                    Driving and will need a prepaid parking ticket
                  </label>
                </div>

                {/* Song Request */}
                <label className="label-playfair" htmlFor="songRequest">
                  Song Request
                </label>
                <input
                  id="songRequest"
                  name="songRequest"
                  className="input-poppins"
                  type="text"
                  value={form.songRequest}
                  onChange={handleChange}
                  placeholder="What song will get you on the dance floor?"
                />
              </>
            )}

            {/* If declining: show only message to couple (and name is already shown above) */}
            {isDeclining && (
              <>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ margin: "0px 0 0", color: "red",fontSize:"14px", fontFamily: "Poppins, sans-serif" }}>
                    We're sorry you can't join — please leave a message for the couple below*.
                  </p>
                </div>
              </>
            )}

            {/* Message (shown for both accept/decline) */}
            <label className="label-playfair" htmlFor="message">
              Message to the Couple
            </label>
            <textarea
              id="message"
              name="message"
              className="input-poppins textarea"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Leave a note, advice, or a funny story"
            />
          </div>

          <div className="form_actions">
            <button type="submit" className="rsvp_btn" disabled={isSaving}>
              {isSaving ? "Sending..." : "Send RSVP"}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
