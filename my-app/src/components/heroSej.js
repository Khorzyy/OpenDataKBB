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

export const HeroSej = () => {
    return (
        <motion.div
            style={heroStyle}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div style={overlayStyle}></div>
            {/* TITLE ANIMASI */}
            <div style={{ position: "relative", zIndex: 2 }}>
                <motion.div
                    className="text-center mb-5"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="display-5 fw-bold text-white">Sejarah Kabupaten Bandung Barat</h2>
                    <p className="lead fw-bold text-dark opacity-80">
                        | Menelusuri jejak perjuangan dan harapan masa depan KBB.
                    </p>
                    <hr className="w-25 mx-auto opacity-75" />
                </motion.div>
            </div>
        </motion.div>
    );
};