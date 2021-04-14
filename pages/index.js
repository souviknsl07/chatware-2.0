import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>ChatWare 2.0</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/images.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/images.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/images.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <Sidebar />
    </div>
  );
}
