import axios from "axios";
import { generateRequestOptions } from "./helpers/generate-request-options";

export class RapidapiService {
  async getDownloadLink(url: string): Promise<string> {
    const requestOptions = generateRequestOptions(url);
    const response = await axios.request(requestOptions);
    console.log(response.data);
    const downloadLink = response.data?.download_link;
    if (!downloadLink) {
      throw new Error("Download link not found in the response");
    }
    return downloadLink;
  }
}
