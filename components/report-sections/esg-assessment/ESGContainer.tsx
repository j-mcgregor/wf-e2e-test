/* eslint-disable security/detect-object-injection */
import React from 'react';
import { useTranslations } from 'use-intl';
import { toTitleCase } from '../../../lib/utils/text-helpers';
import { EnvironmentalSocialGovernance } from '../../../types/report';
import { CardWithTab } from '../../cards/CardWithTab';
import { ReportSectionHeader } from '../../elements/Headers';
import Hint from '../../elements/Hint';
import Speedometer from '../risk-metrics/Speedometer';

const ESGContainer = ({
  companyName,
  sector,
  physical,
  transition,
  location: location
}: EnvironmentalSocialGovernance & {
  companyName: string;
  location?: string;
}) => {
  const t = useTranslations();
  const titleCasedLocation = location && toTitleCase(location);

  const renderCarbonIntensity = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(transition?.carbon_intensity * 100);

  const transitionText = t.rich('transition_text', {
    b: company_name => <b>{company_name}</b>,
    company_name: companyName,
    score: renderCarbonIntensity,
    risk_level: transition?.overall,
    industry: sector
  });

  const floodingText = t.rich('flooding_risk_text', {
    b: company_name => <b>{company_name}</b>,
    company_name: companyName,
    risk_level: physical?.flooding.overall,
    industry_risk: physical?.flooding.sector,
    location: titleCasedLocation,
    industry: sector
  });
  const droughtRiskText = t.rich('drought_risk_text', {
    b: company_name => <b>{company_name}</b>,
    company_name: companyName,
    risk_level: physical?.drought.overall,
    industry_risk: physical?.drought.country,
    location: titleCasedLocation,
    industry: sector
  });

  const calculateCarbonIntensityPercent = (x: number) => {
    // calculations performed on percentage
    return x / 350;
  };

  const calculateCarbonIntensityRotation = (value: number) => {
    const percent = calculateCarbonIntensityPercent(value);
    // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
    return percent * 260 - 130;
  };

  const NoData = ({ risk }: { risk: string }) => {
    return (
      <div className="border bg-bg p-4">
        <p>
          Not enough data for <span className="font-semibold">{risk} </span>
          analysis
        </p>
      </div>
    );
  };
  return (
    <div className="bg-white p-10 avoid-break ">
      {/* HEADER */}
      <div className="grid md:grid-cols-5 gap-4 pb-4">
        <div className="md:col-span-2">
          <p className="text-xl">{t('environmental_risk')}</p>
        </div>
        {/* SECTOR */}
        <div className="flex justify-between  w-full md:col-span-3">
          <h4 className="w-20 text-xl">{t('industry')}</h4>

          <h4 className="bg-slate-200 px-6 py-2 -mt-2 ">{sector || t('na')}</h4>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* SPEEDO */}
        <div className="md:col-span-2 flex items-center justify-center w-full print:max-w-[200px] print:mx-auto">
          <Speedometer
            value={transition?.carbon_intensity * 100 || null}
            rotationCalculator={calculateCarbonIntensityRotation}
            asMetric="%"
            title={t('carbon_intensity')}
            titleMiddle={true}
            reverseX
            hint={
              <Hint
                title={t('report_hints.esg.title')}
                body={t('report_hints.esg.body')}
              />
            }
            classes="w-full"
            innerClasses="scale-110 lg:scale-125 xl:scale-150"
          />
        </div>
        {/* CARDS */}
        <div className="md:col-span-3 md:col-start-3 space-y-4 my-auto pt-4">
          {/* transition */}
          {transition?.overall ? (
            <CardWithTab
              riskTitle={t('transition_risk')}
              riskLevel={transition?.overall}
              text={transitionText}
            />
          ) : (
            <NoData risk={t('transition_risk')} />
          )}

          {/* flooding */}

          {physical?.flooding.overall ? (
            <CardWithTab
              riskTitle={t('flooding_risk')}
              riskLevel={physical?.flooding.overall}
              text={floodingText}
            />
          ) : (
            <NoData risk={t('flooding_risk')} />
          )}

          {/* heatwave */}

          {physical?.drought.overall ? (
            <CardWithTab
              riskTitle={t('heatwave_risk')}
              riskLevel={physical?.drought.overall}
              text={droughtRiskText}
            />
          ) : (
            <NoData risk={t('heatwave_risk')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ESGContainer;
