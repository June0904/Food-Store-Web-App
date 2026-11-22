import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, ProgressBar, Form } from "react-bootstrap";
import { GeoAltFill, CheckCircleFill, Truck, PersonBadgeFill, ClockHistory, HouseDoorFill } from "react-bootstrap-icons";
import { useAppStore } from "../store/useAppStore";
import { StarRating } from "../components/ui/StarRating";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

const STAGES = [
  { key: "preparing", label: "Preparing Order", desc: "Kitchen is assembling your customized ingredients on the plate/box.", etaMin: 12 },
  { key: "waiting", label: "Waiting for Pick Up", desc: "Order is nutrient-sealed and waiting at the counter for your rider.", etaMin: 8 },
  { key: "picked-up", label: "Picked Up by Rider", desc: "Rider has verified your customized order and is departing the kitchen hub.", etaMin: 6 },
  { key: "on-the-way", label: "On the Way to Drop-Off", desc: "Rider is navigating live toward your confirmed barangay drop-off pin.", etaMin: 3 },
  { key: "delivered", label: "Food Delivered & Confirmed", desc: "Your order has arrived at your drop-off location and is confirmed!", etaMin: 0 },
];

export function DeliveryTrackerPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { deliveryHistory, deviceCoords, markOrderDelivered, addReview } = useAppStore();

  const order = deliveryHistory.find((o) => o.orderId === orderId) ?? deliveryHistory[0];
  const [stageIdx, setStageIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [rated, setRated] = useState(false);

  useEffect(() => {
    if (stageIdx >= STAGES.length - 1) {
      if (order && order.status !== 'Delivered') markOrderDelivered(order.orderId);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setStageIdx((s) => Math.min(STAGES.length - 1, s + 1));
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stageIdx, order?.orderId, order?.status, markOrderDelivered]);

  if (!order) return null;

  const currentStage = STAGES[stageIdx];
  const progressPct = Math.round(((stageIdx + 1) / STAGES.length) * 100);
  const driverProgressPct = Math.min(100, Math.round((stageIdx / (STAGES.length - 1)) * 100));
  const driverLat = (10.6969 + (deviceCoords.lat - 10.6969) * (driverProgressPct / 100)).toFixed(4);
  const driverLng = (122.5644 + (deviceCoords.lng - 122.5644) * (driverProgressPct / 100)).toFixed(4);

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const firstDishId = order.items[0]?.dishId ?? "chicken-inasal-power-bowl";
    addReview(firstDishId, serviceRating, feedback.trim() || "Fast delivery and accurate custom plate!");
    setRated(true);
  };

  return (
    <Container fluid className="px-4 px-xl-5 py-4">
      <Row className="g-4">
        <Col lg={7}>
          <div className="md-surface-card p-4 mb-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div>
                <Badge bg={stageIdx === 4 ? "success" : "warning"} className="mb-1">
                  LIVE ORDER TRACKER (DEMO AUTO-CYCLE)
                </Badge>
                <h1 className="md-condensed-display h2 mb-0">{currentStage.label.toUpperCase()}</h1>
              </div>
              <div className="text-end">
                <div className="fw-bold md-moss-accent fs-4">
                  {stageIdx < 4 ? `Est. ${currentStage.etaMin} mins (${secondsLeft}s demo)` : "DELIVERED"}
                </div>
                <div className="small" style={{ color: "var(--md-text-muted)" }}>Order #{order.orderId}</div>
              </div>
            </div>

            <p className="small mb-3" style={{ color: "var(--md-text-muted)" }}>{currentStage.desc}</p>
            <ProgressBar now={progressPct} variant="success" className="mb-3" style={{ height: 10 }} />

            <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
              {STAGES.map((st, idx) => (
                <div key={st.key} className="small d-flex align-items-center gap-1"
                  style={{ opacity: idx <= stageIdx ? 1 : 0.45, fontWeight: idx === stageIdx ? 700 : 400 }}>
                  <CheckCircleFill className={idx <= stageIdx ? "md-moss-accent" : ""} />
                  <span>{idx + 1}. {st.label}</span>
                </div>
              ))}
            </div>

            {stageIdx < 4 && (
              <button type="button" className="md-btn-ghost py-1 px-3 small"
                onClick={() => { setStageIdx((s) => Math.min(4, s + 1)); setSecondsLeft(5); }}>
                <ClockHistory className="me-1" /> Advance to Next Stage Immediately (Demo)
              </button>
            )}
          </div>

          {/* Live Driver GPS Location Map */}
          <div className="md-surface-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="md-condensed-display h4 mb-0"><GeoAltFill className="md-moss-accent me-2" />LIVE DRIVER LOCATION MAP</h2>
              <span className="small" style={{ color: "var(--md-text-muted)" }}>
                Driver GPS: {driverLat}&deg; N, {driverLng}&deg; E
              </span>
            </div>
            <div className="p-4 rounded-3 border position-relative overflow-hidden my-3"
              style={{ backgroundColor: "var(--md-surface-2)", borderColor: "var(--md-line)", minHeight: 150 }}>
              <div className="d-flex justify-content-between small fw-bold mb-4">
                <span>Kitchen Hub (Gen. Luna St.)</span>
                <span>Drop-Off: Brgy. {order.address.barangay}, {order.address.city}</span>
              </div>
              <div className="position-relative" style={{ height: 6, backgroundColor: "var(--md-line)", borderRadius: 4 }}>
                <div style={{ width: `${driverProgressPct}%`, height: "100%", backgroundColor: "var(--md-moss)", transition: "width 0.6s ease" }} />
                <div className="position-absolute top-50 translate-middle-y px-2 py-1 rounded-pill small fw-bold"
                  style={{ left: `calc(${driverProgressPct}% - 24px)`, backgroundColor: "var(--md-moss)", color: "var(--md-on-moss)", transition: "left 0.6s ease" }}>
                  <Truck className="me-1" />Rider
                </div>
              </div>
              <div className="small mt-4" style={{ color: "var(--md-text-muted)" }}>
                Delivering to: <strong>{order.address.street}, Brgy. {order.address.barangay}, {order.address.city}</strong>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={5}>
          {/* Driver & Vehicle Details Card */}
          <div className="md-surface-card p-4 mb-4">
            <h2 className="md-condensed-display h4 mb-3"><PersonBadgeFill className="md-moss-accent me-2" />ASSIGNED RIDER &amp; VEHICLE</h2>
            <div className="p-3 rounded-3 mb-2" style={{ backgroundColor: "var(--md-surface-2)" }}>
              <div className="fw-bold">Driver: Kuya Noel Villanueva</div>
              <div className="small md-moss-accent fw-semibold">Vehicle: Honda Click 125i (Insulated Thermal Box)</div>
              <div className="small fw-bold mt-1">Plate Number: <Badge bg="secondary">WV-4829-PH</Badge></div>
              <div className="small mt-1" style={{ color: "var(--md-text-muted)" }}>Rider Contact: 0945-826-9961 &bull; Rating: 4.9 &#9733;</div>
            </div>

            <div className="fw-bold small text-uppercase mt-3 mb-2">Order Details ({order.items.length} item)</div>
            {order.items.map((item) => (
              <div key={item.lineId} className="d-flex align-items-center justify-content-between py-2 border-bottom" style={{ borderColor: "var(--md-line)" }}>
                <div className="d-flex align-items-center gap-2">
                  <SmartAssetImage folderPath={item.folderPath} alt={item.dishName} style={{ width: 40, height: 40, borderRadius: 8 }} />
                  <div>
                    <div className="fw-bold small">{item.dishName} (x{item.quantity})</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--md-text-muted)" }}>{item.customSummary}</div>
                  </div>
                </div>
                <span className="fw-bold small md-moss-accent">&#8369;{item.unitPricePhp * item.quantity}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Total Paid</span>
              <span className="md-moss-accent">&#8369;{order.totalPaidPhp}</span>
            </div>
          </div>

          {/* Post-Delivery Confirmation & Service Star Rating */}
          {stageIdx === 4 && (
            <div className="md-surface-card p-4 border" style={{ borderColor: "var(--md-moss)" }}>
              <h2 className="md-condensed-display h4 md-moss-accent mb-2">
                <CheckCircleFill className="me-2" />FOOD DELIVERED &amp; CONFIRMED!
              </h2>
              <p className="small" style={{ color: "var(--md-text-muted)" }}>
                Your order has been delivered and confirmed. Please rate our delivery &amp; food service below:
              </p>
              {!rated ? (
                <Form onSubmit={handleRateSubmit}>
                  <div className="mb-3">
                    <div className="small fw-semibold mb-1">Rate Your Service (Click Stars):</div>
                    <StarRating value={serviceRating} onChange={setServiceRating} size={24} />
                  </div>
                  <Form.Control as="textarea" rows={2} className="mb-3" placeholder="Optional feedback for Kuya Noel & the kitchen..."
                    value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                  <div className="d-flex gap-2">
                    <button type="submit" className="md-btn-pill flex-grow-1 justify-content-center">Submit Rating</button>
                    <button type="button" className="md-btn-ghost" onClick={() => navigate("/home")}>Back to Home</button>
                  </div>
                </Form>
              ) : (
                <div>
                  <div className="p-2 rounded mb-3 small fw-semibold" style={{ backgroundColor: "var(--md-surface-2)" }}>
                    Thank you for rating us {serviceRating} stars!
                  </div>
                  <button type="button" className="md-btn-pill w-100 justify-content-center" onClick={() => navigate("/home")}>
                    <HouseDoorFill /> Return to Home Page
                  </button>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}