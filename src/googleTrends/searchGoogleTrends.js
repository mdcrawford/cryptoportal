import * as googleTrends from "google-trends-api";

export default function(keywords, timeframe) {
  // let startDate = new Date();
  // startDate.setDate(startDate.getDate() - timeframe);

  let searchObject = {
    keyword: keywords,
    // startTime: startDate,
    granularTimeResolution: true
  };

  console.log(searchObject);

  googleTrends
    .interestOverTime(searchObject)
    .then(results => {
      let resultsObject = JSON.parse(results);
      console.log(resultsObject);
      console.log(resultsObject.default.timelineData);
    })
    .catch(error => console.log(error));
}
