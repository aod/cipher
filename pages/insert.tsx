import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FormEvent, Suspense, useState } from "react";

import Button from "../components/button";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

import useUploadCode from "../hooks/useUploadCode";

const DynamicSyntaxHighlighter = dynamic(
  () => import("../components/syntax-highlighter"),
  {
    suspense: true,
  }
);

export default function InsertPage() {
  const { isUploading, uploadCode, error } = useUploadCode();

  const [source, setSource] = useState("");
  const [previewCode, setPreviewCode] = useState(false);

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    uploadCode(source);
  }

  return (
    <>
      <Head>
        <title>Insert code - Cipher</title>
      </Head>
      <Layout>
        <div className="bg-[#111] min-h-full px-4 lg:px-8 pt-8">
          <div className="xl:container xl:mx-auto">
            <h1 className="text-white text-xl lg:text-2xl">Insert code</h1>
            <form onSubmit={onFormSubmit} className="pt-6 space-y-4">
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
                      "w-full h-full p-1 rounded-md bg-black text-white focus:outline focus:outline-white outline-2 border-2 border-[#999] focus:border-black focus:p-1 focus:bg-[#333] focus:text-white font-iosevka",
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
