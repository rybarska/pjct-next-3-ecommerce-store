import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../database/products';


const productStyles = css`
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

export default function Products(props) {
  if (props.error) {
    return (
      <div>
        <Head>
          <title>Product not found</title>
          <meta name="description" content="Product not found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/products">products page</Link>
      </div>
    );
  }

  return (
    <div css={productStyles}>
      <Head>
        <title>
          {props.product.name}, the {props.product.type}
        </title>
        <meta
          name="description"
          content={`${props.product.name} is a ${props.product.type} with a ${props.product.accessory}`}
        />
      </Head>
      <h2>{props.product.name}</h2>
      <Image
        src={`/${props.product.id}-${props.product.name.toLowerCase()}.jpeg`}
        alt=""
        width="400"
        height="400"
      />
      <div>Id: {props.product.id}</div>
      <div>Type: {props.product.type}</div>
      <div>Accessory: {props.product.accessory}</div>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the product ID from the URL
  const productId = parseInt(context.query.productId);

  // Finding the product
  //
  // Note: This is not the most efficient way
  // of finding the single animal, because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.
  const foundProduct = products.find((product) => {
    return product.id === productId;
  });

  if (typeof foundAnimal === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  return {
    props: {
      product: foundProduct,
    },
  };
}
