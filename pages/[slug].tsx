import { GetServerSideProps } from "next";

import SyntaxHighlighter from "../components/syntax-highlighter";
import prisma from "../lib/prisma/client";

interface SourcePageProps {
  source: string;
}

export default function SourcePage(props: SourcePageProps) {
  return <SyntaxHighlighter source={props.source} />;
}

export const getServerSideProps: GetServerSideProps<
  SourcePageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params;
  const link = await prisma.link.findUnique({ where: { slug } });

  if (!link) {
    return { notFound: true };
  }

  return {
    props: {
      source: link.source,
    },
  };
};
