import { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      alert("Your message has been sent!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Try again.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Have any questions or feedback? Reach out to us anytime.</p>

          <div className="info-item">
            <span>📧</span>
            <p>fur&food@gmail.com</p>
          </div>

          <div className="info-item">
            <span>📞</span>
            <p>6354529996</p>
          </div>

          <div className="info-item">
            <span>📍</span>
            <p>Ahmedabad, Gujarat</p>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Message</h3>

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;