import * as fs from "fs";

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