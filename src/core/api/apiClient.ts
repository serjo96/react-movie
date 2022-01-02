function isAbsolutePath (url: string) {
  return !url.match('/')[0];
}

interface ApiRequestOptions extends RequestInit {
    baseUrl?: string
}

export interface ClientResponse<T> {
    status: number
    data: T
}

export class ResponseError extends Error {
    code: number;
    response: Response;
    defaultQuery?: {[key: string]: string};
    constructor (resp: Response) {
      super(resp.statusText);
      this.code = resp.status;
      this.response = resp;
      this.defaultQuery = {};
      Object.setPrototypeOf(this, ResponseError.prototype);
    }
}

export default class ApiClient {
    url: string;
    headers: HeadersInit;
    queryParams: {[key: string]: string} = {};
    options: RequestInit = {};

    constructor (url: string, options: ApiRequestOptions) {
      this.headers = {
        'Content-Type': 'application/json'
      };

      if (isAbsolutePath(url)) {
        this.url = url;
      } else {
        this.url = `${options.baseUrl}${url}`;
      }
    }

    private _buildQueryParams (queryParams: {[key: string]: string}) {
      const queryParam = this.queryParams ? { ...this.queryParams, queryParams } : queryParams;
      let q = Object.entries(queryParam).map(([k, value]) => {
        if (Array.isArray(value)) { return value.map(v => [k, encodeURIComponent(v)].join('=')).join('&'); }
        return [k, encodeURIComponent(value)].join('=');
      }).join('&');
      if (this.url.indexOf('?') === -1 && q) { q = `?${q}`; }
      return q;
    }

    private async _checkResponseStatus (response: Response) {
      if (response.status >= 200 && response.status < 400) {
        const data = await response.json();
        return { status: response.status, data };
      } else {
        throw new ResponseError(response);
      }
    }

    private _fetch (method: string, path?: string, body?: BodyInit | null, query?: {[key: string]: string}) {
      const apiPath = new URL(path, this.url);
      return fetch(apiPath + this._buildQueryParams(query),
        { ...this.options, method: method, headers: this.headers, body: body })
        .then(this._checkResponseStatus);
    }

    setHeaders (headers: HeadersInit, override = true) {
      const keep = override ? {} : this.headers;
      this.headers = { ...keep, ...headers };
      return this;
    }

    setQueryParams (queryParams: {[key: string]: string}, override = true) {
      const keep = override ? {} : this.queryParams;
      this.queryParams = { ...keep, ...queryParams };
      return this;
    }

    setOptions (options: RequestInit) {
      this.options = options;
      return this;
    }

    head (url?: string) {
      return this._fetch('HEAD', url);
    }

    get (url?: string, query?: {[key: string]: string}) {
      return this._fetch('GET', url, null, query);
    }

    post (url?: string, body?: BodyInit | null) {
      return this._fetch('POST', url, body);
    }

    put (url?: string, body?: BodyInit | null) {
      return this._fetch('PUT', url, body);
    }

    patch (url?: string, body?: BodyInit | null) {
      return this._fetch('PATCH', url, body);
    }

    delete (url?: string, body?: BodyInit | null) {
      return this._fetch('DELETE', url, body);
    }
}
