import React, { useState } from "react";
import Skeleton from '../../components/Skeleton'

function Instagram() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
      <div>
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
          <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
            Generate your next IG caption using chatGPT
          </h1>
        </main>
        <br/>
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
        {isLoading ? (
            <Skeleton width={250} height={300} />
          ) : (
            <div className="mt-5">
              <img src={imageUrl} alt="Uploaded Image" width="300" />
            </div>
          )}
        
          <label className="text-slate-500 mt-5" htmlFor="image-upload">
            Upload Image:{" "}
            <input
              className="text-slate-500 mt-5"
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          </div>
        {/* More content here */}
      </div>
    </div>
  );
}

export default Instagram;
