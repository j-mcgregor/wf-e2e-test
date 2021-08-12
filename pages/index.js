export default function Home(props) {
  return <div>Wiserfunding's new platform</div>;
}
export async function getStaticProps({ _preview, _params }) {
  return {
    props: {},

    revalidate: 10
  };
}
