import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMirages, Mirage } from '../database/mirages';
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

// areItemsInCart is a Boolean
const checkoutStyles = (areItemsInCart: boolean) => css`
  padding: 5px;
  background-color: #f4e8fc;
  color: #13011f;
  border-radius: 6px;

  ${!areItemsInCart &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `};
`;

const checkoutButtonStyles = () => css`
  padding: 5px;
  background-color: #e4c0fc;
  border-radius: 6px;
  line-height: 40px;
  width: 120px;
  font-weight: bold;
`;

type Props =
  | {
      mirage: Mirage;
      mirages: Mirage[];
      totalItemsInCart: number;
      //id?: number;
      //cookieState?: string[];
      //counts?: string[];
      //element?: string;
      //areItemsInCart?: boolean;
      //href?: string;
      //cookieMirageObject?: string[];
    }
  | {
      error: string;
    };

export default function Cart(props: Props) {
  const [areItemsInCart, setAreItemsInCart] = useState(false);

  const [currentCookieValue, setCurrentCookieValue] = useState(
    getParsedCookie('cookies'),
  );

  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Mirage not found</title>
          <meta name="description" content="Mirage not found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/mirages">mirages page</Link>
      </div>
    );
  }
  const router = useRouter();

  const totalItemsInCart = props.totalItemsInCart;
  /* = props.cookieState
    ? props.cookieState.reduce(function (previousValue, currentValue) {
        return previousValue + currentCookieValue.counts;
      }, 0)
    : 0; */
  //console.log('say totalItemsInCart', totalItemsInCart);
  const totalPriceInCart = totalItemsInCart * 999999;

  useEffect(() => {
    //setCurrentCookies(getParsedCookie('cookies'));
  }, [currentCookieValue]);

  function deleteMirageFromCart(mirage: Mirage) {
    const deletedMirage = mirage;
    console.log('tell', deletedMirage);
    const filteredMirageList = props.mirages.filter(
      (element) => element.id !== deletedMirage.id,
    );
    console.log('tell filtered list', filteredMirageList);
    setCurrentCookieValue(filteredMirageList);
    // console.log('tell current cookies', currentCookies);
    setStringifiedCookie('cookies', filteredMirageList);
    // console.log('active');
    // location.reload();
    // deleteMirageFromCart();
  }

  const handleClick = async (e) => {
    e.preventDefault();
    await router.push('/cart');
  };

  console.log('say current cookies', currentCookieValue);
  //console.log('props', props);

  useEffect(() => {
    if (totalItemsInCart > 0) {
      setAreItemsInCart(true);
      return;
    } else {
      setAreItemsInCart(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (totalItemsInCart > 0) {
      setAreItemsInCart(true);
      return;
    } else {
      setAreItemsInCart(false);
      return;
    }
  }, [{ totalItemsInCart }]);

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Overview of the mirages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Cart ({totalItemsInCart})</h1>
      <div css={checkoutStyles(areItemsInCart)}>
        <h2>Total price (μ€): {totalPriceInCart}</h2>

        <button css={checkoutButtonStyles}>
          <Link href="/checkout">Checkout</Link>
        </button>
        <br></br>
      </div>
      <br></br>
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
              // href={'/cart'}
              onClick={async (e) => {
                await handleClick(e);
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const cookie = context.req.cookies.cookies;
  const mirages = await getMirages();

  const cookieArray = cookie ? JSON.parse(cookie) : [];

  const cartArray = cookieArray.map((array) => {
    const cartObject = mirages.find((mirage) => mirage.id === array.id);
    return {
      id: cartObject!.id,
      name: cartObject!.name,
      price: cartObject!.price,
      counts: array.counts,
    };
  });

  console.log('say cartArray', cartArray);

  const backendTotalItemsInCart = cartArray
    ? cartArray.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.counts;
      }, 0)
    : 0;

  console.log('say backendTotalItemsInCart', backendTotalItemsInCart);

  return {
    props: {
      mirages: cartArray,
      totalItemsInCart: backendTotalItemsInCart,
    },
  };
}
