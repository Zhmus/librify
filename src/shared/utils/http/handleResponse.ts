export class ApiError extends Error {
    status: number;
    details?: unknown;

    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export async function handleResponse<T>(
    response: Response | { ok: boolean; status: number; json: () => Promise<T> }
): Promise<T> {
    let data: T | any;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message = (data && data.message) || `HTTP error ${response.status}`;
        throw new ApiError(response.status, message, data);
    }

    return data;
}
