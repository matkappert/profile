
export const replaceText = (template: string, data: { [key: string]: any }): string => {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const value = data[key.trim()];
    return (value !== undefined && value !== null) ? value : 'NULL';
  });
};

export const sleep = (ms: number): Promise<unknown> => { return new Promise(resolve => setTimeout(resolve, ms)); };
