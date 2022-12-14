/* eslint-disable sonarjs/no-duplicate-string */
const mockReport = {
  created_at: new Date().setFullYear(2020, 1, 1).toString(),
  id: '1',
  company_name: 'THE WRIGHT GLAZING CO. LIMITED',
  contact_details: {
    address_line_1: '591 LONDON ROAD',
    address_line_2: 'CHEAM',
    address_line_3: null,
    address_line_4: null,
    city: 'SUTTON',
    country: 'United Kingdom',
    domains: ['wrightglazing.co.uk'],
    emails: ['batman@wayneindustries.com'],
    fax_numbers: null,
    incorporation_date: '2006-06-20 00:00:00',
    name: 'THE WRIGHT GLAZING CO. LIMITED',
    nuts_1: 'UKI - London',
    nuts_2: 'UKI6 - Outer London - South',
    nuts_3: 'UKI63 - Merton, Kingston upon Thames and Sutton',
    phone_numbers: ['+44 20 8644 4224 - registered on TPS'],
    postal_code: 'SM3 9AG',
    region: 'Western Europe',
    websites: ['www.wrightglazing.co.uk'],
    company_description:
      'Culpa minim do anim consequat labore amet officia ea mollit veniam velit. Lorem exercitation aute aliqua labore nisi ad enim do sunt do duis culpa. Consectetur excepteur est occaecat anim anim adipisicing magna ut enim adipisicing esse dolore.'
  },
  risk_metrics: {
    sme_z_score: {
      value: '267',
      regional_benchmark: '345',
      industry_benchmark: '211'
    },
    probability_of_default: {
      value: '267',
      regional_benchmark: '345',
      industry_benchmark: null
    },
    loss_given_default: {
      value: '267',
      regional_benchmark: null,
      industry_benchmark: null
    },
    bond_rating: 'B-'
  },
  highlights: {
    data_reliability: {
      reliability: 'reliable',
      comment:
        'We have accessed enough data to complete a report. If you would like to supplement the data in this report with the most recent management accounts please use the button below.'
    },
    risk_outlook: [
      'Risk outlook 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo velit pulvinar venenatis est eu. Aliquet imperdiet ac molestie aliquam netus et augue.',
      'Risk outlook 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo velit pulvinar venenatis est eu. Aliquet imperdiet ac molestie aliquam netus et augue.',
      'Risk outlook 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo velit pulvinar venenatis est eu. Aliquet imperdiet ac molestie aliquam netus et augue.',
      'Risk outlook 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo velit pulvinar venenatis est eu. Aliquet imperdiet ac molestie aliquam netus et augue.'
    ]
  },
  financials: {
    '2020': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '49977.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '586682.0',
      current_liabilities: '599996.0',
      current_ratio: '0.978',
      debtors: '0.0',
      depreciation: '6287.0',
      ebitda: null,
      employees: '13.0',
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '237710.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: null,
      material_costs: null,
      net_current_assets: '-13314.0',
      net_income: null,
      non_current_liabilities: '0.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '538065.0',
      other_current_liabilities: '599996.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: null,
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '223396.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: null,
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '224396.0',
      solvency_ratio: '27.22',
      stocks: '48617.0',
      tangible_fixed_assets: '237710.0',
      taxation: null,
      total_assets: '824392.0',
      total_shareholder_funds: '824392.0',
      working_capital: '48617.0'
    },
    // '2019': {
    //   accounts_receivable: null,
    //   added_value: null,
    //   capital: '1000.0',
    //   cash_and_equivalents: '95131.0',
    //   cash_flow: null,
    //   cost_of_employees: null,
    //   cost_of_goods_sold: null,
    //   creditors: '0.0',
    //   current_assets: '484824.0',
    //   current_liabilities: '499694.0',
    //   current_ratio: '0.97',
    //   debtors: '0.0',
    //   depreciation: '11552.0',
    //   ebitda: null,
    //   employees: '12.0',
    //   enterprise_value: null,
    //   export_revenue: null,
    //   extraordinary_expenses: null,
    //   extraordinary_profit: null,
    //   extraordinary_revenue: null,
    //   financial_expenses: null,
    //   financial_profit: null,
    //   financial_revenue: null,
    //   fixed_assets: '244332.0',
    //   gross_profit: null,
    //   intangible_fixed_assets: '0.0',
    //   interest_expenses: null,
    //   loans: '0.0',
    //   long_term_debt: null,
    //   material_costs: null,
    //   net_current_assets: '-14870.0',
    //   net_income: null,
    //   non_current_liabilities: '0.0',
    //   operating_profit: null,
    //   operating_revenue: null,
    //   other_current_assets: '433721.0',
    //   other_current_liabilities: '499694.0',
    //   other_fixed_assets: '0.0',
    //   other_non_current_liabilities: null,
    //   other_operating_expenses: null,
    //   other_operating_items: null,
    //   other_shareholders_finds: '228462.0',
    //   profit_after_tax: null,
    //   profit_and_loss_before_tax: null,
    //   profit_margin: null,
    //   provisions: null,
    //   r_and_d: null,
    //   return_on_capital_employed: null,
    //   return_on_shareholder_funds: null,
    //   sales: null,
    //   shareholders_funds: '229462.0',
    //   solvency_ratio: '31.47',
    //   stocks: '51103.0',
    //   tangible_fixed_assets: '244332.0',
    //   taxation: null,
    //   total_assets: '729156.0',
    //   total_shareholder_funds: '729156.0',
    //   working_capital: '51103.0'
    // },
    '2018': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '56197.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '40886.0',
      current_assets: '307942.0',
      current_liabilities: '328773.0',
      current_ratio: '0.937',
      debtors: '201208.0',
      depreciation: '10160.0',
      ebitda: null,
      employees: '12.0',
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '250322.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '167574.0',
      long_term_debt: null,
      material_costs: null,
      net_current_assets: '-20831.0',
      net_income: null,
      non_current_liabilities: '0.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '82283.0',
      other_current_liabilities: '120313.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: null,
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '228491.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: null,
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '229491.0',
      solvency_ratio: '41.108000000000004',
      stocks: '24451.0',
      tangible_fixed_assets: '250322.0',
      taxation: null,
      total_assets: '558264.0',
      total_shareholder_funds: '558264.0',
      working_capital: '184773.0'
    },
    '2017': {
      accounts_receivable: null,
      added_value: null,
      capital: '0.0',
      cash_and_equivalents: null,
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '495451.0',
      current_liabilities: '376343.0',
      current_ratio: '1.316',
      debtors: '0.0',
      depreciation: null,
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '40642.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: '0.0',
      material_costs: null,
      net_current_assets: '119108.0',
      net_income: null,
      non_current_liabilities: '3000.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '495451.0',
      other_current_liabilities: '376343.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: '3000.0',
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '156750.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: null,
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '156750.0',
      solvency_ratio: '29.239',
      stocks: '0.0',
      tangible_fixed_assets: '40642.0',
      taxation: null,
      total_assets: '536093.0',
      total_shareholder_funds: '536093.0',
      working_capital: '0.0'
    },
    '2016': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '158690.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '339877.0',
      current_liabilities: '172122.0',
      current_ratio: '1.9749999999999999',
      debtors: '0.0',
      depreciation: '8281.0',
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '24843.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: '0.0',
      material_costs: null,
      net_current_assets: '167755.0',
      net_income: null,
      non_current_liabilities: '4969.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '337460.0',
      other_current_liabilities: '172122.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: '4969.0',
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '186629.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: '4969.0',
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '187629.0',
      solvency_ratio: '51.445',
      stocks: '2417.0',
      tangible_fixed_assets: '24843.0',
      taxation: null,
      total_assets: '364720.0',
      total_shareholder_funds: '364720.0',
      working_capital: '2417.0'
    },
    '2015': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '105646.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '186491.0',
      current_liabilities: '103583.0',
      current_ratio: '1.8',
      debtors: '0.0',
      depreciation: '7627.0',
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '22876.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: '0.0',
      material_costs: null,
      net_current_assets: '82908.0',
      net_income: null,
      non_current_liabilities: '3621.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '154661.0',
      other_current_liabilities: '103583.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: '3621.0',
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '101163.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: '3621.0',
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '102163.0',
      solvency_ratio: '48.79600000000001',
      stocks: '31830.0',
      tangible_fixed_assets: '22876.0',
      taxation: null,
      total_assets: '209367.0',
      total_shareholder_funds: '209367.0',
      working_capital: '31830.0'
    },
    '2014': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '59850.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '109772.0',
      current_liabilities: '88381.0',
      current_ratio: '1.242',
      debtors: '0.0',
      depreciation: '6034.0',
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '18103.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: '0.0',
      material_costs: null,
      net_current_assets: '21391.0',
      net_income: null,
      non_current_liabilities: '3533.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '103386.0',
      other_current_liabilities: '88381.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: '3533.0',
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '34961.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: '3533.0',
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '35961.0',
      solvency_ratio: '28.122',
      stocks: '6386.0',
      tangible_fixed_assets: '18103.0',
      taxation: null,
      total_assets: '127875.0',
      total_shareholder_funds: '127875.0',
      working_capital: '6386.0'
    },
    '2013': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '3716.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '56108.0',
      current_liabilities: '59817.0',
      current_ratio: '0.9380000000000001',
      debtors: '0.0',
      depreciation: null,
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '13955.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: '0.0',
      material_costs: null,
      net_current_assets: '-3709.0',
      net_income: null,
      non_current_liabilities: '8618.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '56108.0',
      other_current_liabilities: '59817.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: '8618.0',
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '628.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: '2685.0',
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '1628.0',
      solvency_ratio: '2.324',
      stocks: '0.0',
      tangible_fixed_assets: '13955.0',
      taxation: null,
      total_assets: '70063.0',
      total_shareholder_funds: '70063.0',
      working_capital: '0.0'
    },
    '2012': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '9864.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '0.0',
      current_assets: '140418.0',
      current_liabilities: '141936.0',
      current_ratio: '0.989',
      debtors: '0.0',
      depreciation: null,
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '9549.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '0.0',
      long_term_debt: '0.0',
      material_costs: null,
      net_current_assets: '-1518.0',
      net_income: null,
      non_current_liabilities: '6080.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '134827.0',
      other_current_liabilities: '141936.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: '6080.0',
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '951.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: '1780.0',
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '1951.0',
      solvency_ratio: '1.301',
      stocks: '5591.0',
      tangible_fixed_assets: '9549.0',
      taxation: null,
      total_assets: '149967.0',
      total_shareholder_funds: '149967.0',
      working_capital: '5591.0'
    },
    '2011': {
      accounts_receivable: null,
      added_value: null,
      capital: '1000.0',
      cash_and_equivalents: '1967.0',
      cash_flow: null,
      cost_of_employees: null,
      cost_of_goods_sold: null,
      creditors: '2000.0',
      current_assets: '32666.0',
      current_liabilities: '35362.0',
      current_ratio: '0.924',
      debtors: '0.0',
      depreciation: null,
      ebitda: null,
      employees: null,
      enterprise_value: null,
      export_revenue: null,
      extraordinary_expenses: null,
      extraordinary_profit: null,
      extraordinary_revenue: null,
      financial_expenses: null,
      financial_profit: null,
      financial_revenue: null,
      fixed_assets: '4132.0',
      gross_profit: null,
      intangible_fixed_assets: '0.0',
      interest_expenses: null,
      loans: '23373.0',
      long_term_debt: null,
      material_costs: null,
      net_current_assets: '-2696.0',
      net_income: null,
      non_current_liabilities: '0.0',
      operating_profit: null,
      operating_revenue: null,
      other_current_assets: '1967.0',
      other_current_liabilities: '9989.0',
      other_fixed_assets: '0.0',
      other_non_current_liabilities: null,
      other_operating_expenses: null,
      other_operating_items: null,
      other_shareholders_finds: '436.0',
      profit_after_tax: null,
      profit_and_loss_before_tax: null,
      profit_margin: null,
      provisions: null,
      r_and_d: null,
      return_on_capital_employed: null,
      return_on_shareholder_funds: null,
      sales: null,
      shareholders_funds: '1436.0',
      solvency_ratio: '3.9019999999999997',
      stocks: '30699.0',
      tangible_fixed_assets: '4132.0',
      taxation: null,
      total_assets: '36798.0',
      total_shareholder_funds: '36798.0',
      working_capital: '28699.0'
    }
  },
  legal_events: [
    {
      date: '2021-06-07',
      description: 'Confirmation statement / Annual Report',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Annual Report filing']
    },
    {
      date: '2021-05-24',
      description: 'Accounts filed at Registry',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Statement filing']
    },
    {
      date: '2020-06-20',
      description: 'Confirmation statement / Annual Report',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Annual Report filing']
    },
    {
      date: '2020-03-30',
      description: 'Accounts filed at Registry',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Statement filing']
    },
    {
      date: '2019-06-20',
      description: 'Confirmation statement / Annual Report',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Annual Report filing']
    },
    {
      date: '2019-03-29',
      description: 'Accounts filed at Registry',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Statement filing']
    },
    {
      date: '2018-06-20',
      description: 'Confirmation statement / Annual Report',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Annual Report filing']
    },
    {
      date: '2018-05-31',
      description: 'Change of company officers',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Management', 'Change in position', 'Executive position']
    },
    {
      date: '2018-04-09',
      description: 'Charge lodged',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Default', 'Charge/mortgage']
    },
    {
      date: '2018-04-10',
      description: 'Legal IP Dispute',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Default', 'Negative event']
    },
    {
      date: '2018-04-09',
      description: 'LEGAL CHARGE',
      details: [
        {
          AmountSecured: null,
          Class: 'LegalEventMortgageData',
          DateFullySatisfied: null,
          DatePartiallySatisfied: null,
          MortgageDetails:
            'BY WAY OF A FIRST FIXED AND FLOATING CHARGE ON THE PROPERTY KNOWN AS 94A PRIORYROAD, SUTTON, SM3 8LNCONTAINS FIXED CHARGE.CONTAINS FLOATING CHARGE.LOATING CHARGE COVERS ALL THE PROPERTY OR UNDERTAKING OF THE COMPANY.CONTAINS NEGATIVE PLEDGE.',
          MortgageDetailsFreeText: null,
          PersonsEntitled: 'ALDERMORE BANK PLC'
        },
        {
          AmountSecured: null, // "N/A"
          Class: 'LegalEventMortgageData',
          DateFullySatisfied: null,
          DatePartiallySatisfied: null,
          MortgageDetails:
            "2.1 THE COMPANY WITH FULL TITLE GUARANTEE AND AS A CONTINUING SECURITY FOR THE MONIES AND LIABILITIES REFERRED TO IN CLAUSE 1 HEREBY CHARGES :2.1.1 ALL FREEHOLD AND LEASEHOLD PROPERTY TOGETHER WITH ALL BUILDINGS AND FIXTURES THEREON VESTEDIN THE COMPANY;2.1.2 ALL FUTURE FREEHOLD AND LEASEHOLD PROPERTY TOGETHER WITHALL BUILDINGS AND FIXTURES THEREON;2.1.3ALL BOOK AND OTHER DEBTS NOW OR AT ANYTIME HEREAFTER DUE OR OWING TO THE COMPANY, TOGETHER WITH THE BENEFIT OF ALL GUARANTEES, SECURITIES AND INDEMNITIES THEREOF AND ALL LIENS, RESERVATIONS OF TITLE, RIGHTS OF TRACING AND OTHER RIGHTS ENABLING THE COMPANY TO ENFORCE ANY SUCH DEBTS OR CLAIMS;2.1.4 ALL STOCKS, SHARES, DEBENTURES, LOAN CAPITAL, RIGHTS TO SUBSCRIBE FOR, CONVERT OTHER SECURITIES INTO OR OTHERWISE ACQUIRE ANY STOCKS, SHARES, DEBENTURES AND LOAN CAPITAL OF ANY OTHER BODY CORPORATE NOW OR AT ANY TIME HEREAFTER BELONGING TO THE COMPANY, TOGETHER WITH ALL DIVIDENDS, INTEREST AND OTHER INCOME AND OTHER RIGHTS OF WHATSOEVERKIND DERIVING FROM OR INCIDENTAL TO ANYOF THE FOREGOING;2.1.5 THE GOODWILL OFTHE COMPANY AND ITS UNCALLED CAPITAL NOW OR AT ANY TIME HEREAFTER IN EXISTENCE;2.1.6 ALL COPYRIGHTS, TRADEMARKS, PATENTS, REGISTERED DESIGNS AND OTHER INTELLECTUAL PROPERTY RIGHTS NOW OR AT ANY TIMEHEREAFTER BELONGING TO THE COMPANY;2.1.7 THE WHOLE OF THE COMPANY'S UNDERTAKING A ND ALL ITS PROPERTY AND ASSETS WHATSOEVER OR WHERESOEVER, PRESENT OR FUTURE,OTHER THAN ANY PROPERTY OR ASSETS FROM TIME TO TIME OR FOR THE TIME BEING EFFECTIVELY CHARGED TO THE BANK BY WAY OF FIXED CHARGE PURSUANT TO THIS DEBENTURE. CONTAINS FIXED CHARGE.CONTAINS FLOATING CHARGE.FLOATING CHARGE COVERS ALL THE PROPERTY OR UNDERTAKING OF THE COMPANY.CONTAINS NEGATIVE PLEDGE.",
          MortgageDetailsFreeText: null,
          PersonsEntitled: 'ALDERMORE BANK PLC'
        }
      ],
      id: null,
      source: 'Companies House',
      types: ['Default', 'Charge/mortgage']
    },
    {
      date: '2018-03-29',
      description: 'Accounts filed at Registry',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Financials', 'Statement filing']
    },
    {
      date: '2015-07-14',
      description: 'Change in registered office address',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Change in articles', 'Address change']
    },
    {
      date: '2010-04-27',
      description: 'Certificate of incorporation on change of name',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Change in articles', 'Company name change']
    },
    {
      date: '2010-04-19',
      description: 'Change of name',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Change in articles', 'Company name change']
    },
    {
      date: '2006-06-22',
      description: 'Memorandum and articles',
      details: null,
      id: null,
      source: 'Companies House',
      types: ['Change in articles']
    }
  ],
  personal: {
    ceo: 'John Smith',
    cfo: 'Jane Doe',
    chairman: 'Jerry Smith',
    directors: [
      {
        title: 'Ms',
        name: 'Jo Smith',
        role: 'Director',
        linked_in_profile: 'https://linkedin.com',
        profile_image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        appointment_date: '19-04-2010',
        nationality: 'British',
        date_of_birth: '01-03-1979',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      },
      {
        title: 'Mr',
        name: 'John Doe',
        role: 'Director',
        linked_in_profile: null,
        profile_image: null,
        appointment_date: '19-04-2010',
        nationality: 'French',
        date_of_birth: '09-12-1989',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'English Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      },
      {
        title: 'Mr',
        name: 'John Doe',
        role: 'Director',
        linked_in_profile: null,
        profile_image: null,
        appointment_date: '19-04-2010',
        nationality: 'French',
        date_of_birth: '09-12-1989',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'English Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      }
      // {
      //   title: 'Ms',
      //   name: 'Jo Smith',
      //   role: 'Director',
      //   linked_in_profile: 'https://linkedin.com',
      //   profile_image:
      //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      //   appointment_date: '19-04-2010',
      //   nationality: 'British',
      //   date_of_birth: '01-03-1979',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Ms',
      //   name: 'Jo Smith',
      //   role: 'Director',
      //   linked_in_profile: 'https://linkedin.com',
      //   profile_image:
      //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      //   appointment_date: '19-04-2010',
      //   nationality: 'British',
      //   date_of_birth: '01-03-1979',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Ms',
      //   name: 'Jo Smith',
      //   role: 'Director',
      //   linked_in_profile: 'https://linkedin.com',
      //   profile_image:
      //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      //   appointment_date: '19-04-2010',
      //   nationality: 'British',
      //   date_of_birth: '01-03-1979',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Ms',
      //   name: 'Jo Smith',
      //   role: 'Director',
      //   linked_in_profile: 'https://linkedin.com',
      //   profile_image:
      //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      //   appointment_date: '19-04-2010',
      //   nationality: 'British',
      //   date_of_birth: '01-03-1979',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Ms',
      //   name: 'Jo Smith',
      //   role: 'Director',
      //   linked_in_profile: 'https://linkedin.com',
      //   profile_image:
      //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      //   appointment_date: '19-04-2010',
      //   nationality: 'British',
      //   date_of_birth: '01-03-1979',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // },
      // {
      //   title: 'Mr',
      //   name: 'John Doe',
      //   role: 'Director',
      //   linked_in_profile: null,
      //   profile_image: null,
      //   appointment_date: '19-04-2010',
      //   nationality: 'French',
      //   date_of_birth: '09-12-1989',
      //   other_associations: [
      //     {
      //       title: 'Director',
      //       company: 'Scottish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: 'current'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Welsh Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'Irish Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     },
      //     {
      //       title: 'Director',
      //       company: 'English Seabird Company',
      //       from_date: '21-03-2012',
      //       to_date: '14-04-2021'
      //     }
      //   ]
      // }
    ],

    senior_management: [
      {
        title: 'Ms',
        name: 'Jo Smith',
        role: 'Director',
        linked_in_profile: 'https://linkedin.com',
        profile_image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        appointment_date: '19-04-2010',
        nationality: 'British',
        date_of_birth: '01-03-1979',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      },
      {
        title: 'Mr',
        name: 'John Doe',
        role: 'Director',
        linked_in_profile: null,
        profile_image: null,
        appointment_date: '19-04-2010',
        nationality: 'French',
        date_of_birth: '09-12-1989',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'English Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      },
      {
        title: 'Mr',
        name: 'John Doe',
        role: 'Director',
        linked_in_profile: null,
        profile_image: null,
        appointment_date: '19-04-2010',
        nationality: 'French',
        date_of_birth: '09-12-1989',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'English Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      },
      {
        title: 'Mr',
        name: 'John Doe',
        role: 'Director',
        linked_in_profile: null,
        profile_image: null,
        appointment_date: '19-04-2010',
        nationality: 'French',
        date_of_birth: '09-12-1989',
        other_associations: [
          {
            title: 'Director',
            company: 'Scottish Seabird Company',
            from_date: '21-03-2012',
            to_date: 'current'
          },
          {
            title: 'Director',
            company: 'Welsh Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'Irish Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          },
          {
            title: 'Director',
            company: 'English Seabird Company',
            from_date: '21-03-2012',
            to_date: '14-04-2021'
          }
        ]
      }
    ],

    shareholders: [
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'SYMON',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MR SYMON GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '51,00',
        salutation: 'MR',
        type: 'One or more named individuals or families',
        uci: 'P062973798',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'EMMA',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MRS EMMA GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'BRIAN',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'JAMES',
        name: 'MR BRIAN JAMES',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: null
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'JENNIFER',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'HANCOCK',
        name: 'MRS JENNIFER HANCOCK',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'EMMA',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MRS EMMA GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'EMMA',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MRS EMMA GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'EMMA',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MRS EMMA GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: null
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'EMMA',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MRS EMMA GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'EMMA',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'GROOMBRIDGE-WRIGHT',
        name: 'MRS EMMA GROOMBRIDGE-WRIGHT',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'GAVIN',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'JOHNSON',
        name: 'MR GAVIN JOHNSON',
        peps_sanctions_enforcements: false,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: 'https://linkedin.com'
      },
      {
        also_a_manager: 'Current manager',
        country: 'GB',
        first_name: 'FRANK',
        information_date: '06/2021',
        is_beneficially_held: false,
        is_liability: false,
        last_name: 'HERBERT',
        name: 'MR FRANK HERBERT',
        peps_sanctions_enforcements: true,
        percentage: '49,00',
        salutation: 'MRS',
        type: 'One or more named individuals or families',
        uci: 'P004899242',
        linkedin: null
      }
    ]
  }
};

export default mockReport;
