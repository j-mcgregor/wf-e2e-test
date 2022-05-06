import { CheckIcon, LightningBoltIcon, XIcon } from '@heroicons/react/outline';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import LinkCard from '../../components/cards/LinkCard';
import Layout from '../../components/layout/Layout';
import SearchBox from '../../components/sme-calc-sections/SearchBox';
import SearchContainer from '../../components/sme-calc-sections/SearchContainer';
import CodatCompanySearch from '../../components/report-integration/CodatCompanySearch';
import {
  CodatCompanyType,
  CodatIntegrationErrorType
} from '../../types/report';
import LoadingIcon from '../../components/svgs/LoadingIcon';
import IntegrationErrorMessages from '../../components/report-integration/IntegrationErrorMessages';

const ErrorMessages: CodatIntegrationErrorType[] = [
  {
    id: '06595846-e5c4-43d9-accc-53f0566a2bb9',
    name: 'Printing & Stationery'
  },
  {
    id: '077d7741-3150-4871-bad4-34d34ddeed70',
    name: 'Less Accumulated Depreciation on Office Equipment'
  },
  {
    id: '07a2f618-1b2a-40f6-b63e-680f71680bcf',
    name: 'Repairs and Maintenance'
  },
  {
    id: '0815c273-0463-4b99-9f18-fc1325d43cdb',
    name: 'Sales Tax'
  },
  {
    id: '17a6c4f0-e1bc-43a0-9631-6b5b1625c392',
    name: 'Motor Vehicle Expenses'
  },
  {
    id: '1b4a68d3-cd6a-4b2f-9ba0-40be692c2fa0',
    name: 'Cost of Goods Sold'
  },
  {
    id: '23222613-e09a-4193-adf8-b0df0d061254',
    name: 'Telephone & Internet'
  },
  {
    id: '25dd3a8f-cb47-40e7-85eb-006f43c4e54d',
    name: 'Interest Income'
  },
  {
    id: '2a49a1d5-023d-41fc-abc0-489bc24910d4',
    name: 'Insurance'
  },
  {
    id: '2b96d15c-492d-4b57-b329-ffb345fe1ac8',
    name: 'Office Expenses'
  },
  {
    id: '2c435635-d4de-4e59-83fd-3f8bb0bea014',
    name: 'Consulting & Accounting'
  },
  {
    id: '2de6352c-9c7e-4856-9bf7-e70f50cfe588',
    name: 'Rounding'
  },
  {
    id: '344bab8c-1570-4820-8696-34902e6293a9',
    name: 'Depreciation'
  },
  {
    id: '34d284ca-68ee-4a95-9a0e-4f288aaf4268',
    name: 'Owner A Funds Introduced'
  },
  {
    id: '3664180f-e18d-4ec7-b565-e773060a4ebe',
    name: 'Retained Earnings'
  },
  {
    id: '3aeaa4c2-861c-47ec-9ee5-74e622a94127',
    name: 'Entertainment'
  },
  {
    id: '3cc5d502-dde3-470a-ae3b-58dbeaa0c4eb',
    name: 'Bank Revaluations'
  },
  {
    id: '497e219a-97e2-4554-a87a-88191859c06e',
    name: 'Employee Tax Payable'
  },
  {
    id: '4b14c46f-36ca-42f5-9807-02ac3052db00',
    name: 'Interest Expense'
  },
  {
    id: '4f596878-7db9-4f31-a70f-ad3624e9de3c',
    name: 'Prepayments'
  },
  {
    id: '57ce4fe2-0f07-4229-8f69-d904d009bfbd',
    name: 'Accounts Payable'
  },
  {
    id: '57ed052a-9ba1-46b7-bb39-bda218a9809b',
    name: 'Legal expenses'
  },
  {
    id: '5a7da7a0-8e6e-4120-a178-bbee6165afbf',
    name: 'Superannuation'
  },
  {
    id: '6f092d0c-ce49-4b2e-b90b-ad012c3ddf16',
    name: 'Historical Adjustment'
  },
  {
    id: '787ae658-9de3-480d-a9c4-dc36ab36b6fb',
    name: 'Unpaid Expense Claims'
  },
  {
    id: '7c5ee0b0-0991-4d72-928d-9d1e3297d56d',
    name: 'Superannuation Payable'
  },
  {
    id: '8cf69416-1515-4375-89dd-1d47d51a1af9',
    name: 'Wages and Salaries'
  },
  {
    id: '8f433bcf-98fe-44cf-bf9c-64d99146e078',
    name: 'Bank Fees'
  },
  {
    id: '8fd32f27-b4a2-4141-b184-046900870f88',
    name: 'Unrealised Currency Gains'
  },
  {
    id: '902c475b-9a42-4f98-957f-0ec45a0af209',
    name: 'Sales'
  },
  {
    id: '9df0a0c2-67d2-4141-83ce-620cb20d5705',
    name: 'Wages Payable'
  },
  {
    id: '9eae651d-d175-4b8d-810c-7c4cf4a51240',
    name: 'Light, Power, Heating'
  },
  {
    id: 'a3702697-9024-4a6a-8b70-6770162c355b',
    name: 'Owner A Drawings'
  },
  {
    id: 'a59e8ec3-0982-49a5-97ce-e095122d78b0',
    name: 'Income Tax Payable'
  },
  {
    id: 'ae84a05d-5331-4ea4-a250-d66106a6f5a3',
    name: 'Tracking Transfers'
  },
  {
    id: 'aecd46df-7f93-49c3-a189-3cbcb7d69fc6',
    name: 'Realised Currency Gains'
  },
  {
    id: 'b205a052-6ce8-4e93-bc3f-1ed6b95461d6',
    name: 'Travel - National'
  },
  {
    id: 'b4d93fd9-6786-4f0d-83b2-bd90557178e3',
    name: 'Advertising'
  },
  {
    id: 'b70f5f44-def2-43a4-953e-5d703eab1b87',
    name: 'Office Equipment'
  },
  {
    id: 'bacd13b6-1220-4aee-b56b-b5213fe5a321',
    name: 'Loan'
  },
  {
    id: 'bb4578f4-6ebc-46b7-8983-9b7cfb06020c',
    name: 'Subscriptions'
  },
  {
    id: 'bd70e038-1bf1-4657-876f-4f100505dd6b',
    name: 'Accounts Receivable'
  },
  {
    id: 'be78a07e-3ed2-4b91-88f6-02c989613916',
    name: 'General Expenses'
  },
  {
    id: 'be7bc62a-fcdb-4f6d-953f-4c12cebcdc3c',
    name: 'Inventory'
  },
  {
    id: 'cab93861-a710-4544-bc42-8c39afabbb5d',
    name: 'Rent'
  },
  {
    id: 'cc65128f-0098-4242-9c18-63a402dba964',
    name: 'Travel - International'
  },
  {
    id: 'd0db4322-02f5-4c99-beda-f2797d455230',
    name: 'Income Tax Expense'
  },
  {
    id: 'd18082a1-4795-4282-92c9-ba7abbd49137',
    name: 'Suspense'
  },
  {
    id: 'd2882bab-6e8f-4ac4-be7e-3b6cf121c442',
    name: 'Cleaning'
  },
  {
    id: 'e4c9d840-9dfa-4158-95b9-130f6d11f746',
    name: 'Owner A Share Capital'
  },
  {
    id: 'e8514039-ad9e-40b7-bed0-6e419d69fb93',
    name: 'Less Accumulated Depreciation on Computer Equipment'
  },
  {
    id: 'ef759a37-88aa-4aab-be95-8440bb6cb0ed',
    name: 'Other Revenue'
  },
  {
    id: 'f4598e0a-9411-4a8b-8b60-8030507b7969',
    name: 'Freight & Courier'
  },
  {
    id: 'fd02d479-db4e-440d-b584-921c27afa9eb',
    name: 'Computer Equipment'
  }
];

const ReportIntegrations: NextPage = () => {
  const [firstStage, setFirstStage] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<CodatCompanyType | null>(null);
  const [errors, setErrors] = useState({});

  const errorMessages: CodatIntegrationErrorType[] | null = ErrorMessages;

  const t = useTranslations();

  return (
    <Layout title="Import Data">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">{t('integration_stage_1')}</h1>
        <p>{t('integration_stage_1_description')}</p>
        <div className="grid grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setFirstStage(true)}
            className={`${
              firstStage ? 'border-2 border-highlight-2 shadow-inner' : ''
            } text-left`}
          >
            <LinkCard
              header="Codat Integration"
              description={'Add your headers for your Codata integration.'}
              icon={<CheckIcon className="h-6 w-6" />}
              iconColor="bg-highlight-2 bg-opacity-20"
            />
          </button>
          <LinkCard
            header="Future Integration"
            description={'Add your headers for your Codata integration.'}
            icon={<LightningBoltIcon className="h-6 w-6" />}
            iconColor="bg-alt bg-opacity-20"
            disabled
          />
        </div>
        <div
          className={`flex flex-col gap-6 ${
            firstStage ? 'opacity-100' : 'opacity-60'
          }`}
        >
          <h1 className="text-3xl font-semibold mt-12">
            {t('integration_stage_2')}
          </h1>
          <p>{t('integration_stage_2_description')}</p>
          <div className="bg-white w-full shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              {t('itegration_search_title')}
            </h2>
            <CodatCompanySearch
              disabled={!firstStage}
              searchFunction={() => null}
              selectedResult={selectedCompany}
              setChosenResult={(option: CodatCompanyType) =>
                setSelectedCompany(option)
              }
              data={[]}
            />

            {/* Selected Company Button */}
            {selectedCompany && (
              <div className="text-sm">
                <div className="bg-bg w-full p-5 text-left flex justify-between">
                  <div className="flex flex-col justify-between">
                    <p className="font-bold">{selectedCompany.company_name}</p>
                    <p>{selectedCompany.company_id}</p>
                  </div>
                  <button onClick={() => setSelectedCompany(null)}>
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                {!errorMessages && (
                  <div className="flex items-center gap-4 mt-4">
                    <LoadingIcon className="h-4 w-4 text-highlight" />
                    <p>
                      {t.rich('itegration_validating_company', {
                        b: company_name => <b>{company_name}</b>,
                        company_name: selectedCompany.company_name
                      })}
                    </p>
                  </div>
                )}
                {errorMessages?.length === 0 && (
                  <div className="flex items-center gap-2 mt-4">
                    <CheckIcon className="h-6 w-6 text-highlight-2" />
                    <p>
                      {t.rich('itegration_validated_company', {
                        b: company_name => <b>{company_name}</b>,
                        company_name: selectedCompany.company_name
                      })}
                    </p>
                  </div>
                )}
                {errorMessages?.length > 0 && (
                  <IntegrationErrorMessages
                    companyName={selectedCompany.company_name}
                    errors={ErrorMessages}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportIntegrations;

export const getServerSideProps = ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/sme-calculator.${locale}.json`),
        ...require(`../../messages/${locale}/integrations.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
};
