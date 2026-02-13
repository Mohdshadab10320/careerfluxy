export interface LessonContent {
  title: string;
  description: string;
  topics: {
    name: string;
    summary: string;
    keyPoints: string[];
  }[];
}

export interface CourseLearning {
  label: string;
  icon: string;
  color: string;
  lessons: LessonContent[];
}

export type LearningData = Record<string, CourseLearning>;

const learningContent: LearningData = {
  it: {
    label: "IT",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    lessons: [
      {
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web pages — structure with HTML and styling with CSS.",
        topics: [
          {
            name: "HTML Basics",
            summary: "HTML (HyperText Markup Language) is the standard language for creating web pages.",
            keyPoints: [
              "HTML uses tags like <h1>, <p>, <div>, <span> to structure content",
              "Semantic tags like <header>, <main>, <footer> improve accessibility",
              "Forms use <input>, <textarea>, <select> for user input",
              "HTML5 introduced <video>, <audio>, <canvas> for multimedia",
            ],
          },
          {
            name: "CSS Basics",
            summary: "CSS (Cascading Style Sheets) controls the look and feel of web pages.",
            keyPoints: [
              "Selectors: class (.name), id (#name), element (div)",
              "Box Model: content → padding → border → margin",
              "Flexbox and Grid for modern layouts",
              "Media queries for responsive design",
              "CSS variables (custom properties) for theming",
            ],
          },
        ],
      },
      {
        title: "Python Programming",
        description: "Master Python — the most versatile and beginner-friendly programming language.",
        topics: [
          {
            name: "Python Basics",
            summary: "Python is a high-level, interpreted language known for its readability.",
            keyPoints: [
              "Data types: int, float, str, list, tuple, dict, set",
              "Control flow: if/elif/else, for loops, while loops",
              "Functions: def keyword, *args, **kwargs, lambda",
              "List comprehensions for concise data processing",
            ],
          },
          {
            name: "Advanced Python",
            summary: "Deep dive into Python's powerful features for professional development.",
            keyPoints: [
              "OOP: classes, inheritance, polymorphism, encapsulation",
              "Decorators and generators for clean code",
              "Exception handling with try/except/finally",
              "File I/O and working with JSON/CSV",
              "Virtual environments and pip package management",
            ],
          },
        ],
      },
      {
        title: "Java Programming",
        description: "Understand Java — the enterprise-grade, platform-independent language.",
        topics: [
          {
            name: "Java Basics",
            summary: "Java is an object-oriented, platform-independent programming language.",
            keyPoints: [
              "JDK vs JRE vs JVM — compile once, run anywhere",
              "Data types: primitive (int, char, boolean) and reference types",
              "OOP pillars: Encapsulation, Inheritance, Polymorphism, Abstraction",
              "Exception handling with try-catch-finally blocks",
            ],
          },
          {
            name: "Java Advanced",
            summary: "Enterprise-level Java concepts for building scalable applications.",
            keyPoints: [
              "Collections framework: List, Set, Map, Queue",
              "Streams API for functional-style processing",
              "Multithreading and concurrency",
              "JDBC for database connectivity",
              "Spring Boot basics for web applications",
            ],
          },
        ],
      },
      {
        title: "Web Development",
        description: "Full-stack web development concepts from frontend to backend.",
        topics: [
          {
            name: "Frontend Development",
            summary: "Building interactive user interfaces with modern tools.",
            keyPoints: [
              "JavaScript ES6+: let/const, arrow functions, destructuring",
              "React.js: components, state, props, hooks",
              "REST API integration with fetch/axios",
              "Responsive design and cross-browser compatibility",
            ],
          },
          {
            name: "Backend & Deployment",
            summary: "Server-side development and deploying applications.",
            keyPoints: [
              "Node.js and Express.js for server-side logic",
              "REST API design: GET, POST, PUT, DELETE",
              "Database: SQL (MySQL/PostgreSQL) vs NoSQL (MongoDB)",
              "Git/GitHub for version control",
              "Deployment: Docker, CI/CD, cloud platforms",
            ],
          },
        ],
      },
    ],
  },
  management: {
    label: "Management (BBA)",
    icon: "📊",
    color: "from-purple-500 to-pink-500",
    lessons: [
      {
        title: "Marketing Fundamentals",
        description: "Core marketing concepts every business professional must know.",
        topics: [
          {
            name: "Marketing Basics",
            summary: "Marketing is the process of creating, delivering, and exchanging value.",
            keyPoints: [
              "4Ps of Marketing: Product, Price, Place, Promotion",
              "Market segmentation: demographic, geographic, psychographic, behavioral",
              "B2B vs B2C marketing strategies",
              "SWOT Analysis for market positioning",
            ],
          },
          {
            name: "Digital Marketing",
            summary: "Leveraging digital channels for modern marketing strategies.",
            keyPoints: [
              "SEO: on-page, off-page, technical optimization",
              "SEM: Google Ads, PPC campaigns",
              "Social media marketing and content strategy",
              "Email marketing and marketing automation",
              "Analytics: Google Analytics, KPIs, conversion tracking",
            ],
          },
        ],
      },
      {
        title: "Human Resource Management",
        description: "Managing people — the most valuable asset of any organization.",
        topics: [
          {
            name: "HRM Basics",
            summary: "HRM deals with recruitment, development, and management of employees.",
            keyPoints: [
              "Recruitment process: sourcing, screening, interviewing, onboarding",
              "Performance appraisal methods: 360°, MBO, BARS",
              "Training and development: on-the-job, off-the-job methods",
              "Employee engagement and retention strategies",
            ],
          },
          {
            name: "Strategic HRM",
            summary: "Aligning HR strategy with organizational goals for competitive advantage.",
            keyPoints: [
              "Employer branding and talent acquisition",
              "Change management: Kotter's 8-step model",
              "Compensation and benefits design",
              "HR analytics and data-driven decision making",
              "Labor laws and compliance in India",
            ],
          },
        ],
      },
      {
        title: "Business Strategy",
        description: "Strategic frameworks for building competitive advantages.",
        topics: [
          {
            name: "Strategic Analysis",
            summary: "Tools and frameworks for analyzing business environments.",
            keyPoints: [
              "Porter's Five Forces: competitive rivalry, supplier/buyer power, threats",
              "BCG Matrix: stars, cash cows, question marks, dogs",
              "PESTLE Analysis: political, economic, social, technological factors",
              "Blue Ocean vs Red Ocean strategy",
            ],
          },
          {
            name: "Operations & Supply Chain",
            summary: "Efficient management of business operations and supply chains.",
            keyPoints: [
              "Supply chain management: procurement to delivery",
              "Six Sigma: DMAIC methodology for quality improvement",
              "Lean management: eliminating waste",
              "CRM systems for customer relationship management",
            ],
          },
        ],
      },
    ],
  },
  accounting: {
    label: "Accounting",
    icon: "📒",
    color: "from-green-500 to-emerald-500",
    lessons: [
      {
        title: "Accounting Fundamentals",
        description: "Core accounting principles and practices.",
        topics: [
          {
            name: "Basics of Accounting",
            summary: "Accounting is the systematic recording of financial transactions.",
            keyPoints: [
              "Accounting equation: Assets = Liabilities + Equity",
              "Golden rules: Debit the receiver, Credit the giver",
              "Journal entries, ledger, trial balance",
              "Cash basis vs accrual basis accounting",
            ],
          },
          {
            name: "Financial Statements",
            summary: "Understanding the three key financial statements.",
            keyPoints: [
              "Balance Sheet: assets, liabilities, shareholder's equity",
              "Income Statement: revenue, expenses, profit/loss",
              "Cash Flow Statement: operating, investing, financing activities",
              "Depreciation methods: straight-line, WDV, double declining",
            ],
          },
        ],
      },
      {
        title: "Taxation & GST",
        description: "Indian taxation system and GST compliance.",
        topics: [
          {
            name: "GST Framework",
            summary: "GST is India's unified indirect tax system replacing multiple taxes.",
            keyPoints: [
              "Types: CGST, SGST, IGST, UTGST",
              "GST return filing: GSTR-1, GSTR-3B, GSTR-9",
              "Input Tax Credit (ITC) mechanism",
              "E-way bill for goods movement",
            ],
          },
          {
            name: "TDS & Income Tax",
            summary: "Direct tax compliance for professionals and businesses.",
            keyPoints: [
              "TDS sections: 194A (interest), 194C (contracts), 194J (professional fees)",
              "Income tax slabs and new vs old regime",
              "Tax planning: 80C, 80D, HRA deductions",
              "Advance tax and self-assessment tax",
            ],
          },
        ],
      },
    ],
  },
  banking: {
    label: "Banking",
    icon: "🏦",
    color: "from-amber-500 to-orange-500",
    lessons: [
      {
        title: "Banking Fundamentals",
        description: "Understanding the Indian banking system.",
        topics: [
          {
            name: "Banking Basics",
            summary: "Banks are financial institutions that accept deposits and provide loans.",
            keyPoints: [
              "Types: commercial, cooperative, regional rural, payment banks",
              "RBI: central bank, monetary policy, regulation",
              "KYC norms and anti-money laundering",
              "NEFT, RTGS, IMPS, UPI payment systems",
            ],
          },
          {
            name: "Banking Operations",
            summary: "Day-to-day banking operations and key concepts.",
            keyPoints: [
              "CRR and SLR: reserve requirements by RBI",
              "Repo rate and reverse repo rate impact on economy",
              "NPA management and SARFAESI Act",
              "Priority sector lending requirements",
              "BASEL norms for risk management",
            ],
          },
        ],
      },
    ],
  },
  "ssc/govt": {
    label: "SSC/Govt",
    icon: "🏛️",
    color: "from-red-500 to-rose-500",
    lessons: [
      {
        title: "Indian Polity & Constitution",
        description: "Essential knowledge for government exam preparation.",
        topics: [
          {
            name: "Constitution Basics",
            summary: "The Indian Constitution is the supreme law of India, adopted on 26 Jan 1950.",
            keyPoints: [
              "Preamble: sovereign, socialist, secular, democratic republic",
              "Fundamental Rights: Articles 14-32",
              "Directive Principles of State Policy: Articles 36-51",
              "Three branches: Legislature, Executive, Judiciary",
            ],
          },
          {
            name: "Governance & Current Affairs",
            summary: "Understanding how India is governed and key schemes.",
            keyPoints: [
              "Federal structure: Centre vs State division of powers",
              "Election Commission and electoral process",
              "RTI Act, CAG, and accountability mechanisms",
              "Key schemes: Digital India, Make in India, Swachh Bharat",
            ],
          },
        ],
      },
    ],
  },
  medical: {
    label: "Medical",
    icon: "🩺",
    color: "from-teal-500 to-green-500",
    lessons: [
      {
        title: "Medical Sciences Foundation",
        description: "Core medical knowledge for healthcare professionals.",
        topics: [
          {
            name: "Anatomy & Physiology",
            summary: "Understanding the structure and function of the human body.",
            keyPoints: [
              "Major organ systems: cardiovascular, respiratory, nervous, digestive",
              "Vital signs: BP (120/80), pulse (60-100), temperature (98.6°F), respiration (12-20)",
              "Blood groups: A, B, AB, O with Rh factor",
              "Immune system: innate vs adaptive immunity",
            ],
          },
          {
            name: "Clinical Basics",
            summary: "Fundamental clinical knowledge for medical practice.",
            keyPoints: [
              "Antibiotics: mechanism of action and resistance",
              "Diabetes: Type 1 (autoimmune) vs Type 2 (insulin resistance)",
              "Hypertension: diagnosis, staging, management",
              "Emergency care: CPR, first aid, triage",
              "Evidence-based medicine principles",
            ],
          },
        ],
      },
    ],
  },
  teaching: {
    label: "Teaching",
    icon: "📚",
    color: "from-indigo-500 to-violet-500",
    lessons: [
      {
        title: "Education & Pedagogy",
        description: "Teaching methodologies and classroom management.",
        topics: [
          {
            name: "Pedagogy Basics",
            summary: "Pedagogy is the art and science of teaching.",
            keyPoints: [
              "Bloom's Taxonomy: Remember, Understand, Apply, Analyze, Evaluate, Create",
              "Teaching methods: lecture, discussion, project-based, flipped classroom",
              "Classroom management strategies",
              "NEP 2020: multidisciplinary, flexible, skill-based education",
            ],
          },
          {
            name: "Assessment & Inclusion",
            summary: "Evaluating student learning and inclusive education practices.",
            keyPoints: [
              "Formative vs summative assessment",
              "Rubrics and learning outcome measurement",
              "Inclusive education for diverse learners",
              "Technology integration: EdTech tools, LMS platforms",
              "Action research in education",
            ],
          },
        ],
      },
    ],
  },
  polytechnic: {
    label: "Polytechnic",
    icon: "⚙️",
    color: "from-slate-500 to-zinc-500",
    lessons: [
      {
        title: "Engineering Fundamentals",
        description: "Core engineering concepts across disciplines.",
        topics: [
          {
            name: "Electrical & Electronics",
            summary: "Fundamental electrical and electronics engineering concepts.",
            keyPoints: [
              "Ohm's Law: V = IR, power = VI",
              "AC vs DC: alternating vs direct current",
              "Transformer: step-up and step-down working principle",
              "PLC (Programmable Logic Controller) basics",
              "Renewable energy: solar, wind, hydro technologies",
            ],
          },
          {
            name: "Computer & Networking",
            summary: "Computer science and networking fundamentals.",
            keyPoints: [
              "Hardware: CPU, RAM, storage, I/O devices",
              "OSI model: 7 layers of networking",
              "TCP vs UDP: connection-oriented vs connectionless",
              "Cloud computing: IaaS, PaaS, SaaS models",
              "IoT: sensors, actuators, protocols, applications",
            ],
          },
        ],
      },
    ],
  },
};

export default learningContent;
