export interface ProfileContent {
  name: string;
  role: string;
  headline: string;
  summary: string;
  about: readonly string[];
  location: string;
  availability: string;
  linkedinUrl: string;
  githubUrl: string;
  repositoryUrl: string;
}

export interface Strength {
  title: string;
  description: string;
  technologies: readonly string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl: string;
  companyLogo: string;
  startDate: string;
  endDate: string;
  bullets: readonly string[];
}

export interface CaseStudy {
  title: string;
  label: string;
  description: string;
  highlights: readonly string[];
  technologies: readonly string[];
  url?: string;
  linkLabel?: string;
}

export interface SkillGroup {
  title: string;
  skills: readonly string[];
}

export interface EducationEntry {
  institution: string;
  program: string;
  period?: string;
  detail: string;
}

export const portfolioContent = {
  profile: {
    name: 'Guy Sharon',
    role: 'Backend-focused TypeScript/JavaScript Engineer',
    headline: 'I build reliable Node.js services and integrations that connect complex systems.',
    summary:
      'I design distributed workflows, REST and gRPC APIs, and cloud-native services across AWS, MySQL, MongoDB, PostgreSQL, and Redis.',
    about: [
      'I am most useful where systems need to connect reliably: APIs, data flows, cloud infrastructure, and the operational details between them.',
      'My background spans software engineering and systems administration, which helps me debug across application, data, and infrastructure boundaries. I use AI-assisted tools pragmatically to accelerate implementation and verification without outsourcing engineering judgment.',
    ],
    location: 'Tel Aviv, Israel',
    availability: 'Open to backend, fullstack, and integrations roles',
    linkedinUrl: 'https://www.linkedin.com/in/guy-sharon/',
    githubUrl: 'https://github.com/FridgeSharon',
    repositoryUrl: 'https://github.com/FridgeSharon/ProfileWebsite',
  } satisfies ProfileContent,
  strengths: [
    {
      title: 'Integration engineering',
      description: 'Cross-system workflows and dependable third-party integrations across modern and legacy protocols.',
      technologies: ['REST', 'gRPC', 'Protobuf', 'SOAP', 'GraphQL'],
    },
    {
      title: 'Backend systems',
      description: 'Node.js and TypeScript services designed around clear boundaries, reliable data flow, and production operability.',
      technologies: ['Node.js', 'TypeScript', 'Express', 'Redis'],
    },
    {
      title: 'Cloud delivery',
      description: 'Containerized services and delivery workflows across AWS compute, orchestration, and storage platforms.',
      technologies: ['AWS', 'Docker', 'ECS', 'EKS', 'Lambda', 'CI/CD'],
    },
  ] satisfies Strength[],
  experience: [
    {
      role: 'Fullstack Developer & Integrations Engineer',
      company: 'Fareplace',
      companyUrl: 'https://www.linkedin.com/company/fareplace/',
      companyLogo: '/assets/company-fareplace.jpg',
      startDate: 'May 2024',
      endDate: 'Present',
      bullets: [
        'Design and maintain TypeScript and Node.js integration services and cross-system workflows spanning Scala backends and React-facing services.',
        'Build REST, gRPC/Protobuf, and SOAP integrations backed by MySQL, MongoDB, and Redis for reliable third-party synchronization.',
        'Use Codex, GitHub Copilot, Claude, and Gemini for implementation, refactoring, and internal QA tooling while retaining hands-on review and validation.',
        'Containerize and deliver services across AWS Lambda, ECS, EC2, and S3.',
      ],
    },
    {
      role: 'Fullstack Developer',
      company: 'WalkMe',
      companyUrl: 'https://www.linkedin.com/company/walkme/',
      companyLogo: '/assets/company-walkme.jpg',
      startDate: 'September 2020',
      endDate: 'January 2024',
      bullets: [
        'Built backend microservices with Node.js, Headless Chrome, MongoDB, SQL, and AWS ECS/EKS, representing roughly 80% of the role.',
        'Maintained and modernized hybrid AngularJS and Angular applications with RxJS, TypeScript, and SCSS.',
        'Improved database and interface performance through SQL optimization, debouncing, autocomplete, and lazy loading.',
        'Debugged complex production environments, implemented GraphQL endpoints, and improved cross-team data pipelines.',
      ],
    },
    {
      role: 'IT / System Administrator',
      company: 'WalkMe',
      companyUrl: 'https://www.linkedin.com/company/walkme/',
      companyLogo: '/assets/company-walkme.jpg',
      startDate: 'June 2019',
      endDate: 'September 2020',
      bullets: [
        'Implemented Azure AD Sync, Intune Autopilot, and device management with JAMF, Okta, and Intune.',
        'Configured and maintained VMware vSphere, switches, VPNs, DNS, DHCP, and directory services.',
      ],
    },
  ] satisfies ExperienceEntry[],
  caseStudies: [
    {
      title: 'ProfileWebsite',
      label: 'Live portfolio',
      description:
        'An advanced static Angular portfolio built for fast, resilient delivery on Cloudflare Pages. The architecture deliberately removes an unnecessary backend, database, and analytics layer in favor of privacy and operational simplicity.',
      highlights: [
        'Build-time prerendering for meaningful HTML before JavaScript runs',
        'Typed local content with no runtime API dependency',
        'Accessible, responsive, and print-ready presentation',
      ],
      technologies: ['Angular 22', 'TypeScript 6', 'Signals', 'SCSS', 'Cloudflare Pages'],
      url: 'https://github.com/FridgeSharon/ProfileWebsite',
      linkLabel: 'View repository',
    },
    {
      title: 'Senior City',
      label: 'Private prototype',
      description:
        'An Israel-first opportunities platform concept for older adults, designed around a highly accessible mobile experience and strict separation between personal profiles and general public content.',
      highlights: [
        'Large, bilingual, mobile-first interactions for less technical users',
        'Privacy-conscious separation of personal and non-personal data',
        'Work, volunteering, professional expertise, and local activities in one discovery experience',
      ],
      technologies: ['TypeScript', 'Accessibility', 'Responsive UI', 'Privacy architecture'],
    },
  ] satisfies CaseStudy[],
  skillGroups: [
    { title: 'Core stack', skills: ['TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Express'] },
    { title: 'APIs & messaging', skills: ['REST', 'gRPC', 'Protobuf', 'SOAP', 'GraphQL', 'Kafka - basic'] },
    { title: 'Data & caching', skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'MS SQL Server', 'Redis'] },
    { title: 'Cloud & delivery', skills: ['AWS Lambda', 'ECS', 'EKS', 'EC2', 'S3', 'Docker', 'CI/CD', 'PowerShell'] },
    { title: 'Additional engineering', skills: ['Scala', 'C#', 'SQL', 'Python', 'Angular / AngularJS', 'RxJS', 'React - limited exposure'] },
    { title: 'AI-assisted tooling', skills: ['OpenAI Codex', 'GitHub Copilot', 'Claude', 'Gemini'] },
  ] satisfies SkillGroup[],
  education: [
    {
      institution: 'Sela College',
      program: 'Software Development Program',
      period: '2018 - 2020',
      detail: 'C#, JavaScript/TypeScript, .NET, HTML, Angular, and ASP.NET MVC.',
    },
    {
      institution: 'See-Security College',
      program: 'Network Management & Cybersecurity',
      detail: 'Graduated with merit. MCSA, CCSA, CCNA, Linux Essentials, Python, and ICND1.',
    },
  ] satisfies EducationEntry[],
  languages: [
    { language: 'Hebrew', level: 'Native' },
    { language: 'English', level: 'Fluent' },
  ],
} as const;
