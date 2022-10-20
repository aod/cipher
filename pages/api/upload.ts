import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

import prisma from "../../lib/prisma/client";

export default async function Submit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let source: string;
  if (req.headers["content-type"] === "text/plain") {
    source = req.body;
  } else if (req.headers["content-type"] === "application/json") {
    if (!req.body.source) {
      return res.status(400).json({ message: "Missing source field" });
    }
    source = req.body.source;
  } else {
    return res.status(400).json({ message: "Content type not supported" });
  }

  const link = await createLink(source);
  return res.status(200).json({
    slug: link.slug,
    link:
      process.env.NODE_ENV === "production"
        ? `https://cipher.yatko.dev/${link.slug}`
        : `localhost:3000/${link.slug}`,
  });
}

async function createLink(source: string) {
  const slug = crypto.randomBytes(3).toString("hex");
  return await prisma.link.create({ data: { source, slug } });
}
