import csv from "csv-parser";
import * as fs from "fs";

export interface Row {
    fields: string[];
    values: string[];
}

export const getTurnJsonIntoRow = (data: Object): Row => {
    return {
      fields: Object.keys(data),
      values: Object.values(data),
    };
  };

export const readFileCVS = async (path: string) => {
    const dataFrame: any[] = [];
    return new Promise<any[]>((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on("data", (row: Object) => {
          dataFrame.push(row);
        })
        .on("end", () => {
          resolve(dataFrame);
        });
    });
  };

  export const transformArrayObjectsInJson = (
    objects: any,
    file_name: string,
    folder_name: string = "log"
  ) => {
    const path = "./" + folder_name + "/" + file_name + ".json";
    const jsonContent = JSON.stringify(objects, null, 2);
    fs.writeFileSync(path, jsonContent, "utf-8");
  };

  export const readFileJson = async (path: string) => {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  };  