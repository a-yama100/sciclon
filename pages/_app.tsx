// E:\programming\Project\sciclon\pages\_app.tsx

import Head from 'next/head';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
