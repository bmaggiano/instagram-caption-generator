import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";
import { fileURLToPath } from "url";
import { useState, useEffect } from "react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function MultiUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

  // console.log(files[0]?.contents)
  useEffect(() => {
    const imageUrlFromStorage = localStorage.getItem("imageUrl");
    // console.log({ imageUrlFromStorage });
    if (imageUrlFromStorage) {
      setImageUrl(imageUrlFromStorage);
      // setIsLoading(false);
      // setCaptionLink(true);
    }
  }, []);

  return (
    <>
    <div
      {...getRootProps()}
      className="mt-3 flex items-center justify-center w-full"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <input {...getInputProps()} id="dropzone-file" type="file" />
        Drop files here!
        {imageUrl && (
          <img
            src={imageUrl}
            className="h-2/3 mb-3 text-gray-400"
            alt="uploaded image"
          />
        )}
      </label>
    </div>
    <div className="mt-3 flex flex-col items-center justify-center w-full">

          <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-50"

            onClick={async () => {
              const metadata = await startUpload();
              const imageUrl = metadata[0]?.fileUrl;
              localStorage.setItem("imageUrl", imageUrl);
              setImageUrl(imageUrl);
              window.location.reload();
            }}
          >
            Upload {files.length} files
          </button>
          </div>
    </>
  );
}
