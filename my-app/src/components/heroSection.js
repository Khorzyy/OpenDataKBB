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

const titleStyleHero = {
    color: "#ffffff",
    fontSize: "38px",
    fontWeight: "800",
    position: "relative",
    textShadow: "0 3px 12px rgba(0, 0, 0, 0.81)"
};

export const HeroSection = () => {
    return (
        <motion.div
            style={heroStyle}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div style={overlayStyle}></div>

            {/* TITLE ANIMASI */}
            <motion.div
                style={{ position: "relative", zIndex: 2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <h1 style={titleStyleHero}>MAKNA LOGO KABUPATEN BANDUNG BARAT</h1>
            </motion.div>
        </motion.div>
    );
};