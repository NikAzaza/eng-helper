import { get, RequestOptions } from 'https';
import { URL } from 'node:url';
import { Service } from 'typedi';

@Service()
export class HttpRequestUtil {
  get(options: RequestOptions | string | URL): Promise<string> {
    return new Promise((resolve, reject) => {
      get(options, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(data);
        });

      }).on("error", (err) => {
        reject(err);
      });
    });
  }
}

