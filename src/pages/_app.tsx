/* eslint-disable react/prop-types */
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import ListProvider from "../context/listContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ListProvider>
      <Component {...pageProps} />
    </ListProvider>
  );
};

export default trpc.withTRPC(MyApp);
