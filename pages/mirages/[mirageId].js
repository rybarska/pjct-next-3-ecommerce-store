import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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

export default function Mirages(props) {
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

  return (
    <div css={mirageStyles}>
      <Head>
        <title>
          {props.foundMirage.name}, the {props.foundMirage.type}
        </title>
        <meta
          name="description"
          content={`${props.foundMirage.name} is a ${props.foundMirage.price} with a ${props.foundMirage.description}`}
        />
      </Head>
      <h2>{props.foundMirage.name}</h2>
      <Image
        src={`/${props.foundMirage.id}-${props.foundMirage.name.toLowerCase()}.jpeg`}
        alt=""
        width="600"
        height="400"
      />
      <div>Id: {props.foundMirage.id}</div>
      <div>Description: {props.foundMirage.description}</div>
      <div>Price: {props.foundMirage.price}</div>
      <button onClick={() => {
          // getting the value of the cookie counts
          const currentCookieValue = getParsedCookie('counts');

          // if there is no cookie we initialize the value with a -1
          if (!currentCookieValue) {
            setStringifiedCookie('counts', [
              { id: props.foundMirage.id, counts: -1 },
            ]);
            return;
          }

          // find the object that match the id of the page
          const foundCookie = currentCookieValue.find(
            (cookieMirageObject) =>
              cookieMirageObject.id === props.foundMirage.id,
          );

          // if a object is not found i add a new object
          if (!foundCookie) {
            currentCookieValue.push({ id: props.foundMirage.id, counts: -1 });
          } else {
            // if a object is found i update the counts
            foundCookie.counts--;
          }
          // set the new value of the cookie
          setStringifiedCookie('counts', currentCookieValue);
        }}><img height="12px" width="18px" src={`/${props.foundMirage.id}-${props.foundMirage.name.toLowerCase()}.jpeg`} alt="my image"/> - </button>
        <button onClick={() => {
          // getting the value of the cookie counts
          const currentCookieValue = getParsedCookie('counts');

          // if there is no cookie we initialize the value with a 1
          if (!currentCookieValue) {
            setStringifiedCookie('counts', [
              { id: props.foundMirage.id, counts: 1 },
            ]);
            return;
          }

          // find the object that match the id of the page
          const foundCookie = currentCookieValue.find(
            (cookieMirageObject) =>
              cookieMirageObject.id === props.foundMirage.id,
          );

          // if a object is not found i add a new object
          if (!foundCookie) {
            currentCookieValue.push({ id: props.foundMirage.id, counts: 1 });
          } else {
            // if a object is found i update the counts
            foundCookie.counts++;
          }
          // set the new value of the cookie
          setStringifiedCookie('counts', currentCookieValue);
        }}><img height="12px" width="18px" src={`/${props.foundMirage.id}-${props.foundMirage.name.toLowerCase()}.jpeg`} alt="my image"/> + </button>
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
