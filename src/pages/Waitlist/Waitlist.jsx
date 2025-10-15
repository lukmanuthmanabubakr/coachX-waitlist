import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import coachX from "../../assets/coachXHome.svg";
import "./Waitlist.css";

const Waitlist = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/waitlist`,
        formData
      );
      toast.success(res.data.message || "Successfully joined the waitlist!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim();

  return (
    <div className="waitlist-wrapper">
      <Toaster position="top-right" />

      {/* LEFT SIDE */}
      <div className="waitlist-left">
        <div className="image-container">
          <img src={coachX} alt="CoachX" className="waitlist-image" />
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
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
