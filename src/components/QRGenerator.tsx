// src/components/QRGenerator.tsx
import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [url, setUrl] = useState<string>("");
  const [qrCode, setQRCode] = useState<string>("");

  const generateQRCode = async () => {
    try {
      const qrCodeData = await QRCode.toDataURL(url);
      setQRCode(qrCodeData);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Generador de Códigos QR</h2>
      <input
        type="text"
        placeholder="Introduce la URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={generateQRCode}
        className="bg-primary text-white p-2 rounded"
      >
        Generar QR
      </button>
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="Generated QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  );
}
