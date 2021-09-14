import Speedometer from './Speedometer';

const Benchmarks = () => {
  return (
    <div className="flex w-full justify-between pb-6 text-primary text-sm">
      <Speedometer
        title="SME Z-score"
        value={304}
        secondaryValues={[
          { title: 'Industry Benchmark', score: 403 },
          { title: 'Regional Benchmark', score: 204 }
        ]}
        hintTitle="Hint Title"
        hintBody="Aliqua laborum sunt do culpa incididunt eu proident do."
      />
      <Speedometer
        title="Probability of Default"
        value="12.04%"
        secondaryValues={[
          { title: 'Industry Benchmark', score: '6%' },
          { title: 'Regional Benchmark', score: null }
        ]}
        hintTitle="Hint Title"
        hintBody="Aliqua laborum sunt do culpa incididunt eu proident do."
      />
      <Speedometer
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
