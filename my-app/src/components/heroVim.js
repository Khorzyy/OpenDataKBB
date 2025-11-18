// ================= HERO SECTION =================
import React from "react";
import vectorKBB from "../assets/kbb-vector.png"; // simpan di assets
import { motion } from "framer-motion";

const heroStyle = {
    width: "100%",
    height: "320px",
    backgroundImage: `url(${vectorKBB})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "0 60px",
};

const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6))"
};

export const HeroVim = () => {
    return (
        <motion.div
            style={heroStyle}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div style={overlayStyle}></div>
            {/* TITLE ANIMASI */}
            <motion.h2
                className="text-center fw-bold text-white mb-5 display-6"
                style={{
                    position: "relative",
                    zIndex: 2,
                    textShadow: "0 4px 12px rgba(0,0,0,0.85)"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Visi & Misi Kabupaten Bandung Barat
            </motion.h2>
        </motion.div>
    );
};