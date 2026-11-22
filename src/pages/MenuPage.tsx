import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Form } from "react-bootstrap";
import { HeartPulse, StarFill, Search } from "react-bootstrap-icons";
import type { CategorySlug } from "../types/menu";
import { MENU_ITEMS, CATEGORY_META, calculateDishTotals } from "../data/menuData";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

export function MenuPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [onlyHealthy, setOnlyHealthy] = useState(false);

  const categories = Object.keys(CATEGORY_META) as CategorySlug[];
  const activeCat = categories.find((c) => c === category);

  const filtered = MENU_ITEMS.filter((item) => {
    if (activeCat && item.category !== activeCat) return false;
    if (onlyHealthy && !item.isHealthyPick) return false;
    if (search.trim() && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Container fluid className="px-4 px-xl-5 py-4">
      <div className="text-center mb-4">
        <h1 className="md-instant-heading h2">SHOP &amp; CUSTOMIZABLE MENU</h1>
        <p className="small mb-0" style={{ color: "var(--md-text-muted)" }}>
          Select a category or click any dish to open its Live Plate &amp; Ingredient Price Builder
        </p>
      </div>

      {/* INSTANT Photo Studio 2x2 / Grid Category Tiles */}
      <Row className="g-3 mb-4">
        {categories.map((slug) => {
          const meta = CATEGORY_META[slug];
          const count = MENU_ITEMS.filter((m) => m.category === slug).length;
          const isSelected = activeCat === slug;
          return (
            <Col xs={6} md={3} key={slug}>
              <div role="button" tabIndex={0}
                onClick={() => navigate(isSelected ? "/menu" : `/menu/${slug}`)}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(isSelected ? "/menu" : `/menu/${slug}`); }}
                className="md-instant-tile p-3"
                style={{
                  minHeight: 120, cursor: "pointer",
                  borderColor: isSelected ? "var(--md-moss)" : "var(--md-line)",
                }}>
                <div>
                  <div className="md-instant-heading fs-6">{meta.title}</div>
                  <div className="small mt-1" style={{ color: "var(--md-text-muted)", fontSize: "0.72rem" }}>
                    {count} items
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Search & Healthy Recommendation Filter Bar */}
      <div className="md-surface-card p-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          <Search className="md-moss-accent" />
          <Form.Control size="sm" placeholder="Search dishes (e.g., Inasal, Bangus, Batchoy, Oats)..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="d-flex align-items-center gap-2">
          <button type="button"
            className={onlyHealthy ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}
            onClick={() => setOnlyHealthy((v) => !v)}>
            <HeartPulse className="me-1" /> Healthy Picks Only
          </button>
          {activeCat && (
            <button type="button" className="md-btn-ghost py-1 px-3 small" onClick={() => navigate("/menu")}>
              Show All Categories
            </button>
          )}
        </div>
      </div>

      {/* HARVEST Bakery Product Grid */}
      <Row className="g-4">
        {filtered.map((item) => {
          const totals = calculateDishTotals(item, item.defaultIngredientIds, 1);
          return (
            <Col sm={6} lg={3} key={item.id}>
              <div className="md-surface-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="position-relative mb-3">
                    <SmartAssetImage folderPath={item.folderPath} alt={item.name}
                      style={{ width: "100%", height: 165, objectFit: "cover", borderRadius: 12 }} />
                    <div className="position-absolute top-0 start-0 m-2 d-flex flex-wrap gap-1">
                      {item.isHealthyPick && <Badge bg="success">Healthy Pick</Badge>}
                      {item.healthBadges.slice(0, 2).map((b) => (
                        <Badge key={b} bg="dark">{b}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                    <h2 className="h5 mb-0">{item.name}</h2>
                    <span className="fw-bold md-moss-accent fs-5">&#8369;{totals.unitPricePhp}</span>
                  </div>
                  <div className="small mb-2" style={{ color: "var(--md-text-muted)" }}>
                    <StarFill className="text-warning me-1" />{item.ratingAvg} ({item.ratingCount}) &bull; {totals.kcal} kcal &bull; {item.vessel.replace("-", " ")}
                  </div>
                  <p className="small mb-2" style={{ color: "var(--md-text-muted)" }}>{item.description}</p>
                </div>
                <Link to={`/menu/${item.category}/${item.slug}`} className="md-btn-pill w-100 justify-content-center mt-2">
                  {item.kind === "drink" ? "View Drink & Add to Cart" : "Toss Apart & Customize Plate"}
                </Link>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}