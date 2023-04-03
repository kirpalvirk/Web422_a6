import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import { SSRProvider } from 'react-bootstrap';
import RouteGuard from '../components/RouteGuard';

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
      <SSRProvider>
        <Layout>
          <SWRConfig
            value={{
              fetcher: async (url) => {
                const res = await fetch(url);

                // If the status code is not in the range 200-299,
                // we still try to parse and throw it.
                if (!res.ok) {
                  const error = new Error("An error occurred while fetching the data.");
                  error.info = await res.json();
                  error.status = res.status;
                  throw error;
                }
                return res.json();
              },
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </Layout>
      </SSRProvider>
    </RouteGuard>
  );
}
