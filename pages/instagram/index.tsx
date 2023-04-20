import React, { useState } from "react";

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
        <br />

        <div className="flex items-center justify-center w-full">

    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <img
        src={imageUrl || "/upload.svg"}
        alt="Upload file"
        className="h-2/3 mb-3 text-gray-400"
      />
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </p>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
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
