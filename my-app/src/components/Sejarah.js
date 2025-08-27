import { useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaLandmark, FaCalendarAlt, FaRocket } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Sejarah.css';

import lembangImg from '../assets/lembang.png';
import situCileuncaImg from '../assets/lembang.png';
import padalarangImg from '../assets/lembang.png';

function SejarahKBB() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const timeline = [
    {
      icon: <FaLandmark size={24} />,
      color: 'linear-gradient(135deg,#007bff,#00c6ff)',
      title: 'Awal Mula',
      desc: `KBB terbentuk pada 2 Januari 2007 lewat UU No. 12 Tahun 2007 sebagai hasil pemekaran dari Kabupaten Bandung. Tujuannya untuk mendekatkan pelayanan publik dan mengoptimalkan potensi wilayah barat.`,
    },
    {
      icon: <FaCalendarAlt size={24} />,
      color: 'linear-gradient(135deg,#28a745,#a2ff00)',
      title: 'Proses Pemekaran',
      desc: `Aspirasi masyarakat menjadi pemicu utama. Melalui perjuangan tokoh lokal, Ngamprah dipilih sebagai ibu kota. Proses ini menyatukan semangat kebersamaan dan harapan baru.`,
    },
    {
      icon: <FaMapMarkedAlt size={24} />,
      color: 'linear-gradient(135deg,#ffc107,#ff7b00)',
      title: 'Wilayah & Potensi',
      desc: `Terdiri dari 16 kecamatan, KBB dikenal dengan panorama alamnya. Lembang, Padalarang, dan Cisarua jadi destinasi favorit wisata dan pertanian subur.`,
    },
    {
      icon: <FaRocket size={24} />,
      color: 'linear-gradient(135deg,#dc3545,#ff006e)',
      title: 'Visi Masa Depan',
      desc: `KBB ingin menjadi kabupaten maju dan berbudaya, dengan semangat “Ngamumule Budaya, Ngawangun Nagara”. Visi ini membawa arah pembangunan berbasis inovasi dan kearifan lokal.`,
    },
  ];

  const images = [
    { src: lembangImg, alt: 'Lembang', caption: 'Pesona Lembang yang menyejukkan dan penuh daya tarik wisata.' },
    { src: situCileuncaImg, alt: 'Situ Cileunca', caption: 'Danau alami dan udara segar menjadi kekayaan Situ Cileunca.' },
    { src: padalarangImg, alt: 'Padalarang', caption: 'Wilayah batu kapur dan perbukitan, simbol potensi geologi Padalarang.' },
  ];

  return (
    <section className="py-5 sejarah-kbb detail-page position-relative">

      {/* Decorative Elements */}
      <div className="animated-bg"></div>
      <div className="floating-shapes"></div>

      <Container>
        {/* Heading */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="display-5 fw-bold text-gradient">Sejarah Kabupaten Bandung Barat</h2>
          <p className="lead text-light">
            Menelusuri jejak perjuangan, perkembangan, dan harapan masa depan KBB.
          </p>
          <hr className="w-25 mx-auto" />
        </motion.div>

        <Row className="align-items-stretch">
          {/* Timeline */}
          <Col md={6} className="mb-4">
            <div className="timeline-wrapper position-relative ps-4">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="timeline-item d-flex mb-5 align-items-center"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <div
                    className="timeline-icon d-flex justify-content-center align-items-center me-3 shadow-lg"
                    style={{
                      width: 65,
                      aspectRatio: 1,
                      borderRadius: '50%',
                      background: item.color,
                      boxShadow: '0 0 15px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="p-3 rounded shadow-sm timeline-card">
                    <h5 className="fw-bold mb-1">{item.title}</h5>
                    <p className="text-light small mb-0">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div
                className="position-absolute top-0 start-0 bg-secondary"
                style={{ width: 3, height: '100%' }}
              ></div>
            </div>
          </Col>

          {/* Carousel */}
          <Col md={6} className="mb-4">
            <Carousel className="shadow-lg rounded overflow-hidden">
              {images.map((img, idx) => (
                <Carousel.Item key={idx} interval={4000}>
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="d-block w-100"
                    style={{
                      height: 350,
                      objectFit: 'cover',
                      filter: 'brightness(0.95)',
                    }}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 4 }}
                  />
                  <Carousel.Caption className="bg-gradient-to-r from-black/70 to-black/30 rounded p-3 shadow-lg">
                    <motion.h5
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {img.alt}
                    </motion.h5>
                    <motion.p
                      className="small"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
          className="mt-5 text-center fst-italic text-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          “Sejarah bukan hanya tentang masa lalu, tapi pijakan untuk melangkah lebih jauh menuju masa depan yang lebih baik.”
        </motion.div>
      </Container>
    </section>
  );
}

export default SejarahKBB;
