import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";
import { useState, useEffect } from "react";
import LoadingDots from "../components/LoadingDots";
import AlertDemo from "../components/Alert";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function MultiUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
          Add pictures here!
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
                setLoading(true);
                const metadata = await startUpload();
                const lastMetadata = metadata[metadata.length - 1];
                const imageUrl = lastMetadata?.fileUrl;
                localStorage.setItem("imageUrl", imageUrl);
                setImageUrl(imageUrl);
                window.location.reload();
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
    </>
  );
}
