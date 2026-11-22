import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import { LightningChargeFill, ClipboardCheck, Clipboard, ArrowRight, ChevronLeft, ChevronRight, Stars } from "react-bootstrap-icons";
import { SmartAssetImage } from "./SmartAssetImage";
import { StarRating } from "./StarRating";
import { sfx } from "../../lib/soundEffects";

interface SlideItem {
  id: string;
  tag: string;
  discountBadge: string;
  title: string;
  subtitle: string;
  promoCode: string;
  oldPricePhp: number;
  salePricePhp: number;
  kcal: number;
  proteinG: number;
  rating: number;
  folderPath: string;
  ctaLabel: string;
  ctaLink: string;
}

const SLIDES: SlideItem[] = [
  {
    id: "harvest-flash-sale",
    tag: "FLASH HARVEST SALE • LIMITED TIME",
    discountBadge: "20% OFF + FREE BUKO",
    title: "Chicken Inasal Brown Rice Power Bundle",
    subtitle: "Char-grilled Bacolod & Iloilo style chicken breast over organic brown rice with cucumber, tomato, and papaya atchara.",
    promoCode: "MOSSHEALTHY20",
    oldPricePhp: 195,
    salePricePhp: 156,
    kcal: 418,
    proteinG: 44,
    rating: 4.9,
    folderPath: "foods/bowls-salads/chicken-inasal-power-bowl",
    ctaLabel: "Claim 20% Off & Customize Bowl",
    ctaLink: "/menu/bowls-salads/chicken-inasal-power-bowl",
  },
  {
    id: "feature-dismantle-spotlight",
    tag: "CHEF'S FEATURE SPOTLIGHT • INTERACTIVE 3D STACK",
    discountBadge: "FEATURED DISH",
    title: "Avocado & Grilled Chicken Sourdough Club",
    subtitle: "Click 'Dismantle Food' on the customizer to levitate every real ingredient layer with live gram, calorie, and PHP price updates.",
    promoCode: "FRESHCLUB15",
    oldPricePhp: 196,
    salePricePhp: 169,
    kcal: 485,
    proteinG: 38,
    rating: 4.9,
    folderPath: "foods/burgers-sandwiches/avocado-chicken-sourdough-club",
    ctaLabel: "Open & Try Dismantle View",
    ctaLink: "/menu/burgers-sandwiches/avocado-chicken-sourdough-club",
  },
  {
    id: "campus-wellness-special",
    tag: "CAMPUS & ILOILO WELLNESS DEAL • OMEGA-3 RICH",
    discountBadge: "FREE DELIVERY",
    title: "Grilled Bangus & Ensalada Harvest Bowl",
    subtitle: "Boneless grilled Iloilo milkfish belly over Antique red cargo rice with green mango ensalada. Free delivery across Iloilo City!",
    promoCode: "AGUSTINIANFREE",
    oldPricePhp: 216,
    salePricePhp: 185,
    kcal: 540,
    proteinG: 36,
    rating: 4.8,
    folderPath: "foods/bowls-salads/grilled-bangus-ensalada-bowl",
    ctaLabel: "Order Harvest Bowl Now",
    ctaLink: "/menu/bowls-salads/grilled-bangus-ensalada-bowl",
  },
];

export function SaleFeatureBanner() {
  const [idx, setIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(4 * 3600 + 28 * 60 + 45);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 4 * 3600));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (paused) return;
    const rot = setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(rot);
  }, [paused]);

  const slide = SLIDES[idx];
  const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const handleCopy = (code: string) => {
    sfx.success();
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2400);
  };

  return (
    <div className="md-surface-card p-4 p-lg-5 mb-4 position-relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "linear-gradient(125deg, rgba(28,38,24,0.96) 0%, rgba(18,22,18,0.98) 60%, rgba(36,52,27,0.92) 100%)",
        border: "1px solid var(--md-moss)",
        boxShadow: "0 24px 52px rgba(0,0,0,0.42)",
      }}>
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <Badge bg="success" className="d-inline-flex align-items-center gap-1 py-1 px-2">
              <LightningChargeFill /> {slide.discountBadge}
            </Badge>
            <span className="small text-uppercase fw-bold" style={{ letterSpacing: "0.14em", color: "#8FB36B" }}>
              {slide.tag}
            </span>
            <span className="small px-2 py-1 rounded-pill ms-auto"
              style={{ background: "rgba(0,0,0,0.45)", color: "#FBFAF5", border: "1px solid rgba(143,179,107,0.35)", fontVariantNumeric: "tabular-nums" }}>
              Ends in {hrs}h : {mins}m : {secs}s
            </span>
          </div>

          <h2 className="md-serif-display display-6 fw-bold mb-2" style={{ color: "#FBFAF5" }}>
            {slide.title}
          </h2>
          <p className="mb-3" style={{ color: "rgba(251,250,245,0.8)", maxWidth: 640 }}>
            {slide.subtitle}
          </p>

          <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
            <div className="d-flex align-items-baseline gap-2">
              <span className="h3 fw-bold mb-0" style={{ color: "#8FB36B" }}>&#8369;{slide.salePricePhp}</span>
              <span className="text-decoration-line-through small" style={{ color: "rgba(251,250,245,0.5)" }}>
                &#8369;{slide.oldPricePhp}
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#FBFAF5" }}>
              <StarRating value={slide.rating} size={13} />
              <span className="small">{slide.kcal} kcal &bull; {slide.proteinG}g Protein</span>
            </div>
            <button type="button" className="md-btn-ghost py-1 px-3 small"
              style={{ color: "#FBFAF5", borderColor: "rgba(143,179,107,0.5)" }}
              onClick={() => handleCopy(slide.promoCode)}>
              {copiedCode === slide.promoCode ? <><ClipboardCheck className="me-1" /> Copied {slide.promoCode}!</> : <><Clipboard className="me-1" /> Code: {slide.promoCode}</>}
            </button>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <Link to={slide.ctaLink} className="md-btn-pill py-2 px-4">
              {slide.ctaLabel} <ArrowRight className="ms-1" />
            </Link>
            <div className="d-flex align-items-center gap-2 ms-auto">
              <button type="button" className="md-btn-ghost py-1 px-2" aria-label="Previous slide"
                style={{ color: "#FBFAF5" }}
                onClick={() => { sfx.click(); setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length); }}>
                <ChevronLeft />
              </button>
              {SLIDES.map((s, i) => (
                <button key={s.id} type="button" aria-label={`Slide ${i + 1}`}
                  onClick={() => { sfx.click(); setIdx(i); }}
                  style={{
                    width: i === idx ? 26 : 9, height: 9, borderRadius: 99, border: "none",
                    background: i === idx ? "#8FB36B" : "rgba(255,255,255,0.28)",
                    transition: "all 0.25s ease",
                  }} />
              ))}
              <button type="button" className="md-btn-ghost py-1 px-2" aria-label="Next slide"
                style={{ color: "#FBFAF5" }}
                onClick={() => { sfx.click(); setIdx((i) => (i + 1) % SLIDES.length); }}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </Col>

        <Col lg={5} className="d-flex justify-content-center">
          <div className="position-relative d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: 260, height: 260,
              background: "radial-gradient(circle at 35% 30%, #2B302E 0%, #141716 70%, #0B0D0C 100%)",
              boxShadow: "0 22px 45px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.15)",
              border: "2px solid rgba(143,179,107,0.35)",
            }}>
            <div className="rounded-circle overflow-hidden" style={{ width: 212, height: 212 }}>
              <SmartAssetImage folderPath={slide.folderPath} alt={slide.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="position-absolute bottom-0 end-0 px-3 py-1 rounded-pill fw-bold small"
              style={{ background: "#8FB36B", color: "#121412", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }}>
              <Stars className="me-1" /> Save &#8369;{slide.oldPricePhp - slide.salePricePhp}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}