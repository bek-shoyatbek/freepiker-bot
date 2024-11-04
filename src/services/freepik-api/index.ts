import axios from 'axios';
import configs from '../../configs';

interface FreepikApiOptions {
    apiKey: string;
    baseUrl: string;
}

class FreepikApiService {
    private apiKey: string;
    private baseUrl: string;

    constructor(options: FreepikApiOptions) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl;
    }

    async downloadResource(resourceId: string, imageSize: string = 'original'): Promise<{ downloadLink: string; filename: string; }> {
        const url = `${this.baseUrl}/resources/${resourceId}/download?image_size=${imageSize}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'x-freepik-api-key': this.apiKey
                }
            });

            if (!response.data?.data?.url) {
                throw new Error('Resource not found');
            }


            return { downloadLink: response.data?.data?.url, filename: response.data?.data?.filename };
        } catch (error) {
            console.error('Error downloading resource:', error);
            throw error;
        }
    }

    extractResourceId(url: string): string | null {
        // Updated regex to be more flexible with categories
        const regex = /\/(?:premium|free)-[^\/]+\/[^_]+_(\d+)\.htm/;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    }
}

const apiKey = configs.FREEPIK_API_KEY;
const baseUrl = `${configs.FREEPIK_API_URL}/v1`;

export const freepikService = new FreepikApiService({ apiKey: apiKey as string, baseUrl });
