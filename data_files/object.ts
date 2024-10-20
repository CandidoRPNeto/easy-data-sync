export interface Data {
    fields: string[];
    values: string[];
}

export const getData = (data: Object): Data => {
    return {
      fields: Object.keys(data),
      values: Object.values(data),
    };
  };