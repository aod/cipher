import { GetServerSideProps } from "next";
import { Link } from "@prisma/client";

import SyntaxHighlighter from "../components/syntax-highlighter";
import Layout from "../components/layout";

import prisma from "../lib/prisma/client";
import { StaticLinkDataProvider } from "../contexts/link-data";

interface SourcePageProps {
  link: Link;
}

export default function SourcePage(props: SourcePageProps) {
  return (
    <StaticLinkDataProvider link={props.link}>
      <Layout>
        <SyntaxHighlighter source={props.link.source} />
      </Layout>
    </StaticLinkDataProvider>
  );
}

export const getServerSideProps: GetServerSideProps<
  SourcePageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params;
  const link = await prisma.link.findUnique({ where: { slug } });

  if (!link) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      link,
    },
  };
};
