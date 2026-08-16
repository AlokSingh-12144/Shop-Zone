import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page container">
      <div className="page-header text-center">
        <h1 className="page-title">Contact & Customer Support</h1>
        <p className="page-subtitle">
          Have questions regarding an order or product? We're here to help you 24/7.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-cards">
          <div className="info-card">
            <div className="info-icon">
              <Mail />
            </div>
            <div>
              <h3>Email Us</h3>
              <p>support@shopzone.com</p>
              <span>Response within 2 hours</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <Phone />
            </div>
            <div>
              <h3>Call Us</h3>
              <p>+1 (800) 555-ZONE</p>
              <span>Mon - Fri, 9am - 6pm EST</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <MapPin />
            </div>
            <div>
              <h3>Headquarters</h3>
              <p>100 Commerce Way, Tech District</p>
              <span>New York, NY 10001</span>
            </div>
          </div>

          <div className="info-card faq-card">
            <div className="info-icon">
              <HelpCircle />
            </div>
            <div>
              <h3>Instant FAQ</h3>
              <p>Check common shipping & returns guides</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="form-card">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and our support team will respond promptly.</p>

            {submitted && (
              <div className="success-banner">
                <CheckCircle2 size={20} />
                <span>Thank you! Your message has been received successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Order status inquiry / General question"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="How can we assist you today?"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
