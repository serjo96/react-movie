import { parseJSONCamelCase } from '~/utils/camelCase';

function isAbsolutePath (url: string) {
  return !url.match('/')[0];
}

interface ApiRequestOptions extends RequestInit {
  baseUrl?: string
}

export interface ClientResponse<T> {
  status: number;
  data: T;
  isSuccessRequest: boolean
}

type queryParams = { [key: string]: string | number | null | boolean | Array<string | number | null | boolean> | void}

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

    private _buildQueryParams (queryParams: queryParams) {
      const query = this.queryParams ? { ...this.queryParams, ...queryParams } : queryParams;
      let q = Object.entries(query).map(([k, value]) => {
        if (value === undefined || value === null) {
          return null;
        }
        if (Array.isArray(value)) {
          return value.map(v => [k, encodeURIComponent(v)].join('=')).join('&');
        }
        return [k, encodeURIComponent(value as string | boolean | number)].join('=');
      }).filter(Boolean).join('&');
      if (this.url.indexOf('?') === -1 && q) { q = `?${q}`; }
      return q;
    }

    private async _checkResponseStatus<R> (response: Response): Promise<ClientResponse<R>> {
      if (response.status >= 200 && response.status < 400) {
        const data = await response.text();
        const parsedResponse: R = parseJSONCamelCase(data);
        return { isSuccessRequest: response.status >= 200 && response.status < 400, status: response.status, data: parsedResponse };
      } else {
        throw new ResponseError(response);
      }
    }

    private _fetch<R> (method: string, path?: string, body?: BodyInit | null, query?: queryParams): Promise<ClientResponse<R>> {
      const apiPath = new URL(path, this.url);
      return fetch(apiPath + this._buildQueryParams(query),
        { ...this.options, method: method, headers: this.headers, body: body })
        .then(resp => this._checkResponseStatus<R>(resp));
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

    get<T = any> (url?: string, query?: queryParams): Promise<ClientResponse<T>> {
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

    all<T = any> (requests: Array<ClientResponse<T> | Promise<ClientResponse<T>>>): Promise<ClientResponse<T>[]> {
      return Promise.all<ClientResponse<T>>(requests);
    }

    spread<T, R> (callback: (...args: T[]) => R): (array: T[]) => R {
      return function wrap (arr) {
        // eslint-disable-next-line prefer-spread
        return callback.apply(null, arr);
      };
    }
}
