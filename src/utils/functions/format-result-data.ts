const formatResultData = (resultData: any) => {
  const result = resultData.map((item: any) => {
    return {
      url: item.lighthouseResult.finalUrl,
      firstContentfulPaint:
        item.lighthouseResult.audits['first-contentful-paint'].displayValue,
      firstMeaningfulPaint:
        item.lighthouseResult.audits['first-meaningful-paint'].displayValue,
      score: item.lighthouseResult.categories.performance.score * 100,
      speedIndex: item.lighthouseResult.audits['speed-index'].displayValue,
      timeToInteractive: item.lighthouseResult.audits.interactive.displayValue,
    };
  });
  return result;
};

export default formatResultData;
