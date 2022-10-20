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

Upload your code by making a POST request to /api/upload using plaintext or
JSON. Populate the \`source\` field for JSON requests.

Maximum characters is 4096.`;

export default function Home() {
  return <SyntaxHighlighter language="markdown" source={source} />;
}
