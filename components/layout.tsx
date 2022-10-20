import { PropsWithChildren } from "react";

import Header from "./header";

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <section>
        <Header />
      </section>
      <main className="flex-grow">{props.children}</main>
    </div>
  );
}
