import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Form } from "react-bootstrap";
import { ArrowRight, ClockHistory, HeartPulse, StarFill, BagPlusFill, TicketPerforatedFill } from "react-bootstrap-icons";
import { MENU_ITEMS, calculateDishTotals } from "../data/menuData";
import { useAppStore } from "../store/useAppStore";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

export function HomePage() {
  const navigate = useNavigate();
  const { deliveryHistory, addToCart, setCartOpen, reviews, addReview, sessionMode } = useAppStore();
  const [reviewDishId, setReviewDishId] = useState(MENU_ITEMS[0].id);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const healthyPicks = MENU_ITEMS.filter((m) => m.isHealthyPick).slice(0, 6);
  const featuredDishes = MENU_ITEMS.slice(0, 3);
  const mostOrdered = [...MENU_ITEMS].sort((a, b) => b.ordersToday - a.ordersToday).slice(0, 4);
  const previousItems = deliveryHistory.flatMap((rec) =>
    rec.items.map((item) => ({ ...item, orderId: rec.orderId, orderedAt: rec.createdAt }))
  );

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    addReview(reviewDishId, reviewRating, reviewText.trim());
    setReviewText("");
  };

  return (
    <Container className="py-4">
      {/* Rubric Featured Spotlight Hero with CTA & Link to Product Page */}
      <div className="md-wordmark-stage mb-5">
        <div className="md-giant-wordmark">FRESH</div>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <Badge bg="success" className="mb-2">FEATURED HEALTHY SPOTLIGHT</Badge>
            <h1 className="md-serif-display display-5 mb-2">
              {featuredDishes[0].name}
            </h1>
            <p className="small mb-3" style={{ color: "var(--md-text-muted)" }}>
              {featuredDishes[0].description}
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to={`/menu/${featuredDishes[0].category}/${featuredDishes[0].slug}`} className="md-btn-pill">
                Customize on Live Plate <ArrowRight />
              </Link>
              <Link to="/menu" className="md-btn-ghost text-decoration-none">
                Explore Full Shop / Menu
              </Link>
            </div>
          </Col>
          <Col lg={5} className="text-center">
            <SmartAssetImage folderPath={featuredDishes[0].folderPath} alt={featuredDishes[0].name}
              style={{ width: 190, height: 190, borderRadius: 24, objectFit: "cover" }} />
          </Col>
        </Row>
      </div>

      {/* PREVIOUSLY ORDERED ITEMS / ORDER AGAIN (Owner Requirement) */}
      <div className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="md-condensed-display h3 mb-0">
            <ClockHistory className="md-moss-accent me-2" />PREVIOUSLY ORDERED ITEMS
          </h2>
          <Link to="/profile" className="small md-moss-accent">View Full Delivery History &rarr;</Link>
        </div>
        <Row className="g-3">
          {previousItems.slice(0, 4).map((item, idx) => (
            <Col md={6} key={`${item.orderId}-${idx}`}>
              <div className="md-surface-card p-3 d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <SmartAssetImage folderPath={item.folderPath} alt={item.dishName} style={{ width: 64, height: 64, borderRadius: 12 }} />
                  <div>
                    <Badge bg="secondary" className="mb-1" style={{ fontSize: "0.65rem" }}>{item.orderedAt} &bull; {item.orderId}</Badge>
                    <div className="fw-bold">{item.dishName}</div>
                    <div className="small" style={{ color: "var(--md-text-muted)", fontSize: "0.75rem" }}>{item.customSummary}</div>
                    <div className="fw-bold small md-moss-accent">&#8369;{item.unitPricePhp} &bull; {item.kcal} kcal</div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1 flex-shrink-0">
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
                  <button type="button" className="md-btn-ghost py-1 px-2 small"
                    onClick={() => {
                      const found = MENU_ITEMS.find((m) => m.id === item.dishId);
                      if (found) navigate(`/menu/${found.category}/${found.slug}`);
                    }}>
                    Edit Plate
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* RECOMMENDED HEALTHY FOODS (Owner Requirement) */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h2 className="md-instant-heading h3">
            <HeartPulse className="md-moss-accent me-1" />RECOMMENDED HEALTHY FOODS
          </h2>
          <p className="small mb-0" style={{ color: "var(--md-text-muted)" }}>
            Nutrient-dense Filipino dishes with transparent calories, high protein, and smart swaps
          </p>
        </div>
        <Row className="g-3">
          {healthyPicks.map((item) => {
            const totals = calculateDishTotals(item, item.defaultIngredientIds, 1);
            return (
              <Col md={6} lg={4} key={item.id}>
                <div className="md-surface-card p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <SmartAssetImage folderPath={item.folderPath} alt={item.name} style={{ width: 68, height: 68, borderRadius: 12 }} />
                      <div>
                        <div className="d-flex flex-wrap gap-1 mb-1">
                          {item.healthBadges.map((b) => (
                            <Badge key={b} bg="success" style={{ fontSize: "0.64rem" }}>{b}</Badge>
                          ))}
                        </div>
                        <div className="fw-bold">{item.name}</div>
                        <div className="small md-moss-accent fw-bold">&#8369;{totals.unitPricePhp} &bull; {totals.kcal} kcal</div>
                      </div>
                    </div>
                    <p className="small mb-2" style={{ color: "var(--md-text-muted)" }}>{item.healthyWhy}</p>
                  </div>
                  <Link to={`/menu/${item.category}/${item.slug}`} className="md-btn-ghost w-100 text-center text-decoration-none py-1 small">
                    View &amp; Customize Product &rarr;
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* PROMOS TICKET RAIL */}
      <div className="mb-5">
        <h2 className="md-condensed-display h3 mb-3"><TicketPerforatedFill className="md-moss-accent me-2" />ACTIVE PROMOS</h2>
        <Row className="g-3">
          {[
            { code: "HEALTHYPH50", title: "PHP 50 OFF Healthy Power Bowls", sub: "Min. spend PHP 350 on any bowl" },
            { code: "FREEDEL499", title: "FREE Barangay Delivery", sub: "Automatic on orders PHP 499+" },
            { code: "USASTUDENT", title: "10% OFF University of San Agustin", sub: "For students & faculty around Gen. Luna St." },
          ].map((p) => (
            <Col md={4} key={p.code}>
              <div className="md-surface-card p-3 d-flex align-items-center justify-content-between">
                <div>
                  <div className="fw-bold small md-moss-accent">{p.code}</div>
                  <div className="fw-semibold">{p.title}</div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>{p.sub}</div>
                </div>
                <button type="button" className="md-btn-ghost py-1 px-3 small" onClick={() => setCopiedCode(p.code)}>
                  {copiedCode === p.code ? "Copied!" : "Copy"}
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* MOST ORDERED LEADERBOARD */}
      <div className="mb-5">
        <h2 className="md-condensed-display h3 mb-3">MOST ORDERED TODAY</h2>
        <Row className="g-3">
          {mostOrdered.map((item, i) => {
            const totals = calculateDishTotals(item, item.defaultIngredientIds, 1);
            return (
              <Col sm={6} lg={3} key={item.id}>
                <div className="md-surface-card p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="md-condensed-display fs-3 md-moss-accent">#0{i + 1}</span>
                      <span className="small" style={{ color: "var(--md-text-muted)" }}>{item.ordersToday} orders today</span>
                    </div>
                    <SmartAssetImage folderPath={item.folderPath} alt={item.name} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 10 }} />
                    <div className="fw-bold mt-2">{item.name}</div>
                    <div className="small md-moss-accent fw-bold">&#8369;{totals.unitPricePhp} &bull; {totals.kcal} kcal</div>
                  </div>
                  <Link to={`/menu/${item.category}/${item.slug}`} className="md-btn-pill w-100 justify-content-center mt-2 py-1 small">
                    Go to Product Page
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* COMMUNITY RATINGS & COMMENTS WALL */}
      <div className="md-surface-card p-4">
        <h2 className="md-condensed-display h3 mb-3">COMMUNITY RATINGS &amp; COMMENTS</h2>
        <Row className="g-4">
          <Col lg={7}>
            <div className="d-flex flex-column gap-2">
              {reviews.map((r) => {
                const dish = MENU_ITEMS.find((m) => m.id === r.dishId);
                return (
                  <div key={r.id} className="p-3 rounded-3" style={{ backgroundColor: "var(--md-surface-2)" }}>
                    <div className="d-flex justify-content-between small">
                      <strong>{r.userName} <span className="md-moss-accent">on {dish?.name ?? r.dishId}</span></strong>
                      <span style={{ color: "var(--md-text-muted)" }}>{r.createdAt}</span>
                    </div>
                    <div className="text-warning small my-1">
                      {Array.from({ length: r.rating }).map((_, idx) => <StarFill key={idx} className="me-1" />)}
                    </div>
                    <div className="small">{r.comment}</div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col lg={5}>
            {sessionMode === "guest" ? (
              <div className="p-3 rounded-3 text-center" style={{ backgroundColor: "var(--md-surface-2)" }}>
                <p className="small mb-2">Guests can read all reviews. Create an account or sign in to post ratings and comments!</p>
                <Link to="/auth/sign-up" className="md-btn-pill py-1 px-3 small">Create Account</Link>
              </div>
            ) : (
              <Form onSubmit={handlePostReview}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-semibold">Dish</Form.Label>
                  <Form.Select size="sm" value={reviewDishId} onChange={(e) => setReviewDishId(e.target.value)}>
                    {MENU_ITEMS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-semibold">Rating ({reviewRating} Stars)</Form.Label>
                  <Form.Range min={1} max={5} value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-semibold">Your Comment</Form.Label>
                  <Form.Control as="textarea" rows={2} value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share how you customized your dish..." />
                </Form.Group>
                <button type="submit" className="md-btn-pill py-1 px-3 small">Post Review</button>
              </Form>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}