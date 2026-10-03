export interface Strength { title: string; description: string; technologies: readonly string[]; }
export interface ExperienceEntry {
  role: string; company: string; companyUrl: string; companyLogo: string;
  startDate: string; endDate: string; focus: string; bullets: readonly string[];
}
export interface CaseStudy {
  id: string; title: string; label: string; description: string;
  highlights: readonly string[]; technologies: readonly string[];
  note: string;
  url?: string; linkLabel?: string;
}
export interface SkillGroup { title: string; skills: readonly string[]; }
export interface EducationEntry { institution: string; program: string; period?: string; detail: string; }

// Public copy only. Source CVs, contact details, and private project data stay outside this repository.
export const portfolioContent = {
  site: {
    url: 'https://guysharon.pages.dev', initials: 'GS',
    skipLink: 'Skip to main content', homeLabel: 'Guy Sharon, home',
    primaryNavigation: 'Primary navigation', footerNavigation: 'Footer navigation',
    menuLabel: 'Toggle navigation', technologiesLabel: 'Technologies',
    darkMode: 'Dark mode', switchToDark: 'Switch to dark mode', switchToLight: 'Switch to light mode',
    pauseMotion: 'Pause animations', resumeMotion: 'Resume animations', reducedMotion: 'Reduced motion follows your device setting',
    navigation: [
      { label: 'Work', path: '/', fragment: 'work' },
      { label: 'Experience', path: '/', fragment: 'experience' },
      { label: 'About', path: '/', fragment: 'about' },
      { label: 'CV', path: '/cv', fragment: undefined },
    ],
    linkedin: 'LinkedIn', github: 'GitHub', cv: 'Read my CV', connect: 'Let’s connect',
    repository: 'View source', architecture: 'About this site', back: 'Back to portfolio',
    footerNote: 'Built with care. Served as static HTML.',
    metadata: {
      '/': { title: 'Guy Sharon | Backend, Cloud & Integrations', description: 'Backend-focused software engineer with nearly 6 years of experience in Node.js, TypeScript, integrations, and AWS. Explore my work and recent projects.' },
      '/cv': { title: 'CV | Guy Sharon — Software Engineer', description: 'Guy Sharon’s experience at Fareplace and WalkMe, technical skills, education, and printable public CV.' },
      '/architecture': { title: 'About This Site | Guy Sharon', description: 'Inside this static Angular portfolio: typed content, prerendered routes, accessibility, and Cloudflare Pages delivery.' },
    },
  },
  profile: {
    name: 'Guy Sharon', role: 'Software Engineer | Backend, Cloud & Integrations', shortRole: 'Backend, cloud & integrations',
    headline: 'Complex systems.', headlineAccent: 'Connected.',
    summary: 'I’m Guy, a backend-focused software engineer. I build Node.js and TypeScript services that move data, connect products, and keep things running.',
    cvSummary: 'Backend-focused software engineer with nearly 6 years of software development experience, building Node.js/TypeScript microservices, cross-system integrations, and applications on AWS. Combines hands-on delivery with a background in systems and infrastructure, production troubleshooting, and database optimization.',
    about: [
      'I like working where the pieces meet: a third-party API, the data behind a product, or a service that needs to behave reliably in production.',
      'I started in systems administration before moving into software development. That background still shapes how I work: follow the issue across the application, database, and infrastructure until it makes sense.',
      'These days, I also build personal projects with Codex and ChatGPT, from a household expense tracker to a multiplayer game. I use them to explore ideas, implement changes, and troubleshoot, then check the result in tests and in use.',
    ],
    location: 'Tel Aviv, Israel', availability: 'Open to backend & integrations roles',
    linkedinUrl: 'https://www.linkedin.com/in/guy-sharon/', githubUrl: 'https://github.com/FridgeSharon',
    repositoryUrl: 'https://github.com/FridgeSharon/ProfileWebsite',
  },
  hero: {
    eyebrow: 'Software engineer · Tel Aviv', workLink: 'Explore my work',
    diagramLabel: 'From integration to production', diagramCaption: 'The connections are where I come in.',
    diagramNodes: [
      { label: 'Connect', value: 'APIs & integrations', detail: 'REST · SOAP · Protobuf' },
      { label: 'Build', value: 'Node.js + TypeScript', detail: 'Services & data flows' },
      { label: 'Deliver', value: 'AWS & containers', detail: 'ECS · EKS · Lambda' },
    ],
    facts: [
      { value: 'Nearly 6 years', label: 'Software development' },
      { value: 'Backend first', label: 'With an infrastructure foundation' },
      { value: 'From idea to use', label: 'Professional & personal projects' },
    ],
  },
  sections: {
    work: { eyebrow: '01 / Selected work', title: 'Ideas, made tangible.', description: 'Recent personal projects developed with Codex. Practical problems, working software, and a few things learned along the way.' },
    experience: { eyebrow: '02 / Experience', title: 'Built in production.', description: 'Nearly 6 years in software development, following a foundation in systems and infrastructure.' },
    about: { eyebrow: '03 / A little about me', title: 'Curious about how it all fits.' },
    skills: { eyebrow: '04 / Toolkit', title: 'The tools behind the work.', description: 'Technologies I use across backend systems, integrations, data, cloud delivery, and frontend work.' },
    education: { eyebrow: '05 / Foundation', title: 'Always building on it.', languages: 'Languages' },
    contact: { eyebrow: 'Have something in mind?', title: 'Let’s build something useful.', description: 'For backend, cloud, and integration opportunities, you can reach me on LinkedIn.' },
  },
  projectUi: { details: 'Engineering notes' },
  strengths: [
    { title: 'Connect the pieces', description: 'Integration services that bring external providers, applications, and data together.', technologies: ['REST', 'SOAP', 'Protobuf'] },
    { title: 'Follow the problem', description: 'Production troubleshooting across services, database queries, and cloud infrastructure.', technologies: ['Node.js', 'SQL', 'AWS'] },
    { title: 'Check the result', description: 'Use tests, measured behavior, and hands-on checks to guide the next change.', technologies: ['Automated tests', 'Profiling', 'Codex'] },
  ] satisfies Strength[],
  experience: [
    {
      role: 'Fullstack Developer & Integrations Engineer', company: 'Fareplace',
      companyUrl: 'https://www.linkedin.com/company/fareplace/', companyLogo: '/assets/company-fareplace.jpg',
      startDate: 'May 2024', endDate: 'July 2026', focus: 'Integrations · Data flows · AWS',
      bullets: [
        'Designed and maintained Node.js/TypeScript integration microservices connecting Scala backends, web applications, and external providers through REST, SOAP, and Protobuf.',
        'Built data synchronization integrations with Redis caching and MongoDB/MySQL for efficient data access and processing.',
        'Containerized applications with Docker and deployed services on AWS Lambda, ECS, EC2, and S3.',
      ],
    },
    {
      role: 'Fullstack Developer', company: 'WalkMe',
      companyUrl: 'https://www.linkedin.com/company/walkme/', companyLogo: '/assets/company-walkme.jpg',
      startDate: 'September 2020', endDate: 'January 2024', focus: 'Backend services · Production troubleshooting',
      bullets: [
        'Focused primarily on backend development (80% of the role), building Node.js microservices with Headless Chrome, MongoDB, and SQL on AWS ECS and EKS.',
        'Worked across engineering teams to troubleshoot production issues, implement GraphQL endpoints, and improve data flows between services.',
        'Optimized MS SQL Server and PostgreSQL queries; improved application responsiveness with debouncing, autocomplete, and lazy loading.',
        'Maintained and modernized AngularJS/Angular applications using TypeScript, RxJS, and SCSS.',
      ],
    },
    {
      role: 'IT / System Administrator', company: 'WalkMe',
      companyUrl: 'https://www.linkedin.com/company/walkme/', companyLogo: '/assets/company-walkme.jpg',
      startDate: 'June 2019', endDate: 'September 2020', focus: 'Systems · Networks · Device management',
      bullets: [
        'Set up Azure AD Sync, Intune Autopilot, and device management with JAMF, Okta, and Intune.',
        'Configured and maintained VMware vSphere, switches, VPNs, DNS, DHCP, and directory services.',
      ],
    },
  ] satisfies ExperienceEntry[],
  caseStudies: [
    {
      id: 'expenses', title: 'Family Expenses', label: 'In use · Private application',
      description: 'A bilingual household expense tracker for importing statements, categorizing transactions, and keeping shared records consistent. Recent work keeps loaded sections usable while fetching only changes.',
      highlights: [
        'Revision-based synchronization sends changed records after the initial snapshot, while loaded sections stay usable.',
        'Private drafts, conflict checks, retry-safe saves, and an audit trail protect concurrent edits.',
        'Statement imports reconcile totals and retain source evidence; English and Hebrew layouts share the same workflow.',
      ],
      note: 'Household data and the live application are private.',
      technologies: ['TypeScript', 'React', 'React Query', 'Cloudflare D1', 'R2'],
    },
    {
      id: 'game', title: 'Hill Climbers Royale', label: 'In development',
      description: 'A Godot multiplayer game with private Steam lobbies, team modes, free-for-all, and bots. The host owns the simulation; players share terrain, combat, scoring, and rematches.',
      highlights: [
        'Authoritative simulation with client prediction, reconciliation, and remote interpolation.',
        'Local multi-process tests covered combat, traps, disconnects, ties, and repeated matches.',
        'A real Steam lobby hosted a match with bots and returned to the same lobby.',
      ],
      note: 'Two-account Steam testing across separate internet connections is still pending. The game has not been released on Steam.',
      technologies: ['Godot', 'GDScript', 'GodotSteam', 'ENet'],
    },
    {
      id: 'portfolio', title: 'This portfolio', label: 'Public website',
      description: 'An Angular portfolio with shared typed content, prerendered pages, and a printable CV. Built as a static site and delivered through Cloudflare Pages.',
      highlights: [
        'Build-time HTML makes every route readable before JavaScript loads.',
        'One content source keeps the homepage and public CV aligned.',
        'Responsive layouts, keyboard navigation, reduced-motion support, and print styles.',
      ],
      note: 'No application analytics, cookies, contact form, or runtime backend.',
      technologies: ['Angular 22', 'TypeScript', 'SCSS', 'Cloudflare Pages'],
      url: 'https://github.com/FridgeSharon/ProfileWebsite', linkLabel: 'View repository',
    },
  ] satisfies CaseStudy[],
  skillGroups: [
    { title: 'Backend & APIs', skills: ['Node.js', 'TypeScript', 'JavaScript', 'Scala', 'Express', 'REST', 'SOAP', 'Protobuf', 'GraphQL'] },
    { title: 'Cloud & deployment', skills: ['AWS ECS / EKS', 'Lambda', 'EC2', 'S3', 'Docker', 'Kubernetes — application experience'] },
    { title: 'Data & caching', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'MS SQL Server', 'Redis'] },
    { title: 'Frontend & scripting', skills: ['Angular / AngularJS', 'RxJS', 'SCSS', 'React — basic', 'C#', 'Python', 'PowerShell'] },
    { title: 'Development workflow', skills: ['OpenAI Codex', 'ChatGPT', 'Refactoring', 'Troubleshooting', 'Automated testing'] },
    { title: 'Recent personal projects', skills: ['Godot / GDScript', 'Steam networking', 'React Query', 'Cloudflare D1 / R2'] },
  ] satisfies SkillGroup[],
  cv: {
    eyebrow: 'Curriculum vitae', summary: 'Professional summary', skills: 'Technical skills', experience: 'Professional experience',
    education: 'Education & training', languages: 'Languages', print: 'Print / Save PDF',
    note: 'Public CV · Updated September 2026', workflow: 'Uses Codex and ChatGPT for development, refactoring, and troubleshooting.',
  },
  education: [
    { institution: 'Sela College', program: 'Software Development Program', period: '2018–2020', detail: 'C#, JavaScript/TypeScript, .NET, Angular, and ASP.NET MVC.' },
    { institution: 'See-Security College', program: 'Network Management & Cybersecurity', detail: 'Graduated with merit. Studies/certifications: MCSA, CCSA, CCNA, Linux Essentials, Python, and ICND1.' },
  ] satisfies EducationEntry[],
  languages: [{ language: 'Hebrew', level: 'Native' }, { language: 'English', level: 'Fluent' }],
  architecture: {
    eyebrow: 'Under the hood', title: 'A small site. A considered build.',
    description: 'This portfolio is an Angular application compiled into static HTML and assets. Cloudflare Pages serves the result, and every page starts with its content already in place.',
    decisionsTitle: 'The choices behind it.',
    decisions: [
      { title: 'One source for the content', description: 'Typed local data supplies the homepage, public CV, project notes, and page metadata. Updates happen together and can be reviewed in Git.' },
      { title: 'HTML at build time', description: 'The portfolio, CV, and architecture routes are prerendered. Visitors and search engines receive meaningful content in the initial response.' },
      { title: 'A small privacy footprint', description: 'The application has no analytics, visitor identifiers, cookies, forms, or database. Public contact links point to LinkedIn and GitHub.' },
      { title: 'Usable across contexts', description: 'Semantic HTML, visible keyboard focus, mobile navigation, reduced-motion support, and dedicated CV print styles cover everyday ways of using the site.' },
    ],
    flowTitle: 'From source to screen.',
    flow: [
      { title: 'Typed content', detail: 'One shared content file' },
      { title: 'Angular build', detail: 'Three prerendered routes' },
      { title: 'Cloudflare Pages', detail: 'Static HTML, CSS & JavaScript' },
      { title: 'Your browser', detail: 'Content first, interaction next' },
    ],
    footerTitle: 'Take a look inside.', footerDescription: 'The source code is available on GitHub.',
  },
} as const;
