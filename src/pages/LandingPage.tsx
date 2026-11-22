import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { ArrowRight, ShieldCheck } from "react-bootstrap-icons";
import { useAppStore } from "../store/useAppStore";
import { MENU_ITEMS, INGREDIENTS_DB, calculateDishTotals } from "../data/menuData";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";
import { StarRating } from "../components/ui/StarRating";

export function LandingPage() {
  const navigate = useNavigate();
  const { consentAccepted, acceptConsent, setSessionMode } = useAppStore();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [authChoiceOpen, setAuthChoiceOpen] = useState(false);
  const [declineNote, setDeclineNote] = useState(false);

  const sampleDish = MENU_ITEMS[0];
  const [previewIds, setPreviewIds] = useState<string[]>(sampleDish.defaultIngredientIds);
  const totals = calculateDishTotals(sampleDish, previewIds, 1);
  const activeIngs = previewIds.map((id) => INGREDIENTS_DB[id]).filter(Boolean);

  const handleGetStarted = () => {
    setDeclineNote(false);
    if (consentAccepted) setAuthChoiceOpen(true);
    else setPrivacyOpen(true);
  };

  return (
    <div className="min-vh-100 w-100 d-flex flex-column justify-content-between px-4 px-xl-5 py-4">
      <div className="d-flex justify-content-between align-items-center">
        <span className="md-condensed-display fs-4" style={{ letterSpacing: "0.14em" }}>
          MOSS <span className="md-moss-accent">&amp;</span> DAISY
        </span>
        <span className="small" style={{ color: "var(--md-text-muted)", letterSpacing: "0.12em" }}>
          ILOILO &bull; PHILIPPINES
        </span>
      </div>

      <Container fluid className="my-auto py-4 px-0">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="text-uppercase small mb-3 md-moss-accent fw-semibold" style={{ letterSpacing: "0.22em" }}>
              TRANSPARENT HEALTHY FOOD DELIVERY
            </div>
            <h1 className="md-serif-display mb-4" style={{ fontSize: "clamp(3rem, 5.5vw, 5.2rem)" }}>
              Know what is on your <span className="md-moss-accent fst-italic">plate</span>.
            </h1>
            <p className="mb-4 fs-6" style={{ color: "var(--md-text-muted)", maxWidth: "54ch", lineHeight: 1.7 }}>
              Every dish can be tossed apart to reveal its physical ingredients and nutrition. Customize your plate live on screen and see your exact Philippine Peso price update with every edit.
            </p>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-5">
              <button type="button" className="md-btn-pill px-5 py-3 fs-6" onClick={handleGetStarted}>
                Get Started <ArrowRight />
              </button>
            </div>
            {declineNote && (
              <div className="small text-warning mb-3">
                Please accept the Privacy Notice when ready to continue.
              </div>
            )}

            <Row className="g-4 pt-4 border-top" style={{ borderColor: "var(--md-line)" }}>
              <Col xs={4}>
                <div className="md-condensed-display fs-2 md-moss-accent">12,400+</div>
                <div className="small" style={{ color: "var(--md-text-muted)" }}>Active Users</div>
              </Col>
              <Col xs={4}>
                <div className="mb-1"><StarRating value={4.8} size={18} /></div>
                <div className="small" style={{ color: "var(--md-text-muted)" }}>Average Rating</div>
              </Col>
              <Col xs={4}>
                <div className="md-condensed-display fs-2 md-moss-accent">1,850+</div>
                <div className="small" style={{ color: "var(--md-text-muted)" }}>Orders / Day</div>
              </Col>
            </Row>
          </Col>

          <Col lg={6}>
            <div className="p-4 p-xl-5 rounded-4 border" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div className="small text-uppercase md-moss-accent fw-bold" style={{ letterSpacing: "0.14em" }}>Interactive Plate Preview</div>
                  <div className="h5 mb-0">{sampleDish.name}</div>
                </div>
                <div className="text-end">
                  <div className="fs-3 fw-bold md-moss-accent">&#8369;{totals.unitPricePhp}</div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>{totals.kcal} kcal &bull; {totals.proteinG}g P</div>
                </div>
              </div>
              <div className="md-plate-stage md-vessel-wooden-bowl my-3">
                {activeIngs.map((ing) => (
                  <div key={ing.id} className="md-plate-ingredient-chip"
                    style={{ top: ing.plateSlot.top, left: ing.plateSlot.left, zIndex: ing.plateSlot.layer }}>
                    <SmartAssetImage folderPath={ing.folderPath} alt={ing.name} style={{ width: 34, height: 34 }} />
                    <span className="fw-semibold text-truncate w-100" style={{ fontSize: "0.58rem" }}>{ing.name.split(" ").slice(-1)[0]}</span>
                    <span className="md-moss-accent fw-bold" style={{ fontSize: "0.58rem" }}>&#8369;{ing.pricePhp}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                {sampleDish.defaultIngredientIds.map((id) => {
                  const ing = INGREDIENTS_DB[id];
                  if (!ing) return null;
                  const on = previewIds.includes(id);
                  return (
                    <button key={id} type="button"
                      className={on ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}
                      onClick={() => {
                        if (on && previewIds.length > 2) setPreviewIds(previewIds.filter((x) => x !== id));
                        else if (!on) setPreviewIds([...previewIds, id]);
                      }}>
                      {ing.name} ({on ? "-\u20B1" : "+\u20B1"}{ing.pricePhp})
                    </button>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="d-flex justify-content-between small pt-3 border-top" style={{ borderColor: "var(--md-line)", color: "var(--md-text-muted)" }}>
        <span>Know what is on your plate.</span>
        <span>RA 10173 Privacy Compliant</span>
      </div>

      <Modal show={privacyOpen} backdrop="static" centered>
        <Modal.Header style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <Modal.Title className="md-condensed-display fs-4"><ShieldCheck className="md-moss-accent me-2" />PRIVACY NOTICE (RA 10173)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <p className="small mb-0">
            In compliance with the Philippine Data Privacy Act of 2012 (RA 10173), Moss &amp; Daisy collects your name, contact details, delivery address, order history, and checks your Device Geolocation so we can verify your drop-off point and display real-time Live Driver Location updates while your order is on the way.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--md-surface)" }}>
          <button type="button" className="md-btn-ghost" onClick={() => { setPrivacyOpen(false); setDeclineNote(true); }}>Decline</button>
          <button type="button" className="md-btn-pill" onClick={() => { acceptConsent(); setPrivacyOpen(false); setAuthChoiceOpen(true); }}>I Agree &amp; Continue</button>
        </Modal.Footer>
      </Modal>

      <Modal show={authChoiceOpen} onHide={() => setAuthChoiceOpen(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <Modal.Title className="md-condensed-display fs-4">CONTINUE TO MOSS &amp; DAISY</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <div className="d-grid gap-2">
            <button type="button" className="md-btn-pill justify-content-center" onClick={() => navigate("/auth/sign-up")}>Create an Account</button>
            <button type="button" className="md-btn-ghost" onClick={() => navigate("/auth/sign-in")}>Sign In</button>
            <button type="button" className="md-btn-ghost" onClick={() => { setSessionMode("guest"); navigate("/home"); }}>Continue as Guest</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}