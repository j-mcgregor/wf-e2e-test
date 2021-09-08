interface SummaryProps {
  info?: {
    regNumber: string;
    sector: string;
    description?: string;
    incorporationDate: number | string;
    lastAccountDate: number | string;
  };

  contact: {
    address_line_1: string | null;
    address_line_2: string | null;
    address_line_3: string | null;
    address_line_4: string | null;
    postal_code: string | null;
    phone_numbers: string[];
    websites: string[];
    emails: string[];
  };
}

// Totally depends on preference but I prefer the following
// const Summary: React.FC<SummaryProps> = ({ info, contact }) => {
const Summary = ({ info, contact }: SummaryProps) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl py-8 ">Summary</h3>
      {/* info table */}

      <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm">
        <div className="flex w-full md:w-1/2 flex-col bg-white">
          <div className="flex justify-between">
            <div className="border border-bg p-3 w-1/2 flex flex-col justify-center">
              <p className="py-1 text-primary">Registration Number</p>
              <p className="py-1 font-bold ">{info?.regNumber}</p>
            </div>

            <div className="border border-bg p-3 w-1/2 flex flex-col justify-center">
              <p className="py-1 text-primary">Industry Sector</p>
              <p className="py-1 font-bold">{info?.sector}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="border border-bg p-3 w-1/2 flex flex-col justify-center">
              <p className="py-1 text-primary">Incorporation Date</p>
              <p className="py-1 font-bold">{info?.incorporationDate}</p>
            </div>

            <div className="border border-bg p-3 w-1/2 flex flex-col justify-center">
              <p className="py-1 text-primary">{info?.lastAccountDate}</p>
              <p className="py-1 font-bold">Last Filed Account Date</p>
            </div>
          </div>

          <div className="p-3 flex flex-col justify-center">
            <p className="py-1 text-primary">Company Description</p>
            <p>{info?.description}</p>
          </div>
        </div>

        {/* map/contact */}
        <div className="bg-white md:ml-8 w-full md:w-1/2 h-full flex flex-col">
          <div className="h-2/3 w-full flex items-center justify-center bg-gray-500 text-white text-center">
            map placeholder
          </div>
          <div className="flex  flex-col p-4">
            <div>
              <p>Registered Address</p>
              <p>{contact?.address_line_1}</p>
              <p>{contact?.address_line_2}</p>
              <p>{contact?.address_line_3}</p>
              <p>{contact?.address_line_4}</p>
              <p>{contact?.postal_code}</p>
            </div>
            <div className="flex justify-between">
              <p>Email</p>

              {contact.emails && <p>{contact.emails[0]}</p>}
            </div>
            <div className="flex justify-between">
              <p>Website</p>
              {contact.websites && <p>{contact.websites[0]}</p>}
            </div>
            <div className="flex justify-between">
              <p>Telephone</p>
              {contact.phone_numbers && <p>{contact?.phone_numbers[0]}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
