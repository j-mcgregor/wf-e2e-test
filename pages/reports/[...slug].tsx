import { useRouter } from 'next/router';

const Report = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>{slug}</div>;
};

export default Report;
