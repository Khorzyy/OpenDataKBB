import { useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaLandmark, FaCalendarAlt, FaRocket } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/SejVis.css';
import { Helmet } from 'react-helmet';
import lembangImg from '../assets/lembang.png';
import situCileuncaImg from '../assets/Cileunca_Lake.jpg';
import padalarangImg from '../assets/padalarang.jpg';
import { HeroSej } from '../components/heroSej';

function SejarahKBB() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const timeline = [
    {
      icon: <FaLandmark size={24} />,
      color: 'linear-gradient(135deg,#4e8cff,#60d2ff)',
      title: 'Awal Mula',
      desc: `KBB terbentuk pada 2 Januari 2007 lewat UU No. 12 Tahun 2007 sebagai hasil pemekaran dari Kabupaten Bandung.`,
    },
    {
      icon: <FaCalendarAlt size={24} />,
      color: 'linear-gradient(135deg,#2ecc71,#a8ff5c)',
      title: 'Proses Pemekaran',
      desc: `Aspirasi masyarakat menjadi pemicu utama. Ngamprah dipilih sebagai ibu kota.`,
    },
    {
      icon: <FaMapMarkedAlt size={24} />,
      color: 'linear-gradient(135deg,#ffc94a,#ff8c00)',
      title: 'Wilayah & Potensi',
      desc: `Terdiri dari 16 kecamatan, KBB dikenal dengan panorama alamnya.`,
    },
    {
      icon: <FaRocket size={24} />,
      color: 'linear-gradient(135deg,#ff4b5c,#ff2d7f)',
      title: 'Visi Masa Depan',
      desc: `“Ngamumule Budaya, Ngawangun Nagara” menjadi arah pembangunan KBB.`,
    },
  ];

  const images = [
    { src: lembangImg, alt: 'Lembang', caption: 'Pesona Lembang yang menyejukkan.' },
    { src: situCileuncaImg, alt: 'Situ Cileunca', caption: 'Danau alami penuh pesona.' },
    { src: padalarangImg, alt: 'Padalarang', caption: 'Perbukitan kapur yang ikonik.' },
  ];

  return (
    <>
      <HeroSej />
      <section className="section-page py-5 sejarah-kbb detail-page position-relative">
        <Helmet>
          <title>Sejarah Kabupaten Bandung Barat | OpenDataKBB</title>
        </Helmet>
        {/* BG Soft */}
        <div className="animated-bg"></div>

        <Container className='mt-5'>

          <Row className="align-items-stretch">
            {/* Timeline */}
            <Col md={6} className="mb-4">
              <div className="timeline-wrapper position-relative ps-4">

                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="timeline-item d-flex mb-5 align-items-start"
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -35 : 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                  >
                    <div
                      className="timeline-icon d-flex justify-content-center align-items-center me-3 shadow-sm"
                      style={{
                        width: 60,
                        aspectRatio: 1,
                        borderRadius: '50%',
                        background: item.color,
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="p-3 rounded shadow-sm timeline-card">
                      <h5 className="fw-semibold mb-1">{item.title}</h5>
                      <p className="text-dark small mb-0 opacity-90">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Vertical Line */}
                <div
                  className="position-absolute top-0 start-0"
                  style={{
                    width: 3,
                    height: '100%',
                    background: 'rgba(255,255,255,0.2)',
                  }}
                ></div>
              </div>
            </Col>

            {/* Carousel */}
            <Col md={6} className="mb-4">
              <Carousel className="shadow-lg rounded overflow-hidden">
                {images.map((img, idx) => (
                  <Carousel.Item key={idx} interval={4500}>
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="d-block w-100"
                      style={{
                        height: 350,
                        objectFit: 'cover',
                        filter: 'brightness(0.93)',
                      }}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 3 }}
                    />
                    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3 shadow-lg">
                      <motion.h5
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {img.alt}
                      </motion.h5>
                      <motion.p
                        className="small"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                      >
                        {img.caption}
                      </motion.p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>

          {/* Quote */}
          <motion.div
            className="mt-5 text-center fst-italic text-dark opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            “Sejarah adalah fondasi untuk masa depan yang lebih baik.”
          </motion.div>
        </Container>
      </section>
    </>
  );
}

export default SejarahKBB;
