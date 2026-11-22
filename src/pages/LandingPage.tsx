import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Form, Badge } from "react-bootstrap";
import { ShieldCheck, PersonPlusFill, BoxArrowInRight, PersonBadge, GeoAltFill, Stars, VolumeUpFill, VolumeMuteFill, CheckCircleFill, Fire } from "react-bootstrap-icons";
import { MENU_ITEMS, calculateDishTotals } from "../data/menuData";
import { useAppStore } from "../store/useAppStore";
import { StarRating } from "../components/ui/StarRating";
import { FoodPresentationStage } from "../components/ui/FoodPresentationStage";
import { sfx } from "../lib/soundEffects";

export function LandingPage() {
  const navigate = useNavigate();
  const { acceptPrivacy, privacyAccepted, setSessionMode, setDeviceLocation } = useAppStore();

  const showcaseDishes = MENU_ITEMS.slice(0, 4);
  const [selectedDishIdx, setSelectedDishIdx] = useState(0);
  const [isDismantled, setIsDismantled] = useState(false);
  const [soundOn, setSoundOn] = useState(sfx.isEnabled());

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAuthChoice, setShowAuthChoice] = useState(false);
  const [consentChecked, setConsentChecked] = useState(true);
  const [gpsChecked, setGpsChecked] = useState(true);

  const activeDish = showcaseDishes[selectedDishIdx] ?? MENU_ITEMS[0];
  const totals = calculateDishTotals(activeDish, activeDish.defaultIngredientIds, 1);

  const handleGetStarted = () => {
    sfx.whoosh();
    if (privacyAccepted) {
      setShowAuthChoice(true);
    } else {
      setShowPrivacy(true);
    }
  };

  const handleConfirmPrivacy = () => {
    sfx.success();
    acceptPrivacy();
    if (gpsChecked) {
      setDeviceLocation(true, { lat: 10.7202, lng: 122.5621 });
    }
    setShowPrivacy(false);
    setShowAuthChoice(true);
  };

  const enterAs = (mode: "guest" | "user", target: string) => {
    sfx.success();
    setSessionMode(mode);
    setShowAuthChoice(false);
    navigate(target);
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between position-relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 18% 22%, rgba(79, 111, 55, 0.24) 0%, transparent 45%), radial-gradient(circle at 82% 75%, rgba(143, 179, 107, 0.18) 0%, transparent 50%), var(--md-canvas)",
      }}>
      <Container fluid className="px-4 px-xl-5 py-4 my-auto position-relative" style={{ zIndex: 2 }}>
        {/* Minimalist Top Crest (No Navbar / No Header) */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4 pb-2"
          style={{ borderBottom: "1px solid var(--md-line)" }}>
          <div className="d-flex align-items-center gap-2">
            <span className="px-3 py-1 rounded-pill small fw-bold"
              style={{ background: "var(--md-moss-soft)", color: "var(--md-moss)", border: "1px solid var(--md-moss)" }}>
              &bull; LIVE KITCHEN &bull; ILOILO &amp; MANILA
            </span>
            <span className="small d-none d-md-inline" style={{ color: "var(--md-text-muted)" }}>
              Bespoke Farm-to-Bowl Filipino Nutrition
            </span>
          </div>
          <button type="button" className="md-btn-ghost py-1 px-3 small"
            onClick={() => {
              const next = !soundOn;
              setSoundOn(next);
              sfx.setEnabled(next);
              if (next) sfx.success();
            }}>
            {soundOn ? <><VolumeUpFill className="me-1" /> System Sounds ON</> : <><VolumeMuteFill className="me-1" /> Sounds Muted</>}
          </button>
        </div>

        <Row className="align-items-center g-5">
          {/* Left Column: Brand Story, Interactive Tasting Reel & Get Started CTA */}
          <Col lg={6}>
            <div className="text-uppercase small fw-bold md-moss-accent mb-2" style={{ letterSpacing: "0.22em" }}>
              MOSS &amp; DAISY &bull; BESPOKE HEALTHY KITCHEN
            </div>
            <h1 className="md-serif-display display-3 fw-bold mb-3" style={{ lineHeight: 1.06 }}>
              Craft Your Plate.<br />
              <span className="md-moss-accent">Levitate Every Layer.</span>
            </h1>
            <p className="lead mb-4" style={{ color: "var(--md-text-muted)", maxWidth: 610 }}>
              Customize authentic Filipino power bowls, artisan sourdough clubs, and nourishing broths with real-time PHP ingredient pricing, USDA/PhilFCT macros, and 3D deconstructed food inspection.
            </p>

            {/* Interactive Tasting Reel Switcher */}
            <div className="mb-4">
              <div className="small text-uppercase fw-bold mb-2" style={{ letterSpacing: "0.14em", color: "var(--md-text-muted)" }}>
                <Stars className="me-1 md-moss-accent" /> Interactive Tasting Preview (Click a Dish to Inspect):
              </div>
              <div className="d-flex flex-wrap gap-2">
                {showcaseDishes.map((d, i) => {
                  const active = i === selectedDishIdx;
                  return (
                    <button key={d.id} type="button"
                      className={active ? "md-btn-pill py-2 px-3 small" : "md-btn-ghost py-2 px-3 small"}
                      onClick={() => { sfx.toss(); setSelectedDishIdx(i); }}>
                      {d.name.split(" ").slice(0, 3).join(" ")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Actions */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <button type="button" className="md-btn-pill py-3 px-5 fs-5" onClick={handleGetStarted}>
                Get Started &rarr;
              </button>
              <button type="button" className="md-btn-ghost py-3 px-4"
                onClick={() => { sfx.toss(); setIsDismantled((v) => !v); }}>
                {isDismantled ? "Show Plated Presentation" : "Try 3D Dismantle Stack"}
              </button>
            </div>

            {/* Live Key Metrics Grid */}
            <Row className="g-3 mb-4">
              <Col xs={6} sm={3}>
                <div className="md-surface-card p-3 text-center">
                  <div className="h4 fw-bold md-moss-accent mb-0">18</div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>Chef Dishes</div>
                </div>
              </Col>
              <Col xs={6} sm={3}>
                <div className="md-surface-card p-3 text-center">
                  <div className="h4 fw-bold md-moss-accent mb-0">61</div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>Whole Ingredients</div>
                </div>
              </Col>
              <Col xs={6} sm={3}>
                <div className="md-surface-card p-3 text-center">
                  <div className="d-flex justify-content-center mb-1"><StarRating value={4.9} size={13} /></div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>4.9 Avg Rating</div>
                </div>
              </Col>
              <Col xs={6} sm={3}>
                <div className="md-surface-card p-3 text-center">
                  <div className="h4 fw-bold md-moss-accent mb-0">25m</div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>Live GPS Delivery</div>
                </div>
              </Col>
            </Row>

            {/* Verified Review Ribbon */}
            <div className="md-surface-card p-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div className="d-flex align-items-center gap-2">
                <StarRating value={5} size={14} />
                <span className="small fw-semibold">&ldquo;The 3D Dismantle view and live macro pricing are game-changers!&rdquo;</span>
              </div>
              <span className="small md-moss-accent fw-bold">&mdash; Verified Iloilo &amp; USA Campus Order</span>
            </div>
          </Col>

          {/* Right Column: Interactive Studio Plated & 3D Levitating Dismantle Stage */}
          <Col lg={6}>
            <div className="md-surface-card p-4 position-relative">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                <div>
                  <Badge bg="success" className="me-2"><CheckCircleFill className="me-1" /> Live Interactive Preview</Badge>
                  <span className="fw-bold">{activeDish.name}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="h5 fw-bold md-moss-accent mb-0">&#8369;{totals.unitPricePhp}</span>
                  <span className="small px-2 py-1 rounded-pill" style={{ background: "var(--md-surface-2)" }}>
                    <Fire className="md-moss-accent" /> {totals.kcal} kcal &bull; {totals.proteinG}g Protein
                  </span>
                </div>
              </div>

              <FoodPresentationStage
                dish={activeDish}
                selectedIds={activeDish.defaultIngredientIds}
                isDismantled={isDismantled}
                onToggleDismantle={() => { sfx.toss(); setIsDismantled((v) => !v); }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Unified 2-Step Onboarding Modal (No Competing Backdrops) */}
      <Modal show={showPrivacy || showAuthChoice} onHide={() => { setShowPrivacy(false); setShowAuthChoice(false); }} centered>
        {showPrivacy && !showAuthChoice ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="h5 fw-bold">
                <ShieldCheck className="md-moss-accent me-2" />
                Data Privacy &amp; Live GPS Notice (RA 10173)
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="small mb-2">
                Welcome to <strong>Moss &amp; Daisy</strong>. In compliance with the <strong>Philippine Data Privacy Act of 2012 (RA 10173)</strong>, we protect your personal profile, dietary preferences, and delivery history.
              </p>
              <p className="small mb-3" style={{ color: "var(--md-text-muted)" }}>
                <GeoAltFill className="md-moss-accent me-1" />
                <strong>Device Geolocation &amp; Live Driver Tracking:</strong> Before dispatching an order, we verify that your device location is turned ON so you can track our assigned rider&apos;s live GPS route, vehicle model, and plate number in real time.
              </p>
              <Form.Check type="checkbox" id="privacy-consent-chk" className="mb-2 small fw-semibold"
                checked={consentChecked} onChange={(e) => { sfx.click(); setConsentChecked(e.target.checked); }}
                label="I agree to the RA 10173 Privacy Notice and customized nutrition storage." />
              <Form.Check type="checkbox" id="gps-consent-chk" className="small fw-semibold"
                checked={gpsChecked} onChange={(e) => { sfx.click(); setGpsChecked(e.target.checked); }}
                label="Enable Device Location (GPS ON) for accurate Iloilo & PH delivery tracking." />
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="md-btn-pill w-100 justify-content-center py-2"
                onClick={handleConfirmPrivacy}>
                Agree &amp; Continue &rarr;
              </button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="h5 fw-bold">How Would You Like to Order?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-grid gap-3">
              <button type="button" className="md-btn-pill py-3 justify-content-center"
                onClick={() => enterAs("user", "/auth")}>
                <PersonPlusFill className="me-2" /> Create an Account (Save Plates &amp; Addresses)
              </button>
              <button type="button" className="md-btn-ghost py-3 justify-content-center"
                onClick={() => enterAs("user", "/auth")}>
                <BoxArrowInRight className="me-2" /> Sign In to Existing Account
              </button>
              <button type="button" className="md-btn-ghost py-2 justify-content-center small"
                onClick={() => enterAs("guest", "/home")}>
                <PersonBadge className="me-2" /> Continue as Guest to Home Page
              </button>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}