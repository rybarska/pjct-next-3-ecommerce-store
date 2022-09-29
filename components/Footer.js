import { css } from '@emotion/react';

const footerStyles = css`
  margin-top: 20px;
  padding: 15px 20px;
  border-top: 2px solid #ddd;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      “To lose something is an illusion because everything we own is just a
      mirage! And you, you cannot lose something which is not yours!” ― Mehmet
      Murat ildan
    </footer>
  );
}
