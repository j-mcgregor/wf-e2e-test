interface SummaryProps {
  info: {
    regNumber: string;
    sector: string;
    description: string;
    incorporationDate: number | string;
    lastAccountDate: number | string;
  };

  contact: {
    address: string;
    email: string;
    website: string;
    phone: string;
  };
}

const Summary = ({ info, contact }: SummaryProps) => {
  return (
    <div>
      <h3 className="text-3xl py-8 ">Summary</h3>
      {/* info table */}

      <div className="flex justify-between">
        <div className="flex flex-col bg-white">
          <div className="flex justify-between p-4">
            <div>
              <p className="py-4">Registration Number</p>
              <p className="font-bold">{info.regNumber}</p>
            </div>
            <div>
              <p className="py-4">Industry Sector</p>
              <p className="font-bold">{info.sector}</p>
            </div>
          </div>

          <div className="flex justify-between p-6">
            <div>
              <p className="py-4">Incorporation Date</p>
              <p className="font-bold">{info.incorporationDate}</p>
            </div>

            <div>
              <p className="py-4">{info.lastAccountDate}</p>
              <p className="font-bold">Last Filed Account Date</p>
            </div>
          </div>

          <div className="p-6">
            <p className="py-4">Company Description</p>
            <p>{info.description}</p>
          </div>
        </div>
        {/* map/contact */}
        <div className="bg-white ml-8">
          <div className="h-[250px] w-[400px] bg-gray-500 text-white text-center">
            map placeholder
          </div>
          <div className="flex flex-col p-4">
            <div>
              <p>Registered Address</p>
              <p>{contact.address}</p>
            </div>
            <div className="flex justify-between">
              <p>Email</p>
              <p>{contact.email}</p>
            </div>
            <div className="flex justify-between">
              <p>Website</p>
              <p>{contact.website}</p>
            </div>
            <div className="flex justify-between">
              <p>Telephone</p>
              <p>{contact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
