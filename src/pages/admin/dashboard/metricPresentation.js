const periods = { today: 'hôm qua', current_week: 'tuần trước', current_month: 'tháng trước', current_year: 'năm trước' };
export const formatMetricValue = (value, currency = false) => typeof value === 'number' && Number.isFinite(value)
  ? value.toLocaleString('vi-VN', currency ? { style: 'currency', currency: 'VND' } : undefined) : 'Chưa có số liệu';

export const metricComparison = (data, key, currency = false) => {
  const current = data?.currentPeriod?.[key];
  const previous = data?.previousPeriod?.[key];
  const period = periods[data?.currentPeriod?.period];
  if (![current, previous].every((value) => typeof value === 'number' && Number.isFinite(value)) || !period) return 'Chưa có dữ liệu so sánh';
  if (previous === 0) return current === 0 ? 'Không phát sinh ở cả hai kỳ' : `Tăng ${formatMetricValue(current, currency)} so với ${period} (kỳ trước: 0)`;
  const percent = ((current - previous) / previous) * 100;
  return `${percent > 0 ? '+' : ''}${percent.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}% so với ${period}`;
};

const periodLabels = { today: 'Hôm nay', current_week: 'Tuần này', current_month: 'Tháng này', current_year: 'Năm nay', previous_today: 'Hôm qua', previous_current_week: 'Tuần trước', previous_current_month: 'Tháng trước', previous_current_year: 'Năm trước' };
export const revenueChartData = (data, labelAccessor, colors) => {
  const current = data?.currentPeriod?.totals || [];
  const previous = data?.previousPeriod?.totals || [];
  const labels = [...new Set([...current, ...previous].map(labelAccessor))];
  return { labels, datasets: [['previousPeriod', previous], ['currentPeriod', current]].map(([key, items], index) => ({
    label: periodLabels[data?.[key]?.period] || (index ? 'Kỳ này' : 'Kỳ trước'),
    data: labels.map((label) => items.find((item) => labelAccessor(item) === label)?.totalAmount || 0),
    backgroundColor: colors[index], borderRadius: 4,
  })) };
};
export const revenueChartOptions = (theme, axis) => ({
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: 'top', labels: { color: theme.palette.text.primary, font: { family: 'Be Vietnam Pro', size: 14 } } }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatMetricValue(context.raw, true)}` } } },
  scales: { x: { title: { display: true, text: axis, color: theme.palette.text.secondary }, ticks: { color: theme.palette.text.secondary, font: { family: 'Be Vietnam Pro', size: 14 } } }, y: { beginAtZero: true, title: { display: true, text: 'Doanh thu (₫)', color: theme.palette.text.secondary }, ticks: { color: theme.palette.text.secondary, callback: (value) => formatMetricValue(value, true) } } },
});
