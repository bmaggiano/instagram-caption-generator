import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";
import { useState } from "react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function MultiUploader() {

  const [utUrl, setutUrl] = useState("")
  
  const { getRootProps, getInputProps, files, startUpload } =
    useUploadThing("imageUploader");

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setutUrl(reader.result as string);
          // setIsLoading(false);
          // setCaptionLink(true);
          // localStorage.setItem("imageUrl", reader.result as string);
        };
        reader.readAsDataURL(file);
      }
  };
  
  

  return (
    <div {...getRootProps()}>
<input
  {...getInputProps({ onChange: handleFileSelect })}
  id="fileInput"
  type="file"
  style={{ display: "none" }}
/>

      <div>
        <button onClick={handleUploadClick}>Select files to upload</button>
        <div>
          {/* Image preview */}
          {files.length > 0 && (
  <img
    id="imagePreview"
    alt="uploaded file"
    src={utUrl} // placeholder image
    className="h-2/3 text-gray-400"
    />
)}
        </div>
        <div>
          {files.length > 0 && (
            <button onClick={() => startUpload()}>
              Upload {files.length} files
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
