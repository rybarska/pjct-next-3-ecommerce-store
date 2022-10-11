import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';
import { mirages } from '../database/mirages';


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

export default function Cart(props) {
  const currentCookieValue = getParsedCookie('cookies');
  console.log(currentCookieValue);
  //console.log('props', props);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the mirages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Cart</h1>

      {props.mirages.map((mirage) => {
        return (
          <div key={`mirage-${mirage.id}`} css={mirageStyles}>
            <h3>

                <Image
                  src={`/${mirage.id}-${mirage.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="60"
                  height="40"
                />  {mirage.name}
 </h3>
 <div>Number of items: 🔮 {mirage.counts} </div>
 <div>Price per item (μ€): {mirage.price}</div>
 <div>Total (μ€): {(mirage.price * mirage.counts)}</div>



          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.cookies;
  console.log('cookie', cookie);
  console.log('mirages', mirages);

  const cookieArray = cookie ? JSON.parse(cookie) : [];
  const cartArray = cookieArray.map((array) => {
    const cartObject = mirages.find((mirage) => mirage.id === array.id);

    return {
      id: cartObject.id,
      name: cartObject.name,
      price: cartObject.price,
      counts: array.counts,
    };
  });


  return {
    props: {
      mirages: cartArray,
    },
  };
}
