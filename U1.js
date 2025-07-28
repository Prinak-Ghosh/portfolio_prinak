import React, { useState } from "react";

const OBJECTS = [
  {
    name: "Over-Ear Headphones",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80",
    materials: [
      { part: "Shell", material: "Plastic", details: "Durable ABS plastic forms the outer shell, providing lightweight protection and a smooth finish." },
      { part: "Band", material: "Aluminum", details: "Anodized aluminum ensures strength and flexibility for the adjustable headband." },
      { part: "Cushions", material: "Memory Foam", details: "Soft memory foam cushions offer comfort and noise isolation." },
      { part: "Wiring", material: "Copper", details: "High-purity copper wiring delivers clear audio signals with minimal loss." }
    ]
  },
  {
    name: "Mechanical Watch",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    materials: [
      { part: "Case", material: "Stainless Steel", details: "Corrosion-resistant stainless steel protects the intricate mechanisms inside." },
      { part: "Glass", material: "Sapphire Crystal", details: "Scratch-resistant sapphire crystal provides a clear view of the dial." },
      { part: "Strap", material: "Leather", details: "Premium leather strap offers comfort and classic style." },
      { part: "Gears", material: "Brass", details: "Precision-cut brass gears ensure accurate timekeeping." }
    ]
  },
  {
    name: "Ergonomic Office Chair",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    materials: [
      { part: "Backrest", material: "Mesh Fabric", details: "Breathable mesh fabric keeps you cool during long hours." },
      { part: "Seat", material: "Foam", details: "High-density foam provides ergonomic support and comfort." },
      { part: "Mechanism", material: "Steel", details: "Robust steel mechanism allows for smooth adjustments." },
      { part: "Base", material: "Nylon", details: "Reinforced nylon base ensures stability and mobility." }
    ]
  },
  {
    name: "DSLR Camera",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    materials: [
      { part: "Body", material: "Magnesium Alloy", details: "Lightweight magnesium alloy body offers durability and heat dissipation." },
      { part: "Lens", material: "Glass", details: "Precision-ground glass elements ensure sharp, clear images." },
      { part: "Grip", material: "Rubber", details: "Textured rubber grip provides secure handling." },
      { part: "Buttons", material: "Silicon", details: "Responsive silicon buttons for tactile feedback." }
    ]
  },
  {
    name: "Laptop",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    materials: [
      { part: "Chassis", material: "Aluminum", details: "CNC-milled aluminum chassis for strength and a premium feel." },
      { part: "Screen", material: "Glass", details: "Edge-to-edge glass for vibrant, immersive visuals." },
      { part: "Keyboard", material: "Plastic", details: "Precision-molded plastic keys for comfortable typing." },
      { part: "Trackpad", material: "Ceramic", details: "Smooth ceramic trackpad for precise navigation." }
    ]
  }
];

function MaterialModal({ open, onClose, object }) {
  if (!open || !object) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <h2>{object.name} – Material Details</h2>
        <ul>
          {object.materials.map((mat, idx) => (
            <li key={idx}>
              <strong>{mat.material}</strong> <span>({mat.part})</span>: {mat.details}
            </li>
          ))}
        </ul>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky-header">
      <div className="brand">Materiality</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#objects">Objects</a>
        <a href="#materials">Materials</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}

function ObjectSection({ object, onExpand, idx }) {
  return (
    <section
      className="object-section"
      style={{ background: "#f8f9fa" }}
      id={`object-${idx}`}
    >
      <div
        className="object-image-container"
        tabIndex={0}
        aria-label={`View details for ${object.name}`}
        onClick={() => onExpand(object)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") onExpand(object);
        }}
      >
        <img
          src={object.image}
          alt={object.name}
          className="object-image"
          loading="lazy"
        />
        <div className="material-box">
          <div className="material-title">{object.name}</div>
          <div className="material-list">
            {object.materials
              .map(mat => `${mat.material} (${mat.part.toLowerCase()})`)
              .join(", ")}
          </div>
          <button
            className="expand-btn"
            aria-label={`Expand material details for ${object.name}`}
            onClick={e => {
              e.stopPropagation();
              onExpand(object);
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleExpand = object => {
    setSelectedObject(object);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedObject(null);
  };

  return (
    <div className="app-root">
      <Header />
      <main>
        <div id="home" className="hero-section">
          <h1>
            The Beauty of <span className="highlight">Materials</span>
          </h1>
          <p>
            Explore the hidden complexity and design of everyday objects. Scroll to discover the materials that shape our world.
          </p>
        </div>
        <div id="objects">
          {OBJECTS.map((obj, idx) => (
            <ObjectSection
              object={obj}
              key={obj.name}
              idx={idx}
              onExpand={handleExpand}
            />
          ))}
        </div>
      </main>
      <footer>
        <div className="footer-content">
          &copy; {new Date().getFullYear()} Materiality. All rights reserved.
        </div>
      </footer>
      <MaterialModal open={modalOpen} onClose={handleClose} object={selectedObject} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        html, body, #root, .app-root {
          min-height: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Inter', Helvetica, Arial, sans-serif;
          background: #f8f9fa;
          color: #222;
        }
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.95);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 2.5rem 1.2rem 2.5rem;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.03);
        }
        .brand {
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        nav a {
          margin-left: 2rem;
          text-decoration: none;
          color: #444;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.2s;
        }
        nav a:hover {
          color: #007aff;
        }
        .hero-section {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1.5rem 2rem 1.5rem;
          background: linear-gradient(120deg, #f8f9fa 60%, #e9ecef 100%);
        }
        .hero-section h1 {
          font-size: 2.8rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          letter-spacing: -0.02em;
        }
        .highlight {
          color: #007aff;
          background: linear-gradient(90deg, #007aff 40%, #00c6fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-section p {
          font-size: 1.25rem;
          color: #555;
          max-width: 600px;
          text-align: center;
        }
        .object-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 4rem 0;
          background: #f8f9fa;
          overflow: hidden;
        }
        .object-image-container {
          position: relative;
          max-width: 600px;
          width: 90vw;
          min-height: 400px;
          background: #fff;
          border-radius: 2.2rem;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.04);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow 0.3s, transform 0.3s;
          overflow: visible;
          will-change: transform;
          outline: none;
        }
        .object-image-container:focus {
          box-shadow: 0 0 0 3px #007aff44, 0 8px 32px 0 rgba(0,0,0,0.10);
        }
        .object-image {
          width: 100%;
          height: 340px;
          object-fit: cover;
          border-radius: 2.2rem 2.2rem 1.2rem 1.2rem;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
          background: #f4f6fb;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1), filter 0.4s;
          filter: brightness(0.98) drop-shadow(0 2px 8px #0001);
        }
        .object-image-container:hover .object-image,
        .object-image-container:focus .object-image {
          transform: scale(1.035) rotateZ(-0.5deg);
          filter: brightness(1.03) drop-shadow(0 4px 16px #007aff22);
        }
        .object-image-container:hover .material-box,
        .object-image-container:focus .material-box {
          box-shadow: 0 2px 16px 0 #007aff22;
        }
        .object-image-container:active {
          transform: scale(0.98);
        }
        .material-box {
          position: absolute;
          right: 2.2rem;
          bottom: 2.2rem;
          background: rgba(255,255,255,0.92);
          border-radius: 1.1rem;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
          padding: 1.1rem 1.5rem 1.1rem 1.2rem;
          min-width: 220px;
          max-width: 320px;
          font-size: 1rem;
          color: #222;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: box-shadow 0.3s;
          z-index: 2;
        }
        .material-title {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
        }
        .material-list {
          font-size: 0.98rem;
          color: #555;
          margin-bottom: 0.7rem;
        }
        .expand-btn {
          background: linear-gradient(90deg, #007aff 60%, #00c6fb 100%);
          color: #fff;
          border: none;
          border-radius: 0.7rem;
          padding: 0.45rem 1.1rem;
          font-size: 0.98rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 4px 0 #007aff22;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .expand-btn:hover, .expand-btn:focus {
          background: linear-gradient(90deg, #005fcc 60%, #00a6d6 100%);
          box-shadow: 0 2px 8px 0 #007aff33;
        }
        .modal-overlay {
          position: fixed;
          z-index: 2000;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(30,40,60,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s;
        }
        .modal-content {
          background: #fff;
          border-radius: 1.2rem;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
          padding: 2.2rem 2.5rem 2rem 2.5rem;
          max-width: 420px;
          width: 92vw;
          color: #222;
          animation: modalPop 0.35s cubic-bezier(.22,1,.36,1);
          position: relative;
        }
        .modal-content h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.1rem;
        }
        .modal-content ul {
          padding-left: 1.1rem;
          margin-bottom: 1.5rem;
        }
        .modal-content li {
          margin-bottom: 0.7rem;
          font-size: 1.05rem;
        }
        .modal-close {
          background: #f4f6fb;
          color: #007aff;
          border: none;
          border-radius: 0.6rem;
          padding: 0.5rem 1.2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          position: absolute;
          right: 1.2rem;
          bottom: 1.2rem;
          box-shadow: 0 1px 4px 0 #007aff11;
          transition: background 0.2s;
        }
        .modal-close:hover, .modal-close:focus {
          background: #e9ecef;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          0% { transform: scale(0.92) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        footer {
          background: #f8f9fa;
          padding: 2rem 0 1.2rem 0;
          text-align: center;
          font-size: 1rem;
          color: #888;
          margin-top: 2rem;
        }
        /* Parallax/fade-in effect */
        .object-section {
          opacity: 0;
          transform: translateY(60px) scale(0.98);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        .object-section.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        /* Responsive styles */
        @media (max-width: 900px) {
          .object-image-container {
            min-height: 260px;
            max-width: 98vw;
            border-radius: 1.2rem;
          }
          .object-image {
            height: 180px;
            border-radius: 1.2rem 1.2rem 0.8rem 0.8rem;
          }
          .material-box {
            right: 1rem;
            bottom: 1rem;
            min-width: 160px;
            max-width: 90vw;
            padding: 0.8rem 1rem 0.8rem 0.8rem;
            font-size: 0.95rem;
          }
        }
        @media (max-width: 600px) {
          .sticky-header {
            padding: 0.7rem 1rem;
            flex-direction: column;
            align-items: flex-start;
          }
          nav a {
            margin-left: 1.1rem;
            font-size: 0.98rem;
          }
          .hero-section {
            padding: 2.5rem 0.5rem 1.2rem 0.5rem;
          }
          .object-section {
            padding: 2rem 0;
          }
          .object-image-container {
            min-height: 140px;
            border-radius: 0.7rem;
          }
          .object-image {
            height: 90px;
            border-radius: 0.7rem 0.7rem 0.5rem 0.5rem;
          }
          .material-box {
            right: 0.5rem;
            bottom: 0.5rem;
            min-width: 120px;
            font-size: 0.92rem;
            padding: 0.5rem 0.7rem 0.5rem 0.6rem;
          }
          .modal-content {
            padding: 1.2rem 0.7rem 1.2rem 0.7rem;
            max-width: 98vw;
          }
        }
      `}</style>
      <ScrollEffects />
    </div>
  );
}

// Scroll-based fade-in effect for sections
function ScrollEffects() {
  React.useEffect(() => {
    const sections = document.querySelectorAll(".object-section");
    const onScroll = () => {
      const trigger = window.innerHeight * 0.85;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < trigger) {
          section.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
// Main gallery component inspired by the image

function GalleryPage() {
  const items = [
    { id: 1, src: "https://randomuser.me/api/portraits/men/32.jpg", label: "Man" },
    { id: 2, src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80", label: "Hat" },
    { id: 3, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80", label: "Chair" },
    { id: 4, src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&q=80", label: "Shoe" },
    { id: 5, src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80", label: "Box" },
    { id: 6, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80", label: "Red" },
    { id: 7, src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&q=80", label: "Phone" },
    { id: 8, src: "https://randomuser.me/api/portraits/men/33.jpg", label: "Profile" },
    { id: 9, src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80", label: "Speaker" },
    { id: 10, src: "https://randomuser.me/api/portraits/men/34.jpg", label: "Guy" },
    { id: 11, src: "https://randomuser.me/api/portraits/women/32.jpg", label: "Woman" },
  ];

  const [selected, setSelected] = React.useState(6);

  return (
    <div className="gallery-root">
      {/* Top nav */}
      <div className="gallery-nav">
        <div className="gallery-nav-left">
          <button className="gallery-nav-btn">Studio – Design</button>
        </div>
        <div className="gallery-nav-center">
          <button className="gallery-nav-btn">About</button>
          <button className="gallery-nav-btn">Studio</button>
          <button className="gallery-nav-btn">Work</button>
          <button className="gallery-nav-btn">Contact</button>
        </div>
        <div className="gallery-nav-right">
          <button className="gallery-nav-btn">username@email.tld</button>
        </div>
      </div>
      {/* Main image */}
      <div className="gallery-main">
        <img
          src={items[selected].src}
          alt={items[selected].label}
          className="gallery-main-img"
        />
        <div className="gallery-main-label">{items[selected].label}</div>
      </div>
      {/* Thumbnails */}
      <div className="gallery-thumbs">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`gallery-thumb${selected === idx ? " selected" : ""}`}
            onClick={() => setSelected(idx)}
          >
            <img src={item.src} alt={item.label} />
          </div>
        ))}
        <div className="gallery-thumbs-fade">↔ More at Portfolio</div>
      </div>
      <style jsx>{`
        .gallery-root {
          min-height: 100vh;
          background: #1a0e0a;
          color: #fff;
          font-family: 'Inter', sans-serif;
          position: relative;
          padding: 0;
        }
        .gallery-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem 0.5rem 1.5rem;
        }
        .gallery-nav-left,
        .gallery-nav-center,
        .gallery-nav-right {
          display: flex;

