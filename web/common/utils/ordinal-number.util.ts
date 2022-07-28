const getOrdinalNumberSuffixEn = (lastDigit: number, lastTwoDigits?: number) => {
  if (lastTwoDigits) {
    switch (lastTwoDigits) {
      case 11:
      case 12:
      case 13:
        return 'th';
    }
  }
  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const getOrdinalNumberSuffixEs = (lastDigit: number) => {
  switch (lastDigit) {
    case 1:
      return 'era';
    case 2:
      return 'da';
    case 3:
      return 'ra';
    case 4:
    case 5:
    case 6:
      return 'ta';
    case 0:
    case 7:
      return 'ma';
    case 8:
      return 'va';
    case 9:
      return 'na';
    default:
      return 'va';
  }
};

export const getLastDigit = (number: number) => {
  return number % 10;
};

export const getLastTwoDigits = (number: number) => {
  return number % 100;
};

export const getOrdinalNumberSuffix = (language: string, lastDigit: number, lastTwoDigits?: number) => {
  if (language === 'en') {
    return getOrdinalNumberSuffixEn(lastDigit, lastTwoDigits);
  } else if (language === 'es') {
    return getOrdinalNumberSuffixEs(lastDigit);
  }
  return '';
};
