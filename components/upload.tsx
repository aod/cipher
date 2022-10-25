import { Upload as UploadIcon } from "lucide-react";
import { useRef } from "react";

import Button from "./button";
import Spinner from "./spinner";

import useUploadCode from "../hooks/useUploadCode";

export default function Upload() {
  const { isUploading, uploadCode, error } = useUploadCode();

  const fileUploadRef = useRef<HTMLInputElement>(null);

  function triggerFileExplorer() {
    if (isUploading) return;
    fileUploadRef.current.click();
  }

  function onFileChange() {
    if (!fileUploadRef.current.files.length) return;
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      uploadCode(event.target.result.toString());
    });
    reader.readAsText(fileUploadRef.current.files[0]);
  }

  return (
    <div className="flex relative">
      <Button position="left" href="/insert" disabled={true}>
        Insert code
      </Button>
      <Button
        resize
        position="right"
        onClick={triggerFileExplorer}
        disabled={isUploading}
      >
        <input
          type="file"
          className="hidden"
          ref={fileUploadRef}
          onChange={onFileChange}
          disabled={isUploading}
        />
        {isUploading ? (
          <Spinner />
        ) : (
          <UploadIcon className="w-4 h-4 lg:w-5 lg:h-5" />
        )}
      </Button>
      {error && (
        <span className="text-xs text-red-400 block mt-2 absolute -bottom-4">
          {error}
        </span>
      )}
    </div>
  );
}
