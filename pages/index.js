import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div>Home</div>
      <div>
        <h1>Welcome to the Mirage Machine</h1>
      </div>
      <a>
        <Image
          src={`/eye.png`}
          alt="eye with colors"
          width="480"
          height="240"
        />
      </a>
      <h2>We have been waiting for you for quite a while</h2>
    </>
  );
}
