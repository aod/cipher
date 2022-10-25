import { formatDistanceStrict } from "date-fns";
import Link from "next/link";

import Upload from "./upload";

import { useLinkData } from "../contexts/link-data";

export default function Header() {
  const link = useLinkData();

  return (
    <header className="h-24 lg:h-28 bg-black px-4 lg:px-8 flex justify-between items-center border-b border-[#777]">
      <Link href="/">
        <a className="font-serif text-2xl lg:text-4xl text-white font-bold tracking-wide cursor-pointer">
          <h1>Cipher</h1>
        </a>
      </Link>
      {link ? <CreatedAt createdAt={link.createdAt} /> : <Upload />}
    </header>
  );
}

function CreatedAt(props: { createdAt: Date }) {
  const now = new Date();
  const diff = formatDistanceStrict(props.createdAt, now, {
    addSuffix: true,
  });

  return (
    <div className="text-xs lg:text-base italic">
      <span className="text-white">Created</span>
      &nbsp;
      <span className="text-white">{diff}</span>
    </div>
  );
}
