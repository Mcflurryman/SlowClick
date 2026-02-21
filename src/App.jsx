const products = [
  {
    label: 'Viral',
    name: 'Mini Proyector HD',
    description: 'Cine en casa en segundos con conexión inalámbrica.',
    price: '$74.00',
  },
  {
    label: 'Nuevo',
    name: 'Masajeador Cuello 3D',
    description: 'Relaja tensión muscular con calor inteligente.',
    price: '$29.90',
  },
  {
    label: 'Top Seller',
    name: 'Auriculares X-Bass',
    description: 'Cancelación de ruido y batería de larga duración.',
    price: '$44.90',
  },
];

const benefits = [
  {
    title: 'Pago seguro',
    description: 'Procesamiento cifrado y protección total de compra.',
  },
  {
    title: 'Envío rápido',
    description: 'Despachos en 24-48h con seguimiento en tiempo real.',
  },
  {
    title: 'Soporte real',
    description: 'Atención por chat y correo durante toda la semana.',
  },
];

const reviews = [
  {
    quote: 'Llegó rápido y la calidad es mejor de lo que esperaba. Volveré a comprar.',
    author: 'Camila R.',
  },
  {
    quote: 'La experiencia de compra fue super clara y segura. Recomendado al 100%.',
    author: 'Daniel M.',
  },
  {
    quote: 'Me gustó la presentación y el seguimiento del envío. Todo perfecto.',
    author: 'Laura P.',
  },
];

const faqs = [
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Generalmente entre 3 y 8 días hábiles según tu ubicación.',
  },
  {
    question: '¿Puedo devolver un producto?',
    answer: 'Sí, tienes 30 días para solicitar cambios o devoluciones.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Tarjetas de crédito/débito y pasarelas digitales seguras.',
  },
];

function App() {
  return (
    <>
      <div className="bg-noise"></div>

      <header className="topbar">
        <p>Oferta hasta fin de existencias</p>
      </header>

      <nav className="navbar">
        <a href="#" className="logo">
          NOVA<span>STORE</span>
        </a>
        <ul className="menu">
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#beneficios">Beneficios</a>
          </li>
          <li>
            <a href="#opiniones">Opiniones</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <button className="btn btn-outline">Ver carrito</button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="pill">TOP PRODUCTO DEL MES</span>
            <h1>Tu tienda viral para vender más con estilo</h1>
            <p>
              Diseñada para convertir: visual potente, urgencia real y enfoque en confianza para que cada visita se
              acerque a una compra.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#productos">
                Comprar ahora
              </a>
              <a className="btn btn-ghost" href="#beneficios">
                Cómo funciona
              </a>
            </div>
            <div className="metrics">
              <article>
                <h3>+12K</h3>
                <p>clientes felices</p>
              </article>
              <article>
                <h3>4.9/5</h3>
                <p>valoración media</p>
              </article>
              <article>
                <h3>48h</h3>
                <p>despacho express</p>
              </article>
            </div>
          </div>

          <div className="hero-card">
            <div className="shine"></div>
            <p className="tag">Oferta Flash</p>
            <h2>Teclado mecánico SlowClick</h2>
            <p className="desc">Portátil, recargable y perfecto para smoothies en cualquier lugar.</p>
            <div className="price-row">
              <span className="new-price">$39.90</span>
              <span className="old-price">$59.90</span>
            </div>
            <button className="btn btn-primary full">Agregar al carrito</button>
          </div>
        </section>

        <section className="products" id="productos">
          <div className="section-head">
            <h2>Productos destacados</h2>
            <p>Seleccionados por tendencia, margen y conversión.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <span className="badge">{product.label}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-bottom">
                  <strong>{product.price}</strong>
                  <button className="mini-btn">Comprar</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="benefits" id="beneficios">
          {benefits.map((benefit) => (
            <article key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </section>

        <section className="reviews" id="opiniones">
          <div className="section-head">
            <h2>Lo que dicen nuestros clientes</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article key={review.author}>
                <p>"{review.quote}"</p>
                <h4>- {review.author}</h4>
              </article>
            ))}
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="section-head">
            <h2>Preguntas frecuentes</h2>
          </div>
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>2026 Nova Store. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;
