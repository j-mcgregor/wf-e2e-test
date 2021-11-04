export type ResType = {
  ok: boolean;
  data?: IndustryMatchObj;
  error?: boolean;
};

export type IndustryMatchObj = {};

const topXMatches = (
  industries:
    | {
        [index: string]: number;
      }
    | undefined,
  toReturn: number
) => {
  if (!industries) return industries;

  // create array of industry objects with name and score
  const industryArray = Object.keys(industries).map(industry => ({
    name: industry,
    score: industries[industry.toString()]
  }));

  // sort the industries by size
  const sorted = industryArray.sort(
    (a: { score: number }, b: { score: number }) => b.score - a.score
  );

  // check that the amount sliced isn't more than the total length of the array
  const safeToReturn = Math.min(toReturn, sorted.length);

  // returned the sorted array
  return sorted.slice(0, toReturn ? safeToReturn : 3);
};

const analyseWebsite = async (
  companyName: string | undefined,
  companyWebsite: string
): Promise<ResType> => {
  if (!companyWebsite) {
    return { ok: false };
  }
  const res = await fetch(
    `https://8m8sgjx452.execute-api.eu-west-1.amazonaws.com/dev/v1/industry`,
    {
      method: 'POST',
      headers: {
        'x-api-key': `${process.env.ESG_API_KEY}`
      },
      body: JSON.stringify({
        company_name: companyName,
        company_url: companyWebsite,
        confidence_threshold: 0
      })
    }
  );

  if (res.ok) {
    const results = await res.json();
    return { ok: true, data: results };
  }

  if (!res.ok) {
    return { ok: false, error: true };
  }
  return { ok: false };
};

const ESG = {
  analyseWebsite,
  topXMatches
};

export default ESG;
