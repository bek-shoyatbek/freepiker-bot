import axios from "axios";
import { generateRequestOptions } from "./helpers/generate-request-options";

export class RapidapiService {
  async getDownloadLink(
    url: string,
  ): Promise<{ downloadLink: string; filename: string } | null> {
    const requestOptions = generateRequestOptions(url);
    const response = await axios.request(requestOptions);
    const filename = response.data?.filename;
    const downloadLink = response.data?.download_link;
    if (!downloadLink) {
      return null;
    }
    return { downloadLink, filename };
  }
}
