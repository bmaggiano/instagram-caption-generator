import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Link from "next/link";
import CelebDropDown, { VibeType } from "../../components/CelebDropDown";
import LoadingDots from "../../components/LoadingDots";

function Instagram() {
  const [vibe, setVibe] = useState<VibeType>("Funny");
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const [igCaption, setIgCaption] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [captionLink, setCaptionLink] = useState(false);
  const [picCaption, setPicCaption] = useState(null);

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
      setPicCaption(json.caption);
      setLoading(false);
    }
  }

  let prompt: string;

switch(vibe) {
  case "Lebron":
    let tweets = [
      "PHONE DOWN, but I'm UPGRADING! 📱💥💸. Who knew a penny could pack a punch?! Time to level up and get that shiny new tech! LIVE.LAUGH.LOVE #newphonevibes📱 #pennypower💪 #upgradeyourlife🚀 #techsavvy🤓",
      "SINGLE and THRIVING, but where's the LOVE?! 🤔🤔🤔🤔🕺🏾. Keep swiping right and shooting your shot! The dating game is a wild ride, no doubt. LIVE.LAUGH.LOVE #searchingfortheone🔍 #singlesquad🙌 #heartseeker💘 #lovewarrior🛡️"
    ];
    prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". Tweet like NBA player Lebron James tweets, he loves his emojis too. Also, here's 2 examples of Lebron's tweets, to base future tweets off of: ${tweets[0]} and ${tweets[1]}. Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."}`;
    break;
  case "Professional":
    prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". Write in a professional tone, and highlight your achievements and aspirations. Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."}`;
    break;
  case "Funny":
    prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". Inject humor into your biographies and make them memorable. Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."}`;
    break;
  case "Casual":
    prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". Use a relaxed and informal tone, and showcase your interests and personality. Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."}`;
    break;
  // case "Donald Trump":
  //   prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". Use a bombastic and attention-grabbing tone, and emphasize your accomplishments and strengths. Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."}`;
  //   break;
  default:
    prompt = `Invalid vibe type. Please choose a vibe type.`;
}

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    // scrollToBios();
    setLoading(false);
    console.log(generatedBios)
  };

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
            <br />
            {picCaption && (
              <>
                <div className="border-gray-300 bg-white text-gray-600 shadow-md px-4 py-2 rounded-xl transition-colors hover:bg-gray-100 mb-5 cursor-pointer">
                  <span className="flex mb-2 font-bold justify-center">
                    {" "}
                    Generated description:{" "}
                  </span>
                  <span>{picCaption}</span>
                </div>
              </>
            )}
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

        <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
          <div className="max-w-xl w-full">
            <div className="flex mt-10 items-center space-x-3">
              <p className="text-left font-medium">
                Copy your current bio{" "}
                <span className="text-slate-500">
                  (or write a few sentences about yourself)
                </span>
                .
              </p>
            </div>
            <textarea
              value={igCaption}
              onChange={(e) => setIgCaption(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={
                "e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com."
              }
            />
            <div className="flex mb-5 items-center space-x-3">
              <p className="text-left font-medium">Select your vibe.</p>
            </div>
            <div className="block">
              <CelebDropDown
                vibe={vibe}
                setVibe={(newVibe) => setVibe(newVibe)}
              />
            </div>
          </div>
        </div>

        {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate your bio &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}

          {generatedBios && (
            <div>
              <span>{generatedBios}</span>
            </div>
          )}
        {/* More content here */}
      </div>
    </div>
  );
}

export default Instagram;
