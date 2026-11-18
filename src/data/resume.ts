import type { Education, Experience } from '../types'

export const summary =
  'Frontend Developer with 8+ years of experience building and maintaining responsive web and mobile applications. Experienced in React, React Native, Redux, Next.js, Vue.js, JavaScript, TypeScript, and Tailwind CSS. Skilled in translating requirements and UI designs into reusable frontend components, integrating REST APIs, troubleshooting defects, and improving application maintainability. Comfortable collaborating with cross-functional and international teams in Agile/Scrum environments.'

export const experience: Experience[] = [
  {
    role: 'Advanced App Engineering Senior Analyst',
    company: 'Accenture',
    period: 'Nov 2023 – Dec 2026',
    highlights: [
      'Develop and maintain application features based on business requirements, following established project standards and development practices.',
      'Refactor legacy frontend code to improve readability, maintainability, and alignment with modern development standards.',
      'Investigate and resolve defects, assess related functionality, and implement fixes and enhancements.',
      'Manage assigned development tickets by tracking progress, providing delivery estimates, and documenting root-cause analysis and status updates.',
      'Collaborate with the team in Agile/Scrum activities to communicate progress, clarify priorities, and support timely delivery.',
    ],
    tech: ['ReactJS', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript', 'Git'],
  },
  {
    role: 'Software Developer',
    company: 'Primover Consultancy Services, Inc.',
    period: 'May 2022 – Nov 2023',
    highlights: [
      'Analyzed feature requirements and investigated defects to determine appropriate implementation or remediation approaches.',
      'Prepared design documents describing proposed solutions for bug fixes and new feature development.',
      'Implemented approved solutions and performed Unit Testing and Evaluation (UTE) before submitting release request tickets.',
      'Resolved issues identified during development and testing to support release readiness.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Gomigu',
    period: 'Mar 2018 – Mar 2022',
    highlights: [
      'Translated UX/UI designs into responsive frontend interfaces for web and mobile applications.',
      'Developed and integrated features into existing and new applications based on project requirements.',
      'Investigated and fixed QA-reported defects, including issues affecting related or dependent features.',
      'Collaborated with the Scrum Master and project team through daily progress updates and Agile/Scrum activities.',
    ],
    tech: ['ReactJS', 'React Native', 'Redux', 'CSS', 'Git'],
  },
  {
    role: 'Software Engineer',
    company: 'Zoog Technologies Inc.',
    period: 'Jul 2017 – Mar 2018',
    highlights: [
      'Implemented UX/UI designs as responsive frontend interfaces for web and mobile platforms.',
      'Developed and integrated application features and resolved defects identified during QA testing.',
      'Provided development progress updates and coordinated work with the Scrum Master and project team.',
    ],
    tech: ['ReactJS', 'React Native', 'Redux', 'CSS', 'Git'],
  },
]

export const education: Education[] = [
  {
    credential: 'Certificate in Computer Technology, Major in Software Development',
    school: 'University of San Carlos',
    year: '2017',
  },
  {
    credential: 'High School Diploma',
    school: 'The Sisters of Mary School Boystown, Inc.',
    year: '2012',
  },
]
