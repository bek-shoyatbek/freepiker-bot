import path from "path";
import axios from "axios";
import fs from "fs";
import { generateRequestOptions } from "./helpers/generate-request-options";

export class RapidapiService {
  async download(url: string): Promise<string | undefined> {
    const requestOptions = generateRequestOptions(url);
    try {
      const response = await axios.request(requestOptions);

      const downloadLink = response.data?.download_link;
      if (!downloadLink) {
        throw new Error("Download link not found in the response");
      }
      const fileName = `download_${Date.now()}.zip`;
      const filePath = path.join(process.cwd(), "downloads", fileName);
      const writer = fs.createWriteStream(filePath);

      const downloadResponse = await axios({
        method: "get",
        url: downloadLink,
        responseType: "stream",
      });

      downloadResponse.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(filePath));
        writer.on("error", reject);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
