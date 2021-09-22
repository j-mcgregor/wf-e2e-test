interface CorporateOverviewProps {
  ceo: string;
  cfo: string;
  chairman: string;
  directors: number;
  seniorManagement: number;
  shareholders: number;
}

const CorporateOverview = ({
  ceo,
  cfo,
  chairman,
  directors,
  seniorManagement,
  shareholders
}: CorporateOverviewProps) => {
  return (
    <div className="flex flex-col w-full bg-white shadow-sm rounded-sm">
      <div className="grid grid-cols-3 grid-rows-2">
        <div className="p-4 border">
          <p className="font-bold">{ceo}</p>
          <p>CEO</p>
        </div>
        <div className="p-4 border">
          <p className="font-bold">{cfo}</p>
          <p>CFO</p>
        </div>
        <div className="p-4 border">
          <p className="font-bold">{chairman}</p>
          <p>Chairman</p>
        </div>
        <div className="p-4 border">
          <p className="font-bold">{directors}</p>
          <p>Directors</p>
        </div>
        <div className="p-4 border">
          <p className="font-bold">{shareholders}</p>
          <p>Shareholders</p>
        </div>
        <div className="p-4 border">
          <p className="font-bold">{seniorManagement}</p>
          <p>Senior Management</p>
        </div>
      </div>
    </div>
  );
};

export default CorporateOverview;
