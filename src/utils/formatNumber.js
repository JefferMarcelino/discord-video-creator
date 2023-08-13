const formatDigits = (number, digits) => {
  return String(number).padStart(digits, '0');
}

export default formatDigits;