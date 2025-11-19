import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="inicio" className="ini">
            <h2>¡Descubre la frescura del campo con HuertoHogar!</h2>
            <p>Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.</p>
            <Link to="/producto">
            <button>Explorar productos</button>
            </Link>

        </section>

        <section id="nosotros" className="mision-vision">
            <h2>Sobre nosotros..</h2>
            <div className="bloque">
                <div className="texto">
                    <h3>Nuestra Misión</h3>
                    <p>Proporcionar productos frescos y de calidad directamente desde el campo...</p>
                </div>
                <div className="imagen">
                    <img src="/fotos/mision.jpg" alt="Trabajo en el campo" />
                </div>
            </div>
            <div className="bloque">
                <div className="imagen">
                    <img src="/fotos/vision.jpg" alt="Cultivo con maquinaria" />
                </div>
                <div className="texto">
                    <h3>Nuestra Visión</h3>
                    <p>Ser la tienda online líder en Chile, reconocida por calidad, servicio y sostenibilidad.</p>
                </div>
            </div>
        </section>

        <section id="productos" className="categorias">
            <h2>Categorías destacadas</h2>
            <div className="cards">
                <article className="card">
                    <img src="/fotos/frutas.png" alt="frutas frescas" />
                    <h3>Frutas Frescas</h3>
                    <p>Manzanas, naranjas, plátanos...</p>
                </article>
                <article className="card">
                    <img src="/fotos/verduras.webp" alt="verduras frescas" />
                    <h3>Verduras Orgánicas</h3>
                    <p>Zanahorias, espinacas, pimientos...</p>
                </article>
                <article className="card">
                    <img src="/fotos/lacteos.png" alt="productos lacteos" />
                    <h3>Productos Lácteos</h3>
                    <p>Leche, yogur y más.</p>
                </article>
                <article className="card">
                    <img src="/fotos/miel.png" alt="productos organicos" />
                    <h3>Miel & Orgánicos</h3>
                    <p>Miel, quinua y otros.</p>
                </article>
            </div>
        </section>

        <section id="blog">
            <h2>Blog y Noticias</h2>
            <img src="/fotos/noticia logo.png" alt="logo en el blog noticia" />
            <div>
                <article>
                    <h3>Beneficios de consumir productos locales</h3>
                    <p>Conectar con agricultores locales reduce la huella de carbono...</p>
                </article>
                <article>
                    <h3>Receta: Ensalada de espinacas frescas</h3>
                    <p>Fácil, rápida y saludable para toda la familia...</p>
                </article>
            </div>
        </section>

        <section id="contacto">
            <div>
                <h2>Contáctanos</h2>
                <p>Email: contacto@huertohogar.cl</p>
                <p>Teléfono: +56 9 1234 5678</p>
            </div>
            <div>
                <h2>Síguenos en redes sociales</h2>
                <p>Huerto_Hogar en Instagram</p>
                <p>HUERTO HOGAR🥬 en Facebook </p>
                <p>Huerto a tu Hogar en TikTok</p>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;