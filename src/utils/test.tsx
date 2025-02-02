import { useEffect, useState } from "react";

const SecretComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cek jika kombinasi tombol Ctrl + K + L ditekan
      if (event.key.toLowerCase() === "a") {
        document.addEventListener("keydown", handleSecondKey);
      }
    };

    const handleSecondKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "d") {
        document.addEventListener("keydown", handleThirdKey);
      }
    };
    const handleThirdKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "m") {
        document.addEventListener("keydown", handleForthKey);
      }
    };
    const handleForthKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "i") {
        document.addEventListener("keydown", handleFifthKey);
      }
    };
    const handleFifthKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "n") {
        setIsVisible((prev) => !prev); // Toggle tampilan komponen
      }
      document.removeEventListener("keydown", handleFifthKey);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleSecondKey);
      document.removeEventListener("keydown", handleThirdKey);
      document.removeEventListener("keydown", handleForthKey);
    };
  }, []);

  return (
    <div>
      <h1>Tekan Ctrl + K + L untuk menampilkan/menyembunyikan komponen</h1>
      {isVisible && <div style={{ padding: 20, background: "lightblue" }}>Ini adalah komponen rahasia 🎉</div>}
    </div>
  );
};

export default SecretComponent;
