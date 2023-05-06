import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";
 
const { useUploadThing } = generateReactHelpers<OurFileRouter>();
 
// need to figure out a way to integrate this logic into index.tsx file to have flies upload to uploadthing
// then need to use literals to retrieve the link of the picture (possibly API call if necessary.. look into this)

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