export interface VideoModule {
  title: string;
  description: string;
  duration: string;
  videoId: string; // YouTube video ID
  level: "beginner" | "intermediate" | "advanced";
}

export interface SubCourse {
  name: string;
  icon: string;
  modules: VideoModule[];
}

export interface CourseCategory {
  label: string;
  icon: string;
  color: string;
  description: string;
  subCourses: SubCourse[];
}

const courseVideos: Record<string, CourseCategory> = {
  it: {
    label: "IT / Software",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    description: "Master programming, web development, and software engineering",
    subCourses: [
      {
        name: "Python",
        icon: "🐍",
        modules: [
          { title: "Python Basics & Setup", description: "Introduction to Python, installation, and first program", duration: "45 min", videoId: "kqtD5dpn9C8", level: "beginner" },
          { title: "Variables & Data Types", description: "Understanding strings, integers, floats, and booleans", duration: "30 min", videoId: "kqtD5dpn9C8", level: "beginner" },
          { title: "Loops & Conditionals", description: "For loops, while loops, if-else statements", duration: "40 min", videoId: "kqtD5dpn9C8", level: "beginner" },
          { title: "Functions & Modules", description: "Creating reusable code with functions", duration: "35 min", videoId: "kqtD5dpn9C8", level: "intermediate" },
          { title: "OOP in Python", description: "Classes, objects, inheritance, polymorphism", duration: "50 min", videoId: "kqtD5dpn9C8", level: "intermediate" },
          { title: "File Handling & Exceptions", description: "Reading/writing files and error handling", duration: "30 min", videoId: "kqtD5dpn9C8", level: "intermediate" },
          { title: "Advanced Python Projects", description: "Build real-world projects with Python", duration: "60 min", videoId: "kqtD5dpn9C8", level: "advanced" },
        ],
      },
      {
        name: "Java",
        icon: "☕",
        modules: [
          { title: "Java Introduction", description: "JDK, JRE, JVM and first Java program", duration: "40 min", videoId: "UmnCZ7-9yDY", level: "beginner" },
          { title: "Data Types & Operators", description: "Variables, operators, type casting", duration: "35 min", videoId: "UmnCZ7-9yDY", level: "beginner" },
          { title: "Control Flow", description: "If-else, switch, loops in Java", duration: "30 min", videoId: "UmnCZ7-9yDY", level: "beginner" },
          { title: "OOP Concepts", description: "Classes, inheritance, abstraction, interfaces", duration: "50 min", videoId: "UmnCZ7-9yDY", level: "intermediate" },
          { title: "Collections & Generics", description: "ArrayList, HashMap, Sets, Generics", duration: "45 min", videoId: "UmnCZ7-9yDY", level: "intermediate" },
          { title: "Multithreading & Streams", description: "Concurrent programming and Java Streams", duration: "55 min", videoId: "UmnCZ7-9yDY", level: "advanced" },
        ],
      },
      {
        name: "HTML",
        icon: "🌐",
        modules: [
          { title: "HTML Fundamentals", description: "Tags, attributes, structure of a web page", duration: "30 min", videoId: "HcOc7P5BMi4", level: "beginner" },
          { title: "Forms & Tables", description: "Creating interactive forms and data tables", duration: "25 min", videoId: "HcOc7P5BMi4", level: "beginner" },
          { title: "Semantic HTML & SEO", description: "HTML5 semantic tags and best practices", duration: "30 min", videoId: "HcOc7P5BMi4", level: "intermediate" },
        ],
      },
      {
        name: "CSS",
        icon: "🎨",
        modules: [
          { title: "CSS Basics", description: "Selectors, colors, fonts, box model", duration: "35 min", videoId: "OXGznpKZ_sA", level: "beginner" },
          { title: "Flexbox & Grid", description: "Modern CSS layout techniques", duration: "40 min", videoId: "OXGznpKZ_sA", level: "intermediate" },
          { title: "Animations & Responsive Design", description: "Media queries, transitions, keyframes", duration: "35 min", videoId: "OXGznpKZ_sA", level: "advanced" },
        ],
      },
      {
        name: "JavaScript",
        icon: "⚡",
        modules: [
          { title: "JS Basics", description: "Variables, functions, DOM manipulation", duration: "40 min", videoId: "PkZNo7MFNFg", level: "beginner" },
          { title: "ES6+ Features", description: "Arrow functions, destructuring, promises", duration: "35 min", videoId: "PkZNo7MFNFg", level: "intermediate" },
          { title: "Async JS & APIs", description: "Async/await, fetch, REST APIs", duration: "45 min", videoId: "PkZNo7MFNFg", level: "advanced" },
        ],
      },
      {
        name: "C / C++",
        icon: "⚙️",
        modules: [
          { title: "C Fundamentals", description: "Syntax, data types, pointers", duration: "45 min", videoId: "KJgsSFOSQv0", level: "beginner" },
          { title: "C++ OOP", description: "Classes, objects, STL basics", duration: "50 min", videoId: "KJgsSFOSQv0", level: "intermediate" },
          { title: "Data Structures in C++", description: "Arrays, linked lists, trees, graphs", duration: "60 min", videoId: "KJgsSFOSQv0", level: "advanced" },
        ],
      },
      {
        name: "Web Development",
        icon: "🚀",
        modules: [
          { title: "Web Dev Roadmap", description: "Frontend, backend, full-stack overview", duration: "30 min", videoId: "zJSY8tbf_ys", level: "beginner" },
          { title: "React Basics", description: "Components, props, state, hooks", duration: "50 min", videoId: "zJSY8tbf_ys", level: "intermediate" },
          { title: "Full-Stack Project", description: "Build a complete web application", duration: "90 min", videoId: "zJSY8tbf_ys", level: "advanced" },
        ],
      },
    ],
  },
  management: {
    label: "Management / BBA",
    icon: "📊",
    color: "from-purple-500 to-pink-500",
    description: "Learn marketing, HR, and business strategy",
    subCourses: [
      {
        name: "Marketing",
        icon: "📢",
        modules: [
          { title: "Marketing Fundamentals", description: "4Ps, market analysis, consumer behavior", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Digital Marketing", description: "SEO, SEM, social media marketing", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Brand Strategy", description: "Brand building, positioning, campaigns", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "HR Management",
        icon: "👥",
        modules: [
          { title: "HRM Basics", description: "Recruitment, selection, onboarding", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Performance Management", description: "Appraisals, KPIs, feedback systems", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Strategic HRM", description: "Employer branding, change management", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Business Strategy",
        icon: "♟️",
        modules: [
          { title: "Strategic Management", description: "SWOT, PESTLE, Porter's Five Forces", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Business Models", description: "Canvas, lean startup, innovation", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Case Studies", description: "Real-world business case analysis", duration: "50 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
    ],
  },
  accounting: {
    label: "Accounting",
    icon: "📒",
    color: "from-emerald-500 to-teal-500",
    description: "Master Tally, GST, and financial accounting",
    subCourses: [
      {
        name: "Tally",
        icon: "🧮",
        modules: [
          { title: "Tally Introduction", description: "Company creation, ledgers, groups", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Voucher Entries", description: "Sales, purchase, journal, contra entries", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Advanced Tally", description: "Payroll, inventory, TDS in Tally", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "GST",
        icon: "📋",
        modules: [
          { title: "GST Fundamentals", description: "CGST, SGST, IGST, registration", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "GST Returns", description: "GSTR-1, GSTR-3B filing process", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "GST Compliance", description: "Input tax credit, reconciliation, audits", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Financial Accounting",
        icon: "💰",
        modules: [
          { title: "Accounting Basics", description: "Golden rules, journal, ledger, trial balance", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Financial Statements", description: "P&L, balance sheet, cash flow", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Advanced Accounting", description: "Ratio analysis, fund flow, consolidation", duration: "50 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
    ],
  },
  banking: {
    label: "Banking",
    icon: "🏦",
    color: "from-amber-500 to-orange-500",
    description: "Prepare for banking exams and careers",
    subCourses: [
      {
        name: "Aptitude",
        icon: "🔢",
        modules: [
          { title: "Number System", description: "HCF, LCM, divisibility, remainders", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Percentage & Profit-Loss", description: "Quick calculation techniques", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Data Interpretation", description: "Charts, tables, caselets", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Reasoning",
        icon: "🧩",
        modules: [
          { title: "Logical Reasoning", description: "Syllogisms, coding-decoding, blood relations", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Puzzles & Seating", description: "Arrangement, scheduling puzzles", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Machine Input & Output", description: "Advanced reasoning patterns", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "English",
        icon: "📝",
        modules: [
          { title: "Grammar Essentials", description: "Tenses, articles, prepositions", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Reading Comprehension", description: "Passage analysis techniques", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Cloze Test & Para Jumbles", description: "Advanced English patterns", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
    ],
  },
  "ssc/govt": {
    label: "SSC / Govt",
    icon: "🏛️",
    color: "from-red-500 to-rose-500",
    description: "Prepare for SSC, UPSC, and govt job exams",
    subCourses: [
      {
        name: "General Knowledge",
        icon: "🌍",
        modules: [
          { title: "Indian History", description: "Ancient, medieval, and modern India", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Indian Polity", description: "Constitution, governance, judiciary", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Economy & Current Affairs", description: "Budget, policies, recent events", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Maths",
        icon: "📐",
        modules: [
          { title: "Arithmetic", description: "Percentage, ratio, average, SI/CI", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Geometry & Mensuration", description: "Shapes, area, volume calculations", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Advanced Quant", description: "Algebra, trigonometry, probability", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Reasoning",
        icon: "🧠",
        modules: [
          { title: "Verbal Reasoning", description: "Analogies, classification, series", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Non-Verbal Reasoning", description: "Pattern recognition, mirror images", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Analytical Reasoning", description: "Input-output, statement analysis", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
    ],
  },
  medical: {
    label: "Medical",
    icon: "🩺",
    color: "from-green-500 to-emerald-500",
    description: "Medical sciences and healthcare preparation",
    subCourses: [
      {
        name: "Anatomy",
        icon: "🫀",
        modules: [
          { title: "Human Body Systems", description: "Skeletal, muscular, nervous systems", duration: "50 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Organ Systems", description: "Cardiovascular, respiratory, digestive", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Clinical Anatomy", description: "Applied anatomy for clinical practice", duration: "55 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Physiology",
        icon: "🔬",
        modules: [
          { title: "Cell Biology", description: "Cell structure, functions, division", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Neurophysiology", description: "Nerve impulses, reflexes, brain functions", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Endocrinology", description: "Hormones, glands, feedback mechanisms", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Pharmacology",
        icon: "💊",
        modules: [
          { title: "Drug Basics", description: "Routes, mechanisms, pharmacokinetics", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Antibiotics & Analgesics", description: "Major drug classes and uses", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Clinical Pharmacology", description: "Drug interactions, adverse effects", duration: "45 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
    ],
  },
  teaching: {
    label: "Teaching",
    icon: "📚",
    color: "from-indigo-500 to-violet-500",
    description: "Teaching methodology, pedagogy, and classroom skills",
    subCourses: [
      {
        name: "Pedagogy",
        icon: "📖",
        modules: [
          { title: "Teaching Methods", description: "Lecture, discussion, demonstration", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Bloom's Taxonomy", description: "Learning objectives and assessment", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Inclusive Education", description: "Special needs, differentiated instruction", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Child Development",
        icon: "👶",
        modules: [
          { title: "Growth & Development", description: "Stages of child development", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Learning Theories", description: "Piaget, Vygotsky, Bruner", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "Classroom Psychology", description: "Motivation, behavior management", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
      {
        name: "Education Technology",
        icon: "🖥️",
        modules: [
          { title: "EdTech Tools", description: "Smart boards, LMS, digital resources", duration: "30 min", videoId: "dQw4w9WgXcQ", level: "beginner" },
          { title: "Online Teaching", description: "Virtual classrooms, engagement techniques", duration: "35 min", videoId: "dQw4w9WgXcQ", level: "intermediate" },
          { title: "AI in Education", description: "Adaptive learning, assessment tools", duration: "40 min", videoId: "dQw4w9WgXcQ", level: "advanced" },
        ],
      },
    ],
  },
};

export default courseVideos;
