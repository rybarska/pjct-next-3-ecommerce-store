import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

const checkoutButtonStyles = css`
  padding: 5px;
  background-color: #e4c0fc;
  border-radius: 6px;
  line-height: 40px;
  width: 120px;
  font-weight: bold;
`;

export default function Checkout(props) {
  /* const [cookieState, setCookieState] = useState(props.cookieState);
  useEffect(() => {}, []); */

  useEffect(() => {
    function setCheckoutCookies() {
      const newCookieValue = props.cookieState;
      setStringifiedCookie('cookies', newCookieValue);
    }
    setCheckoutCookies();
  }, [props.cookieState]);

  const totalItemsInCart = props.cookieState
    ? props.cookieState.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.counts;
      }, 0)
    : 0;
  const totalPriceInCart = totalItemsInCart * 999999;

  return (
    <div>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Checkout</h1>
      <h2>Total number of items: {totalItemsInCart}</h2>
      <h2>Total Price (μ€): {totalPriceInCart}</h2>
      <br></br>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          window.location.href = '/thankYou';
          props.setCookieState([]);
        }}
      >
        <label>
          First name<input required data-test-id="checkout-first-name"></input>
        </label>
        <br></br>
        <label>
          Last name<input required data-test-id="checkout-last-name"></input>{' '}
        </label>
        <br></br>
        <label>
          email<input required data-test-id="checkout-email"></input>{' '}
        </label>
        <br></br>
        <label>
          Address<input required data-test-id="checkout-address"></input>{' '}
        </label>
        <br></br>
        <label>
          City<input required data-test-id="checkout-city"></input>{' '}
        </label>
        <br></br>
        <label>
          Postal code
          <input required data-test-id="checkout-postal-code"></input>{' '}
        </label>
        <br></br>
        <label>
          Country<input required data-test-id="checkout-country"></input>{' '}
        </label>
        <br></br>
        <label>
          Credit card
          <input required data-test-id="checkout-credit-card"></input>{' '}
        </label>
        <br></br>
        <label>
          Expiration date
          <input required data-test-id="checkout-expiration-date"></input>{' '}
        </label>
        <br></br>
        <label>
          Security code
          <input required data-test-id="checkout-security-code"></input>{' '}
        </label>
        <br></br>
        <br></br>
        <button
          css={checkoutButtonStyles}
          data-test-id="checkout-confirm-order"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
