import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { GeoAltFill, ClockHistory, BagPlusFill, CheckCircleFill, PersonBadgeFill, ShieldLockFill } from "react-bootstrap-icons";
import { useAppStore } from "../store/useAppStore";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

export function AboutPage() {
  const team = [
    { name: "June (Project Lead & Full-Stack)", role: "Lead Developer & System Architect", bio: "Designed the live plate customizer, ingredient pricing engine, and responsive architecture." },
    { name: "Group Member 2", role: "UI/UX & Brand Designer", bio: "Crafted the Carbon Black, Daisy White, and Mossy Green visual identity." },
    { name: "Group Member 3", role: "Nutrition & Menu Researcher", bio: "Curated the 18 healthy Filipino dishes and per-ingredient PHP pricing." },
    { name: "Group Member 4", role: "QA & Accessibility Specialist", bio: "Verified IT314 rubric compliance, mobile usability, and keyboard navigation." },
  ];

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1 className="md-instant-heading h2">ABOUT MOSS &amp; DAISY</h1>
      </div>
      <div className="md-surface-card p-4 mb-4">
        <h2 className="md-serif-display h3 md-moss-accent mb-2">Our Story &amp; Inspiration</h2>
        <p className="small" style={{ color: "var(--md-text-muted)" }}>
          Moss &amp; Daisy began at the University of San Agustin in Iloilo City when our group noticed how hard it was for students and families to know the exact ingredients, calories, and price breakdown of food delivery orders. Inspired by Iloilo&apos;s rich culinary heritage—from La Paz Batchoy to grilled Chicken Inasal and fresh Laswa vegetables—we built an online storefront where every dish can be tossed apart on a live virtual plate, customized ingredient by ingredient with real-time PHP pricing, and delivered fresh to any barangay.
        </p>
        <Row className="g-3 mt-2">
          <Col md={6}>
            <div className="p-3 rounded-3" style={{ backgroundColor: "var(--md-surface-2)" }}>
              <div className="fw-bold md-moss-accent small text-uppercase">Our Mission</div>
              <div className="small mt-1">To make every food order transparent—showing what is on the plate, what is in it, and how each ingredient shapes nutrition and price.</div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 rounded-3" style={{ backgroundColor: "var(--md-surface-2)" }}>
              <div className="fw-bold md-moss-accent small text-uppercase">Our Vision</div>
              <div className="small mt-1">A Philippines where anyone can order nourishing, customizable local meals with complete confidence.</div>
            </div>
          </Col>
        </Row>
      </div>

      <h2 className="md-condensed-display h3 mb-3"><PersonBadgeFill className="md-moss-accent me-2" />MEET THE OWNERS (GROUP MEMBERS)</h2>
      <Row className="g-3">
        {team.map((m) => (
          <Col sm={6} lg={3} key={m.name}>
            <div className="md-surface-card p-3 h-100">
              <div className="fw-bold">{m.name}</div>
              <div className="small md-moss-accent fw-semibold mb-2">{m.role}</div>
              <p className="small mb-0" style={{ color: "var(--md-text-muted)" }}>{m.bio}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export function ContactPage() {
  const { userProfile } = useAppStore();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={5}>
          <div className="md-surface-card p-4 h-100">
            <h1 className="md-condensed-display h3 mb-3">STORE LOCATION &amp; CONTACT</h1>
            <p className="small" style={{ color: "var(--md-text-muted)" }}>
              Have questions about ingredients, allergens, or group catering? Reach our Iloilo City kitchen hub below.
            </p>
            <div className="small mb-2"><GeoAltFill className="md-moss-accent me-2" /><strong>Address:</strong> Gen. Luna St., City Proper, Iloilo City 5000, Philippines</div>
            <div className="small mb-2"><strong>Phone:</strong> <a href="tel:+639175550199" className="md-moss-accent">+63 917 555 0199</a></div>
            <div className="small mb-2"><strong>Email:</strong> <a href="mailto:hello@mossanddaisy.ph" className="md-moss-accent">hello@mossanddaisy.ph</a></div>
            <div className="small"><strong>Hours:</strong> Daily, 7:00 AM &ndash; 10:00 PM</div>
          </div>
        </Col>
        <Col md={7}>
          {/* INSTANT Photo Studio Minimalist Underline Contact Form */}
          <div className="md-surface-card p-4 text-center">
            <h2 className="md-instant-heading h4 mb-3">CONTACT US</h2>
            {sent && (
              <div className="p-2 mb-3 rounded small" style={{ backgroundColor: "rgba(143,179,107,0.18)", border: "1px solid var(--md-moss)" }}>
                <CheckCircleFill className="md-moss-accent me-1" /> Thank you! Your message has been sent to our team inbox.
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Control className="md-underline-input mb-3" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} required />
              <Form.Control type="email" className="md-underline-input mb-3" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Control className="md-underline-input mb-3" placeholder="Phone (+63)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Form.Control as="textarea" rows={3} className="md-underline-input mb-4" placeholder="Message*" value={message} onChange={(e) => setMessage(e.target.value)} required />
              <button type="submit" className="md-btn-ghost px-5">SEND</button>
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
    setSavedMsg(true);
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col lg={4}>
          <div className="md-surface-card p-4">
            <h1 className="md-condensed-display h3 mb-3">USER PROFILE</h1>
            {savedMsg && <Badge bg="success" className="mb-2">Profile Updated!</Badge>}
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-2">
                <Form.Label className="small">Full Name</Form.Label>
                <Form.Control size="sm" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="small">PH Mobile Number</Form.Label>
                <Form.Control size="sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small">Email</Form.Label>
                <Form.Control size="sm" value={userProfile.email} readOnly />
              </Form.Group>
              <button type="submit" className="md-btn-pill py-1 px-3 small">Save Profile</button>
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
            <h2 className="md-condensed-display h3 mb-3">
              <ClockHistory className="md-moss-accent me-2" />DELIVERY HISTORY ({deliveryHistory.length})
            </h2>
            <div className="d-flex flex-column gap-3">
              {deliveryHistory.map((rec) => (
                <div key={rec.orderId} className="p-3 rounded-3 border" style={{ backgroundColor: "var(--md-surface-2)", borderColor: "var(--md-line)" }}>
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <div>
                      <strong className="md-moss-accent">{rec.orderId}</strong> &bull; <span className="small">{rec.createdAt}</span>
                    </div>
                    <Badge bg={rec.status === "Delivered" ? "success" : "warning"}>{rec.status}</Badge>
                  </div>
                  <div className="small mb-2" style={{ color: "var(--md-text-muted)" }}>
                    <GeoAltFill className="me-1" />Delivered to: {rec.address.street}, Brgy. {rec.address.barangay}, {rec.address.city}
                  </div>
                  {rec.items.map((item) => (
                    <div key={item.lineId} className="d-flex align-items-center justify-content-between gap-2 pt-2 border-top" style={{ borderColor: "var(--md-line)" }}>
                      <div className="d-flex align-items-center gap-2">
                        <SmartAssetImage folderPath={item.folderPath} alt={item.dishName} style={{ width: 42, height: 42, borderRadius: 8 }} />
                        <div>
                          <div className="fw-bold small">{item.dishName} (x{item.quantity})</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--md-text-muted)" }}>{item.customSummary} &bull; &#8369;{item.unitPricePhp}</div>
                        </div>
                      </div>
                      <button type="button" className="md-btn-pill py-1 px-3 small"
                        onClick={() => {
                          addToCart({
                            dishId: item.dishId, dishName: item.dishName, folderPath: item.folderPath,
                            vessel: item.vessel, selectedIngredientIds: item.selectedIngredientIds,
                            customSummary: item.customSummary, unitPricePhp: item.unitPricePhp,
                            kcal: item.kcal, quantity: 1,
                          });
                          setCartOpen(true);
                        }}>
                        <BagPlusFill /> Reorder
                      </button>
                    </div>
                  ))}
                  <div className="text-end fw-bold small mt-2">Total Paid: &#8369;{rec.totalPaidPhp}</div>
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

  const togglePref = (tag: string) => {
    const exists = userProfile.dietaryPrefs.includes(tag);
    const next = exists ? userProfile.dietaryPrefs.filter((t) => t !== tag) : [...userProfile.dietaryPrefs, tag];
    updateProfile({ dietaryPrefs: next });
  };

  return (
    <Container className="py-4">
      <div className="md-surface-card p-4">
        <h1 className="md-condensed-display h3 mb-3">SETTINGS &amp; PREFERENCES</h1>
        <div className="mb-4">
          <div className="fw-bold mb-2">1. Appearance</div>
          <button type="button" className="md-btn-pill" onClick={toggleTheme}>
            Current Theme: {theme.toUpperCase()} (Click to Switch)
          </button>
        </div>
        <div className="mb-4">
          <div className="fw-bold mb-2">2. Dietary &amp; Healthy Recommendation Goals</div>
          <div className="d-flex flex-wrap gap-2">
            {allTags.map((t) => {
              const active = userProfile.dietaryPrefs.includes(t);
              return (
                <button key={t} type="button" onClick={() => togglePref(t)}
                  className={active ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}>
                  {t}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="fw-bold mb-1"><ShieldLockFill className="md-moss-accent me-1" />3. Privacy &amp; Data Rights (RA 10173)</div>
          <p className="small mb-2" style={{ color: "var(--md-text-muted)" }}>
            Your custom plate history and addresses are stored locally on your device.
          </p>
        </div>
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
  const [phone, setPhone] = useState("+639");
  const [region, setRegion] = useState("Region VI (Western Visayas)");
  const [city, setCity] = useState("Iloilo City");
  const [barangay, setBarangay] = useState("San Agustin");
  const [street, setStreet] = useState("");

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "sign-up" && step === 1) {
      setStep(2);
      return;
    }
    if (name.trim()) updateProfile({ name, email, phone });
    if (street.trim()) {
      addAddress({ label: `${barangay}, ${city}`, region, city, barangay, street, isDefault: true });
    }
    setSessionMode("user");
    navigate("/home");
  };

  return (
    <Container className="py-5" style={{ maxWidth: 520 }}>
      <div className="md-surface-card p-4">
        <h1 className="md-condensed-display h3 mb-3">
          {mode === "sign-in" ? "SIGN IN" : `CREATE ACCOUNT (STEP ${step} OF 2)`}
        </h1>
        <Form onSubmit={handleFinish}>
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
              <Form.Group className="mb-3"><Form.Label className="small">Street / House No. / Landmark*</Form.Label><Form.Control required value={street} onChange={(e) => setStreet(e.target.value)} /></Form.Group>
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