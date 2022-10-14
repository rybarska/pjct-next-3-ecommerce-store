import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { mirages } from '../../database/mirages';
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

const addToCartStyles = css`
  background-color: #e4c0fc;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  font-weight: bold;
  > a + a {
    margin-left: 13px;
  }
`;

export default function Mirage(props) {
  if (props.error) {
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
  const [amount, setAmount] = useState(1);

  const totalPrice = props.foundMirage.price * amount;

  return (
    <div css={mirageStyles}>
      <Head>
        <title>
          {props.foundMirage.name}, the {props.foundMirage.type}
        </title>
        <meta
          name="description"
          content={`${props.foundMirage.name} costs ${props.foundMirage.price} and this is the description ${props.foundMirage.description}`}
        />
      </Head>
      <h1>{props.foundMirage.name}</h1>
      <Image
        data-test-id="product-image"
        src={`/${
          props.foundMirage.id
        }-${props.foundMirage.name.toLowerCase()}.jpeg`}
        alt=""
        width="600"
        height="400"
      />
      {/* <div>Id: {props.foundMirage.id}</div> */}
      <div>Description: {props.foundMirage.description}</div>
      <br></br>
      <div>Price (μ€): {props.foundMirage.price}</div>
      <div>Total price (μ€): {totalPrice}</div>
      <br></br>
      <div>Amount:</div>
      <div> 🔮 {amount}</div>
      <div>
        <button
          onClick={() => {
            if (amount === 1) {
              return;
            }
            if (amount > 1) {
              setAmount(amount - 1);
            }
          }}
        >
          {' '}
          -
        </button>
        <button
          onClick={() => {
            setAmount(amount + 1);
          }}
        >
          {' '}
          +{' '}
        </button>
      </div>

      <button
        css={addToCartStyles}
        onClick={() => {
          // getting the value of the cookie counts
          const currentCookieValue = getParsedCookie('cookies');
          // if there is no cookie I initialize the value with amount
          if (!currentCookieValue) {
            setStringifiedCookie('cookies', [
              { id: props.foundMirage.id, counts: amount },
            ]);

            setAmount(1);
            location.reload();
            return;
          } else {
            // find the object that match the id of the page
            const foundCookie = currentCookieValue.find(
              (cookieMirageObject) =>
                cookieMirageObject.id === props.foundMirage.id,
            );

            // if a object is not found i add a new object
            if (!foundCookie) {
              currentCookieValue.push({
                id: props.foundMirage.id,
                counts: amount,
              });
            } else {
              // if a object is found i update the counts
              foundCookie.counts = foundCookie.counts + amount;
            }
          }
          // set the new value of the cookie
          setStringifiedCookie('cookies', currentCookieValue);
          props.setCookieState(currentCookieValue);
          setAmount(1);
          location.reload();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the mirage ID from the URL
  const mirageId = parseInt(context.query.mirageId);

  // Finding the mirage
  //
  // Note: This is not the most efficient way
  // of finding the single mirage (foundMirage), because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.

  const foundMirage = mirages.find((mirage) => {
    return mirage.id === mirageId;
  });

  if (typeof foundMirage === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Mirage not found',
      },
    };
  }

  return {
    props: {
      foundMirage: foundMirage,
    },
  };
}
