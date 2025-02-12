import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <section className="w-full flex-1 overflow-hidden">{children}</section>
            <Footer />
        </div>
    );
};

export default LandingLayout;
