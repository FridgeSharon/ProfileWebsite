import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private baseUrl = (environment.apiBaseUrl || '').replace(/\/+$/, '');

  submitContact(contact: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/contact/request`, { contact });
  }
}
