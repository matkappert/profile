export const useSleep = (ms: number): Promise<unknown> => { return new Promise(resolve => setTimeout(resolve, ms)); };

// eslint-disable-next-line
export const useLog = (message?: any, ...optionalParams: any[]) => {
  // eslint-disable-next-line
  console.log(message, ...optionalParams);
};

// eslint-disable-next-line
export const useWarn = (message?: any, ...optionalParams: any[]) => {
  console.warn(message, ...optionalParams);
};

export const useStringCalculator = (str: string|number): number => {
  try {
    if (typeof str === 'number') { return str; }
    // str = str.replace(/(pi\b)/gi, Math.PI.toString());
    // eslint-disable-next-line
    return parseFloat(eval(str.replace(/[^-()\d/*+.]/g, '')));
  } catch (e) {
    return NaN;
  }
};
