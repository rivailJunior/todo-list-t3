import { type NextPage } from "next";
import Head from "next/head";
import Main from "../modules/main";

const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f1f1f1] to-[#c3c3c3]">
        <div className="flex w-5/12 flex-col justify-center align-middle">
          <Main />
        </div>
      </main>
    </>
  );
};

export default Home;
