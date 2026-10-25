import React from 'react';
import RevenueChart from './RevenueChart';
const RevenueByFieldSection = ({ period, setPeriod, notaryFieldBarChartData, notaryFieldBarChartOptions, ...feedback }) => <RevenueChart title="Doanh thu theo lĩnh vực" {...{ period, setPeriod }} data={notaryFieldBarChartData} options={notaryFieldBarChartOptions} {...feedback} />;
export default RevenueByFieldSection;
