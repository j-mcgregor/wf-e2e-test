import { useTranslations } from 'use-intl';

interface SummaryFinancialProps {
  // sales: string;
  // profit_and_loss_before_tax: string;
  // shareholders_funds: string;
  // tangible_fixed_assets: string;
  // total_assets: string;
  // current_liabilities: string;
  // current_assets: string;
  employees: string | number;
}

const SummaryFinancial = ({
  // sales,
  // profit_and_loss_before_tax,
  // shareholders_funds,
  // tangible_fixed_assets,
  // total_assets,
  // current_liabilities,
  // current_assets,
  employees
}: SummaryFinancialProps) => {
  const t = useTranslations();

  return (
    <div className="flex w-full h-52 border-2 border-blue-500">
      <p>{t('financial statement overview')}</p>

      <div>
        {/* <p>{sales}</p>
        <p>{profit_and_loss_before_tax}</p>
        <p>{shareholders_funds}</p>
        <p>{total_assets}</p> */}
        <p>{employees}</p>
      </div>
    </div>
  );
};

export default SummaryFinancial;
