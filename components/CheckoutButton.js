import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// areItemsInCart is a Boolean
const checkoutButtonStyles = (areItemsInCart) => css`
  padding: 5px;

  ${!areItemsInCart &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `};
`;

export default function CheckoutButton(props) {
  const [areItemsInCart, setAreItemsInCart] = useState(false);
  const totalItemsInCart = props.cookieState
    ? props.cookieState.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.counts;
      }, 0)
    : 0;

  // This is only happening in the browser
  useEffect(() => {
    if (totalItemsInCart > 0) {
      setAreItemsInCart(true);
      return;
    } else {
      setAreItemsInCart(false);
      return;
    }
  }, []);

  return (
    <div css={checkoutButtonStyles(areItemsInCart)}>
      <button>
        <Link href="/checkout">Checkout</Link>
      </button>
    </div>
  );
}
