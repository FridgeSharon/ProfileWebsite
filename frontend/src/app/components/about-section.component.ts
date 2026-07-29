import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { ContentService } from "../services/content.service";

@Component({
	selector: "app-about-section",
	standalone: true,
	template: `
		<section id="about" class="about-section">
			<div class="container">
				<h2>About This Website</h2>
				@if (content.profile()?.bio) {
					<div class="about-card">
						<div class="quote-mark open">&ldquo;</div>
						<p class="bio-text">{{ content.profile()!.bio }}</p>
						<div class="quote-mark close">&rdquo;</div>
						<div class="about-footer">
							@if (content.profile()?.location) {
								<span class="badge location-badge">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
										/>
									</svg>
									{{ content.profile()?.location }}
								</span>
							}
							<span class="badge available-badge">
								<span class="pulse-dot"></span>
								Open to opportunities
							</span>
						</div>
					</div>
				}
			</div>
		</section>
	`,
	styles: [
		`
			.about-section {
				padding: 5rem 2rem;
				background: transparent;
				scroll-margin-top: 70px;
			}
			.container {
				max-width: 860px;
				margin: 0 auto;
			}
			h2 {
				font-size: 2.5rem;
				margin-bottom: 2.5rem;
				text-align: center;
				background: linear-gradient(90deg, #f8fafc, #94a3b8);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.about-card {
				position: relative;
				background: rgba(255, 255, 255, 0.03);
				backdrop-filter: blur(16px);
				border: 1px solid rgba(168, 85, 247, 0.15);
				border-radius: 20px;
				padding: 3rem 3.5rem 2rem;
				box-shadow:
					0 8px 40px rgba(124, 58, 237, 0.08),
					inset 0 1px 0 rgba(255, 255, 255, 0.05);
				animation: fadeSlideUp 0.6s ease both;
			}
			@keyframes fadeSlideUp {
				from {
					opacity: 0;
					transform: translateY(24px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}
			.quote-mark {
				position: absolute;
				font-size: 6rem;
				line-height: 1;
				font-family: Georgia, serif;
				color: #a855f7;
				opacity: 0.18;
				pointer-events: none;
				user-select: none;
			}
			.quote-mark.open {
				top: 0.75rem;
				left: 1.25rem;
			}
			.quote-mark.close {
				bottom: 2.5rem;
				right: 1.5rem;
				transform: rotate(180deg);
			}
			.bio-text {
				font-size: 1.15rem;
				color: #cbd5e1;
				line-height: 1.85;
				margin: 0;
				position: relative;
				z-index: 1;
				white-space: pre-line;
			}
			.about-footer {
				margin-top: 2rem;
				display: flex;
				gap: 0.75rem;
				flex-wrap: wrap;
				align-items: center;
			}
			.badge {
				display: inline-flex;
				align-items: center;
				gap: 0.4rem;
				padding: 0.35rem 0.9rem;
				border-radius: 9999px;
				font-size: 0.82rem;
				font-weight: 600;
			}
			.location-badge {
				background: rgba(255, 255, 255, 0.06);
				border: 1px solid rgba(255, 255, 255, 0.1);
				color: #94a3b8;
			}
			.available-badge {
				background: rgba(34, 197, 94, 0.1);
				border: 1px solid rgba(34, 197, 94, 0.2);
				color: #4ade80;
			}
			.pulse-dot {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: #4ade80;
				animation: pulse 2s infinite;
			}
			@keyframes pulse {
				0%,
				100% {
					opacity: 1;
					transform: scale(1);
				}
				50% {
					opacity: 0.5;
					transform: scale(1.4);
				}
			}
			@media (max-width: 640px) {
				.about-card {
					padding: 2.5rem 1.75rem 1.75rem;
				}
				.bio-text {
					font-size: 1rem;
				}
				.quote-mark {
					font-size: 4rem;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
	content = inject(ContentService);
}
