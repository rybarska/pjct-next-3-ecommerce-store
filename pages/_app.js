import { css, Global } from '@emotion/react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

{/* useEffect(() => {
  function getAllCookies(cookies) {
  const currentCookieValue = getParsedCookie(cookies);
  const [cookieState, setCookieState] = useState(0);
}
}, [cookies])

useEffect(() => {
  function setAllCookies(cookies) {
  const [cookieState, setCookieState] = useState(0);
  const currentCookieValue = getParsedCookie(cookies);
}
}, [cookies]) */}

function MyApp({ Component, pageProps }) {
  const [amount, setAmount] = useState();
  const [foundCookie, setFoundCookie] = useState();
  const [counts, setCounts] = useState();
  const [cookieState, setCookieState] = useState(0);
console.log(cookieState);

  useEffect(() => {
   // function getAllCookies(cookies) {
    const currentCookieValue = getParsedCookie('cookies');
    setCookieState(currentCookieValue);
  //}
  }, [counts])

  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            margin: 0;
          }
        `}
      />
      <CookieBanner>cookie banner</CookieBanner>
      <Layout amount = {amount}
      setAmount = {setAmount}
      foundCookie = {foundCookie}
      setFoundCookie = {setFoundCookie}>



        <Component {...pageProps}
        amount = {amount}
        setAmount = {setAmount}
        foundCookie = {foundCookie}
        setFoundCookie = {setFoundCookie}

         />
      </Layout>
    </>
  );
}

export default MyApp;
