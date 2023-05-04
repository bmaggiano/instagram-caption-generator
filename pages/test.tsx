import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";
 
const { useUploadThing } = generateReactHelpers<OurFileRouter>();
 
export default function MultiUploader() {
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");
 
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && (
          <button onClick={() => startUpload()}>
            Upload {files.length} files
          </button>
        )}
      </div>
      Drop files here!
    </div>
  );
}