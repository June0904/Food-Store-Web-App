import { SaleFeatureBanner } from "../components/ui/SaleFeatureBanner";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Form } from "react-bootstrap";
import { HeartPulse, Search, CheckCircleFill, XCircleFill, Sliders } from "react-bootstrap-icons";
import type { CategorySlug } from "../types/menu";
import { MENU_ITEMS, CATEGORY_META, calculateDishTotals } from "../data/menuData";
import { useAppStore } from "../store/useAppStore";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";
import { StarRating } from "../components/ui/StarRating";

export function MenuPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const { unavailableFoodIds, toggleFoodAvailability } = useAppStore();
  const [search, setSearch] = useState("");
  const [onlyHealthy, setOnlyHealthy] = useState(false);
  const [hideUnavailable, setHideUnavailable] = useState(false);
  const [kitchenAdminMode, setKitchenAdminMode] = useState(false);

  const categories = Object.keys(CATEGORY_META) as CategorySlug[];
  const activeCat = categories.find((c) => c === category);

  const filtered = MENU_ITEMS.filter((item) => {
    if (activeCat && item.category !== activeCat) return false;
    if (onlyHealthy && !item.isHealthyPick) return false;
    if (hideUnavailable && unavailableFoodIds.includes(item.id)) return false;
    if (search.trim() && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Container fluid className="px-4 px-xl-5 py-4">
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
        <div>
          <div className="text-uppercase small md-moss-accent fw-semibold mb-1" style={{ letterSpacing: "0.18em" }}>
            CUSTOMIZABLE FILIPINO MENU
          </div>
          <h1 className="md-serif-display display-5 mb-0">Shop &amp; Menu</h1>
        </div>
        <button type="button"
          className={kitchenAdminMode ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}
          onClick={() => setKitchenAdminMode((v) => !v)}>
          <Sliders className="me-1" /> {kitchenAdminMode ? "Done Editing Availability" : "Kitchen Demo: Toggle Available / Unavailable"}
        </button>
      </div>

      <SaleFeatureBanner />
      
      <Row className="g-3 mb-4">
        {categories.map((slug) => {
          const meta = CATEGORY_META[slug];
          const count = MENU_ITEMS.filter((m) => m.category === slug).length;
          const isSelected = activeCat === slug;
          return (
            <Col xs={6} md={3} xl key={slug}>
              <div role="button" tabIndex={0}
                onClick={() => navigate(isSelected ? "/menu" : `/menu/${slug}`)}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(isSelected ? "/menu" : `/menu/${slug}`); }}
                className="md-instant-tile p-3"
                style={{ minHeight: 105, cursor: "pointer", borderColor: isSelected ? "var(--md-moss)" : "var(--md-line)" }}>
                <div>
                  <div className="fw-bold small text-uppercase" style={{ letterSpacing: "0.1em" }}>{meta.title}</div>
                  <div className="small mt-1" style={{ color: "var(--md-text-muted)", fontSize: "0.72rem" }}>{count} items</div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      
      <div className="md-surface-card p-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          <Search className="md-moss-accent" />
          <Form.Control size="sm" placeholder="Search dishes (e.g., Inasal, Bangus, Batchoy, Oats)..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button type="button"
            className={onlyHealthy ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}
            onClick={() => setOnlyHealthy((v) => !v)}>
            <HeartPulse className="me-1" /> Healthy Picks Only
          </button>
          <button type="button"
            className={hideUnavailable ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}
            onClick={() => setHideUnavailable((v) => !v)}>
            Available Only
          </button>
          {activeCat && (
            <button type="button" className="md-btn-ghost py-1 px-3 small" onClick={() => navigate("/menu")}>
              All Categories
            </button>
          )}
        </div>
      </div>

      
      <Row className="g-4">
        {filtered.map((item) => {
          const totals = calculateDishTotals(item, item.defaultIngredientIds, 1);
          const isUnavailable = unavailableFoodIds.includes(item.id);
          return (
            <Col sm={6} lg={3} key={item.id}>
              <div className="md-surface-card p-3 h-100 d-flex flex-column justify-content-between"
                style={{ opacity: isUnavailable ? 0.72 : 1 }}>
                <div>
                  <div className="position-relative mb-3">
                    <SmartAssetImage folderPath={item.folderPath} alt={item.name}
                      style={{ width: "100%", height: 165, objectFit: "cover", borderRadius: 12, filter: isUnavailable ? "grayscale(75%)" : "none" }} />
                    <div className="position-absolute top-0 start-0 m-2 d-flex flex-wrap gap-1">
                      <Badge bg={isUnavailable ? "danger" : "success"} className="d-inline-flex align-items-center gap-1">
                        {isUnavailable ? <><XCircleFill /> Unavailable</> : <><CheckCircleFill /> Available</>}
                      </Badge>
                      {item.isHealthyPick && !isUnavailable && <Badge bg="dark">Healthy Pick</Badge>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                    <h2 className="h6 fw-bold mb-0">{item.name}</h2>
                    <span className="fw-bold md-moss-accent">&#8369;{totals.unitPricePhp}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <StarRating value={item.ratingAvg} size={13} />
                    <span className="small" style={{ color: "var(--md-text-muted)" }}>
                      ({item.ratingCount}) &bull; {totals.kcal} kcal
                    </span>
                  </div>
                  <p className="small mb-2" style={{ color: "var(--md-text-muted)" }}>{item.description}</p>
                </div>

                <div className="d-flex flex-column gap-2 mt-2">
                  {kitchenAdminMode && (
                    <button type="button"
                      className={isUnavailable ? "md-btn-pill py-1 px-2 small justify-content-center" : "md-btn-ghost py-1 px-2 small"}
                      onClick={() => toggleFoodAvailability(item.id)}>
                      {isUnavailable ? "Mark as Available" : "Mark as Unavailable"}
                    </button>
                  )}

                  {isUnavailable ? (
                    <button type="button" className="md-btn-ghost w-100 py-2" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                      Currently Unavailable
                    </button>
                  ) : (
                    <Link to={`/menu/${item.category}/${item.slug}`} className="md-btn-pill w-100 justify-content-center">
                      {item.kind === "drink" ? "View Drink & Order" : "Customize Plate & Price"}
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
