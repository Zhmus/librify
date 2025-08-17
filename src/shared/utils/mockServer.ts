type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface MockResponse {
    ok: boolean;
    status: number;
    json: () => Promise<any>;
}

const LOCAL_STORAGE_KEYS = {
    books: 'books',
    loans: 'loans',
    readers: 'readers',
};

async function fetchFromFile(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch from file: ${url}`);
    return response.json();
}

export async function mockServer(
    entityKey: keyof typeof LOCAL_STORAGE_KEYS,
    method: Method = 'GET',
    body?: any
): Promise<MockResponse> {
    const localKey = LOCAL_STORAGE_KEYS[entityKey];
    const cached = localStorage.getItem(localKey);
    const list = cached ? JSON.parse(cached) : [];

    switch (method) {
        case 'GET': {
            const data = cached
                ? JSON.parse(cached)
                : await fetchFromFile(`/data/${entityKey}.json`);
            localStorage.setItem(localKey, JSON.stringify(data));
            return { ok: true, status: 200, json: async () => data };
        }

        case 'POST': {
            list.push(body);
            localStorage.setItem(localKey, JSON.stringify(list));
            return { ok: true, status: 201, json: async () => body };
        }

        case 'PUT': {
            if (!body?.where || !body?.changes) {
                return {
                    ok: false,
                    status: 400,
                    json: async () => ({ message: 'Missing where or changes' }),
                };
            }

            const { where, changes } = body;
            const key = Object.keys(where)[0];
            const value = where[key];

            const index = list.findIndex((item: any) => item[key] === value);
            if (index === -1) {
                return {
                    ok: false,
                    status: 404,
                    json: async () => ({ message: 'Item not found' }),
                };
            }

            list[index] = { ...list[index], ...changes };
            localStorage.setItem(localKey, JSON.stringify(list));

            return { ok: true, status: 200, json: async () => list[index] };
        }

        default:
            return {
                ok: false,
                status: 405,
                json: async () => ({ message: 'Method Not Allowed' }),
            };
    }
}
