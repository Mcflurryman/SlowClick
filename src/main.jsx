import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
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

const legalData = {
  brand: 'SlowClick',
  holder: 'Jonatan Luengo Requena',
  taxId: '49283756T',
  address: 'Carrer Camí Ral 14, Puerta 21, Esparreguera, 08292 (Barcelona, España)',
  email: 'Slowclickerr@hotmail.com',
  updatedAt: '21 de febrero de 2026',
};

const COOKIE_CONSENT_KEY = 'slowclick_cookie_consent_v1';

const faqs = [
  {
    q: '¿Cuánto tarda el envío?',
    a: 'La preparación del pedido tarda entre 24 y 72 horas.',
  },
  {
    q: '¿Tiene garantía?',
    a: 'Sí. Tienes 30 días de garantía de satisfacción y soporte posventa.',
  },
  {
    q: '¿Hace mucho ruido al pulsar?',
    a: 'No. El sonido es suave y discreto, pensado para usarlo en casa, clase u oficina.',
  },
  {
    q: '¿Se puede usar durante muchas horas?',
    a: 'Sí. Está diseñado para uso diario, con materiales resistentes y tacto constante.',
  },
  {
    q: '¿Sirve para ansiedad o para mejorar el foco?',
    a: 'Sí. La pulsación mecánica ayuda a descargar tensión y mantener las manos ocupadas para concentrarte mejor.',
  },
];

const quickFaqs = [
  {
    q: '¿Cuánto tarda el envío?',
    a: 'La preparación del pedido tarda entre 24 y 72 horas.',
  },
  {
    q: '¿Tiene garantía?',
    a: 'Sí. Tienes 30 días de garantía de satisfacción y soporte posventa.',
  },
  {
    q: '¿Hace mucho ruido?',
    a: 'No. El sonido es suave y discreto para usarlo en cualquier lugar.',
  },
];

const customerReviews = [
  {
    name: 'Carmen G.',
    image: `${import.meta.env.BASE_URL}image2.png`,
    text: 'Me llegó en 48 horas y se nota la calidad del teclado. El click es muy satisfactorio y me ayuda a calmar la ansiedad cuando trabajo.',
  },
  {
    name: 'Sergio L.',
    image: `${import.meta.env.BASE_URL}image1.png`,
    text: 'Entrega rapidísima, en dos días lo tenía en casa. Es discreto, cómodo y lo uso en la oficina sin molestar a nadie.',
  },
  {
    name: 'Paula N.',
    image: `${import.meta.env.BASE_URL}image.png`,
    text: 'Reseña real: envío súper rápido y producto tal cual en las fotos. Lo llevo en la mochila y me ayuda a mantener el foco más tiempo.',
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
        <div className="topbar-track">
          <span className="topbar-item">{`Envio gratis          La oferta del 50% de DTO terminara cuando se agoten existencias`}</span>
          <span className="topbar-item" aria-hidden="true">{`Envio gratis          La oferta del 50% de DTO terminara cuando se agoten existencias`}</span>
        </div>
      </header>
      <nav className="navbar container">
        <button className="logo link-btn" onClick={() => navigate('/products')}>
          <img src={logoHeavyImg} alt="Logo de la tienda" className="logo-image" />
        </button>

        <div className="menu">
          <button className="link-btn" onClick={() => navigate('/products')}>
            Producto
          </button>
        </div>
      </nav>
    </>
  );
}

function ProductPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [videoError, setVideoError] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
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

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

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
          <div className="product-rating" aria-label="Valoración media 4.9 de 5">
            <span className="rating-stars">{'\u2605\u2605\u2605\u2605\u2605'}</span>
            <span className="rating-score">4.9 / 5</span>
          </div>
          <p className="rating-note">+1400 personas han confiado en nosotros</p>
          <p className="muted">{product.shortDescription}</p>

          <div className="price-row">
            <span className="new-price">{product.price}</span>
            <span className="old-price">{product.oldPrice}</span>
            <span className="save-badge">-{discountPercent}%</span>
          </div>

          <ul className="quick-benefits">
            <li>
              <span className="qb-icon" aria-hidden="true"></span>
              <span>Calma la ansiedad en segundos.</span>
            </li>
            <li>
              <span className="qb-icon" aria-hidden="true"></span>
              <span>Te ayuda con tu TDAH.</span>
            </li>
            <li>
              <span className="qb-icon" aria-hidden="true"></span>
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
                ) : (
                  <p className="muted">{item.a}</p>
                )}
              </details>
            ))}
          </div>

        </div>
      </section>

      <section className="trust-icons card">
        <article>
          <span className="ti-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="M7 9V7a5 5 0 0 1 10 0v2" />
            </svg>
          </span>
          <p>Envío seguro</p>
        </article>
        <article>
          <span className="ti-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 1 1 8 0v3" />
            </svg>
          </span>
          <p>Pago protegido</p>
        </article>
        <article>
          <span className="ti-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3 5 6v6c0 4 2.5 7.5 7 9 4.5-1.5 7-5 7-9V6l-7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <p>Garantía 30 días</p>
        </article>
        <article>
          <span className="ti-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>
          <p>Soporte por email</p>
        </article>
      </section>

      <section className="flow-card card flow-text flow-media-stack">
        {videoError ? (
          <img
            src={`${import.meta.env.BASE_URL}IMG_5091.gif`}
            alt="Demostración del uso del producto"
            className="flow-image-media"
          />
        ) : (
          <video
            className="flow-image-media"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={`${import.meta.env.BASE_URL}IMG_5091.gif`}
            onError={() => setVideoError(true)}
            aria-label="Demostración del uso del producto"
          >
            <source src={`${import.meta.env.BASE_URL}IMG_5091.mp4`} type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        )}
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
              <span className="benefit-check" aria-hidden="true">?</span>
            </div>
            <p className="muted">Reduce el nerviosismo en segundos con cada pulsación.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Mejor concentración</h3>
              <span className="benefit-check" aria-hidden="true">?</span>
            </div>
            <p className="muted">Mantén las manos ocupadas y la mente enfocada más tiempo.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Discreto y portátil</h3>
              <span className="benefit-check" aria-hidden="true">?</span>
            </div>
            <p className="muted">Úsalo en clase, oficina o transporte sin llamar la atención.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Satisfacción táctil real</h3>
              <span className="benefit-check" aria-hidden="true">?</span>
            </div>
            <p className="muted">Pulsación mecánica agradable para descargar tensión al instante.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Material resistente</h3>
              <span className="benefit-check" aria-hidden="true">?</span>
            </div>
            <p className="muted">Diseñado para aguantar el uso diario sin perder sensación.</p>
          </article>
          <article className="card-soft benefit-card">
            <div className="benefit-title-row">
              <h3>Listo al momento</h3>
              <span className="benefit-check" aria-hidden="true">?</span>
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
        <p className="muted">Reseñas reales verificadas</p>
        <div className="reviews-grid">
          {customerReviews.map((review) => (
            <article className="card-soft review-card" key={review.name}>
              <button
                type="button"
                className="review-image-btn"
                onClick={() => setLightboxImage({ src: review.image, alt: `Compra de ${review.name}` })}
                aria-label={`Ver imagen completa de ${review.name}`}
              >
                <img src={review.image} alt={`Compra de ${review.name}`} className="review-image" />
              </button>
              <div className="review-stars" aria-label="5 de 5 estrellas">{'\u2605\u2605\u2605\u2605\u2605'}</div>
              <p>"{review.text}"</p>
              <strong>- {review.name}</strong>
            </article>
          ))}
        </div>
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

      {lightboxImage && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightboxImage(null)}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
            aria-label="Cerrar imagen"
          >
            ×
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

    </main>
  );
}

function LegalLayout({ title, children }) {
  return (
    <main className="container page-gap legal-page">
      <section className="card legal-card">
        <h1>{title}</h1>
        <p className="muted legal-updated">Última actualización: {legalData.updatedAt}</p>
        {children}
      </section>
    </main>
  );
}

function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso Legal">
      <h2>Datos identificativos</h2>
      <p>
        Titular: <strong>{legalData.holder}</strong>
        <br />
        NIF: {legalData.taxId}
        <br />
        Domicilio: {legalData.address}
        <br />
        Email de contacto: {legalData.email}
      </p>
      <h2>Objeto</h2>
      <p>
        Este sitio web ofrece información y venta online de productos de la marca {legalData.brand}. El acceso y uso
        de la web implica la aceptación de este aviso legal.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los contenidos, textos, imágenes y elementos de diseño de la web son propiedad del titular o de terceros con
        autorización, y no pueden reproducirse sin permiso previo.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        El titular no se responsabiliza de interrupciones técnicas, errores puntuales o daños derivados del uso
        indebido del sitio por parte de usuarios.
      </p>
      <h2>Legislación aplicable</h2>
      <p>La relación con el usuario se regirá por la normativa española y europea aplicable.</p>
    </LegalLayout>
  );
}

function PrivacidadPage() {
  return (
    <LegalLayout title="Política de Privacidad">
      <h2>Responsable del tratamiento</h2>
      <p>
        Responsable: <strong>{legalData.holder}</strong>
        <br />
        NIF: {legalData.taxId}
        <br />
        Email: {legalData.email}
        <br />
        Dirección: {legalData.address}
      </p>
      <h2>Datos que tratamos</h2>
      <p>
        Datos identificativos y de contacto (nombre, email, teléfono), datos de envío/facturación y datos necesarios
        para gestionar pedidos y atención al cliente.
      </p>
      <h2>Finalidades</h2>
      <ul>
        <li>Gestionar pedidos, pagos, envíos y devoluciones.</li>
        <li>Atender consultas y soporte posventa.</li>
        <li>Cumplir obligaciones legales y fiscales.</li>
      </ul>
      <h2>Base jurídica</h2>
      <ul>
        <li>Ejecución de un contrato de compra.</li>
        <li>Cumplimiento de obligaciones legales.</li>
        <li>Consentimiento del usuario cuando proceda.</li>
      </ul>
      <h2>Conservación</h2>
      <p>
        Los datos se conservarán durante el tiempo necesario para cumplir la finalidad y los plazos legales aplicables.
      </p>
      <h2>Destinatarios</h2>
      <p>
        Los datos podrán compartirse con proveedores de pago, logística, hosting y herramientas técnicas estrictamente
        necesarias para prestar el servicio.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo
        a {legalData.email}.
      </p>
    </LegalLayout>
  );
}

function CookiesPage() {
  return (
    <LegalLayout title="Política de Cookies">
      <h2>¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos que se almacenan en tu dispositivo para mejorar la experiencia de navegación y permitir
        funciones técnicas de la web.
      </p>
      <h2>Tipos de cookies</h2>
      <ul>
        <li>Técnicas: necesarias para el funcionamiento básico de la tienda en Shopify.</li>
        <li>Analíticas: no se utilizan actualmente herramientas analíticas adicionales.</li>
        <li>Marketing: no se utilizan actualmente cookies publicitarias adicionales.</li>
      </ul>
      <h2>Gestión del consentimiento</h2>
      <p>
        Puedes aceptar, rechazar o configurar cookies no necesarias desde el banner o la configuración de tu navegador.
      </p>
      <h2>Cómo desactivar cookies</h2>
      <p>
        Puedes bloquear o eliminar cookies desde la configuración de Chrome, Safari, Firefox o Edge en cualquier
        momento.
      </p>
    </LegalLayout>
  );
}

function CondicionesCompraPage() {
  return (
    <LegalLayout title="Términos y Condiciones de Compra">
      <h2>Objeto y ámbito</h2>
      <p>
        Estas condiciones regulan la compra de productos en la tienda online {legalData.brand}.
      </p>
      <h2>Proceso de compra</h2>
      <p>
        El cliente selecciona el producto, confirma el pedido y realiza el pago mediante los métodos habilitados en la
        web.
      </p>
      <h2>Precio e impuestos</h2>
      <p>
        Los precios se muestran en euros e incluyen los impuestos aplicables, salvo indicación expresa en contrario.
      </p>
      <h2>Envíos</h2>
      <p>
        El coste de envío es gratuito para el cliente. La preparación del pedido se realiza entre 24 y 72 horas y la
        entrega estimada es de 6 a 8 días hábiles.
      </p>
      <h2>Garantía</h2>
      <p>Los productos cuentan con garantía legal conforme a la normativa de consumo vigente.</p>
      <h2>Atención al cliente</h2>
      <p>Para incidencias o dudas sobre el pedido, contacta en {legalData.email}.</p>
    </LegalLayout>
  );
}

function DevolucionesPage() {
  return (
    <LegalLayout title="Politica de Devoluciones y Derecho de Desistimiento">
      <h2>Condiciones de devolucion</h2>
      <p>
        Se aceptan devoluciones si el producto llega roto, presenta un defecto de funcionamiento o si el paquete se
        encuentra sin abrir y en perfecto estado.
      </p>
      <h2>Gastos de devolucion</h2>
      <p>
        Cuando el producto llega danado o no funciona correctamente, {legalData.brand} asume el coste de la
        devolucion.
      </p>
      <h2>Estado del producto</h2>
      <p>
        En devoluciones por desistimiento, el articulo debe conservarse en estado original, sin uso y con su embalaje.
      </p>
      <h2>Reembolso</h2>
      <p>
        El reembolso se realizara por el mismo metodo de pago en un plazo maximo legal tras validar la devolucion.
      </p>
      <h2>Como solicitar una devolucion</h2>
      <p>
        Solicita la devolucion escribiendo a {legalData.email} e indicando numero de pedido y motivo.
      </p>
    </LegalLayout>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) {
      setVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setAnalytics(Boolean(parsed.analytics));
      setMarketing(Boolean(parsed.marketing));
    } catch (_error) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (nextAnalytics, nextMarketing) => {
    const payload = {
      necessary: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className="cookie-banner" role="dialog" aria-live="polite" aria-label="Configuracion de cookies">
      <div className="cookie-text">
        <strong>Usamos cookies</strong>
        <p>
          Utilizamos cookies tecnicas necesarias y, si lo aceptas, analiticas y de marketing para mejorar tu
          experiencia. Puedes cambiarlo en cualquier momento.
        </p>
        <Link to="/legal/cookies">Ver politica de cookies</Link>
      </div>

      <div className="cookie-actions">
        <button className="btn btn-primary" onClick={() => saveConsent(true, true)}>
          Aceptar todas
        </button>
        <button className="btn btn-ghost" onClick={() => saveConsent(false, false)}>
          Rechazar no necesarias
        </button>
        <button className="btn btn-outline" onClick={() => setExpanded((current) => !current)}>
          Configurar
        </button>
      </div>

      {expanded && (
        <div className="cookie-settings">
          <label>
            <input type="checkbox" checked disabled />
            Cookies tecnicas (obligatorias)
          </label>
          <label>
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            Cookies analiticas
          </label>
          <label>
            <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
            Cookies de marketing
          </label>
          <button className="btn btn-primary" onClick={() => saveConsent(analytics, marketing)}>
            Guardar preferencias
          </button>
        </div>
      )}
    </section>
  );
}

function App() {
  return (
    <>
      <div className="bg-noise"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/producto" element={<ProductPage />} />
        <Route path="/legal/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/legal/privacidad" element={<PrivacidadPage />} />
        <Route path="/legal/cookies" element={<CookiesPage />} />
        <Route path="/legal/condiciones-compra" element={<CondicionesCompraPage />} />
        <Route path="/legal/devoluciones" element={<DevolucionesPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
      <CookieBanner />
      <footer className="footer">
        <div className="legal-links">
          <Link to="/legal/aviso-legal">Aviso Legal</Link>
          <Link to="/legal/privacidad">Privacidad</Link>
          <Link to="/legal/cookies">Cookies</Link>
          <Link to="/legal/condiciones-compra">Condiciones</Link>
          <Link to="/legal/devoluciones">Devoluciones</Link>
        </div>
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


