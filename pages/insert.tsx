import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, Suspense, useState } from "react";

import Button from "../components/button";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

const DynamicSyntaxHighlighter = dynamic(
  () => import("../components/syntax-highlighter"),
  {
    suspense: true,
  }
);

import { upload } from "../lib/api/upload";
import { sleep } from "../lib/util/promise";

export default function InsertPage() {
  const [source, setSource] = useState("");
  const [previewCode, setPreviewCode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function uploadCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isUploading) return;
    setIsUploading(true);

    try {
      const [result] = await Promise.allSettled([upload(source), sleep(800)]);

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

  return (
    <>
      <Head>
        <title>Insert code - Cipher</title>
      </Head>
      <Layout>
        <div className="bg-zinc-900 min-h-full px-4 lg:px-8 pt-8">
          <div className="xl:container xl:mx-auto">
            <h1 className="text-white text-xl lg:text-2xl">Insert code</h1>
            <form onSubmit={uploadCode} className="pt-6 space-y-4">
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="code" className="text-white">
                  Code
                </label>
                <div className="w-full h-[40ch] lg:h-[60ch]">
                  {previewCode && (
                    <Suspense fallback={<Spinner />}>
                      <DynamicSyntaxHighlighter source={source} />
                    </Suspense>
                  )}
                  <textarea
                    className={clsx(
                      "w-full h-full p-1 rounded-md bg-black text-white focus:outline focus:outline-white outline-2 border-2 border-white focus:border-black focus:p-1 focus:bg-[#333] focus:text-white font-iosevka",
                      previewCode && "hidden"
                    )}
                    placeholder="Insert your code here..."
                    name="code"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex relative">
                <Button
                  position="left"
                  onClick={() => setPreviewCode((val) => !val)}
                  resize
                >
                  <div className="w-16">{previewCode ? "Edit" : "Preview"}</div>
                </Button>
                <Button position="right" submit disabled={isUploading}>
                  {isUploading ? <Spinner /> : "Submit"}
                </Button>
                {error && (
                  <span className="text-xs text-red-400 block mt-2 absolute -bottom-4">
                    {error}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
