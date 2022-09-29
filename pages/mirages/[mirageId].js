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
          {props.mirage.name}, the {props.mirage.type}
        </title>
        <meta
          name="description"
          content={`${props.mirage.name} is a ${props.mirage.price} with a ${props.mirage.description}`}
        />
      </Head>
      <h2>{props.mirage.name}</h2>
      <Image
        src={`/${props.mirage.id}-${props.mirage.name.toLowerCase()}.jpeg`}
        alt=""
        width="600"
        height="400"
      />
      <div>Id: {props.mirage.id}</div>
      <div>Price: {props.mirage.price}</div>
      <div>Description: {props.mirage.description}</div>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the mirage ID from the URL
  const mirageId = parseInt(context.query.mirageId);

  // Finding the mirage
  //
  // Note: This is not the most efficient way
  // of finding the single animal, because it
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
      mirage: foundMirage,
    },
  };
}
