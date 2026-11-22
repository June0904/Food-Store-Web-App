import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { ArrowRight, ShieldCheck, HeartPulse, Stars, Truck } from "react-bootstrap-icons";
import { useAppStore } from "../store/useAppStore";

export function LandingPage() {
  const navigate = useNavigate();
  const { consentAccepted, acceptConsent, setSessionMode } = useAppStore();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [authChoiceOpen, setAuthChoiceOpen] = useState(false);
  const [declineNote, setDeclineNote] = useState(false);

  const handleGetStarted = () => {
    setDeclineNote(false);
    if (consentAccepted) {
      setAuthChoiceOpen(true);
    } else {
      setPrivacyOpen(true);
    }
  };

  const handleAgreePrivacy = () => {
    acceptConsent();
    setPrivacyOpen(false);
    setAuthChoiceOpen(true);
  };

  return (
    <Container className="py-4">
      <div className="md-wordmark-stage mb-5">
        <div className="md-giant-wordmark">MOSS &amp; DAISY</div>
        <Row className="align-items-center g-4 mt-1">
          <Col lg={8}>
            <div className="text-uppercase small mb-2 md-moss-accent fw-semibold" style={{ letterSpacing: "0.18em" }}>
              PHILIPPINE HEALTHY &amp; CUSTOMIZABLE FOOD DELIVERY
            </div>
            <h1 className="md-serif-display display-3 mb-3">
              Know what is on your{" "}
              <span className="md-moss-accent fst-italic">plate</span>.
            </h1>
            <p className="mb-4" style={{ color: "var(--md-text-muted)", maxWidth: "58ch" }}>
              Welcome to Moss &amp; Daisy. Every dish can be tossed apart to reveal its real physical ingredients and nutrition. Watch your plate or bento box update live on screen and see your exact PHP price recalculate with every edit.
            </p>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <button type="button" className="md-btn-pill fs-6 px-4 py-2" onClick={handleGetStarted}>
                Get Started <ArrowRight />
              </button>
              <button type="button" className="md-btn-ghost" onClick={() => navigate("/menu")}>
                Preview Menu
              </button>
            </div>
            {declineNote && (
              <div className="small text-warning mt-3">
                Please agree to the Privacy Notice when ready so we can save your custom plate and delivery preferences.
              </div>
            )}
          </Col>
          <Col lg={4} className="d-flex justify-content-center">
            <div className="md-stamp-badge">
              <strong className="md-moss-accent fs-5">100%</strong>
              <span>Transparent</span>
              <span style={{ fontSize: "0.6rem", color: "var(--md-text-muted)" }}>Live Plate &amp; PHP</span>
            </div>
          </Col>
        </Row>
      </div>

      {/* Stats Strip: Users, Average Rating, Orders Per Day */}
      <Row className="g-3 mb-5 text-center">
        {[
          { val: "12,400+", label: "ACTIVE HEALTHY USERS", sub: "Across Iloilo & the Philippines" },
          { val: "4.8 / 5.0", label: "AVERAGE DISH RATING", sub: "Verified community reviews" },
          { val: "1,850+", label: "ORDERS DELIVERED / DAY", sub: "Freshly prepared to order" },
        ].map((st) => (
          <Col md={4} key={st.label}>
            <div className="md-surface-card p-4 h-100">
              <div className="md-condensed-display display-5 md-moss-accent">{st.val}</div>
              <div className="fw-bold small mt-1">{st.label}</div>
              <div className="small" style={{ color: "var(--md-text-muted)" }}>{st.sub}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* How It Works */}
      <div className="text-center mb-4">
        <h2 className="md-instant-heading h3">HOW MOSS &amp; DAISY WORKS</h2>
      </div>
      <Row className="g-4">
        {[
          { icon: <HeartPulse />, title: "1. Pick a Healthy or Classic Dish", desc: "Browse our researched Filipino menu with dietitian-backed Healthy Picks." },
          { icon: <Stars />, title: "2. Edit Your Live Plate & Price", desc: "Toggle physical ingredients on or off, watch the plate/box update, and see live PHP & calorie math." },
          { icon: <Truck />, title: "3. Confirm Address & Track History", desc: "Verify your barangay address before dispatch and reorder favorites in 1 tap from Home." },
        ].map((step) => (
          <Col md={4} key={step.title}>
            <div className="md-surface-card p-4 h-100">
              <div className="md-moss-accent fs-2 mb-2">{step.icon}</div>
              <h3 className="h5">{step.title}</h3>
              <p className="small mb-0" style={{ color: "var(--md-text-muted)" }}>{step.desc}</p>
            </div>
          </Col>
        ))}
      </Row>

      {/* Privacy Notice Modal (RA 10173) */}
      <Modal show={privacyOpen} backdrop="static" centered>
        <Modal.Header style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <Modal.Title className="md-condensed-display fs-4"><ShieldCheck className="md-moss-accent me-2" />PRIVACY NOTICE (RA 10173)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <p className="small">
            In compliance with the <strong>Philippine Data Privacy Act of 2012 (RA 10173)</strong>, Moss &amp; Daisy collects only the information needed to customize your meals and deliver to your barangay (name, contact number, delivery address, and order history).
          </p>
          <p className="small mb-0" style={{ color: "var(--md-text-muted)" }}>
            You may inspect, export, or clear your saved data anytime in Settings.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--md-surface)" }}>
          <button type="button" className="md-btn-ghost" onClick={() => { setPrivacyOpen(false); setDeclineNote(true); }}>Decline</button>
          <button type="button" className="md-btn-pill" onClick={handleAgreePrivacy}>I Agree &amp; Continue</button>
        </Modal.Footer>
      </Modal>

      {/* New Device Auth Choice Modal */}
      <Modal show={authChoiceOpen} onHide={() => setAuthChoiceOpen(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <Modal.Title className="md-condensed-display fs-4">WELCOME TO MOSS &amp; DAISY</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <p className="small" style={{ color: "var(--md-text-muted)" }}>
            Choose how you would like to continue on this device:
          </p>
          <div className="d-grid gap-2">
            <button type="button" className="md-btn-pill justify-content-center" onClick={() => { setAuthChoiceOpen(false); navigate("/auth/sign-up"); }}>
              Create an Account (Save Addresses &amp; History)
            </button>
            <button type="button" className="md-btn-ghost" onClick={() => { setAuthChoiceOpen(false); navigate("/auth/sign-in"); }}>
              Sign In to Existing Account
            </button>
            <button type="button" className="md-btn-ghost" onClick={() => { setSessionMode("guest"); setAuthChoiceOpen(false); navigate("/home"); }}>
              Continue as Guest
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}