import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles.css';
import descripcion1Img from '../assets/Descripcion1 - copia.jpg';
import descripcion2Img from '../assets/Descripcion2.jpg';
import foto2Img from '../assets/Foto2.png';
import foto1Img from '../assets/foto1.jpg';
import foto5Img from '../assets/foto5_.jpg';
import foto6Img from '../assets/foto6.jpg';
import logoHeavyImg from '../assets/Logoheavy2.png';

const product = {
  name: 'Teclado mecánico SlowClick',
  subtitle: 'Batidora portátil recargable',
  price: '€11,93',
  oldPrice: '€23.99',
};

const faqs = [
  {
    q: '¿Cuánto tarda el envío?',
    a: 'La preparación del pedido tarda de 3-4 días.',
  },
  {
    q: '¿Tiene garantía?',
    a: 'Sí. Tienes 30 días de garantía de satisfacción y soporte posventa.',
  },
  {
    q: '¿Qué incluye la caja?',
    a: 'Batidora, tapa antifugas, cable USB-C y mini guía de uso.',
  },
  {
    q: '¿Se puede usar para hielo?',
    a: 'Sí, en cubos pequeños y con suficiente líquido para un mejor resultado.',
  },
];

const quickFaqs = [
  {
    q: '¿Cuánto tarda el envío?',
    a: 'La preparación del pedido tarda de 3-4 días.',
  },
  {
    q: '¿Tiene garantía?',
    a: 'Sí. Tienes 30 días de garantía de satisfacción y soporte posventa.',
  },
  {
    q: '¿Cuánto dura la batería?',
    a: 'Nuestros probadores de producto han estado probándolo durante 20000 horas y seguía funcionando.',
  },
];

const productImages = [
  { id: 'descripcion1', label: 'Descripcion1', src: descripcion1Img },
  { id: 'foto6', label: 'Foto6', src: foto6Img },
  { id: 'foto1', label: 'Foto1', src: foto1Img },
  { id: 'foto2', label: 'Foto2', src: foto2Img },
];

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="topbar">
        <p>Envío gratis en pedidos +€49 | 30 días de garantía</p>
      </header>
      <nav className="navbar container">
        <button className="logo link-btn" onClick={() => navigate('/')}>
          <img src={logoHeavyImg} alt="Logo de la tienda" className="logo-image" />
        </button>

        <div className="menu">
          <button className="link-btn" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="link-btn" onClick={() => navigate('/products')}>
            Producto
          </button>
        </div>
      </nav>
    </>
  );
}

function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="container page-gap">
      <section className="home-hero card">
        <p className="pill">SINGLE PRODUCT STORE</p>
        <h1>Una tienda enfocada en un solo producto que convierte más</h1>
        <p className="muted">
          Todo el tráfico llega a una sola oferta: menos distracciones, más claridad y una compra más rápida.
        </p>
        <div className="row gap-sm wrap">
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Ver producto
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/products')}>
            Comprar ahora
          </button>
        </div>
      </section>

      <section className="home-metrics">
        <article className="card">
          <h3>4.9/5</h3>
          <p className="muted">Valoración media</p>
        </article>
        <article className="card">
          <h3>+12K</h3>
          <p className="muted">Clientes satisfechos</p>
        </article>
        <article className="card">
          <h3>48h</h3>
          <p className="muted">Despacho express</p>
        </article>
      </section>
    </main>
  );
}

function ProductPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [pressedKeys, setPressedKeys] = useState([]);
  const activeImage = productImages[activeIndex];
  const waitingImages = productImages.filter((_, index) => index !== activeIndex);
  const currentPrice = Number.parseFloat(product.price.replace('€', '').replace(',', '.'));
  const previousPrice = Number.parseFloat(product.oldPrice.replace('€', '').replace(',', '.'));
  const discountPercent =
    previousPrice > 0 ? Math.round(((previousPrice - currentPrice) / previousPrice) * 100) : 0;
  const keyDefs = [
    { id: 0, label: 'Q', color: '#ff6f6f' },
    { id: 1, label: 'W', color: '#74ff79' },
    { id: 2, label: 'E', color: '#67a9ff' },
    { id: 3, label: 'R', color: '#d689ff' },
  ];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % productImages.length);
  };

  const selectImage = (id) => {
    const nextIndex = productImages.findIndex((image) => image.id === id);
    if (nextIndex >= 0) setActiveIndex(nextIndex);
  };

  const pressKey = (keyId) => {
    setPressedKeys((current) => (current.includes(keyId) ? current : [...current, keyId]));
  };

  const releaseKey = (keyId) => {
    setPressedKeys((current) => current.filter((id) => id !== keyId));
  };

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(12);
    }
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const threshold = 35;

    if (deltaX <= -threshold) {
      goNext();
    } else if (deltaX >= threshold) {
      goPrev();
    }

    setTouchStartX(null);
  };

  return (
    <main className="container page-gap">
      <section className="product-main card">
        <div className="gallery-col">
          <img
            src={activeImage.src}
            alt={`${product.name} - ${activeImage.label}`}
            className="product-image-main"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          <div className="thumb-row">
            <button type="button" className="carousel-icon" onClick={goPrev} aria-label="Imagen anterior">
              ‹
            </button>
            {waitingImages.map((image) => (
              <button
                type="button"
                key={image.id}
                className="thumb card-soft"
                onClick={() => selectImage(image.id)}
                aria-label={`Ver ${image.label}`}
              >
                <img src={image.src} alt={image.label} className="thumb-image" />
              </button>
            ))}
            <button type="button" className="carousel-icon" onClick={goNext} aria-label="Imagen siguiente">
              ›
            </button>
          </div>
        </div>

        <div className="info-col">
          <p className="stock-alert">Quedan 19 en stock. Últimas unidades.</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.shortDescription}</p>

          <div className="price-row">
            <span className="new-price">{product.price}</span>
            <span className="old-price">{product.oldPrice}</span>
            <span className="save-badge">-{discountPercent}%</span>
          </div>

          <ul className="quick-benefits">
            <li>
              <span className="qb-icon">😌</span>
              <span>Calma la ansiedad en segundos.</span>
            </li>
            <li>
              <span className="qb-icon">🧠</span>
              <span>Te ayuda con tu TDAH.</span>
            </li>
            <li>
              <span className="qb-icon">💅</span>
              <span>No te morderás más las uñas.</span>
            </li>
          </ul>

          <div className="cta-group">
            <button className="btn btn-primary full">Comprar en Shopify</button>
            <button className="btn btn-ghost full">Ver en Shopify</button>
          </div>

          <p className="launch-note">Oferta de lanzamiento por tiempo limitado.</p>

          <div className="quick-faq-list">
            {quickFaqs.map((item) => (
              <details key={item.q} className="card-soft">
                <summary>{item.q}</summary>
                {item.q === '¿Cuánto tarda el envío?' ? (
                  <p className="muted">
                    {item.a}
                    <br />
                    <br />
                    El envío tarda de <strong>6 a 8</strong> días hábiles.
                  </p>
                ) : item.q === '¿Cuánto dura la batería?' ? (
                  <p className="muted">
                    {item.a}
                    <br />
                    <strong>Así que podemos asegurar que más de 20000h.</strong>
                  </p>
                ) : (
                  <p className="muted">{item.a}</p>
                )}
              </details>
            ))}
          </div>

          <div className="trust-strip">
            <span>Pago seguro</span>
            <span>Compra protegida</span>
            <span>Envío seguro</span>
          </div>
        </div>
      </section>

      <section className="flow-card card flow-text flow-media-stack">
        <video
          className="flow-image-media"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Demostración del uso del producto"
        >
          <source src="/IMG_5091.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
        <h2>¿Manos inquietas?</h2>
        <p>
          Si te muerdes las uñas, esto es para ti.
          <br />
          Si no puedes estar quieto en reuniones, también.
          <br />
          Si necesitas tocar algo cuando te pones nervioso, aún más.
        </p>
      </section>

      <section className="keypad-demo card">
        <div className="keypad-head">
          <h2>Pruébalo aquí mismo</h2>
          <p className="muted">Haz clic y siente la experiencia.</p>
        </div>
        <div className="keypad-device">
          {keyDefs.map((key) => (
            <button
              type="button"
              key={key.id}
              className={`keypad-key ${pressedKeys.includes(key.id) ? 'is-pressed' : ''}`}
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                triggerHaptic();
                pressKey(key.id);
              }}
              onPointerUp={() => releaseKey(key.id)}
              onPointerCancel={() => releaseKey(key.id)}
              onContextMenu={(event) => event.preventDefault()}
              aria-label={`Tecla ${key.label}`}
            >
              <span className={`key-led ${pressedKeys.includes(key.id) ? 'is-on' : ''}`} />
              <span className="key-shell">
                <span className="key-switch" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="flow-card card flow-text flow-media-stack">
        <img src={foto5Img} alt="Uso real del producto" className="flow-image-media" />
        <h2>Tu pausa diaria contra la ansiedad</h2>
        <p>
          Vas de prisa todo el día.
          <br />
          Tu mente no para.
          <br />
          Tu cuerpo lo nota.
          <br />
          No es debilidad. Es saturación.
          <br />
          Una pausa corta cambia mucho.
          <br />
          Empieza hoy a recuperar tu calma.
        </p>
      </section>

      <section className="benefit-grid card">
        <article className="benefit-item">
          <span className="benefit-icon benefit-icon-energy" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M13.5 2 5 13h5l-1.5 9L19 10h-5L13.5 2Z" />
            </svg>
          </span>
          <p>Descarga el estrés en 2 segundos</p>
        </article>
        <article className="benefit-item">
          <span className="benefit-icon benefit-icon-pocket" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 8V6a5 5 0 0 1 10 0v2" />
              <rect x="4" y="8" width="16" height="12" rx="3" />
              <path d="M9 12h6" />
            </svg>
          </span>
          <p>Portátil y discreto</p>
        </article>
        <article className="benefit-item">
          <span className="benefit-icon benefit-icon-key" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="5" width="16" height="14" rx="3" />
              <rect x="8" y="9" width="8" height="6" rx="1.5" />
              <path d="M9 18h6" />
            </svg>
          </span>
          <p>Satisfacción al instante</p>
        </article>
        <article className="benefit-item">
          <span className="benefit-icon benefit-icon-focus" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <p>Mantén el foco durante más tiempo</p>
        </article>
      </section>

      <section className="section-block">
        <h2>Beneficios clave</h2>
        <div className="grid-benefits">
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Calma inmediata</h3>
              <span className="benefit-check" aria-hidden="true">✓</span>
            </div>
            <p className="muted">Reduce el nerviosismo en segundos con cada pulsación.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Mejor concentración</h3>
              <span className="benefit-check" aria-hidden="true">✓</span>
            </div>
            <p className="muted">Mantén las manos ocupadas y la mente enfocada más tiempo.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Discreto y portátil</h3>
              <span className="benefit-check" aria-hidden="true">✓</span>
            </div>
            <p className="muted">Úsalo en clase, oficina o transporte sin llamar la atención.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Satisfacción táctil real</h3>
              <span className="benefit-check" aria-hidden="true">✓</span>
            </div>
            <p className="muted">Pulsación mecánica agradable para descargar tensión al instante.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Material resistente</h3>
              <span className="benefit-check" aria-hidden="true">✓</span>
            </div>
            <p className="muted">Diseñado para aguantar el uso diario sin perder sensación.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Listo al momento</h3>
              <span className="benefit-check" aria-hidden="true">✓</span>
            </div>
            <p className="muted">Sin apps ni configuración: lo sacas y empiezas a usarlo.</p>
          </article>
        </div>
      </section>

      <section className="section-block">
        <h2>Comparativa rápida</h2>
        <div className="compare card-soft">
          <img src={descripcion2Img} alt="Detalle de construcción del producto" className="compare-image" />
          <div className="compare-row compare-head">
            <span>Característica</span>
            <span>Teclado SlowClick</span>
            <span>Genérica</span>
          </div>
          <div className="compare-row">
            <span>Reducción de estrés</span>
            <span>Alta</span>
            <span>Media</span>
          </div>
          <div className="compare-row">
            <span>Sensación táctil</span>
            <span>Mecánica y precisa</span>
            <span>Blanda/inconsistente</span>
          </div>
          <div className="compare-row">
            <span>Nivel de ruido</span>
            <span>Bajo</span>
            <span>Medio/alto</span>
          </div>
          <div className="compare-row">
            <span>Portabilidad</span>
            <span>Muy alta</span>
            <span>Media</span>
          </div>
          <div className="compare-row">
            <span>Uso prolongado</span>
            <span>Cómodo</span>
            <span>Fatiga en dedos</span>
          </div>
          <div className="compare-row">
            <span>Durabilidad</span>
            <span>Alta</span>
            <span>Variable</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>Opiniones de clientes</h2>
        <div className="reviews-grid">
          <article className="card-soft">
            <p>"La uso a diario antes del gym. Muy cómoda y potente."</p>
            <strong>- Marta R.</strong>
          </article>
          <article className="card-soft">
            <p>"Entrega rápida y muy fácil de limpiar. Compra top."</p>
            <strong>- Daniel P.</strong>
          </article>
          <article className="card-soft">
            <p>"Buen tamaño para llevar en la mochila."</p>
            <strong>- Lucía M.</strong>
          </article>
        </div>
      </section>

      <section className="trust-icons card">
        <article>
          <span className="ti-icon">📦</span>
          <p>Envío seguro</p>
        </article>
        <article>
          <span className="ti-icon">🔒</span>
          <p>Pago protegido</p>
        </article>
        <article>
          <span className="ti-icon">🛡</span>
          <p>Garantía 30 días</p>
        </article>
        <article>
          <span className="ti-icon">✉</span>
          <p>Soporte por email</p>
        </article>
      </section>

      <section className="section-block">
        <h2>Preguntas frecuentes</h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="card-soft">
              <summary>{item.q}</summary>
              {item.q === '¿Cuánto tarda el envío?' ? (
                <p className="muted">
                  {item.a}
                  <br />
                  <br />
                  El envío tarda de <strong>6 a 8</strong> días hábiles.
                </p>
              ) : (
                <p className="muted">{item.a}</p>
              )}
            </details>
          ))}
        </div>
      </section>

      <section className="guarantee card">
        <h2>Envío y garantía</h2>
        <p className="muted">
          Compra protegida.
          <br />
          Seguimiento de pedido en todo momento.
          <br />
          Soporte directo y 30 días de devolución.
        </p>
      </section>

    </main>
  );
}

function App() {
  return (
    <>
      <div className="bg-noise"></div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/producto" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="footer">
        <p>2026 Nova Store. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('No existe #root en index.html');

ReactDOM.createRoot(rootEl).render(
  <HashRouter>
    <App />
  </HashRouter>
);

