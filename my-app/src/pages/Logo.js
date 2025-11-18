// components/MaknaLogo.js
import React from 'react';
import logo from "../assets/KBB.png";
import { Helmet } from 'react-helmet';
import { HeroSection } from '../components/heroSection';
import { motion } from "framer-motion";


const containerStyle = {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.43)"
};

const logoWrapper = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
};

const logoImg = {
    width: "140px",
    height: "auto",
};

const listStyle = {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#444",
    paddingLeft: "20px",
};

const MaknaLogo = () => {
    return (
        <>
            <Helmet>
                <title>Makna Logo KBB</title>
            </Helmet>
            <HeroSection />
            <div style={containerStyle}>
                <div style={logoWrapper}>
                    <motion.img
                        src={logo}
                        alt="Logo KBB"
                        style={logoImg}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -10, 0]       // floating
                        }}
                        transition={{
                            duration: 0.8,
                            y: {
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut"
                            }
                        }}
                    />
                </div>

                <ol style={listStyle}>
                    <li>
                        <strong>Bintang Segilima dan Peneropong Bintang Bosscha Berwarna Kuning</strong>
                        melambangkan masyarakat Kabupaten Bandung Barat yang Agamis (Religius) serta
                        simbol pengembangan ilmu pengetahuan dan identitas khas wilayah Bandung Barat.
                    </li>

                    <li>
                        <strong>Simbol Industri Berwarna Hijau Dengan Latar Belakang Merah</strong>
                        melambangkan kawasan industri berbasis sumber daya alam yang potensial
                        dan strategis untuk pengembangan agro industri yang ramah lingkungan.
                    </li>

                    <li>
                        <strong>Pohon Pisang Dengan 2 Pelepah Daun & 1 Bunga Melati</strong>
                        melambangkan hari jadi 2 Januari serta potensi lahan pertanian,
                        perkebunan, dan agro wisata yang berkontribusi meningkatkan kesejahteraan.
                    </li>

                    <li>
                        <strong>Bendungan Bergerigi 19 & Gelombang 6 Serta Gunung Berwarna Hijau</strong>
                        menggambarkan tanggal 19 Juni sebagai peresmian Kabupaten Bandung Barat, serta
                        potensi air, bendungan, dan kawasan konservasi alam.
                    </li>

                    <li>
                        <strong>Mangkuk Berwarna Hitam</strong>
                        melambangkan potensi sumber daya alam dan pertambangan seperti batu gamping,
                        andesit, marmer, dan pasir.
                    </li>

                    <li>
                        <strong>Pita Label</strong>
                        melambangkan identitas dan nilai yang memberikan gambaran objektif mengenai
                        karakter dan jati diri Kabupaten Bandung Barat.
                    </li>
                </ol>
            </div>
        </>
    );
};

export default MaknaLogo;