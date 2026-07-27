import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  submitContact(contact: string) {
    return this.http.post(`${this.baseUrl}/api/contact/request`, { contact });
  }
}
