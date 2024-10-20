import csv from "csv-parser";
import * as fs from "fs";

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