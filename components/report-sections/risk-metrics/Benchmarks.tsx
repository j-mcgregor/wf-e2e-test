import Benchmark from './Benchmark';

const Benchmarks = () => {
  return (
    <div className="flex flex-wrap lg:flex-row w-full justify-center sm:justify-between items-center pb-6 text-primary text-sm">
      <Benchmark
        title="SME Z-score"
        value={304}
        secondaryValues={[
          { title: 'Industry Benchmark', score: 403 },
          { title: 'Regional Benchmark', score: 204 }
        ]}
        hintTitle="Hint Title"
        hintBody="Aliqua laborum sunt do culpa incididunt eu proident do."
      />
      <Benchmark
        title="Probability of Default"
        value="12.04%"
        secondaryValues={[
          { title: 'Industry Benchmark', score: '6%' },
          { title: 'Regional Benchmark', score: null }
        ]}
        hintTitle="Hint Title"
        hintBody="Aliqua laborum sunt do culpa incididunt eu proident do."
      />
      <Benchmark
        title="Loss Given Default"
        value={304}
        secondaryValues={[
          { title: 'Industry Benchmark', score: 403 },
          { title: 'Regional Benchmark', score: 204 }
        ]}
        hintTitle="Hint Title"
        hintBody="Aliqua laborum sunt do culpa incididunt eu proident do."
      />
    </div>
  );
};

export default Benchmarks;
