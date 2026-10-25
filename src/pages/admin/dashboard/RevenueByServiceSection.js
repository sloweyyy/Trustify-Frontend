import React from 'react';
import RevenueChart from './RevenueChart';
const RevenuePerServiceSection = ({ period, setPeriod, notaryServiceBarChartData, notaryServiceBarChartOptions, ...feedback }) => <RevenueChart title="Doanh thu theo dịch vụ" {...{ period, setPeriod }} data={notaryServiceBarChartData} options={notaryServiceBarChartOptions} {...feedback} />;
export default RevenuePerServiceSection;
