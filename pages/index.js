import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Home</div>
              <a>
                <Image
                  src={`/eye.png`}
                  alt="eye with colors"
                  width="400"
                  height="200"
                />
              </a>
    </>
  );
}
