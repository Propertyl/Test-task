const getDayName = (date:Date) => {
  return new Intl.DateTimeFormat('en-US',{weekday:'long',timeZone:'UTC'}).format(date);
}

const getMonthName = (date:Date) => {
  return new Intl.DateTimeFormat('en-US',{month:'short',timeZone:'UTC'}).format(date);
}

const getCurrentTime = () => {
  const date = new Date();

  return `${date.getHours()}:${date.getMinutes().toString().padStart(2,'0')} ${getDayName(date)}, ${date.getDate().toString().padStart(2,'0')} ${getMonthName(date)} ${date.getUTCFullYear()}`;
}

export default getCurrentTime;