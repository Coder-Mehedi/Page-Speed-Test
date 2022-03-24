import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getWindow } from 'ssr-window';
import ResultTable from '../../src/components/result-table';
import SiteForm from '../../src/components/site-form';
import Layout from '../../src/components/_layout';
const window = getWindow();

const PageSpeedPage = () => {
  const [siteUrl, setSiteUrl] = useState('');
  const [resultData, setResultData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${siteUrl}&key=${window.localStorage?.getItem(
    'apiKey'
  )}`;
  const getData = async () => {
    const { data } = await axios.get(url);
    return data;
  };
  const lighthouse = resultData?.lighthouseResult;

  useEffect(() => {
    if (siteUrl) {
      setIsLoading(true);
      getData().then((data) => {
        setResultData(data);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteUrl]);

  const result = [
    {
      // 'overall_performance': originLoadingExperience['overall_category'],
      score: lighthouse?.categories?.performance?.score * 100 || '',
      firstContentfulPaint:
        lighthouse?.audits?.['first-contentful-paint']?.displayValue,
      speedIndex: lighthouse?.audits?.['speed-index']?.displayValue,
      timeToInteractive: lighthouse?.audits?.interactive?.displayValue,
      firstMeaningfulPaint:
        lighthouse?.audits?.['first-meaningful-paint']?.displayValue,
    },
  ];
  console.log('result', result);
  return (
    <Layout>
      <SiteForm siteUrl={siteUrl} setSiteUrl={setSiteUrl} />
      <br />
      <ResultTable data={result} isLoading={isLoading} />
    </Layout>
  );
};

export default PageSpeedPage;
