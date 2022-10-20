import SyntaxHighlighter from "../components/syntax-highlighter";

const source = `# Welcome to Cipher!

Cipher is a **FREE** minimal SaaS for uploading and viewing code snippets.
It is built with the intention to be used with tools like ShareX to upload
whatever code is currently in your clipboard.

# Features

- URL shortener
- Automatic syntax highlighting
- Easy API

# Upload

To upload your code snippet simply POST to /api/upload with a text/plain
content type and include the source in the body.

Maximum characters is 4096.`;

export default function Home() {
  return <SyntaxHighlighter language="markdown" source={source} />;
}
