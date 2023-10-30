import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import "./results.css";

const CHART_OPTIONS = {
  chart: {
    type: "bar",
    height: "100%",
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
};

function ResultsBarChart({ data, fieldName, numBars }) {
  const tops = data
    .slice()
    .sort((a, b) => {
      return b[fieldName] - a[fieldName];
    })
    .map((row) => {
      return { label: row.addressName, value: row[fieldName] };
    })
    .slice(0, numBars);

  if (!data || !data.length || !tops.length) {
    return null;
  }

  const topData = tops.map((t) => t.value);
  const topLabels = tops.map((t) => t.label);

  const series = [{ data: topData }];
  const options = {
    ...CHART_OPTIONS,
    xaxis: {
      categories: topLabels,
    },
  };

  return (
    <div className="results-chart">
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
}

ResultsBarChart.propTypes = {
  data: PropTypes.array,
  fieldName: PropTypes.string,
  numBars: PropTypes.number,
};

ResultsBarChart.defaultProps = {
  data: [],
  fieldName: "totalSent",
  numBars: 5,
};

export default ResultsBarChart;
