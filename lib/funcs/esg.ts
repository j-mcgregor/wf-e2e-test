import { ApiResType } from '../../types/global';

const topXMatches = (
  // industries:{[index: string]: number;} | undefined,
  industries: { sector: string; match: string }[] | undefined,
  toReturn: number
) => {
  if (!industries) return industries;

  const sorted = industries.sort(
    (a: { match: string }, b: { match: string }) =>
      Number(b.match) - Number(a.match)
  );

  // check that the amount sliced isn't more than the total length of the array
  const safeToReturn = Math.min(toReturn, sorted.length);

  // returned the sorted array
  return sorted.slice(0, toReturn ? safeToReturn : 3);
};

const analyseWebsite = async (
  companyName: string | undefined,
  companyWebsite: string
): Promise<ApiResType> => {
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
