import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs/Observable';

/**
 * Mitigation for XSRF token leakage via protocol-relative URLs.
 * Ensures any request with a protocol-relative URL is treated as cross-site
 * by removing XSRF headers and disabling credentials.
 */
@Injectable()
export class ProtocolAwareXsrfInterceptor implements HttpInterceptor {
  constructor(@Inject(DOCUMENT) private document: any) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isProtocolRelative(req.url)) {
      // Clone request without XSRF header and without credentials to avoid leaking tokens
      const sanitized = req.clone({
        withCredentials: false,
        setHeaders: this.stripXsrfHeader(req.headers)
      });
      return next.handle(sanitized);
    }

    return next.handle(req);
  }

  private isProtocolRelative(url: string): boolean {
    return url.startsWith('//') || url.startsWith('///');
  }

  private stripXsrfHeader(headers: any): { [name: string]: string } {
    const updated: { [name: string]: string } = {};
    headers.keys().forEach((key: string) => {
      if (key.toLowerCase() !== 'x-xsrf-token' && key.toLowerCase() !== 'xsrf-token') {
        updated[key] = headers.get(key);
      }
    });
    return updated;
  }
}

export const PROTOCOL_AWARE_XSRF_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: ProtocolAwareXsrfInterceptor,
  multi: true
};
