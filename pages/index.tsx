import { GetStaticPropsContext } from 'next';
import Layout from '../components/layout/Layout';

export default function Home() {
  return <Layout title="Dashboard" >Wiserfunding's new platform</Layout>;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`../messages/${locale}/index.${locale}.json`)
      }
    }
  };
}