export default function Home(props) {
  return <div>Wiserfunding's new platform</div>;
}
export async function getStaticProps({ _preview, _params, locale }) {
  return {
    props: {},
    // You can get the messages from anywhere you like, but the recommended
    // pattern is to put them in JSON files separated by language and read
    // the desired one based on the `locale` received from Next.js.
    messages: {
      // eslint-disable-next-line security/detect-non-literal-require
      ...require(`../messages/${locale}/index.${locale}.json`)
    }
  };
}
