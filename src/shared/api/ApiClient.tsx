interface RequestOptions {
    method?: 'GET' | 'POST';
    params?: Record<string, string>;
    body?: any;
    isFormData?: boolean;
}


class ApiClient {
    private BaseUrl: string;

    constructor() {
        this.BaseUrl = 'http://localhost:8090/healthinvoice/api';
        //this.BaseUrl = 'http://healthinvoice.hub:8089/healthinvoice/api';
    }

    async request<T = any>(endpoint: string, options: RequestOptions = {}) {

        const { method = 'GET', params, body, isFormData = false } = options;
        const url = new URL(`${this.BaseUrl}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            })
        }

        const headers: HeadersInit = {};

        if (body && !isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url.toString(), {
            method,
            credentials: 'include',
            headers,
            body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json() as T;
    }

    async downloadFormatValidationReportFile(endpoint: string, filename: string, journalType: number) {

        const url = new URL(`${this.BaseUrl}${endpoint}`);

        url.searchParams.append('sourceArchiveFilename', filename);
        url.searchParams.append('journalType', journalType.toString());

        const response = await fetch(url.toString(), {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const contentDisposition = response.headers.get('content-disposition');

        if (contentDisposition) {
            const asciiMatch = contentDisposition.match(/filename="?([^";]+)"?/);
            if (asciiMatch) {
                filename = asciiMatch[1];
            }
        }

        const blob = await response.blob();

        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(urlBlob);
    }

    async downloadControlValidationReportFile(endpoint: string, schetUid: number, journalType: number) {

        const url = new URL(`${this.BaseUrl}${endpoint}`);

        url.searchParams.append('schetUid', schetUid.toString());
        url.searchParams.append('journalType', journalType.toString());

        const response = await fetch(url.toString(), {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'tfomsrx_report_base.zip';

        if (contentDisposition) {
            const asciiMatch = contentDisposition.match(/filename="?([^";]+)"?/);
            if (asciiMatch) {
                filename = asciiMatch[1];
            }
        }

        const blob = await response.blob();

        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(urlBlob);
    }

    get<T = any>(endpoint: string, params?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'GET', params })
    }

    post<T = any>(endpoint: string, body?: any) {
        return this.request<T>(endpoint, { method: 'POST', body });
    }

    postFormData<T = any>(endpoint: string, formData: FormData) {
        return this.request<T>(endpoint, { method: 'POST', body: formData, isFormData: true });
    }

}

export const api = new ApiClient();