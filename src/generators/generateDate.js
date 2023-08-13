const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateDate = () => {
  const hour = getRandomInt(0, 23);
  const minutes = getRandomInt(0, 10);

  return { hour, minutes };
};

export default generateDate;