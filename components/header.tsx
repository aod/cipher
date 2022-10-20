import { formatDistanceStrict } from "date-fns";
import { useLinkData } from "../contexts/link-data";

export default function Header() {
  const link = useLinkData();

  return (
    <header className="h-12 lg:h-16 bg-black px-2 flex justify-between items-center border-b border-white/60">
      <h1 className="font-serif text-2xl lg:text-4xl text-white font-bold tracking-wide">
        Cipher
      </h1>
      {link?.createdAt && <CreatedAt createdAt={link.createdAt} />}
    </header>
  );
}

function CreatedAt(props: { createdAt: Date }) {
  const now = new Date();
  const diff = formatDistanceStrict(props.createdAt, now, {
    addSuffix: true,
  });

  return (
    <div className="font-mono text-xs lg:text-base italic">
      <span className="text-white">Created</span>
      &nbsp;
      <span className="text-white">{diff}</span>
    </div>
  );
}
