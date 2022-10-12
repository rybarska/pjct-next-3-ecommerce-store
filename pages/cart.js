import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { mirages } from '../database/mirages';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

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
  const totalItemsInCart = props.cookieState
    ? props.cookieState.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.counts;
      }, 0)
    : 0;
  const totalPriceInCart = totalItemsInCart * 999999;

  function deleteMirageFromCart(mirage) {
    const deletedMirage = mirage;
    console.log('tell', deletedMirage);
    const filteredMirageList = props.mirages.filter(
      (element) => element.id !== deletedMirage.id,
    );
    setStringifiedCookie('cookies', filteredMirageList);
    // deleteMirageFromCart();
  }

  console.log(currentCookieValue);
  //console.log('props', props);
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Overview of the mirages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Cart ({totalItemsInCart})</h1>
      <h2>Total price (μ€): {totalPriceInCart}</h2>
      {props.mirages.map((mirage) => {
        return (
          <div key={`mirage-${mirage.id}`} css={mirageStyles}>
            <h3>
              <Image
                src={`/${mirage.id}-${mirage.name.toLowerCase()}.jpeg`}
                alt=""
                width="60"
                height="40"
              />{' '}
              {mirage.name}
            </h3>
            <div>Number of items: 🔮 {mirage.counts} </div>
            <div>Price per item (μ€): {mirage.price}</div>
            <div>Total per all items (μ€): {mirage.price * mirage.counts}</div>
            <br></br>
            <button
              onClick={() => {
                deleteMirageFromCart(mirage);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
}

export function getServerSideProps(context) {
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
