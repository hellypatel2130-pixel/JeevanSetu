
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import FindDonors from "./FindDonors";
import DonorRegistration from "./DonorRegistration";
import BloodRequest from "./BloodRequest";
import ViewBloodRequests from "./ViewBloodRequests";
import "./App.css";

function Home() {
  const faqs = [
    {
      q: "Who can register as a blood donor?",
      a: "People who are interested in donating blood can register on JeevanSetu. Actual eligibility depends on medical screening by qualified blood-bank staff.",
    },
    {
      q: "How can I find a blood donor?",
      a: "Open Find Donors, select the required blood group, enter the city, and view matching sample profiles.",
    },
    {
      q: "Can I submit an emergency blood request?",
      a: "You can demonstrate the request form on this website. For a real emergency, immediately contact a hospital or licensed blood bank.",
    },
    {
      q: "Is JeevanSetu free to use?",
      a: "JeevanSetu is an academic project designed to demonstrate donor search, registration, and blood request features.",
    },
  ];

  return (
    <main className="creative-home">
      {/* Hero section */}
      <section className="jh-hero">
        <div className="jh-hero-content">
          <div className="jh-eyebrow">
            <span className="jh-pulse">♥</span>
            EVERY DROP COUNTS
          </div>

          <h1>
            Give blood.
            <br />
            <span>Share hope.</span>
            <br />
            Save lives.
          </h1>

          <p className="jh-hero-description">
            One small act of kindness can become someone's biggest
            reason to smile. JeevanSetu helps connect people looking
            for blood with potential donors.
          </p>

          <div className="jh-hero-actions">
            <NavLink to="/find-donors" className="jh-btn-primary">
              Find a Blood Donor <span>→</span>
            </NavLink>

            <NavLink to="/register-donor" className="jh-btn-secondary">
              ♥ Become a Donor
            </NavLink>
          </div>

          <div className="jh-trust-note">
            <span className="jh-trust-icon">✓</span>
            A simple platform built around the spirit of helping others
          </div>
        </div>

        <div className="jh-hero-visual">
          <div className="jh-orbit jh-orbit-one"></div>
          <div className="jh-orbit jh-orbit-two"></div>

          <div className="jh-floating-card jh-float-top">
            <span className="jh-mini-icon">♥</span>
            <div>
              <strong>Be someone's hero</strong>
              <small>Your kindness matters</small>
            </div>
          </div>

          <div className="jh-blood-art">
            <div className="jh-drop">♥</div>
            <div className="jh-art-caption">
              <span>ONE DONATION</span>
              <strong>Countless possibilities</strong>
            </div>
          </div>

          <div className="jh-floating-card jh-float-bottom">
            <div className="jh-mini-check">✓</div>
            <div>
              <strong>Every act matters</strong>
              <small>Be part of the change</small>
            </div>
          </div>

          <span className="jh-deco jh-deco-one">+</span>
          <span className="jh-deco jh-deco-two">♥</span>
          <span className="jh-deco jh-deco-three">✦</span>
        </div>

        <div className="jh-hero-bottom">
          <span>COMPASSION</span>
          <span className="jh-bottom-line"></span>
          <span>CONNECTION</span>
          <span className="jh-bottom-line"></span>
          <span>HOPE</span>
        </div>
      </section>

      {/* Quick action strip */}
      <section className="jh-quick-actions">
        <NavLink to="/find-donors" className="jh-quick-card">
          <div className="jh-quick-icon">⌕</div>
          <div>
            <h3>Find Donors</h3>
            <p>Search by blood group and city.</p>
          </div>
          <span className="jh-arrow">↗</span>
        </NavLink>

        <NavLink to="/register-donor" className="jh-quick-card">
          <div className="jh-quick-icon">♥</div>
          <div>
            <h3>Join as a Donor</h3>
            <p>Take your first step towards helping.</p>
          </div>
          <span className="jh-arrow">↗</span>
        </NavLink>

        <NavLink to="/blood-request" className="jh-quick-card">
          <div className="jh-quick-icon">＋</div>
          <div>
            <h3>Request Blood</h3>
            <p>Enter a patient's blood requirement.</p>
          </div>
          <span className="jh-arrow">↗</span>
        </NavLink>

        <NavLink to="/view-blood-requests" className="jh-quick-card">
          <div className="jh-quick-icon">♡</div>
          <div>
            <h3>View Blood Requests</h3>
            <p>Browse submitted blood requests.</p>
          </div>
          <span className="jh-arrow">↗</span>
        </NavLink>
      </section>

      {/* About section */}
      <section className="jh-about jh-section">
        <div className="jh-about-art">
          <div className="jh-about-circle">
            <span className="jh-about-heart">♥</span>
            <span className="jh-about-small">A LITTLE KINDNESS</span>
            <strong>
              Can mean
              <br />
              everything.
            </strong>
          </div>
          <span className="jh-about-sticker">Give the gift of life</span>
          <span className="jh-about-spark">✦</span>
        </div>

        <div className="jh-about-content">
          <span className="jh-section-label">OUR PURPOSE</span>
          <h2>
            Connecting hearts,
            <br />
            <span>one donation at a time.</span>
          </h2>
          <p>
            Finding a suitable blood donor can be stressful,
            especially when time matters. JeevanSetu is designed
            to make the search process easier through a simple,
            organized and accessible digital platform.
          </p>
          <p>
            Our goal is to encourage a culture of voluntary blood
            donation and demonstrate how technology can help people
            connect around an important human need.
          </p>

          <NavLink to="/register-donor" className="jh-text-link">
            Be a part of our mission <span>→</span>
          </NavLink>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="jh-features jh-section">
        <div className="jh-section-heading">
          <span className="jh-section-label">WHAT YOU CAN DO</span>
          <h2>
            Small actions. <span>Big impact.</span>
          </h2>
          <p>
            Everything starts with one simple step.
            Choose how you want to contribute.
          </p>
        </div>

        <div className="jh-feature-grid">
          <article className="jh-feature-card">
            <div className="jh-feature-icon">⌕</div>
            <span className="jh-feature-number">01 / SEARCH</span>
            <h3>Find a Donor</h3>
            <p>
              Explore sample donor profiles using blood group and
              location filters.
            </p>
            <NavLink to="/find-donors">
              Explore donors <span>→</span>
            </NavLink>
          </article>

          <article className="jh-feature-card jh-feature-highlight">
            <div className="jh-feature-icon">♥</div>
            <span className="jh-feature-number">02 / REGISTER</span>
            <h3>Become a Donor</h3>
            <p>
              Fill in your details and discover how donor registration
              works.
            </p>
            <NavLink to="/register-donor">
              Register now <span>→</span>
            </NavLink>
          </article>

          <article className="jh-feature-card">
            <div className="jh-feature-icon">＋</div>
            <span className="jh-feature-number">03 / REQUEST</span>
            <h3>Request Blood</h3>
            <p>
              Enter patient, hospital, blood group and urgency
              information in one place.
            </p>
            <NavLink to="/blood-request">
              Submit a request <span>→</span>
            </NavLink>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section className="jh-process">
        <div className="jh-section-heading">
          <span className="jh-section-label">SIMPLE BY DESIGN</span>
          <h2>
            How JeevanSetu <span>works.</span>
          </h2>
          <p>Three simple steps to explore the platform.</p>
        </div>

        <div className="jh-process-grid">
          <article className="jh-process-item">
            <div className="jh-process-number">01</div>
            <h3>Choose your need</h3>
            <p>
              Search for donors, register as a donor, or open the
              blood request form.
            </p>
          </article>

          <div className="jh-process-connector">→</div>

          <article className="jh-process-item">
            <div className="jh-process-number">02</div>
            <h3>Enter the details</h3>
            <p>
              Provide the relevant blood group, city and other
              required information.
            </p>
          </article>

          <div className="jh-process-connector">→</div>

          <article className="jh-process-item">
            <div className="jh-process-number">03</div>
            <h3>Explore the result</h3>
            <p>
              View sample profiles or receive form confirmation
              in this project demonstration.
            </p>
          </article>
        </div>
      </section>

      {/* Awareness banner */}
      <section className="jh-awareness jh-section">
        <div className="jh-awareness-symbol">♥</div>
        <div className="jh-awareness-copy">
          <span>THE POWER OF DONATION</span>
          <h2>
            Blood cannot be manufactured.
            <br />
            It comes from people like you.
          </h2>
          <p>
            Voluntary blood donation plays an important role in
            supporting patients who need transfusions.
          </p>
        </div>
        <NavLink to="/register-donor" className="jh-awareness-button">
          Take the First Step →
        </NavLink>
      </section>

      {/* FAQ */}
      <section className="jh-faq jh-section">
        <div className="jh-section-heading">
          <span className="jh-section-label">GOT QUESTIONS?</span>
          <h2>
            Frequently asked <span>questions.</span>
          </h2>
          <p>Some helpful information about using JeevanSetu.</p>
        </div>

        <div className="jh-faq-list">
          {faqs.map((faq, index) => (
            <details className="jh-faq-item" key={faq.q}>
              <summary>
                <span className="jh-faq-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{faq.q}</span>
                <span className="jh-faq-plus">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="jh-final-cta">
        <span className="jh-final-heart">♥</span>
        <span className="jh-section-label">YOUR NEXT STEP STARTS HERE</span>
        <h2>
          Someone's hope
          <br />
          could start with <span>you.</span>
        </h2>
        <p>
          Explore the platform, learn about donor registration,
          and help spread awareness about blood donation.
        </p>
        <div className="jh-hero-actions">
          <NavLink to="/register-donor" className="jh-btn-white">
            Become a Donor →
          </NavLink>
          <NavLink to="/find-donors" className="jh-btn-outline-white">
            Explore Donors
          </NavLink>
        </div>
      </section>

      <p className="jh-disclaimer">
        JeevanSetu is an academic project demonstration. Donor profiles
        are fictional sample data, and form submissions are not sent
        to real donors. For actual blood requirements, contact a
        licensed blood bank or hospital.
      </p>
    </main>
  );
}

function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        <span className="brand-icon">♥</span>
        <span>
          JeevanSetu
          <small>CONNECTING LIVES</small>
        </span>
      </NavLink>

      <nav className="site-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/find-donors">
          Find Donors
        </NavLink>
        <NavLink to="/register-donor">
          Become a Donor
        </NavLink>
        <NavLink to="/blood-request">
          Request Blood
        </NavLink>
        <NavLink to="/view-blood-requests">
          View Requests
        </NavLink>
      </nav>
    </header>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Sorry, this page could not be found.</p>
      <NavLink to="/">Back to Home</NavLink>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/find-donors"
          element={<FindDonors />}
        />

        <Route
          path="/register-donor"
          element={<DonorRegistration />}
        />

        <Route
          path="/blood-request"
          element={<BloodRequest />}
        />

        <Route
          path="/view-blood-requests"
          element={<ViewBloodRequests />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="site-footer">
        <p>♥ JeevanSetu — Connecting Lives Through Blood Donation</p>
        <small>Student project · Demonstration website</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;
