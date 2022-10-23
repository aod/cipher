import { useRouter } from "next/router";
import { useState } from "react";

import Button from "./button";
import Spinner from "./spinner";

import { Upload, upload } from "../lib/api/upload";
import { sleep } from "../lib/util/promise";

export default function UploadClipboard() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function uploadClipboard() {
    if (isUploading) return;
    setIsUploading(true);

    try {
      const [result] = await Promise.allSettled([
        navigator.clipboard.readText().then(upload),
        sleep(800),
      ]);

      if (result.status === "rejected") {
        throw result.reason;
      } else {
        router.push("/" + result.value.slug);
      }
    } catch (e) {
      if (e instanceof DOMException) {
        setError("Error! " + e.message);
      } else {
        setError("Error! Something went wrong...");
      }
      setIsUploading(false);
    }
  }

  return (
    <div className="relative">
      <Button onClick={uploadClipboard} disabled={isUploading}>
        {isUploading ? <Spinner /> : "Upload from clipboard"}
      </Button>
      {error && (
        <span className="text-xs text-red-400 block mt-2 absolute -bottom-4">
          {error}
        </span>
      )}
    </div>
  );
}
