const underscoreRegexp = /_/;
const camelCaseRegexp = /(?=[A-Z])/;

const camelCaseReplacer = (key: string, value: any) => {
  if (value && typeof value === 'object') {
    for (const k in value) {
      if (camelCaseRegexp.test(k) && Object.hasOwnProperty.call(value, k)) {
        // value[camelCaseToUnderscore(k)] = value[k];
        delete value[k];
      }
    }
  }
  return value;
};

export const underscoreToCamelCase = (s: string) => {
  const ss = s.split(underscoreRegexp);
  return ss.slice(1).reduce((res, _s) => res + _s.charAt(0).toUpperCase() + _s.substring(1), ss[0]);
};

export const camelCaseReviver = (key: string, value: any) => {
  if (value && typeof value === 'object') {
    for (const k in value) {
      if (underscoreRegexp.test(k) && Object.hasOwnProperty.call(value, k)) {
        value[underscoreToCamelCase(k)] = value[k];
        delete value[k];
      }
    }
  }
  return value;
};

export const parseJSONCamelCase = (text: string) => {
  try {
    return JSON.parse(text, camelCaseReviver);
  } catch (e) {
    if (text.length > 0 && text[0] === '<') {
      throw new Error(text);
    }
    throw new Error(e.message);
  }
};
