import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <section className="w-full">{children}</section>
            <Footer />
        </>
    );
};

export default LandingLayout;
