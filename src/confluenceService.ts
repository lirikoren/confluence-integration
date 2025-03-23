import axios from 'axios';

export async function listPages(spaceKey: string, accessToken: string) {
    const url = `https://your-domain.atlassian.net/wiki/rest/api/space/${spaceKey}/content/page`;
    
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    });

    return response.data.results;
}

export async function getPageContent(pageId: string, accessToken: string) {
    const url = `https://your-domain.atlassian.net/wiki/rest/api/content/${pageId}?expand=body.storage.value`;

    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    });

    return response.data.body.storage.value;
}

