import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { mirages } from '../../database/mirages';

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

export default function Mirages(props) {
  console.log('props', props);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the mirages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Mirages</h1>

      {props.mirages.map((mirage) => {
        return (
          <div key={`mirage-${mirage.id}`} css={mirageStyles}>
            <h2>
              <Link href={`/mirages/${mirage.id}`}>{mirage.name}</Link>
            </h2>

            <Link href={`/mirages/${mirage.id}`}>
              <a>
                <Image
                  src={`/${mirage.id}-${mirage.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="300"
                  height="200"
                />
              </a>
            </Link>
            <div>Description: {mirage.description}</div>
            <div>Price: {mirage.price}</div>
            {/* <div>counts:
              {mirage.id} 🔮 {mirage.counts}
        </div> */}

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
export function getServerSideProps() {
  console.log('mirages', mirages);
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Mirages` page component above
    props: {
      // First prop, containing all animals
      mirages: mirages,
      // Second prop, example
      abc: 123,
    },
  };
}
