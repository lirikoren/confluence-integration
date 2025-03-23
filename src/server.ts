import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import open from 'open';
import { getAuthUrl, getAccessToken } from './auth';

dotenv.config();
const app = express();
const PORT = 3000;

app.get('/login', (req: Request, res: Response) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
});

app.get('/oauth/callback', async (req: Request, res: Response) => {
    try {
    const authCode = req.query.code as string;

    if (!authCode) {
        console.error("No authorization code received.");
        res.status(400).json({ error: "Missing authorization code." });
        return;
    }

    const accessToken = await getAccessToken(authCode);

    res.json({ access_token: accessToken });

    return;

    } catch (error: any) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        res.status(500).send('Error getting access token');
        return;
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await open(`http://localhost:${PORT}/login`);
});

