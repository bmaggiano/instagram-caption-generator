import React, { useState, useEffect } from "react";

function Caption() {
  const [imageUrl, setImageUrl] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("imageUrl") || "/placeholder-image.png"
      : "/placeholder-image.png"
  );

  useEffect(() => {
    // Save the image URL to localStorage when the component unmounts
    return () => {
      localStorage.setItem("imageUrl", imageUrl);
    };
  }, [imageUrl]);

  return (
    <div>
      <div className="mt-3 flex items-center justify-center w-full">
        <img
          src={imageUrl}
          alt="Uploaded file"
          className="h-80 mb-3 text-gray-400"
        />
        {/* More content here */}
      </div>
    </div>
  );
}

export default Caption;
