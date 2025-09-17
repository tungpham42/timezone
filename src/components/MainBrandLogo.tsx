"use client";

import React, { useState } from "react";
import { Image } from "antd";

interface MainBrandLogoProps {
  logoSrc: string; // Link ảnh logo
  mainDomain: string; // Ví dụ: 'soft.io.vn'
  altText?: string;
  size?: number; // Chiều cao logo
}

const MainBrandLogo: React.FC<MainBrandLogoProps> = ({
  logoSrc,
  mainDomain,
  altText = "Logo chính",
  size = 40,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        margin: 16, // Equivalent to Bootstrap's m-3 (1rem = 16px)
        marginRight: 8, // Equivalent to me-2 (0.5rem = 8px)
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 4, // Equivalent to Bootstrap's rounded
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)", // Mimics shadow-sm
        padding: 8, // Equivalent to p-2 (0.5rem = 8px)
        zIndex: 1050,
      }}
    >
      <a
        href={`https://${mainDomain}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={logoSrc} alt={altText} height={size} className="me-2" />
      </a>
    </div>
  );
};

export default MainBrandLogo;
