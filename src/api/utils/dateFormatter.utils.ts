const dateformatter = (date: Date | string): string => {
  const newDate = new Date(date);
  return `${newDate.getUTCDate()}/${newDate.getUTCMonth() + 1}/${newDate.getUTCFullYear()}`;
};

export default dateformatter;
