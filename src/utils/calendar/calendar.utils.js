export const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const generateMonthArray = ({ month, year, daysInMonth }) => {
  const MAX_DAYS = 42;
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const previousMonthDays =
    month === 1 ? getDaysInMonth(12, year - 1) : getDaysInMonth(month - 1, year);
  const monthArray = [];
  for (let i = firstDayOfMonth - 1; i > 0; i--) {
    monthArray.push({ currentMonth: false, day: previousMonthDays - i - 1 });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    monthArray.push({ currentMonth: true, day: i });
  }
  const emptySpaces = MAX_DAYS - monthArray.length;
  for (let i = 1; i <= emptySpaces; i++) {
    if (monthArray.length % 7 === 0) break;
    monthArray.push({ currentMonth: false, day: i });
  }
  return monthArray;
};
