import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: #e4c0fc;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;

  > a + a {
    margin-left: 13px;
  }
`;

export default function Header(props) {
  let totalItemsInCart = props.cookieState
    ? props.cookieState.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.counts;
      }, 0)
    : 0;

  return (
    <header>
      <nav css={navStyles}>
        <Link href="/">Home</Link>
        <Link href="/mirages">Mirages</Link>
        <Link href="/fruits">Fruits</Link>
        <Link href="/cart">Cart </Link>
        {totalItemsInCart}
      </nav>
    </header>
  );
}
