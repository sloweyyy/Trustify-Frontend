const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 20 });

// Display only: this never changes the amount sent to a service or checkout.
const formatVnd = (amount) => {
  if (amount === null || amount === undefined || amount === '') return 'Chưa có thông tin số tiền';
  const value = Number(amount);
  return Number.isFinite(value) ? formatter.format(value) : 'Chưa có thông tin số tiền';
};

export default formatVnd;
