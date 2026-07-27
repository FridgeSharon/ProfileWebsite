import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <h2>Let's Connect</h2>
        <div class="contact-card">
          @if (!showForm()) {
            <button class="toggle-btn" (click)="showForm.set(true)">Give me a call</button>
          } @else {
            @if (!successMsg()) {
              <form (submit)="onSubmit($event)">
                <div class="input-group">
                  <input
                    type="text"
                    [value]="contactValue"
                    (input)="contactValue = $any($event.target).value"
                    name="contact"
                    placeholder="Enter email or phone number"
                    [disabled]="isSubmitting()"
                  >
                  @if (errorMsg()) {
                    <div class="error">{{ errorMsg() }}</div>
                  }
                </div>
                <button type="submit" [disabled]="isSubmitting() || !contactValue">
                  {{ isSubmitting() ? 'Sending...' : 'Submit' }}
                </button>
              </form>
            } @else {
              <div class="success">{{ successMsg() }}</div>
            }
            <p class="privacy">Your personal data will only be used to contact you directly regarding this inquiry. It will never be sold or shared with third parties.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 6rem 2rem;
      background: linear-gradient(180deg, #0d0d14, #050508);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    .contact-card {
      background: rgba(255, 255, 255, 0.03);
      padding: 3rem 2rem;
      border-radius: 24px;
      border: 1px solid rgba(124, 58, 237, 0.2);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .toggle-btn, button[type="submit"] {
      background: linear-gradient(90deg, #7c3aed, #3b82f6);
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      width: 100%;
      transition: all 0.3s ease;
    }
    .toggle-btn:hover, button[type="submit"]:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .input-group {
      margin-bottom: 1.5rem;
      text-align: left;
    }
    input {
      width: 100%;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      font-family: inherit;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: #7c3aed;
      box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
    }
    .error {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    .success {
      color: #10b981;
      font-size: 1.2rem;
      font-weight: 600;
      padding: 1rem;
    }
    .privacy {
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #64748b;
      line-height: 1.5;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent {
  private contactService = inject(ContactService);

  showForm = signal(false);
  contactValue = '';
  isSubmitting = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly PHONE_REGEX = /^\+?[\d\s-]{7,}$/;

  onSubmit(event: Event) {
    event.preventDefault();
    const val = this.contactValue.trim();

    if (!this.EMAIL_REGEX.test(val) && !this.PHONE_REGEX.test(val)) {
      this.errorMsg.set('Please enter a valid email or phone number.');
      return;
    }

    this.errorMsg.set('');
    this.isSubmitting.set(true);

    this.contactService.submitContact(val).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMsg.set("Thanks, I'll reach out soon!");
        this.contactValue = '';
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMsg.set('Something went wrong. Please try again.');
      }
    });
  }
}
