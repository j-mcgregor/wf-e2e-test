import { useRouter } from 'next/router';

const Report = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Report id: {id}</div>;
};

export default Report;
