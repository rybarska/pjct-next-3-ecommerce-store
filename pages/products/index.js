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
  console.log('props', props);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Products</h1>

      {props.products.map((product) => {
        return (
          <div key={`product-${product.id}`} css={productStyles}>
            <h2>
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h2>

            <Link href={`/products/${product.id}`}>
              <a>
                <Image
                  src={`/${product.id}-${product.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="150"
                  height="150"
                />
              </a>
            </Link>

            <div>Type: {product.type}</div>
            <div>Accessory: {product.accessory}</div>
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
  console.log('products', products);
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Products` page component above
    props: {
      // First prop, containing all animals
      products: products,
      // Second prop, example
      abc: 123,
    },
  };
}
