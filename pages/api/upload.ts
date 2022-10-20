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
  if (req.headers["content-type"] !== "text/plain") {
    return res.status(400).json({ message: "Only text/plain is allowed" });
  }

  const source = req.body;
  const slug = crypto
    .createHash("md5")
    .update("" + Date.now())
    .digest("hex")
    .slice(0, 8);

  const link = await prisma.link.create({ data: { source, slug } });
  return res.status(200).json({
    slug: link.slug,
    link:
      process.env.NODE_ENV === "production"
        ? `https://cipher.yatko.dev/${slug}`
        : `localhost:3000/${slug}`,
  });
}
