import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getMirageById, Mirage } from '../../database/mirages';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
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
type Props =
  | {
      mirage: Mirage;
      cookieState?: string[];
      amount?: number;
      cookieMirageObject?: string[];
    }
  | {
      error: string;
    };

export default function SingleMirage(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Mirage not found</title>
          <meta name="description" content="Mirage not found" />
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/mirages">mirages page</Link>
      </div>
    );
  }
  const [amount, setAmount] = useState(1);

  const totalPrice = props.mirage.price * amount;

  return (
    <div css={mirageStyles}>
      <Head>
        <title>{props.mirage.name}</title>
        <meta
          name="description"
          content={`${props.mirage.name} costs ${props.mirage.price} and this is the description ${props.mirage.description}`}
        />
      </Head>
      <h1>{props.mirage.name}</h1>
      <Image
        data-test-id="product-image"
        src={`/${props.mirage.id}-${props.mirage.name.toLowerCase()}.jpeg`}
        alt=""
        width="600"
        height="400"
      />
      {/* <div>Id: {props.mirage.id}</div> */}
      <div>Description: {props.mirage.description}</div>
      <br></br>
      <div>Price (μ€): {props.mirage.price}</div>
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
              { id: props.mirage.id, counts: amount },
            ]);
            setAmount(1);
            location.reload();
            return;
          } else {
            // find the object that match the id of the page
            const foundCookie = currentCookieValue.find(
              (cookieMirageObject) => cookieMirageObject.id === props.mirage.id,
            );

            // if a object is not found i add a new object
            if (!foundCookie) {
              currentCookieValue.push({
                id: props.mirage.id,
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the mirage ID from the URL
  const mirageId = parseIntFromContextQuery(context.query.mirageId);

  if (typeof mirageId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Mirage not found',
      },
    };
  }

  // Finding the mirage
  //
  // Note: This is not the most efficient way
  // of finding the single mirage (foundMirage), because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.

  /* const foundMirage = mirages.find((mirage) => {
    return mirage.id === mirageId;
  }); */
  const foundMirage = await getMirageById(mirageId);

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
      mirage: foundMirage,
    },
  };
}
