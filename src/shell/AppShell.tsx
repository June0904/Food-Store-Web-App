import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Offcanvas, Modal, Badge, Form, Row, Col } from "react-bootstrap";
import {
  List, ArrowLeft, SunFill, MoonStarsFill, PersonCircle,
  BagCheckFill, GeoAltFill, ClockHistory, HouseDoorFill, GridFill, Trash,
} from "react-bootstrap-icons";
import { useAppStore } from "../store/useAppStore";
import { useIsMobile } from "../hooks/useIsMobile";
import { SmartAssetImage } from "../components/ui/SmartAssetImage";

export function AppShell() {
  const {
    theme, toggleTheme, previewDevice, setPreviewDevice,
    cart, cartOpen, setCartOpen, updateCartQty, removeFromCart,
    addresses, addAddress, confirmAddressOpen, setConfirmAddressOpen,
    confirmAndDeliverOrder, sessionMode,
  } = useAppStore();

  const screenIsMobile = useIsMobile();
  const isMobile = previewDevice === "auto" ? screenIsMobile : previewDevice === "mobile";
  const navigate = useNavigate();
  const location = useLocation();

  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [selectedAddrId, setSelectedAddrId] = useState(addresses[0]?.id ?? "");
  const [addingNewAddr, setAddingNewAddr] = useState(false);
  const [newRegion, setNewRegion] = useState("Region VI (Western Visayas)");
  const [newCity, setNewCity] = useState("Iloilo City");
  const [newBrgy, setNewBrgy] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const cartSubtotal = cart.reduce((s, l) => s + l.unitPricePhp * l.quantity, 0);
  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 45;

  const handleSaveNewAddress = () => {
    if (!newBrgy.trim() || !newStreet.trim()) return;
    addAddress({
      label: `${newBrgy}, ${newCity}`,
      region: newRegion, city: newCity, barangay: newBrgy, street: newStreet,
      isDefault: true,
    });
    setAddingNewAddr(false);
    setNewBrgy("");
    setNewStreet("");
  };

  const handleConfirmDelivery = () => {
    const addrId = selectedAddrId || addresses[0]?.id;
    const rec = confirmAndDeliverOrder(addrId);
    if (rec) {
      setOrderSuccessMsg(`Order ${rec.orderId} confirmed for delivery to ${rec.address.barangay}, ${rec.address.city}!`);
      navigate("/profile");
    }
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/menu", label: "Shop / Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
    { to: "/profile", label: "Profile & History" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column $(isMobile ? 'md-mobile-frame' : 'w-100')" style={{ paddingBottom: isMobile ? "72px" : "0" }}>
      {/* Top Utility & Device Preview Switcher Bar */}
      <div className="py-1 px-3 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-2"
        style={{ backgroundColor: "#121412", color: "#F4F2EA", borderColor: "#343A33", fontSize: "0.73rem" }}>
        <span>FREE DELIVERY ON HEALTHY ORDERS ABOVE &#8369;499 &bull; ILOILO &amp; NATIONWIDE PH</span>
        <div className="d-flex align-items-center gap-1">
          <span className="text-secondary me-1">Layout View:</span>
          {(["auto", "desktop", "mobile"] as const).map((m) => (
            <button key={m} type="button" onClick={() => setPreviewDevice(m)}
              className="btn btn-sm py-0 px-2"
              style={{
                fontSize: "0.7rem",
                backgroundColor: previewDevice === m ? "#8FB36B" : "transparent",
                color: previewDevice === m ? "#121412" : "#F4F2EA",
                border: "1px solid #343A33",
              }}>
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Persistent Top Navbar */}
      <Navbar className="py-2 border-bottom sticky-top" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
        <Container fluid className="px-4 px-xl-5 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <button type="button" className="md-btn-ghost p-2" aria-label="Toggle navigation panel" onClick={() => setNavDrawerOpen(true)}>
              <List size={18} />
            </button>
            <button type="button" className="md-btn-ghost p-2" aria-label="Go back"
              onClick={() => (location.key !== "default" ? navigate(-1) : navigate("/home"))}>
              <ArrowLeft size={18} />
            </button>
            <Link to="/home" className="text-decoration-none ms-1" style={{ color: "var(--md-text)" }}>
              <span className="md-condensed-display fs-3">MOSS <span className="md-moss-accent">&amp;</span> DAISY</span>
            </Link>
          </div>

          {!isMobile && (
            <Nav className="gap-3">
              {navLinks.slice(0, 4).map((l) => (
                <Link key={l.to} to={l.to} className="text-decoration-none fw-medium small"
                  style={{ color: location.pathname.startsWith(l.to) ? "var(--md-moss)" : "var(--md-text)" }}>
                  {l.label}
                </Link>
              ))}
            </Nav>
          )}

          <div className="d-flex align-items-center gap-2">
            <Badge bg="secondary" className="d-none d-md-inline">{sessionMode === "guest" ? "Guest Mode" : "Account"}</Badge>
            <button type="button" className="md-btn-ghost p-2" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "dark" ? <SunFill size={17} /> : <MoonStarsFill size={17} />}
            </button>
            <button type="button" className="md-btn-ghost p-2" aria-label="User Profile" onClick={() => navigate("/profile")}>
              <PersonCircle size={18} />
            </button>
            <button type="button" className="md-btn-pill py-1 px-3" aria-label="Open Cart" onClick={() => setCartOpen(true)}>
              <BagCheckFill size={16} />
              <span>{cartCount}</span>
            </button>
          </div>
        </Container>
      </Navbar>

      {orderSuccessMsg && (
        <Container className="mt-3">
          <div className="p-3 rounded-3 d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "rgba(143, 179, 107, 0.18)", border: "1px solid var(--md-moss)" }}>
            <span className="small fw-semibold">{orderSuccessMsg}</span>
            <button type="button" className="btn-close btn-sm" onClick={() => setOrderSuccessMsg(null)} />
          </div>
        </Container>
      )}

      {/* Main Route Content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* 3-Column Editorial Footer */}
      <footer className="mt-5 py-4 border-top" style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)" }}>
        <Container fluid className="px-4 px-xl-5">
          <Row className="g-4">
            <Col md={4}>
              <div className="md-condensed-display fs-4 mb-1">MOSS <span className="md-moss-accent">&amp;</span> DAISY</div>
              <p className="small mb-0" style={{ color: "var(--md-text-muted)" }}>
                Know what is on your plate. Customize every physical ingredient, see live PHP pricing &amp; nutrition, and enjoy healthy Filipino delivery.
              </p>
            </Col>
            <Col md={4}>
              <div className="fw-bold small text-uppercase mb-2">Rubric &amp; Quick Links</div>
              <div className="d-flex flex-wrap gap-3 small">
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} style={{ color: "var(--md-text-muted)" }}>{l.label}</Link>
                ))}
                <Link to="/" style={{ color: "var(--md-text-muted)" }}>Landing</Link>
              </div>
            </Col>
            <Col md={4}>
              <div className="fw-bold small text-uppercase mb-1">Iloilo City Kitchen Hub</div>
              <div className="small" style={{ color: "var(--md-text-muted)" }}>
                Gen. Luna St., Iloilo City, Philippines &bull; 09458269961 &bull; ilczar9@gmail.com &bull; RA 10173 Data Privacy Compliant
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Mobile Separate Sticky Bottom Tab Bar */}
      {isMobile && (
        <nav className="fixed-bottom border-top py-2 px-3 d-flex justify-content-around align-items-center"
          style={{ backgroundColor: "var(--md-surface)", borderColor: "var(--md-line)", zIndex: 250 }}>
          <Link to="/home" className="text-decoration-none text-center small" style={{ color: "var(--md-text)" }}>
            <HouseDoorFill className="d-block mx-auto mb-1 md-moss-accent" />Home
          </Link>
          <Link to="/menu" className="text-decoration-none text-center small" style={{ color: "var(--md-text)" }}>
            <GridFill className="d-block mx-auto mb-1 md-moss-accent" />Menu
          </Link>
          <button type="button" className="btn btn-link text-decoration-none text-center small p-0" style={{ color: "var(--md-text)" }} onClick={() => setCartOpen(true)}>
            <BagCheckFill className="d-block mx-auto mb-1 md-moss-accent" />Cart ({cartCount})
          </button>
          <Link to="/profile" className="text-decoration-none text-center small" style={{ color: "var(--md-text)" }}>
            <ClockHistory className="d-block mx-auto mb-1 md-moss-accent" />History
          </Link>
        </nav>
      )}

      {/* Collapsible Full Page Navigation Offcanvas */}
      <Offcanvas show={navDrawerOpen} onHide={() => setNavDrawerOpen(false)} style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="md-condensed-display fs-4">NAVIGATION MENU</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column gap-2">
          <Link to="/" onClick={() => setNavDrawerOpen(false)} className="p-2 rounded text-decoration-none" style={{ color: "var(--md-text)" }}>
            Landing Page (Intro &amp; Stats)
          </Link>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setNavDrawerOpen(false)}
              className="p-2 rounded text-decoration-none fw-semibold" style={{ color: "var(--md-text)", backgroundColor: "var(--md-surface-2)" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/auth/sign-in" onClick={() => setNavDrawerOpen(false)} className="p-2 rounded text-decoration-none" style={{ color: "var(--md-moss)" }}>
            Sign In / Create Account
          </Link>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Cart Drawer Offcanvas */}
      <Offcanvas placement="end" show={cartOpen} onHide={() => setCartOpen(false)} style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="md-condensed-display fs-4">YOUR CUSTOM CART ({cartCount})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-column gap-3">
            {cart.length === 0 ? (
              <div className="text-center py-5">
                <p className="small" style={{ color: "var(--md-text-muted)" }}>Your cart is empty. Customize a healthy dish to see live pricing!</p>
                <button type="button" className="md-btn-pill" onClick={() => { setCartOpen(false); navigate("/menu"); }}>Browse Menu</button>
              </div>
            ) : (
              cart.map((line) => (
                <div key={line.lineId} className="p-3 rounded-3 border" style={{ borderColor: "var(--md-line)", backgroundColor: "var(--md-surface-2)" }}>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <SmartAssetImage folderPath={line.folderPath} alt={line.dishName} style={{ width: 44, height: 44, borderRadius: 8 }} />
                      <div>
                        <div className="fw-bold small">{line.dishName}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--md-text-muted)" }}>
                          {line.vessel.replace("-", " ")} &bull; {line.kcal} kcal
                        </div>
                      </div>
                    </div>
                    <button type="button" className="btn btn-sm text-danger" onClick={() => removeFromCart(line.lineId)}><Trash /></button>
                  </div>
                  <div className="small mt-1" style={{ fontSize: "0.72rem", color: "var(--md-text-muted)" }}>{line.customSummary}</div>
                  <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top" style={{ borderColor: "var(--md-line)" }}>
                    <span className="fw-bold md-moss-accent">&#8369;{line.unitPricePhp * line.quantity}</span>
                    <div className="d-flex align-items-center gap-2">
                      <button type="button" className="md-btn-ghost py-0 px-2" onClick={() => updateCartQty(line.lineId, line.quantity - 1)}>-</button>
                      <span className="small fw-bold">{line.quantity}</span>
                      <button type="button" className="md-btn-ghost py-0 px-2" onClick={() => updateCartQty(line.lineId, line.quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="pt-3 border-top" style={{ borderColor: "var(--md-line)" }}>
              <div className="d-flex justify-content-between small mb-1"><span>Subtotal</span><span>&#8369;{cartSubtotal}</span></div>
              <div className="d-flex justify-content-between small mb-2"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "FREE" : `\u20B1${deliveryFee}`}</span></div>
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3"><span>Total</span><span className="md-moss-accent">&#8369;{cartSubtotal + deliveryFee}</span></div>
              <button type="button" className="md-btn-pill w-100 justify-content-center"
                onClick={() => { setCartOpen(false); setConfirmAddressOpen(true); }}>
                <GeoAltFill /> Confirm Delivery Address &amp; Order
              </button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Confirm Delivery Address Modal Before Delivering */}
      <Modal show={confirmAddressOpen} onHide={() => setConfirmAddressOpen(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <Modal.Title className="md-condensed-display fs-4">CONFIRM DELIVERY ADDRESS</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "var(--md-surface)", color: "var(--md-text)" }}>
          <p className="small" style={{ color: "var(--md-text-muted)" }}>
            Please confirm your Philippine delivery address before we prepare and dispatch your customized order:
          </p>
          {addresses.map((a) => (
            <div key={a.id} onClick={() => setSelectedAddrId(a.id)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedAddrId(a.id); }}
              className="p-3 rounded-3 mb-2"
              style={{
                cursor: "pointer",
                backgroundColor: "var(--md-surface-2)",
                border: (selectedAddrId || addresses[0]?.id) === a.id ? "2px solid var(--md-moss)" : "1px solid var(--md-line)",
              }}>
              <div className="fw-bold small d-flex justify-content-between">
                <span><GeoAltFill className="md-moss-accent me-1" />{a.label}</span>
                {(selectedAddrId || addresses[0]?.id) === a.id && <Badge bg="success">Confirmed</Badge>}
              </div>
              <div className="small mt-1">{a.street}, Brgy. {a.barangay}, {a.city}, {a.region}</div>
            </div>
          ))}

          {!addingNewAddr ? (
            <button type="button" className="md-btn-ghost btn-sm mt-2" onClick={() => setAddingNewAddr(true)}>
              + Deliver to a Different Barangay / Address
            </button>
          ) : (
            <div className="p-3 rounded-3 mt-2 border" style={{ borderColor: "var(--md-line)" }}>
              <Form.Group className="mb-2">
                <Form.Label className="small">Region</Form.Label>
                <Form.Control size="sm" value={newRegion} onChange={(e) => setNewRegion(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="small">City / Municipality</Form.Label>
                <Form.Control size="sm" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="small">Barangay*</Form.Label>
                <Form.Control size="sm" placeholder="e.g. Jaro / Mandurriao" value={newBrgy} onChange={(e) => setNewBrgy(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="small">Street / House No. / Landmark*</Form.Label>
                <Form.Control size="sm" placeholder="Street & Landmark" value={newStreet} onChange={(e) => setNewStreet(e.target.value)} />
              </Form.Group>
              <button type="button" className="md-btn-pill py-1 px-3 small" onClick={handleSaveNewAddress}>Save Address</button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--md-surface)" }}>
          <button type="button" className="md-btn-ghost" onClick={() => setConfirmAddressOpen(false)}>Back</button>
          <button type="button" className="md-btn-pill" onClick={handleConfirmDelivery}>
            Confirm Address &amp; Deliver Now (&#8369;{cartSubtotal + deliveryFee})
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}