export function SiteHeader() {
  return (
    <>
      <header className="bg-primary text-white shadow-lg navbar navbar-dark sticky-top">
        <div className="container-fluid d-flex align-items-center">
          <div className="col-6 col-lg-3">
            <a className="navbar-brand logo-box" href="index.html" aria-label="GetInTouch24 home">
              <img src="/images/logo.png" alt="GT24 Logo" className="site-logo" />
            </a>
          </div>

          <div className="col-6 col-lg-9 d-flex align-items-center justify-content-end">
            <ul className="nav d-none d-lg-flex me-4">
              <li className="nav-item"><a className="nav-link text-white" href="index.html">Home</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="notes.html">Notes</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link text-white dropdown-toggle" href="#">Online Test</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="live-quiz.html">Live Quizzes</a></li>
                  <li><a className="dropdown-item" href="practice-quiz.html">Practice Quizzes</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link text-white" href="contact.html">Contact Us</a></li>
            </ul>

            <div className="d-none d-lg-flex align-items-center gap-2 me-3" id="authArea">
              <div id="guestButtons">
                <button className="btn btn-outline-light" onClick={() => window.openLogin?.()}>Login</button>
                <button className="btn btn-success" onClick={() => window.openSignup?.()}>Create Account</button>
              </div>
              <div id="userMenu" className="dropdown d-none">
                <a className="text-white fs-5 dropdown-toggle" href="#" role="button" aria-label="Account menu">
                  <i className="fa-solid fa-user-circle" />
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="profile.html">My Profile</a></li>
                  <li><a className="dropdown-item text-danger" href="#" onClick={() => window.logoutUser?.()}>Logout</a></li>
                </ul>
              </div>
            </div>

            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Open menu">
              <i className="fa-solid fa-bars text-white fs-3" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}

function MobileMenu() {
  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuTitle">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="mobileMenuTitle">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column">
          <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="notes.html">Notes</a></li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Online Test</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="live-quiz.html">Live Quizzes</a></li>
              <li><a className="dropdown-item" href="practice-quiz.html">Practice Quizzes</a></li>
            </ul>
          </li>
          <li className="nav-item"><a className="nav-link" href="contact.html">Contact Us</a></li>
        </ul>
        <hr />
        <div id="mobileGuest">
          <button className="btn btn-outline-primary w-100 mb-2" onClick={() => window.openLogin?.()}>Login</button>
          <button className="btn btn-success w-100" onClick={() => window.openSignup?.()}>Create Account</button>
        </div>
        <div id="mobileUserMenu" className="d-none">
          <a href="profile.html" className="btn btn-outline-dark w-100 mb-2"><i className="fa-solid fa-user" /> My Profile</a>
          <button className="btn btn-danger w-100" onClick={() => window.logoutUser?.()}><i className="fa-solid fa-right-from-bracket" /> Logout</button>
        </div>
      </div>
    </div>
  );
}

export function AuthModals() {
  return (
    <>
      <div id="loginModal" className="custom-modal">
        <form method="post" id="loginForm">
          <div className="head-form-1">
            <h4>Login</h4>
            <button type="button" className="btn-close" onClick={() => window.closeLoginModal?.()} aria-label="Close" />
          </div>
          <hr className="divider" />
          <div className="field">
            <div className="input-icon">
              <i className="fa-solid fa-envelope" />
              <input type="email" id="loginEmail" placeholder="Email Address" name="email" autoComplete="email" />
              <small className="error-msg" id="LoginEmailError" />
            </div>
            <div className="input-icon">
              <i className="fa-solid fa-lock" />
              <input type="password" id="loginPassword" placeholder="Password" name="password" autoComplete="current-password" />
              <i className="fa-solid fa-eye toggle-password-icon" data-target="loginPassword" role="button" tabIndex="0" aria-label="Toggle password visibility" />
              <small className="error-msg" id="passwordError" />
            </div>
            <div className="text-end mb-2">
              <a href="#" onClick={(event) => { event.preventDefault(); window.openForgotPassword?.(); }} className="text-decoration-none">Forgot Password?</a>
            </div>
            <button type="submit" className="submit">Login</button>
            <div className="switch-auth-text">
              <span>Don't have an account?</span>
              <a href="#" onClick={(event) => { event.preventDefault(); window.switchToSignup?.(); }}>Register First</a>
            </div>
          </div>
        </form>
      </div>

      <div id="signupModal" className="custom-modal">
        <form method="post" id="signupForm">
          <div className="head-form-2">
            <h4>Create Account</h4>
            <button type="button" className="btn-close" onClick={() => window.closeModal?.('signupModal')} aria-label="Close" />
          </div>
          <hr className="divider" />
          <div className="field">
            <div className="input-icon"><i className="fa-solid fa-user" /><input type="text" id="name" placeholder="Name" name="name" /><small className="error-msg" id="nameError" /></div>
            <div className="input-icon"><i className="fa-solid fa-phone" /><input type="tel" id="mobile" placeholder="Mobile" name="mobile" /><small className="error-msg" id="mobileError" /></div>
            <div className="input-icon"><i className="fa-solid fa-envelope" /><input type="email" id="signupEmail" placeholder="Email" name="email" autoComplete="email" /><small className="error-msg" id="SignUpEmailError" /></div>
            <div className="input-icon"><i className="fa-solid fa-lock" /><input type="password" id="signupPassword1" placeholder="Password" name="password" autoComplete="new-password" /><i className="fa-solid fa-eye toggle-password-icon" data-target="signupPassword1" role="button" tabIndex="0" aria-label="Toggle password visibility" /><small className="error-msg" id="passwordError1" /></div>
            <div className="input-icon"><i className="fa-solid fa-lock" /><input type="password" id="signupPassword2" placeholder="Confirm Password" name="confirmPassword" autoComplete="new-password" /><i className="fa-solid fa-eye toggle-password-icon" data-target="signupPassword2" role="button" tabIndex="0" aria-label="Toggle password visibility" /><small className="error-msg" id="passwordError2" /></div>
            <button type="submit" className="submit">Register</button>
          </div>
        </form>
      </div>

      <div id="otpModal" className="custom-modal">
        <form id="otpForm">
          <div className="head-form-2">
            <h4>Email Verification</h4>
            <button type="button" className="btn-close" onClick={() => window.closeAll?.()} aria-label="Close" />
          </div>
          <hr className="divider" />
          <div className="field">
            <div className="input-icon"><i className="fa-solid fa-key" /><input type="text" id="otp" placeholder="Enter OTP" maxLength="6" /><small className="error-msg" id="otpError" /></div>
            <button type="submit" className="submit">Verify OTP</button>
          </div>
        </form>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container footer-content">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="logo-box"><img src="/images/logo.png" alt="GT24 Logo" className="site-logo" /></div>
            <h3 className="footer-title">GetInTouch24</h3>
            <p className="footer-text">Learn smarter with interactive quizzes, study notes, exam preparation and latest updates for CCC, O Level, A Level and other NIELIT courses.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/people/Rajendra-Singh/61590400032871/?mibextid=ZbWKwL" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f" /></a>
              <a href="https://www.instagram.com/getintouch24official" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram" /></a>
              <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
              <a href="#" aria-label="Telegram"><i className="fa-brands fa-telegram" /></a>
              <a href="https://x.com/GetInTouch24" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter" /></a>
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="notes.html">Notes</a></li>
              <li><a href="practice-quiz.html">Practice Quiz</a></li>
              <li><a href="live-quiz.html">Live Quiz</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li><a href="PrivacyPolicy.html">Privacy Policy</a></li>
              <li><a href="TermsAndCondition.html">Terms &amp; Conditions</a></li>
            </ul>
          </div>
          <div className="col-12 col-lg-3">
            <h5 className="footer-heading">Contact Info</h5>
            <div className="footer-contact">
              <p><i className="fa-solid fa-envelope" /> getintouch24official@gmail.com</p>
              <p><i className="fa-solid fa-phone" /> +91 7860719997</p>
              <p><i className="fa-solid fa-location-dot" /> India</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 GetInTouch24 | All Rights Reserved</div>
    </footer>
  );
}
