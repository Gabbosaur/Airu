import './globals.scss';

import { Providers } from './providers';

export const metadata = {
  title: 'Airu',
  description: 'Hackathon challenge',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
