export interface Upload {
  slug: string;
  link: string;
}

export async function upload(source: string) {
  const response = await fetch("/api/upload", {
    body: source,
    method: "POST",
    headers: { "Content-Type": "text/plain" },
  });
  const result = await response.json();
  return result as Upload;
}
