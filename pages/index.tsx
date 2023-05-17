import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import Header from "../components/Header";
import { Toaster, toast } from "react-hot-toast";
import CelebDropDown, { VibeType } from "../components/CelebDropDown";
import LoadingDots from "../components/LoadingDots";
import Footer from "../components/Footer";
import AlertDemo from "../components/Alert";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

function Instagram() {
  const [vibe, setVibe] = useState<VibeType>("Funny");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedCaptions, setgeneratedCaptions] = useState<String>("");
  const [igCaption, setIgCaption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [capLoading, setCapLoading] = useState(false);
  const [descLoading, setDescLoading] = useState(false);
  const [picCaption, setPicCaption] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);


    const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

      const userImage =
    files.length > 0 && files[files.length - 1]?.contents
      ? files[files.length - 1]?.contents
      : null;

  useEffect(() => {
    const imageUrlFromStorage = localStorage.getItem("imageUrl");
    if (imageUrlFromStorage) {
      setImageUrl(imageUrlFromStorage);
    }
  }, []);

  useEffect(() => {
    const imageDescFromStorage = localStorage.getItem("imageDesc");
    if(imageDescFromStorage) {
      setPicCaption(imageDescFromStorage)
    } 
  }, [])

  useEffect(() => {
    if (imageUrl !== null) {
      setShowAlert(true);
    }
  }, [imageUrl]);

  const clearStorageAndResetImageUrl = () => {
    setImageUrl("")
    setPicCaption(null)
    localStorage.removeItem("imageUrl")
    localStorage.removeItem("imageDesc")
  }

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToCaptions = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function handleImageUploadAndGenerateCaption() {
    setLoading(true);
    try {
      const metadata = await startUpload();
      const lastMetadata = metadata[metadata.length - 1];
      const imageUrl = lastMetadata?.fileUrl;
      localStorage.setItem("imageUrl", imageUrl);
      setImageUrl(imageUrl);
  
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
        localStorage.setItem("imageDesc", json.caption);
      }
    } catch (error) {
      // Handle the error here (e.g., display an error message)
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  

  let prompt: string;

  switch (vibe) {
    case "Lebron James":
      let lebroncaptions = [
        "PHONE DOWN, but I'm UPGRADING! 📱💥💸. Who knew a penny could pack a punch?! Time to level up and get that shiny new tech! LIVE.LAUGH.LOVE #newphonevibes📱 #pennypower💪 #upgradeyourlife🚀 #techsavvy🤓",
        "SINGLE and THRIVING, but where's the LOVE?! 🤔🤔🤔🤔🕺🏾. Keep swiping right and shooting your shot! The dating game is a wild ride, no doubt. LIVE.LAUGH.LOVE #searchingfortheone🔍 #singlesquad🙌 #heartseeker💘 #lovewarrior🛡️",
      ];
      prompt = `Generate 2 instagram captions like you're ${vibe} with no hashtags and clearly labeled "1." and "2.". Make the caption look like NBA player Lebron James captions, he loves his emojis too. Also, here's 2 examples of Lebron's captions, to base future captions off of: ${
        lebroncaptions[0]
      } and ${
        lebroncaptions[1]
      }. Make sure each generated instagram caption is less than 160 characters, has short sentences that are found in instagram captions, and base them on this picture caption: ${picCaption} and this context: ${igCaption}${
        igCaption.slice(-1) === "." ? "" : "."
      }`;
      break;
    case "Professional":
      prompt = `Generate 2 ${vibe} instagram captions with no hashtags and clearly labeled "1." and "2.". Write in a professional tone, and highlight your achievements and aspirations. Make sure each generated instagram caption is less than 160 characters, has short sentences that are found in instagram captions, and base them on this picture caption: ${picCaption} and this context: ${igCaption}${
        igCaption.slice(-1) === "." ? "" : "."
      }`;
      break;
    case "Funny":
      prompt = `Generate 2 ${vibe} instagram captions with no hashtags and clearly labeled "1." and "2.". Inject humor into your captions and make them memorable. Make sure each generated instagram caption is less than 160 characters, has short sentences that are found in instagram captions, and base them on this picture caption: ${picCaption} and this context: ${igCaption}${
        igCaption.slice(-1) === "." ? "" : "."
      }`;
      break;
    case "Casual":
      prompt = `Generate 2 ${vibe} instagram captions with no hashtags and clearly labeled "1." and "2.". Use a relaxed and informal tone, and showcase your interests and personality. Make sure each generated instagram caption is less than 160 characters, has short sentences that are found in instagram captions, and base them on this picture caption: ${picCaption} and this context: ${igCaption}${
        igCaption.slice(-1) === "." ? "" : "."
      }`;
      break;
    case "Donald Trump":
      prompt = `Generate 2 instagram captions like you're ${vibe} with no hashtags and clearly labeled "1." and "2.". Use a bombastic and attention-grabbing tone, and emphasize your accomplishments and strengths. Make sure each generated instagram caption is less than 160 characters, has short sentences that are found in instagram captions, and base them on this picture caption: ${picCaption} and this context: ${igCaption}${
        igCaption.slice(-1) === "." ? "" : "."
      }`;
      break;
    case "Drake":
      let drakecaptions = [
        "not to get the tea brewing but I wonder how your friend that looks at me with wandering eyes is doing",
        "I want more of THIS years and years with the gang I’m talking plural And to get there we’ll turn any weirdo to a mural",
        "Hard Feelings.",
      ];
      prompt = `Generate 2 instagram captions like you're ${vibe} with no hashtags and clearly labeled "1." and "2.". Make the caption as if you were Drake, here are a few of Drake's instagram captions for reference: ${
        drakecaptions[0]
      }, ${drakecaptions[1]}, ${
        drakecaptions[2]
      }. Make sure each generated instagram caption is less than 160 characters, has short sentences that are found in instagram captions, and base them on this picture caption: ${picCaption} and this context: ${igCaption}${
        igCaption.slice(-1) === "." ? "" : "."
      }`;
      break;
    default:
      prompt = `Invalid vibe type. Please choose a vibe type.`;
  }

  const generateCaption = async (e: any) => {
    e.preventDefault();
    setgeneratedCaptions("");
    setCapLoading(true);
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
      setgeneratedCaptions((prev) => prev + chunkValue);
    }
    scrollToCaptions();
    setCapLoading(false);
    console.log(generatedCaptions);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
      <Head>
        <title>IG Caption Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {showAlert && 
      <div 
      className="md:w-3/4 p-4"
      >
        <AlertDemo />
      </div>}

      <div>
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-8">
          <h1 className="leading-tight sm:text-6xl sm:leading-tight text-4xl max-w-[708px] font-bold text-slate-900">
            Use AI to generate your new IG Caption
          </h1>
        </main>

        {imageUrl && (
        <div className="flex items-center justify-end px-4">
          <div 
          className="flex items-center space-x-2 bg-gray-100 rounded-xl text-black outline outline-1 outline-gray-300 font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-gray-200 cursor-pointer w-50"
          onClick={() => {
            clearStorageAndResetImageUrl()
          }}
          >
            <Image
            src="/refresh-cw.svg"
            alt="refresh icon"
            width={20}
            height={20}/> <p>New Image</p>
            </div>
        </div>
        )}

        <br />

        <div className="p-4">
          
          <div
        {...getRootProps()}
        className=" flex items-center justify-center w-full"
      >

        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <input {...getInputProps()} id="dropzone-file" type="file" accept="image/*" />
          {!userImage && !imageUrl && <>Upload Picture Here</>}{" "}
          {userImage && imageUrl && (
            <img
              src={userImage}
              className="h-2/3 mb-3 text-gray-400"
              alt="uploaded image"
            />
          )}
          {userImage && !imageUrl && (
            <img
              src={userImage}
              className="h-2/3 mb-3 text-gray-400"
              alt="uploaded image"
            />
          )}
          {imageUrl && !userImage && (
            <img
              src={imageUrl}
              className="h-2/3 mb-3 text-gray-400"
              alt="uploaded image"
            />
          )}
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-col items-center justify-center w-full">
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"
              onClick={async () => {
                handleImageUploadAndGenerateCaption()
              }}
            >
              Upload image
            </button>
          )}
          {loading && (
            <button className="bg-gray-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50">
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
      )}
          
        </div>

        {!descLoading && imageUrl && (
          <div className="px-4 mt-3 flex flex-col items-center justify-center w-full ">
            {picCaption && (
              <>
                <div className="flex flex-col items-center w-full outline outline-1 outline-gray-300 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-100 cursor-pointer">
                  <span className="flex mb-2 font-bold justify-center">
                    {" "}
                    AI Generated description:{" "}
                  </span>
                  <span
                  className="text-center"
                    onClick={() => {
                      navigator.clipboard.writeText(picCaption);
                      toast("Caption copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                  >
                    {picCaption}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
        {descLoading && (
          <div className="mt-3 flex flex-col items-center justify-center w-full">
            <button
              className="bg-gray-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          </div>
        )}

        <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
          <div className="max-w-xl w-full">
            <div className="flex mt-10 items-center space-x-3">
              <p className="text-left font-medium">
                Next, give us some context behind this picture{" "}
                <span className="text-slate-500">
                  (so we can generate a caption)
                </span>
                
              </p>
            </div>
            <textarea
              value={igCaption}
              onChange={(e) => setIgCaption(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm my-5 p-4 bg-gray-100 resize-none"
              placeholder={
                "e.g. I'm a web developer in 2023 and this was me and my wife after I got my first job offer!"
              }
            />
            <div className="flex mb-5 items-center space-x-3">
              <p className="text-left font-medium">Finally, select your vibe</p>
            </div>
            <div className="block">
              <CelebDropDown
                vibe={vibe}
                setVibe={(newVibe) => setVibe(newVibe)}
              />
            </div>
          </div>
        </div>

        {!capLoading && imageUrl && (
          <div className="mt-3 flex flex-col items-center justify-center w-full">
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"
              onClick={(e) => generateCaption(e)}
            >
              Generate your caption &rarr;
            </button>
          </div>
        )}
        {capLoading && (
          <div className="mt-3 flex flex-col items-center justify-center w-full">
            <button
              className="bg-gray-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          </div>
        )}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />

        <div className="space-y-10 my-10">
          {generatedCaptions && (
            <>
              <div>
                <h2
                  className="text-center sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated captions
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedCaptions
                  .substring(generatedCaptions.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedCaptions) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedCaptions);
                          toast("Caption copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedCaptions}
                      >
                        <p>{generatedCaptions}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
        {/* More content here */}
      </div>
      <Footer />
    </div>
  );
}

export default Instagram;
