import { AccessToken } from './AccessToken';

/**
 * Utilities to handle authentication
 */
export default class BaseService {
    private readonly apiKey?: string;

    private readonly secret?: string;

    private readonly ttl: string;

    /**
     * @param apiKey API Key.
     * @param secret API Secret.
     * @param ttl token TTL
     */
    constructor(apiKey?: string, secret?: string, ttl?: string) {
        this.apiKey = apiKey;
        this.secret = secret;
        this.ttl = ttl || '10m';
    }

    rootAuthHeader(): { Authorization: string } {
        const at = new AccessToken(this.apiKey, this.secret, {
            ttl: this.ttl,
        });

        at.addGrant({
            isServiceRoot: true,
        });

        return {
            Authorization: at.toJwt(),
        };
    }
}
