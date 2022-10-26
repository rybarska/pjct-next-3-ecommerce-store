import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div>
      <Head>
        <title>Thank You</title>
        <meta name="description" content="Say Thank You" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <h1>Thank you for your order</h1>
      <br></br>
      <a>
        <Image
          src={`/fireworks.jpg`}
          alt="night sky with fireworks"
          width="710"
          height="400"
        />
      </a>
      <br></br>
      <br></br>
      <h3>
        To track the shipment of your mirages, make sure you look at the sky
        sometimes
      </h3>
    </div>
  );
}
