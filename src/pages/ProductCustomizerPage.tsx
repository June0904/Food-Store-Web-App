import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { CheckCircleFill, ExclamationTriangleFill, HeartPulse, BagPlusFill, ArrowCounterclockwise } from "react-bootstrap-icons";
import type { VesselType, DishIngredientCategory } from "../types/menu";
import { MENU_ITEMS, INGREDIENTS_DB, calculateDishTotals } from "../data/menuData";
import { useAppStore } from "../store/useAppStore";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

export function ProductCustomizerPage() {
  const { slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const { addToCart, setCartOpen, unavailableFoodIds, toggleFoodAvailability } = useAppStore();

  const dish = MENU_ITEMS.find((m) => m.slug === slug) ?? MENU_ITEMS[0];
  const [vessel, setVessel] = useState<VesselType>(dish.vessel);
  const [selectedIds, setSelectedIds] = useState<string[]>(dish.defaultIngredientIds);
  const [quantity, setQuantity] = useState(1);
  const [guardMsg, setGuardMsg] = useState<string | null>(null);

  const totals = calculateDishTotals(dish, selectedIds, quantity);
  const isUnavailable = unavailableFoodIds.includes(dish.id);
  const activeIngredients = selectedIds.map((id) => INGREDIENTS_DB[id]).filter(Boolean);

  const toggleIngredient = (ingId: string, cat: DishIngredientCategory) => {
    const isOn = selectedIds.includes(ingId);
    if (isOn) {
      if (cat.required) {
        const left = cat.ingredientIds.filter((id) => id !== ingId && selectedIds.includes(id));
        if (left.length < cat.min) {
          setGuardMsg(`Required rule: Keep at least ${cat.min} ingredient in "${cat.label}" for the dish to work.`);
          return;
        }
      }
      setGuardMsg(null);
      setSelectedIds((prev) => prev.filter((id) => id !== ingId));
    } else {
      setGuardMsg(null);
      setSelectedIds((prev) => [...prev, ingId]);
    }
  };

  const handleAddToCart = () => {
    const summary = dish.kind === "drink"
      ? "Standard Drink"
      : `${activeIngredients.length} ingredients on ${vessel.replace("-", " ")}`;
    addToCart({
      dishId: dish.id, dishName: dish.name, folderPath: dish.folderPath,
      vessel, selectedIngredientIds: selectedIds, customSummary: summary,
      unitPricePhp: totals.unitPricePhp, kcal: totals.kcal, quantity,
    });
    setCartOpen(true);
    navigate(`/menu/${dish.category}`);
  };

  return (
    <Container fluid className="px-4 px-xl-5 py-4">
      <div className="md-surface-card p-4">
        <Row className="g-4 align-items-start">
          {/* Live Visual Plate / Bowl / Bento-Box / Soup Bowl / Drink Cup */}
          <Col lg={5} className="text-center">
            <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
              {(["wooden-bowl", "ceramic-plate", "bento-box", "soup-bowl"] as VesselType[]).map((v) => (
                <button key={v} type="button" onClick={() => setVessel(v)}
                  className={vessel === v ? "md-btn-pill py-1 px-3 small" : "md-btn-ghost py-1 px-3 small"}>
                  {v.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>

            <div className={`md-plate-stage md-vessel-${vessel}`}>
              {dish.kind === "drink" ? (
                <SmartAssetImage folderPath={dish.folderPath} alt={dish.name} style={{ width: 140, height: 140, borderRadius: 20 }} />
              ) : (
                activeIngredients.map((ing) => (
                  <div key={ing.id} className="md-plate-ingredient-chip"
                    style={{ top: ing.plateSlot.top, left: ing.plateSlot.left, zIndex: ing.plateSlot.layer }}>
                    <SmartAssetImage folderPath={ing.folderPath} alt={ing.name} style={{ width: 34, height: 34 }} />
                    <span className="fw-semibold text-truncate w-100" style={{ fontSize: "0.58rem" }}>
                      {ing.name.split(" ").slice(-1)[0]}
                    </span>
                    <span className="md-moss-accent fw-bold" style={{ fontSize: "0.58rem" }}>&#8369;{ing.pricePhp}</span>
                  </div>
                ))
              )}
            </div>

            <button type="button" className="md-btn-ghost py-1 px-3 small mt-3"
              onClick={() => { setSelectedIds(dish.defaultIngredientIds); setGuardMsg(null); }}>
              <ArrowCounterclockwise className="me-1" /> Reset Default Plate
            </button>
          </Col>

          {/* Right Column: Ingredient Editor & Live Price Calculator */}
          <Col lg={7}>
            <div className="d-flex flex-wrap gap-1 mb-2">
              {dish.healthBadges.map((b) => <Badge key={b} bg="success">{b}</Badge>)}
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2"><h1 className="h3 mb-0">{dish.name}</h1><button type="button" className="md-btn-ghost py-1 px-2 small" onClick={() => toggleFoodAvailability(dish.id)}>{isUnavailable ? "Unavailable (Click to Enable)" : "Available"}</button></div>
            <p className="small mb-2" style={{ color: "var(--md-text-muted)" }}>{dish.description}</p>
            <div className="small md-moss-accent mb-3"><HeartPulse className="me-1" />{dish.healthyWhy}</div>

            {dish.smartSwap && (
              <div className="p-3 rounded-3 mb-3 d-flex flex-wrap align-items-center justify-content-between gap-2"
                style={{ backgroundColor: "var(--md-surface-2)" }}>
                <div className="small">
                  <Badge bg="success" className="me-2">Smart Healthy Swap</Badge>
                  <strong>{dish.smartSwap.label}:</strong> {dish.smartSwap.benefitText}
                </div>
                <button type="button" className="md-btn-ghost py-1 px-3 small"
                  onClick={() => { setSelectedIds(dish.smartSwap!.recommendedIngredientIds); setGuardMsg(null); }}>
                  Apply Healthy Swap
                </button>
              </div>
            )}

            {guardMsg && (
              <div className="p-2 px-3 mb-3 rounded-3 small d-flex align-items-center gap-2"
                style={{ backgroundColor: "rgba(230,195,106,0.15)", border: "1px solid var(--md-warning)", color: "var(--md-warning)" }}>
                <ExclamationTriangleFill /><span>{guardMsg}</span>
              </div>
            )}

            {dish.categories.map((cat) => (
              <div key={cat.id} className="mb-3">
                <div className="fw-bold small text-uppercase mb-2">{cat.label}</div>
                <Row className="g-2">
                  {cat.ingredientIds.map((ingId) => {
                    const ing = INGREDIENTS_DB[ingId];
                    if (!ing) return null;
                    const active = selectedIds.includes(ing.id);
                    return (
                      <Col sm={6} key={ing.id}>
                        <div role="button" tabIndex={0}
                          onClick={() => toggleIngredient(ing.id, cat)}
                          onKeyDown={(e) => { if (e.key === "Enter") toggleIngredient(ing.id, cat); }}
                          className="p-2 px-3 rounded-3 d-flex align-items-center justify-content-between"
                          style={{
                            cursor: "pointer",
                            backgroundColor: active ? "var(--md-surface-2)" : "transparent",
                            border: active ? "1.5px solid var(--md-moss)" : "1px dashed var(--md-line)",
                          }}>
                          <div className="d-flex align-items-center gap-2">
                            <SmartAssetImage folderPath={ing.folderPath} alt={ing.name} style={{ width: 30, height: 30, borderRadius: 6 }} />
                            <div>
                              <div className="fw-semibold small">
                                {active && <CheckCircleFill className="md-moss-accent me-1" />}{ing.name}
                              </div>
                              <div style={{ fontSize: "0.7rem", color: "var(--md-text-muted)" }}>
                                {ing.portionGrams}g &bull; {ing.kcal} kcal &bull; {ing.proteinG}g P
                              </div>
                            </div>
                          </div>
                          <div className="fw-bold small md-moss-accent">{active ? "+" : ""}&#8369;{ing.pricePhp}</div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ))}

            {/* Live Price & Nutrition Box */}
            <div className="p-3 rounded-3 border mt-3" style={{ backgroundColor: "var(--md-surface-2)", borderColor: "var(--md-moss)" }}>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <div className="small text-uppercase fw-bold md-moss-accent">LIVE CUSTOMIZED PRICE &amp; NUTRITION</div>
                  <div className="fs-2 fw-bold">&#8369;{totals.totalPricePhp} <span className="fs-6 fw-normal">(&#8369;{totals.unitPricePhp} each)</span></div>
                  <div className="small" style={{ color: "var(--md-text-muted)" }}>
                    {totals.kcal} kcal &bull; {totals.proteinG}g Protein &bull; {totals.carbsG}g Carbs &bull; {totals.fatG}g Fat &bull; {totals.fiberG}g Fiber
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button type="button" className="md-btn-ghost px-3 py-1" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                  <span className="fw-bold px-2">Qty: {quantity}</span>
                  <button type="button" className="md-btn-ghost px-3 py-1" onClick={() => setQuantity((q) => Math.min(20, q + 1))}>+</button>
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type="button" className="md-btn-ghost flex-grow-1" onClick={() => navigate(`/menu/${dish.category}`)}>
                  Cancel
                </button>
                <button type="button" className="md-btn-pill flex-grow-1 justify-content-center" onClick={handleAddToCart} disabled={isUnavailable} style={{ opacity: isUnavailable ? 0.5 : 1 }}>
                  {isUnavailable ? "Currently Unavailable" : <><BagPlusFill /> Add to Cart (&#8369;{totals.totalPricePhp})</>}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}