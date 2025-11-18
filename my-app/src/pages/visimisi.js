import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBullseye, FaFlagCheckered, FaRocket, FaLeaf, FaLaptopCode } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/SejVis.css";
import { Helmet } from "react-helmet";
import { HeroVim } from "../components/heroVim";

function VisiMisi() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const misiList = [
    { icon: <FaFlagCheckered />, text: "Meningkatkan kualitas SDM Unggul yang berakhlak dan berkarakter." },
    { icon: <FaRocket />, text: "Meningkatkan Produktifitas dan Pertumbuhan Ekonomi Inklusif berbasis potensi sektor unggulan daerah." },
    { icon: <FaLaptopCode />, text: "Mewujudkan Tata Kelola Pemerintahan Yang Profesional, Inovatif, Transparan dan Akuntabel." },
    { icon: <FaLeaf />, text: "Mempercepat Pembangunan Infrastruktur dan Aksesibilitas Wilayah." },
    { icon: <FaLeaf />, text: "Meningkatkan Lingkungan hidup yang Tangguh dan Berkelanjutan." },
    { icon: <FaFlagCheckered />, text: "Mewujudkan Kondisi yang Harmonis berdasarkan kearifan Budaya Lokal." }
  ];

  return (
    <>
      <HeroVim />
      <div className="section-page py-5 position-relative floating-shapes">
        <Helmet>
          <title>Visi & Misi Kabupaten Bandung Barat | OpenDataKBB</title>
        </Helmet>
        {/* Background soft */}
        <div className="animated-bg"></div>
        <Container className="mt-5">
          <Row className="g-5 align-items-center">
            {/* VISI */}
            <Col md={6} className="d-flex justify-content-center">
              <motion.div
                className="visi-card shadow-lg p-5 rounded-4 text-center text-dark glass-card w-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaBullseye size={60} className="text-warning mb-4" />
                </motion.div>
                <h4 className="fw-bold text-dark mb-3">Visi</h4>
                <p className="text-dark fst-italic small px-2 opacity-90">
                  “Bandung Barat yang AMANAH (Agamis, Maju, Adaptif, Nyaman, Aspiratif dan Harmonis)”
                </p>
              </motion.div>
            </Col>
            {/* MISI */}
            <Col md={6}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="fw-bold text-dark mb-4 text-center">Misi</h4>
                <div className="d-flex flex-column gap-3">
                  {misiList.map((misi, index) => (
                    <motion.div
                      key={index}
                      className="misi-item d-flex align-items-center p-3 rounded-4 shadow glass-card"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.15, type: "spring" }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 4px 18px rgba(255,255,255,0.25)",
                      }}
                    >
                      <motion.div
                        className="icon text-warning fs-3 me-3"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {misi.icon}
                      </motion.div>

                      <div className="text text-dark fw-semibold flex-grow-1 small opacity-95">
                        {misi.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default VisiMisi;
