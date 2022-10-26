import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMirages, Mirage } from '../../database/mirages';
//import { mirages } from '../../database/mirages';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const mirageStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

type Props = {
  mirages: Mirage[];
};

export default function Mirages(props: Props) {
  const [amount, setAmount] = useState(0);
  console.log('props', props);
  return (
    <>
      <Head>
        <title>Mirages</title>
        <meta name="description" content="Overview of the mirages" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <h1>Mirages</h1>

      {props.mirages.map((mirage) => {
        return (
          <div key={`mirage-${mirage.id}`} css={mirageStyles}>
            <Link
              href={`/mirages/${mirage.id}`}
              data-test-id="product-<product id>"
            >
              <a>
                {' '}
                <h2>{mirage.name}</h2>
                <Image
                  src={`/${mirage.id}-${mirage.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="300"
                  height="200"
                />
              </a>
            </Link>
            <div>Description: {mirage.description}</div>
            <div>Price (μ€): {mirage.price}</div>
          </div>
        );
      })}
    </>
  );
}
// Anything inside of this function will
// ONLY be run on the server (in Node.js)
//
// This means you can access things like `fs`
//
// Note: this function can only be exported
// from files within pages/
export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const mirages = await getMirages();
  //console.log('mirages', mirages);
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Mirages` page component above
    props: {
      // First prop, containing all animals
      mirages: mirages,
      // Second prop, example
      //abc: 123,
    },
  };
}
