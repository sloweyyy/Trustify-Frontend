import { metricComparison, formatMetricValue, revenueChartData, revenueChartOptions } from './metricPresentation';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
const metric = (current, previous) => ({ currentPeriod: { period: 'today', documentCount: current }, previousPeriod: { documentCount: previous }, growthPercent: 100 });
test('comparison derives signed values, preserves Vietnamese context and does not fabricate100% from zero', () => {
  expect(metricComparison(metric(5, 10), 'documentCount')).toBe('-50% so với hôm qua');
  expect(metricComparison(metric(15, 10), 'documentCount')).toBe('+50% so với hôm qua');
  expect(metricComparison(metric(10, 10), 'documentCount')).toBe('0% so với hôm qua');
  expect(metricComparison(metric(0, 0), 'documentCount')).toBe('Không phát sinh ở cả hai kỳ');
  expect(metricComparison(metric(2, 0), 'documentCount')).toBe('Tăng 2 so với hôm qua (kỳ trước: 0)');
  expect(metricComparison({}, 'documentCount')).toBe('Chưa có dữ liệu so sánh');
  expect(formatMetricValue(undefined)).toBe('Chưa có số liệu'); expect(formatMetricValue(0)).toBe('0');
});
test('revenue compares matching category labels including previous-only groups, with actual VND units', () => {
  const data = revenueChartData({ currentPeriod: { period: 'today', totals: [{ fieldName: 'B', totalAmount: 1250000 }, { fieldName: 'A', totalAmount: 2 }] }, previousPeriod: { period: 'previous_today', totals: [{ fieldName: 'A', totalAmount: 1 }, { fieldName: 'C', totalAmount: 3 }] } }, (item) => item.fieldName, ['gray', 'red']);
  expect(data.labels).toEqual(['B', 'A', 'C']); expect(data.datasets[0].data).toEqual([0, 1, 3]); expect(data.datasets[1].data).toEqual([1250000, 2, 0]);
  const options = revenueChartOptions(createTrustifyTheme(), 'Lĩnh vực');
  expect(options.plugins.tooltip.callbacks.label({ dataset: { label: 'Hôm nay' }, raw: 1250000 })).toMatch(/Hôm nay: 1\.250\.000\s₫/);
});
