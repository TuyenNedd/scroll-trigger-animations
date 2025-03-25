import '../styles/globals.css';
import ScrollProgress from '../components/ScrollProgress';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ScrollProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;