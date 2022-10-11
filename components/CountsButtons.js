import { css } from '@emotion/react';
import Cookies from 'js-cookie';

export default function CountButtons() {
  return (
  <div>
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
}}><img height="12px" width="18px" src={`/${props.mirage.id}-${props.mirage.name.toLowerCase()}.jpeg`} alt="my image"/> - </button>
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
}}><img height="12px" width="18px" src={`/${props.mirage.id}-${props.mirage.name.toLowerCase()}.jpeg`} alt="my image"/> + </button>
</div>
  );
}
