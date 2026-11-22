import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { GeoAltFill, ClockHistory, BagPlusFill, CheckCircleFill, PersonBadgeFill, ShieldLockFill, EnvelopeFill, TelephoneFill } from "react-bootstrap-icons";
import { useAppStore } from "../store/useAppStore";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

export function AboutPage() {
  const team = [
    {
      name: "Ilczar June D. Madredano",
      role: "Backend & Front End Developer",
      bio: "Architected the full-stack application, real-time ingredient pricing engine, live plate customizer, state persistence, and responsive routing.",
    },
    {
      name: "Monica Sophia P. Arabaca",
      role: "Design & Data Analyst",
      bio: "Led the minimalist Carbon Black, Daisy White, and Mossy Green visual system, nutrition data research, and healthy menu curation.",
    },
  ];

  return (
    <Container fluid className="px-4 px-xl-5 py-5">
      <Row className="g-5 align-items-start">
        <Col lg={6}>
          <div className="text-uppercase small md-moss-accent fw-semibold mb-2" style={{ letterSpacing: "0.2em" }}>
            OUR STORY &amp; INSPIRATION
          </div>
          <h1 className="md-serif-display display-4 mb-3">
            Crafted for <span className="md-moss-accent fst-italic">clarity</span> on every plate.
          </h1>
          <p className="mb-4" style={{ color: "var(--md-text-muted)", lineHeight: 1.75 }}>
            Moss &amp; Daisy began at the University of San Agustin in Iloilo City when we realized how difficult it was for customers to see the real physical ingredients, exact nutrition, and fair price breakdown of their food delivery orders. Inspired by Iloilo&apos;s culinary heritage—from La Paz Batchoy to char-grilled Chicken Inasal and fresh Laswa vegetables—we created a minimalist platform where every dish can be tossed apart on a live virtual plate, customized ingredient by ingredient with real-time PHP pricing, and delivered fresh to any barangay.
          </p>
          <Row className="g-3">
            <Col sm={6}>
              <div className="p-4 rounded-3 border h-100" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
                <div className="fw-bold md-moss-accent small text-uppercase mb-1">Our Mission</div>
                <div className="small" style={{ color: "var(--md-text-muted)" }}>
                  To make every food order transparent—showing what is on the plate, what is in it, and how each ingredient shapes nutrition and price.
                </div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="p-4 rounded-3 border h-100" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
                <div className="fw-bold md-moss-accent small text-uppercase mb-1">Our Vision</div>
                <div className="small" style={{ color: "var(--md-text-muted)" }}>
                  A Philippines where anyone can order nourishing, customizable local meals with complete confidence.
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={6}>
          <div className="text-uppercase small md-moss-accent fw-semibold mb-2" style={{ letterSpacing: "0.2em" }}>
            <PersonBadgeFill className="me-2" />MEET THE OWNERS (GROUP MEMBERS)
          </div>
          <h2 className="md-serif-display h2 mb-4">The Team Behind Moss &amp; Daisy</h2>
          <Row className="g-4">
            {team.map((m) => (
              <Col md={6} key={m.name}>
                <div className="md-surface-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="md-condensed-display fs-3 mb-1">{m.name}</div>
                    <div className="small md-moss-accent fw-semibold mb-3">{m.role}</div>
                    <p className="small mb-0" style={{ color: "var(--md-text-muted)", lineHeight: 1.65 }}>{m.bio}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export function ContactPage() {
  const { userProfile } = useAppStore();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState("09458269961");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  };

  return (
    <Container fluid className="px-4 px-xl-5 py-5">
      <Row className="g-5 align-items-center">
        <Col lg={5}>
          <div className="text-uppercase small md-moss-accent fw-semibold mb-2" style={{ letterSpacing: "0.2em" }}>
            GET IN TOUCH
          </div>
          <h1 className="md-serif-display display-5 mb-3">Contact Us</h1>
          <p className="small mb-4" style={{ color: "var(--md-text-muted)", lineHeight: 1.7 }}>
            Have questions about ingredients, nutrition, allergens, or deliveries? Reach our team directly using the contact details or form.
          </p>
          <div className="d-flex flex-column gap-3">
            <div className="p-3 rounded-3 border" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
              <div className="small fw-bold md-moss-accent"><EnvelopeFill className="me-2" />Contact Email</div>
              <a href="mailto:ilczar9@gmail.com" className="text-decoration-none fw-semibold" style={{ color: "var(--md-text)" }}>
                ilczar9@gmail.com
              </a>
            </div>
            <div className="p-3 rounded-3 border" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
              <div className="small fw-bold md-moss-accent"><TelephoneFill className="me-2" />Phone Number</div>
              <a href="tel:09458269961" className="text-decoration-none fw-semibold" style={{ color: "var(--md-text)" }}>
                09458269961
              </a>
            </div>
            <div className="p-3 rounded-3 border" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
              <div className="small fw-bold md-moss-accent"><GeoAltFill className="me-2" />Location</div>
              <div className="small">Gen. Luna St., City Proper, Iloilo City 5000, Philippines</div>
            </div>
          </div>
        </Col>

        <Col lg={7}>
          <div className="md-surface-card p-4 p-xl-5 text-center">
            <h2 className="md-instant-heading h4 mb-4">SEND A MESSAGE</h2>
            {sent && (
              <div className="p-2 mb-3 rounded small" style={{ backgroundColor: "rgba(143,179,107,0.18)", border: "1px solid var(--md-moss)" }}>
                <CheckCircleFill className="md-moss-accent me-1" /> Message sent to ilczar9@gmail.com!
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Control className="md-underline-input mb-3" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} required />
              <Form.Control type="email" className="md-underline-input mb-3" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Control className="md-underline-input mb-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Form.Control as="textarea" rows={3} className="md-underline-input mb-4" placeholder="Message*" value={message} onChange={(e) => setMessage(e.target.value)} required />
              <button type="submit" className="md-btn-ghost px-5">SEND MESSAGE</button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export function ProfileHistoryPage() {
  const { userProfile, updateProfile, addresses, deliveryHistory, addToCart, setCartOpen } = useAppStore();
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [savedMsg, setSavedMsg] = useState(false);

  return (
    <Container fluid className="px-4 px-xl-5 py-4">
      <Row className="g-4">
        <Col lg={4}>
          <div className="md-surface-card p-4">
            <h1 className="md-condensed-display h3 mb-3">USER PROFILE</h1>
            {savedMsg && <Badge bg="success" className="mb-2">Profile Saved</Badge>}
            <Form onSubmit={(e) => { e.preventDefault(); updateProfile({ name, phone }); setSavedMsg(true); }}>
              <Form.Group className="mb-2"><Form.Label className="small">Full Name</Form.Label><Form.Control size="sm" value={name} onChange={(e) => setName(e.target.value)} /></Form.Group>
              <Form.Group className="mb-2"><Form.Label className="small">PH Mobile Number</Form.Label><Form.Control size="sm" value={phone} onChange={(e) => setPhone(e.target.value)} /></Form.Group>
              <Form.Group className="mb-3"><Form.Label className="small">Email</Form.Label><Form.Control size="sm" value={userProfile.email} readOnly /></Form.Group>
              <button type="submit" className="md-btn-pill py-1 px-3 small">Save Changes</button>
            </Form>
            <hr />
            <div className="fw-bold small text-uppercase mb-2">Saved Delivery Addresses</div>
            {addresses.map((a) => (
              <div key={a.id} className="small p-2 rounded mb-2" style={{ backgroundColor: "var(--md-surface-2)" }}>
                <strong>{a.label}</strong>: {a.street}, Brgy. {a.barangay}, {a.city}
              </div>
            ))}
          </div>
        </Col>
        <Col lg={8}>
          <div className="md-surface-card p-4">
            <h2 className="md-condensed-display h3 mb-3"><ClockHistory className="md-moss-accent me-2" />DELIVERY HISTORY ({deliveryHistory.length})</h2>
            <div className="d-flex flex-column gap-3">
              {deliveryHistory.map((rec) => (
                <div key={rec.orderId} className="p-3 rounded-3 border" style={{ backgroundColor: "var(--md-surface-2)", borderColor: "var(--md-line)" }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div><strong className="md-moss-accent">{rec.orderId}</strong> &bull; <span className="small">{rec.createdAt}</span></div>
                    <Badge bg={rec.status === "Delivered" ? "success" : "warning"}>{rec.status}</Badge>
                  </div>
                  <div className="small mb-2" style={{ color: "var(--md-text-muted)" }}>
                    <GeoAltFill className="me-1" />Delivered to: {rec.address.street}, Brgy. {rec.address.barangay}, {rec.address.city}
                  </div>
                  {rec.items.map((item) => (
                    <div key={item.lineId} className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: "var(--md-line)" }}>
                      <div className="d-flex align-items-center gap-2">
                        <SmartAssetImage folderPath={item.folderPath} alt={item.dishName} style={{ width: 42, height: 42, borderRadius: 8 }} />
                        <div>
                          <div className="fw-bold small">{item.dishName} (x{item.quantity})</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--md-text-muted)" }}>{item.customSummary} &bull; &#8369;{item.unitPricePhp}</div>
                        </div>
                      </div>
                      <button type="button" className="md-btn-pill py-1 px-3 small"
                        onClick={() => { addToCart({ dishId: item.dishId, dishName: item.dishName, folderPath: item.folderPath, vessel: item.vessel, selectedIngredientIds: item.selectedIngredientIds, customSummary: item.customSummary, unitPricePhp: item.unitPricePhp, kcal: item.kcal, quantity: 1 }); setCartOpen(true); }}>
                        <BagPlusFill /> Reorder
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export function SettingsPage() {
  const { theme, toggleTheme, userProfile, updateProfile } = useAppStore();
  const allTags = ["High Protein", "Under 500 kcal", "Heart-Healthy", "Plant-Based", "Low Sugar"];
  return (
    <Container fluid className="px-4 px-xl-5 py-4">
      <div className="md-surface-card p-4">
        <h1 className="md-condensed-display h3 mb-3">SETTINGS &amp; PREFERENCES</h1>
        <div className="mb-4">
          <div className="fw-bold mb-2">1. Appearance</div>
          <button type="button" className="md-btn-pill" onClick={toggleTheme}>Theme: {theme.toUpperCase()} (Click to Switch)</button>
        </div>
        <div className="mb-4">
          <div className="fw-bold mb-2">2. Healthy Recommendation Goals</div>
          <div className="d-flex flex-wrap gap-2">
            {allTags.map((t) => {
              const active = userProfile.dietaryPrefs.includes(t);
              return (
                <button key={t} type="button"
                  onClick={() => updateProfile({ dietaryPrefs: active ? userProfile.dietaryPrefs.filter((x) => x !== t) : [...userProfile.dietaryPrefs, t] })}
                  className={active ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}>{t}</button>
              );
            })}
          </div>
        </div>
        <div><ShieldLockFill className="md-moss-accent me-1" /><strong>3. Privacy (RA 10173):</strong> Contact ilczar9@gmail.com for data requests.</div>
      </div>
    </Container>
  );
}

export function AuthPage({ mode }: { mode: "sign-in" | "sign-up" }) {
  const navigate = useNavigate();
  const { setSessionMode, updateProfile, addAddress } = useAppStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("09458269961");
  const [region, setRegion] = useState("Region VI (Western Visayas)");
  const [city, setCity] = useState("Iloilo City");
  const [barangay, setBarangay] = useState("San Agustin");
  const [street, setStreet] = useState("");

  return (
    <Container className="py-5" style={{ maxWidth: 520 }}>
      <div className="md-surface-card p-4">
        <h1 className="md-condensed-display h3 mb-3">{mode === "sign-in" ? "SIGN IN" : `CREATE ACCOUNT (STEP ${step} OF 2)`}</h1>
        <Form onSubmit={(e) => {
          e.preventDefault();
          if (mode === "sign-up" && step === 1) { setStep(2); return; }
          if (name.trim()) updateProfile({ name, email, phone });
          if (street.trim()) addAddress({ label: `${barangay}, ${city}`, region, city, barangay, street, isDefault: true });
          setSessionMode("user");
          navigate("/home");
        }}>
          {mode === "sign-up" && step === 1 && (
            <>
              <Form.Group className="mb-2"><Form.Label className="small">Full Name*</Form.Label><Form.Control required value={name} onChange={(e) => setName(e.target.value)} /></Form.Group>
              <Form.Group className="mb-2"><Form.Label className="small">PH Contact Number*</Form.Label><Form.Control required value={phone} onChange={(e) => setPhone(e.target.value)} /></Form.Group>
            </>
          )}
          {step === 1 && (
            <>
              <Form.Group className="mb-2"><Form.Label className="small">Email*</Form.Label><Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></Form.Group>
              <Form.Group className="mb-3"><Form.Label className="small">Password*</Form.Label><Form.Control type="password" required minLength={8} /></Form.Group>
            </>
          )}
          {mode === "sign-up" && step === 2 && (
            <>
              <Form.Group className="mb-2"><Form.Label className="small">Region</Form.Label><Form.Control value={region} onChange={(e) => setRegion(e.target.value)} /></Form.Group>
              <Form.Group className="mb-2"><Form.Label className="small">City / Municipality</Form.Label><Form.Control value={city} onChange={(e) => setCity(e.target.value)} /></Form.Group>
              <Form.Group className="mb-2"><Form.Label className="small">Barangay*</Form.Label><Form.Control required value={barangay} onChange={(e) => setBarangay(e.target.value)} /></Form.Group>
              <Form.Group className="mb-3"><Form.Label className="small">Street / House No.*</Form.Label><Form.Control required value={street} onChange={(e) => setStreet(e.target.value)} /></Form.Group>
            </>
          )}
          <button type="submit" className="md-btn-pill w-100 justify-content-center">
            {mode === "sign-in" ? "Sign In" : step === 1 ? "Next: Delivery Location" : "Confirm & Create Account"}
          </button>
        </Form>
      </div>
    </Container>
  );
}