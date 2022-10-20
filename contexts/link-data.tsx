import { createContext, PropsWithChildren, useContext } from "react";
import { Link } from "@prisma/client";

interface LinkDataContextProps {
  link?: Link;
}

const LinkDataContext = createContext<LinkDataContextProps>({});

export const useLinkData = () => {
  return useContext(LinkDataContext).link;
};

interface LinkDataProviderProps {
  link: Link;
}

export const StaticLinkDataProvider = (
  props: PropsWithChildren<LinkDataProviderProps>
) => {
  return (
    <LinkDataContext.Provider value={{ link: props.link }}>
      {props.children}
    </LinkDataContext.Provider>
  );
};
