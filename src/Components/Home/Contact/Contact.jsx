import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      {/* Page Title */}
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you</p>
      </div>

      {/* Main Section */}
      <div className="contact-container">

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Have any questions or feedback?  
            Reach out to us anytime.
          </p>

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

        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send Message</h3>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
