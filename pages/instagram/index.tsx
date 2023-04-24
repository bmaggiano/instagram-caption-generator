import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Link from "next/link";
import LoadingDots from "../../components/LoadingDots";

function Instagram() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [captionLink, setCaptionLink] = useState(false);
  const [caption, setCaption] = useState(null);

  useEffect(() => {
    const imageUrlFromStorage = localStorage.getItem("imageUrl");
    console.log({ imageUrlFromStorage });
    if (imageUrlFromStorage) {
      setImageUrl(imageUrlFromStorage);
      setIsLoading(false);
      setCaptionLink(true);
    }
  }, []);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        setIsLoading(false);
        setCaptionLink(true);
        localStorage.setItem("imageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleImageUploadAndGenerateCaption() {
    setLoading(true);

    if (imageUrl) {
      const data = {
        input: {
          image: imageUrl,
        },
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const res = await fetch("/api/replicate", requestOptions);
      const json = await res.json();
      setCaption(json.caption);
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
      <Head>
        <title>Instagram Image Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div>
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
          <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
            Use AI to generate your IG Caption
          </h1>
        </main>
        <br />

        <div className="mt-3 flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded file"
                className="h-2/3 mb-3 text-gray-400"
              />
            )}

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              max-file-size="800000"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {!loading && captionLink && imageUrl && (
          <div className="mt-3 flex flex-col items-center justify-center w-full">
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"
              onClick={(e) => handleImageUploadAndGenerateCaption()}
            >
              Generate picture description &rarr;
            </button>
            <br/>
            {caption && <span>{caption}</span>}
          </div>
        )}
        {loading && (
          <div className="mt-3 flex flex-col items-center justify-center w-full">
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          </div>
        )}

        {/* More content here */}
      </div>
    </div>
  );
}

export default Instagram;
