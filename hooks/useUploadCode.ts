import { useRouter } from "next/router";
import { useState } from "react";

import { upload } from "../lib/api/upload";
import { sleep } from "../lib/util/promise";

export default function useUploadCode() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function uploadCode(code: string) {
    if (isUploading) return;
    setIsUploading(true);

    try {
      const [result] = await Promise.allSettled([upload(code), sleep(800)]);

      if (result.status === "rejected") {
        throw result.reason;
      } else {
        router.push("/" + result.value.slug);
      }
    } catch (e) {
      setError("Error! Something went wrong...");
      setIsUploading(false);
    }
  }

  return { isUploading, uploadCode, error };
}
