import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <h2>Get in Touch</h2>
        <div class="contact-card">
          <div class="linkedin-badge">
            <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.88a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
            </svg>
          </div>
          <p class="subtitle">
            I'm always open to discussing new engineering opportunities, integration architecture, or technical projects.
          </p>
          <a
            [href]="content.profile()?.linkedinUrl || 'https://www.linkedin.com/in/guy-sharon/'"
            target="_blank"
            rel="noopener noreferrer"
            class="linkedin-btn"
          >
            Send Message on LinkedIn
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p class="privacy-note">
            Direct LinkedIn messaging ensures fast response times without collecting or storing any personal data on this server.
          </p>
          
          <div class="divider">
            <span>— or try the live demo —</span>
          </div>
          @if (!showForm()) {
            <button class="toggle-btn" (click)="showForm.set(true)">Leave your contact info</button>
          } @else {
            <div class="demo-form">
              @if (submitted()) {
                <p class="success-message">Thanks, I'll reach out soon!</p>
              } @else {
                <input type="text" #contactInput aria-label="Email or Phone number" placeholder="Email or Phone number" class="contact-input" (input)="validationError.set('')">
                @if (validationError()) {
                  <p class="error-message">{{ validationError() }}</p>
                }
                <button class="submit-btn" [disabled]="sending()" (click)="submitDemo(contactInput.value)">
                  {{ sending() ? 'Sending...' : 'Submit Demo' }}
                </button>
                <p class="demo-privacy">
                  Demo mode. Submitted data will be processed by the backend and purged.
                </p>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 5rem 2rem;
      background: transparent;
      scroll-margin-top: 70px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      background: linear-gradient(90deg, #f8fafc, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .contact-card {
      background: rgba(255, 255, 255, 0.025);
      backdrop-filter: blur(12px);
      padding: 3rem 2.5rem;
      border-radius: 24px;
      border: 1px solid rgba(168, 85, 247, 0.25);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .linkedin-badge {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: rgba(10, 102, 194, 0.15);
      border: 1px solid rgba(10, 102, 194, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
    }
    .linkedin-icon {
      width: 32px;
      height: 32px;
      color: #0a66c2;
    }
    .subtitle {
      color: #cbd5e1;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      max-width: 480px;
    }
    .linkedin-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: linear-gradient(90deg, #0a66c2, #2563eb);
      color: #ffffff;
      text-decoration: none;
      padding: 1rem 2.25rem;
      font-size: 1.05rem;
      font-weight: 600;
      border-radius: 14px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 25px rgba(10, 102, 194, 0.35);
      width: 100%;
      max-width: 380px;
      box-sizing: border-box;
    }
    .linkedin-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(10, 102, 194, 0.5);
      background: linear-gradient(90deg, #0077b5, #1d4ed8);
    }
    .arrow-icon {
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease;
    }
    .linkedin-btn:hover .arrow-icon {
      transform: translateX(4px);
    }
    .privacy-note {
      margin-top: 1.75rem;
      font-size: 0.82rem;
      color: #64748b;
      line-height: 1.5;
      max-width: 440px;
    }
    .divider {
      width: 100%;
      margin: 2rem 0;
      text-align: center;
      position: relative;
    }
    .divider span {
      color: #64748b;
      font-size: 0.9rem;
      background: transparent;
      padding: 0 1rem;
    }
    .toggle-btn {
      background: transparent;
      border: 1px solid rgba(148, 163, 184, 0.3);
      color: #cbd5e1;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(148, 163, 184, 0.5);
    }
    .demo-form {
      width: 100%;
      max-width: 380px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .contact-input {
      width: 100%;
      padding: 0.85rem 1.2rem;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: rgba(0, 0, 0, 0.2);
      color: #f8fafc;
      font-size: 0.95rem;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s ease;
    }
    .contact-input:focus {
      border-color: #a855f7;
    }
    .error-message {
      color: #f87171;
      font-size: 0.85rem;
      margin: -0.5rem 0 0;
      text-align: left;
    }
    .success-message {
      color: #4ade80;
      font-size: 1.05rem;
      font-weight: 500;
      padding: 1rem;
      background: rgba(74, 222, 128, 0.1);
      border-radius: 10px;
      border: 1px solid rgba(74, 222, 128, 0.2);
    }
    .submit-btn {
      background: rgba(168, 85, 247, 0.15);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.4);
      padding: 0.85rem;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .submit-btn:hover:not(:disabled) {
      background: rgba(168, 85, 247, 0.25);
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .demo-privacy {
      font-size: 0.8rem;
      color: #64748b;
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent {
  content = inject(ContentService);
  contactService = inject(ContactService);

  showForm = signal(false);
  sending = signal(false);
  submitted = signal(false);
  validationError = signal('');

  submitDemo(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{7,20}$/;
    
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      this.validationError.set('Please enter a valid email or phone number');
      return;
    }
    
    this.validationError.set('');
    this.sending.set(true);
    
    this.contactService.submitContact(value).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.sending.set(false);
        this.validationError.set('Failed to send, please try again.');
      }
    });
  }
}

