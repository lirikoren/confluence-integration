import { AuthorizationCode } from 'simple-oauth2';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;


const oauth2 = new AuthorizationCode({
    client: { id: CLIENT_ID, secret: CLIENT_SECRET },
    auth: {
        tokenHost: 'https://auth.atlassian.com',
        tokenPath: '/oauth/token',
        authorizePath: '/authorize',
    },
});

export function getAuthUrl() {
    return oauth2.authorizeURL({
        redirect_uri: REDIRECT_URI,
        scope: ['read:confluence-space.summary', 'read:confluence-content.all'],
    });
}

export async function getAccessToken(authCode: string) {
    const tokenParams = { code: authCode, redirect_uri: REDIRECT_URI };
    try {
        const accessToken = await oauth2.getToken(tokenParams);
        return accessToken.token.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}


