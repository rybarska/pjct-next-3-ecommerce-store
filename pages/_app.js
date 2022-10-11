import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

/* useEffect(() => {
  function setAllCookies(cookies) {
  const [cookieState, setCookieState] = useState(0);
  const currentCookieValue = getParsedCookie(cookies);
}
}, [cookies]) */

function MyApp({ Component, pageProps, props }) {
  const [cookieState, setCookieState] = useState();
  //const [updatedCookies, setUpdatedCookies] = useState();

  console.log(cookieState);

  // this is to update state on first render when state is empty
  useEffect(() => {
    const currentCookieValue = getParsedCookie('cookies');
    setCookieState(currentCookieValue);
  }, []);

  // to update the cookie every time state changes
  // this shiuld run every time cookieState is updated
  useEffect(() => {
    function setAllCookies() {
      // do this only if cookie state is defined
      if (typeof cookieState !== 'undefined') {
        const newCookieValue = cookieState;
        setStringifiedCookie('cookies', newCookieValue);
      }
    }
    setAllCookies();
  }, [cookieState]);

  /* useEffect(() => {
    function setAllCookies(cookies) {
      const [cookieState, setCookieState] = useState(0);
      const currentCookieValue = getParsedCookie(cookies);
    }
  }, [cookies]); */

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
      <Layout cookieState={cookieState} setCookieState={setCookieState}>
        <Component
          {...pageProps}
          cookieState={cookieState}
          setCookieState={setCookieState}
        />
      </Layout>
    </>
  );
}

export default MyApp;
