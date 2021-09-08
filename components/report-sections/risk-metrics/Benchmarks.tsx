import Benchmark from './Benchmark';

const Benchmarks = () => {
  return (
    <div className="flex w-full justify-between pb-6">
      <Benchmark />
      <div className="mx-2 w-full">
        <Benchmark />
      </div>

      <Benchmark />
    </div>
  );
};

export default Benchmarks;
