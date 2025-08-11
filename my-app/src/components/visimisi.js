import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBullseye, FaFlagCheckered, FaRocket, FaLeaf, FaLaptopCode } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/VisiMisi.css";

function VisiMisi() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

const misiList = [
  { icon: <FaFlagCheckered />, text: "Meningkatkan kualitas SDM Unggul yang berakhlak dan berkarakter." },
  { icon: <FaRocket />, text: "Meningkatkan Produktifitas dan Pertumbuhan Ekonomi Inklusif berbasis potensi sektor unggulan daerah." },
  { icon: <FaLaptopCode />, text: "Mewujudkan Tata Kelola Pemerintahan Yang Profesional, Inovatif, Transparan dan Akuntabel." },
  { icon: <FaLeaf />, text: "Mempercepat Pembangunan Infrastruktur dan Aksesibilitas Wilayah." },
  { icon: <FaLeaf />, text: "Meningkatkan Lingkungan hidup yang Tangguh dan Berkelanjutan." },
  { icon: <FaFlagCheckered />, text: "Mewujudkan Kondisi yang Harmonis di Masyarakat berdasarkan kearifan Budaya Lokal." }
];


  return (
    <div className="visi-misi-page py-5 position-relative">
      {/* Background animasi */}
      <div className="animated-bg"></div>
      <div className="floating-shapes"></div>

      <Container>
        {/* Judul */}
        <motion.h2
          className="text-center fw-bold text-white mb-5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Visi & Misi Kabupaten Bandung Barat
        </motion.h2>

        <Row className="g-5 align-items-center">
          {/* Visi */}
          <Col md={6} className="d-flex justify-content-center">
            <motion.div
              className="visi-card shadow-lg p-5 rounded-4 text-center glass-effect w-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <FaBullseye size={60} className="text-warning mb-4" />
              </motion.div>
              <h4 className="fw-bold text-light mb-3">Visi</h4>
              <p className="text-light fst-italic px-2">
                “Bandung Barat yang AMANAH (Agamis, Maju, Adaptif, Nyaman, Aspiratif dan Harmonis)
              </p>
            </motion.div>
          </Col>

          {/* Misi */}
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="misi-list"
            >
              <h4 className="fw-bold text-white mb-4 text-center">Misi</h4>
              <div className="d-flex flex-column gap-3">
                {misiList.map((misi, index) => (
                  <motion.div
                    key={index}
                    className="misi-item d-flex align-items-center p-3 rounded-4 shadow-sm glass-effect"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
                  >
                    <motion.div
                      className="icon text-warning fs-3 me-3"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {misi.icon}
                    </motion.div>
                    <div className="text text-white fw-semibold flex-grow-1">{misi.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VisiMisi;
