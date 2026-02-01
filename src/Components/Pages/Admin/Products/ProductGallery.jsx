

import React, { useState } from "react";

function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <img
        src={`http://localhost:5000/uploads/${mainImage}`}
        style={{ width: "400px", borderRadius: "10px" }}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${img}`}
            onClick={() => setMainImage(img)}
            style={{
              width: "80px",
              height: "80px",
              cursor: "pointer",
              border: mainImage === img ? "2px solid orange" : "1px solid #ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
