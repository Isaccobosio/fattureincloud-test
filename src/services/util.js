export function currencyFormat(num = 0, noDecimal = true) {
  if (typeof num == 'string') {
    num = +num;
  }
  const numFixed = num?.toFixed(2);
  if (noDecimal) {
    return num?.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €';
  }
  return numFixed?.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €';
}