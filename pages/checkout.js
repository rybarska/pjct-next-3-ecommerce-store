import Head from 'next/head';

export default function Checkout(props) {
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
        <button>Confirm Order</button>
      </form>
    </div>
  );
}
