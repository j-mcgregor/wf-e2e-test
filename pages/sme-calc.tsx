import React from 'react'

import Layout from '../components/layout/Layout';
import ReportNav from '../components/layout/ReportNav';
import SecondaryLayout from '../components/layout/SecondaryLayout';

const SmeCalc = () => {
  return (
    <Layout title="SME - Calculator ">
      <SecondaryLayout navigation={ <ReportNav />} >
       
      </SecondaryLayout>
    </Layout>
  )
}

export default SmeCalc
