import { SiteFooter } from "../components/SiteChrome.jsx";

function ContactPage() {
  return (
    <div>
      <nav className="contact-navbar">
        <div className="container">
          <a className="logos-box" href="index.html" aria-label="GetInTouch24 home">
            <img src="/images/logo.png" alt="GT24 Logo" className="sites-logo" />
          </a>
          <a href="index.html" className="home-btn"><i className="fa-solid fa-house" /> Home</a>
        </div>
      </nav>

      <section className="contact-hero">
        <div className="container">
          <span className="contact-eyebrow"><i className="fa-solid fa-headset" aria-hidden="true" /> Student support</span>
          <h1>Contact Us</h1>
          <p>Have questions, suggestions, or facing any issue? Feel free to contact us anytime.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <aside className="contact-info">
              <h2>Let&apos;s Talk</h2>
              <p>We are always ready to help students regarding quizzes, notes, exams, account issues, and other queries.</p>
              <div className="info-box"><i className="fa-solid fa-envelope" /><a className="info-link" href="mailto:getintouch24official@gmail.com">getintouch24official@gmail.com</a></div>
              <div className="info-box"><i className="fa-solid fa-clock" /><span>Available 24 x 7</span></div>
              <div className="info-box"><i className="fa-solid fa-graduation-cap" /><span>Educational Support Platform</span></div>
            </aside>

            <div className="contact-form-box">
              <form id="contactForm">
                <h3>Send Message</h3>
                <p className="contact-form-intro">Tell us how we can help. Our support team will get back to you.</p>
                <div className="mb-3">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input type="text" className="form-control" id="subject" name="subject" placeholder="What can we help you with?" maxLength={120} required />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" name="message" rows={6} minLength={10} maxLength={2000} aria-describedby="messageHelp messageCount" placeholder="Share a few details so we can help..." required />
                  <div className="message-meta">
                    <small id="messageHelp">Please include at least 10 characters.</small>
                    <small><span id="messageCount" aria-live="polite">0</span>/2000</small>
                  </div>
                </div>
                <button type="submit" className="send-btn"><i className="fa-solid fa-paper-plane" /> Send Message</button>
                <p id="contactStatus" className="contact-status" role="status" aria-live="polite" />
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="feedbackPreviewModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content preview-modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Preview Your Message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p className="preview-label">Subject</p><p className="preview-value" id="previewSubject" />
              <p className="preview-label mt-3">Message</p><p className="preview-value preview-message-text" id="previewMessage" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Edit</button>
              <button type="button" id="confirmSendBtn" className="btn btn-primary"><i className="fa-solid fa-paper-plane" /> Confirm &amp; Send</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="thankYouModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content thank-you-modal-content text-center">
            <div className="modal-body py-5 px-4">
              <div className="thank-you-icon"><i className="fa-solid fa-circle-check" /></div>
              <h4 className="mt-3 mb-2">Thank You!</h4>
              <p className="mb-4">Thank you for giving your feedback or suggestion.</p>
              <button type="button" className="btn btn-primary px-4" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export default ContactPage;
