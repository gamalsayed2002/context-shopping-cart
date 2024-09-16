const CURRENCY_FORMATTWER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});
const formatCurrency = (number) => {
  return CURRENCY_FORMATTWER.format(number);
};
export default formatCurrency;
