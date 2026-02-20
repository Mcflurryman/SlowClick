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
  name: 'Smart Blender Pro',
  subtitle: 'Batidora portatil recargable',
  price: '€11,93',
  oldPrice: '€23.99',
  shortDescription:
    'Disenada para smoothies y batidos en menos de 30 segundos, sin cables y lista para llevar.',
};

const faqs = [
  {
    q: 'Cuanto tarda el envio?',
    a: 'La preparacion del pedido tarda de 3-4 dias.',
  },
  {
    q: 'Tiene garantia?',
    a: 'Si. Tienes 30 dias de garantia de satisfaccion y soporte postventa.',
  },
  {
    q: 'Que incluye la caja?',
    a: 'Batidora, tapa anti fugas, cable USB-C y mini guia de uso.',
  },
  {
    q: 'Se puede usar para hielo?',
    a: 'Si, en cubos pequenos y con suficiente liquido para un mejor resultado.',
  },
];

const quickFaqs = [
  {
    q: 'Cuanto tarda el envio?',
    a: 'La preparacion del pedido tarda de 3-4 dias.',
  },
  {
    q: 'Tiene garantia?',
    a: 'Si. Tienes 30 dias de garantia de satisfaccion y soporte postventa.',
  },
  {
    q: 'Que incluye la caja?',
    a: 'Batidora, tapa anti fugas, cable USB-C y mini guia de uso.',
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
        <p>Envio gratis en pedidos +€49 | 30 dias de garantia</p>
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
        <h1>Una tienda enfocada en un solo producto que convierte mas</h1>
        <p className="muted">
          Todo el trafico llega a una sola oferta: menos distracciones, mas claridad y una compra mas rapida.
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
          <p className="muted">Valoracion media</p>
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
          <p className="stock-alert">Quedan 19 en stock. Ultimas unidades.</p>
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
              <span>No te morderas mas las unas.</span>
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
                {item.q === 'Cuanto tarda el envio?' ? (
                  <p className="muted">
                    {item.a}
                    <br />
                    <br />
                    El envio tarda de <strong>6 a 8</strong> dias habiles.
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

      <section className="flow-card card flow-image">
        <img src={descripcion2Img} alt="Detalle de construccion del producto" className="flow-image-media" />
      </section>

      <section className="flow-card card flow-text">
        <h2>¿Manos inquietas?</h2>
        <p>
          Si te muerdes las uñas, esto es para ti.
          <br />
          Si no puedes estar quieto en reuniones, tambien.
          <br />
          Si necesitas tocar algo cuando te pones nervioso, aun mas.
        </p>
        <ul className="flow-chip-list">
          <li>En la oficina</li>
          <li>En clase</li>
          <li>En casa</li>
          <li>En el transporte</li>
        </ul>
      </section>

      <section className="flow-card card flow-image">
        <img src={foto5Img} alt="Uso real del producto" className="flow-image-media" />
      </section>

      <section className="flow-card card flow-text">
        <h2>Tu pausa diaria contra la ansiedad</h2>
        <p>
          Vas de prisa todo el dia.
          <br />
          Tu mente no para.
          <br />
          Tu cuerpo lo nota.
          <br />
          No es debilidad. Es saturacion.
          <br />
          Una pausa corta cambia mucho.
          <br />
          Empieza hoy a recuperar tu calma.
        </p>
      </section>

      <section className="benefit-grid card">
        <article className="benefit-item">
          <span className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 12h16M7 7h10M9 17h6" />
            </svg>
          </span>
          <p>Descarga micro-estres inmediato</p>
        </article>
        <article className="benefit-item">
          <span className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="7" y="3" width="10" height="18" rx="2" />
              <path d="M10 6h4M10 18h4" />
            </svg>
          </span>
          <p>Portatil y discreto</p>
        </article>
        <article className="benefit-item">
          <span className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 14l6-8 6 8M8 18h8" />
            </svg>
          </span>
          <p>Feedback mecanico satisfactorio</p>
        </article>
        <article className="benefit-item">
          <span className="benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 19h16M7 19V9h10v10M9 6h6" />
            </svg>
          </span>
          <p>Perfecto para estudiar o trabajar</p>
        </article>
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
                pressKey(key.id);
              }}
              onPointerUp={() => releaseKey(key.id)}
              onPointerCancel={() => releaseKey(key.id)}
              onContextMenu={(event) => event.preventDefault()}
              aria-label={`Tecla ${key.label}`}
            >
              <span className={`key-led ${pressedKeys.includes(key.id) ? 'is-on' : ''}`} />
              <span className="key-shell">
                <span className="keycap-top" />
                <span className="key-switch" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Beneficios clave</h2>
        <div className="grid-benefits">
          <article className="card-soft">
            <h3>Potencia real</h3>
            <p className="muted">Textura uniforme en segundos para batidos y smoothies.</p>
          </article>
          <article className="card-soft">
            <h3>100% portatil</h3>
            <p className="muted">Usala en casa, oficina o gimnasio sin depender de enchufes.</p>
          </article>
          <article className="card-soft">
            <h3>Facil limpieza</h3>
            <p className="muted">Agua + una gota de jabon y lista para el siguiente uso.</p>
          </article>
        </div>
      </section>

      <section className="section-block">
        <h2>Comparativa rapida</h2>
        <div className="compare card-soft">
          <div className="compare-row compare-head">
            <span>Caracteristica</span>
            <span>Smart Blender Pro</span>
            <span>Generica</span>
          </div>
          <div className="compare-row">
            <span>Bateria</span>
            <span>Alta autonomia</span>
            <span>Media</span>
          </div>
          <div className="compare-row">
            <span>Limpieza</span>
            <span>Rapida</span>
            <span>Mas lenta</span>
          </div>
          <div className="compare-row">
            <span>Portabilidad</span>
            <span>Muy alta</span>
            <span>Media</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>Opiniones de clientes</h2>
        <div className="reviews-grid">
          <article className="card-soft">
            <p>"La uso a diario antes del gym. Muy comoda y potente."</p>
            <strong>- Marta R.</strong>
          </article>
          <article className="card-soft">
            <p>"Entrega rapida y muy facil de limpiar. Compra top."</p>
            <strong>- Daniel P.</strong>
          </article>
          <article className="card-soft">
            <p>"Buen tamano para llevar en la mochila."</p>
            <strong>- Lucia M.</strong>
          </article>
        </div>
      </section>

      <section className="trust-icons card">
        <article>
          <span className="ti-icon">📦</span>
          <p>Envio seguro</p>
        </article>
        <article>
          <span className="ti-icon">🔒</span>
          <p>Pago protegido</p>
        </article>
        <article>
          <span className="ti-icon">🛡</span>
          <p>Garantia 30 dias</p>
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
              {item.q === 'Cuanto tarda el envio?' ? (
                <p className="muted">
                  {item.a}
                  <br />
                  <br />
                  El envio tarda de <strong>6 a 8</strong> dias habiles.
                </p>
              ) : (
                <p className="muted">{item.a}</p>
              )}
            </details>
          ))}
        </div>
      </section>

      <section className="guarantee card">
        <h2>Envio y garantia</h2>
        <p className="muted">
          Compra protegida.
          <br />
          Seguimiento de pedido en todo momento.
          <br />
          Soporte directo y 30 dias de devolucion.
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

