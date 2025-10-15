import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import coachX from "../../assets/coachXHome.svg";
import { motion } from "framer-motion";
import "./Waitlist.css";

const Waitlist = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // ✅ fixed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/waitlist`,
        formData
      );
      toast.success(res.data.message || "Successfully joined the waitlist!");
      setFormData({ fullName: "", email: "" });
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.fullName.trim() !== "" && formData.email.trim() !== "";

  return (
    <div className="waitlist-wrapper">
      <Toaster position="top-center" />
      {/* LEFT SIDE */}
      <div className="waitlist-left">
        <div className="image-container">
          <motion.img
            src={coachX}
            alt="CoachX"
            className="waitlist-image"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.3,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="waitlist-right">
        <div className="form-box">
          <h2>Join Our Waitlist</h2>
          <p>Be the first to know when we go live!</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName" // ✅ fixed name
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={loading ? "loading" : ""}
            >
              {loading ? "Submitting..." : "Join Waitlist"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
