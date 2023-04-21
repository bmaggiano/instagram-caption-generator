import Head from "next/head";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

function Caption() {
  const [bio, setBio] = useState("");

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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
      <title>Instagram Caption Generator</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>


      <main className="flex mt-10 mb-10 w-full flex-col items-center justify-center text-center px-4">
          <h1 className="sm:text-6xl sm:leading-snug text-4xl max-w-[708px] font-bold text-slate-900">
            Use AI to generate your IG Caption
          </h1>
        </main>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
      

        <div className="flex items-center justify-center w-full">
          <img
            src={imageUrl}
            alt="Uploaded file"
            className="h-80 mb-3 text-gray-400 rounded-xl"
            />
          {/* More content here */}
        </div>

        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">

            <p className="text-left font-medium">
              Here's what we've gathered from your picture:
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"a picture of a young man in a black shirt and tie"}
          />
      </div>


        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">

            <p className="text-left font-medium">
              Write some context about your photo{" "}
              <span className="text-slate-500">
                (be descriptive)
              </span>
              .
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. This was my first ever headshot as a Realtor at Century 21. I was feeling anxious, excited, confident, and nervous all at the same time"
            }
          />
      </div>
      <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80">
        Generate Caption
        </button>
      </div>
    </div>
  );
}

export default Caption;
