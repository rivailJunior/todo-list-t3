/* eslint-disable react/prop-types */
import { type AppType } from "next/app";
import ListProvider from "../context/listContext";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ListProvider>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f1f1f1] to-[#c3c3c3]">
        <div className="flex w-5/12 flex-col justify-center align-middle">
          <Component {...pageProps} />
        </div>
      </main>
    </ListProvider>
  );
};

export default trpc.withTRPC(MyApp);
