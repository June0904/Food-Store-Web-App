import { AnimatePresence, motion } from "motion/react";
import { LayersFill, EyeFill } from "react-bootstrap-icons";
import type { MenuItem } from "../../types/menu";
import { INGREDIENTS_DB } from "../../data/ingredientsData";
import { SmartAssetImage } from "./SmartAssetImage";

interface FoodPresentationStageProps {
  dish: MenuItem;
  selectedIds: string[];
  isDismantled: boolean;
  onToggleDismantle: () => void;
}

const ORDER_WEIGHT: Record<string, number> = {
  "toppings-fruits": 1,
  "vegetables": 2,
  "eggs-dairy": 3,
  "proteins": 4,
  "bases": 5,
};

export function FoodPresentationStage({ dish, selectedIds, isDismantled, onToggleDismantle }: FoodPresentationStageProps) {
  const layers = selectedIds
    .map((id) => INGREDIENTS_DB[id])
    .filter(Boolean)
    .sort((a, b) => (ORDER_WEIGHT[a.category] ?? 3) - (ORDER_WEIGHT[b.category] ?? 3));

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="small text-uppercase fw-bold" style={{ letterSpacing: "0.14em", color: "var(--md-moss)" }}>
          {isDismantled ? "Dismantled Levitating Layers" : "Studio Plated Presentation"}
        </span>
        <button type="button" className="md-btn-pill py-1 px-3 small" onClick={onToggleDismantle}>
          {isDismantled ? <><EyeFill className="me-1" /> Presentation View</> : <><LayersFill className="me-1" /> Dismantle Food</>}
        </button>
      </div>

      <div className="position-relative rounded-4 overflow-hidden"
        style={{
          minHeight: isDismantled ? 540 : 410,
          background: isDismantled
            ? "radial-gradient(circle at 50% 35%, #2B2118 0%, #17130F 65%, #0D0B09 100%)"
            : "radial-gradient(circle at 50% 45%, #232A27 0%, #121615 65%, #090B0A 100%)",
          border: "1px solid var(--md-line-strong)",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.75), 0 24px 48px rgba(0,0,0,0.4)",
          transition: "min-height 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
        <AnimatePresence mode="wait">
          {!isDismantled ? (
            <motion.div key="plated-view"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
              transition={{ duration: 0.38 }}
              className="d-flex flex-column align-items-center justify-content-center p-4"
              style={{ minHeight: 410 }}>
              {/* Dark Matte Studio Slate Plate (image-10.png style) */}
              <div className="position-relative d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 310, height: 310,
                  background: "radial-gradient(circle at 35% 30%, #2B302E 0%, #141716 70%, #0B0D0C 100%)",
                  boxShadow: "0 28px 55px rgba(0,0,0,0.85), inset 0 2px 6px rgba(255,255,255,0.14), inset 0 -10px 24px rgba(0,0,0,0.8)",
                  border: "2px solid rgba(255,255,255,0.08)",
                }}>
                <div className="rounded-circle overflow-hidden position-relative"
                  style={{
                    width: 246, height: 246,
                    boxShadow: "0 14px 32px rgba(0,0,0,0.75)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                  <SmartAssetImage folderPath={dish.folderPath} alt={dish.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.06)" }} />
                </div>
              </div>
              <div className="mt-3 px-3 py-1 rounded-pill small"
                style={{ background: "rgba(18,20,18,0.78)", color: "#FBFAF5", border: "1px solid rgba(255,255,255,0.15)" }}>
                {layers.length} Customized Layers Plated &bull; Click <strong>Dismantle Food</strong> to Levitate
              </div>
            </motion.div>
          ) : (
            <motion.div key="dismantled-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="d-flex flex-column align-items-center justify-content-between py-4 px-3 position-relative"
              style={{ minHeight: 540 }}>
              {/* Vertical Levitating Stack (image-9.png style) */}
              <div className="d-flex flex-column align-items-center w-100 position-relative" style={{ zIndex: 2 }}>
                {layers.map((ing, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <motion.div key={ing.id}
                      initial={{ opacity: 0, y: 40, scale: 0.7 }}
                      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                      transition={{
                        opacity: { duration: 0.3, delay: idx * 0.06 },
                        scale: { type: "spring", stiffness: 260, damping: 20, delay: idx * 0.06 },
                        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.22 },
                      }}
                      className="d-flex align-items-center justify-content-center w-100 position-relative"
                      style={{ marginTop: idx === 0 ? 4 : -14 }}>
                      <div className="position-relative d-flex align-items-center justify-content-center">
                        <SmartAssetImage folderPath={ing.folderPath} alt={ing.name}
                          style={{
                            width: 112, height: 82, objectFit: "contain",
                            filter: "drop-shadow(0 18px 14px rgba(0,0,0,0.78))",
                            transform: ` perspective(500px) rotateX(14deg) rotateZ(${isLeft ? -4 : 4}deg)`,
                          }} />
                      </div>
                      <div className="position-absolute px-2 py-1 rounded-2 small"
                        style={{
                          [isLeft ? "left" : "right"]: "4%",
                          background: "rgba(18, 20, 18, 0.86)",
                          color: "#FBFAF5",
                          border: "1px solid rgba(143, 179, 107, 0.45)",
                          fontSize: "0.72rem",
                          maxWidth: "36%",
                        }}>
                        <div className="fw-bold text-truncate">{ing.name}</div>
                        <div style={{ color: "#8FB36B", fontSize: "0.66rem" }}>{ing.grams}g &bull; +&#8369;{ing.pricePhp}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Rustic Wood & Parchment Base Board at Bottom (image-9.png style) */}
              <div className="w-100 d-flex flex-column align-items-center mt-2" style={{ zIndex: 1 }}>
                <div style={{
                  width: "76%", height: 22, borderRadius: "50%",
                  background: "radial-gradient(ellipse at center, rgba(212,184,140,0.85) 0%, rgba(138,98,58,0.9) 70%, rgba(74,48,25,0.95) 100%)",
                  boxShadow: "0 14px 28px rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}