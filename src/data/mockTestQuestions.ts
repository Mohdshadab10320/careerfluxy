export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface CourseMCQs {
  [level: string]: MCQ[];
}

const mockTestQuestions: Record<string, CourseMCQs> = {
  it: {
    "1": [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language", "None of these"], correctIndex: 0, explanation: "HTML stands for Hyper Text Markup Language, used to create web pages.", topic: "HTML" },
      { question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], correctIndex: 1, explanation: "The <a> (anchor) tag is used to create hyperlinks.", topic: "HTML" },
      { question: "What is CSS used for?", options: ["Programming logic", "Styling web pages", "Database management", "Server configuration"], correctIndex: 1, explanation: "CSS (Cascading Style Sheets) is used to style and layout web pages.", topic: "CSS" },
      { question: "Which is NOT a Python data type?", options: ["int", "float", "varchar", "str"], correctIndex: 2, explanation: "varchar is a SQL data type, not Python. Python uses str for strings.", topic: "Python" },
      { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Java Visual Manager", "Java Version Manager"], correctIndex: 0, explanation: "JVM stands for Java Virtual Machine, which runs Java bytecode.", topic: "Java" },
      { question: "Which symbol is used for single-line comments in Python?", options: ["//", "#", "/*", "--"], correctIndex: 1, explanation: "In Python, the # symbol is used for single-line comments.", topic: "Python" },
      { question: "What is the correct HTML tag for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correctIndex: 2, explanation: "<h1> is the largest heading tag in HTML, <h6> is the smallest.", topic: "HTML" },
      { question: "Which CSS property changes the text color?", options: ["font-color", "text-color", "color", "text-style"], correctIndex: 2, explanation: "The 'color' property in CSS is used to change text color.", topic: "CSS" },
      { question: "What is a variable in programming?", options: ["A fixed value", "A container to store data", "A type of loop", "An operator"], correctIndex: 1, explanation: "A variable is a named container that stores data values.", topic: "Programming Basics" },
      { question: "Which language is used for backend web development?", options: ["HTML", "CSS", "Node.js", "Bootstrap"], correctIndex: 2, explanation: "Node.js is a JavaScript runtime used for backend development.", topic: "Web Development" },
    ],
    "2": [
      { question: "What is the box model in CSS?", options: ["A 3D modeling tool", "Content + Padding + Border + Margin", "A JavaScript framework", "A layout grid"], correctIndex: 1, explanation: "The CSS box model consists of content, padding, border, and margin.", topic: "CSS" },
      { question: "Which Python loop is used when iterations are unknown?", options: ["for", "while", "do-while", "foreach"], correctIndex: 1, explanation: "The while loop is used when the number of iterations is unknown.", topic: "Python" },
      { question: "What is OOP?", options: ["Object Oriented Programming", "Online Operating Procedure", "Open Output Protocol", "Optional Object Property"], correctIndex: 0, explanation: "OOP stands for Object Oriented Programming, a paradigm using objects.", topic: "Java" },
      { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Manager", "Digital Output Module", "Direct Object Mapping"], correctIndex: 0, explanation: "DOM is Document Object Model, a programming interface for web documents.", topic: "JavaScript" },
      { question: "Which HTTP method is used to send data?", options: ["GET", "POST", "DELETE", "CONNECT"], correctIndex: 1, explanation: "POST is used to send data to a server to create/update a resource.", topic: "Web Development" },
      { question: "What is a function in programming?", options: ["A data type", "A reusable block of code", "A variable", "A loop"], correctIndex: 1, explanation: "A function is a reusable block of code that performs a specific task.", topic: "Programming Basics" },
      { question: "What is the output of print(2**3) in Python?", options: ["6", "8", "9", "5"], correctIndex: 1, explanation: "** is the exponentiation operator. 2**3 = 2³ = 8.", topic: "Python" },
      { question: "Which is not a Java access modifier?", options: ["public", "private", "protected", "friend"], correctIndex: 3, explanation: "'friend' is used in C++, not Java. Java uses public, private, protected, and default.", topic: "Java" },
      { question: "What does API stand for?", options: ["Application Programming Interface", "Automated Program Integration", "Applied Protocol Interface", "Active Program Input"], correctIndex: 0, explanation: "API stands for Application Programming Interface.", topic: "Web Development" },
      { question: "Which HTML5 tag is used for video?", options: ["<media>", "<video>", "<movie>", "<play>"], correctIndex: 1, explanation: "The <video> tag is used to embed video content in HTML5.", topic: "HTML" },
    ],
    "3": [
      { question: "What is Flexbox used for?", options: ["Database queries", "3D animations", "One-dimensional layout", "Server routing"], correctIndex: 2, explanation: "Flexbox is a CSS layout model for one-dimensional layouts (row or column).", topic: "CSS" },
      { question: "What is list comprehension in Python?", options: ["A way to sort lists", "Concise way to create lists", "A list method", "A loop type"], correctIndex: 1, explanation: "List comprehension provides a concise way to create lists in Python.", topic: "Python" },
      { question: "What is inheritance in OOP?", options: ["Copying code", "Child class acquiring parent properties", "Variable scoping", "Memory allocation"], correctIndex: 1, explanation: "Inheritance allows a child class to inherit properties and methods from a parent class.", topic: "Java" },
      { question: "What is a REST API?", options: ["A sleep function", "An architectural style for APIs", "A testing framework", "A database type"], correctIndex: 1, explanation: "REST is an architectural style for designing networked applications.", topic: "Web Development" },
      { question: "What is React?", options: ["A database", "A CSS framework", "A JS library for building UI", "A server"], correctIndex: 2, explanation: "React is a JavaScript library for building user interfaces.", topic: "Web Development" },
      { question: "What is a dictionary in Python?", options: ["A book", "Key-value pair collection", "A list type", "A function"], correctIndex: 1, explanation: "A dictionary stores data as key-value pairs in Python.", topic: "Python" },
      { question: "What is polymorphism?", options: ["Multiple forms", "Single form", "No form", "Static form"], correctIndex: 0, explanation: "Polymorphism means 'many forms' - same interface, different implementations.", topic: "Java" },
      { question: "What is responsive design?", options: ["Fast loading", "Adapts to different screen sizes", "Server-side rendering", "Database optimization"], correctIndex: 1, explanation: "Responsive design makes web pages look good on all devices.", topic: "CSS" },
      { question: "What is Git?", options: ["A programming language", "A version control system", "A web framework", "A database"], correctIndex: 1, explanation: "Git is a distributed version control system for tracking code changes.", topic: "Web Development" },
      { question: "What is an array?", options: ["A function", "A loop", "A collection of similar elements", "A class"], correctIndex: 2, explanation: "An array is a data structure that stores a collection of elements of the same type.", topic: "Programming Basics" },
    ],
  },
  accounting: {
    "1": [
      { question: "What is the accounting equation?", options: ["Assets = Liabilities + Equity", "Revenue = Expenses + Profit", "Debit = Credit + Balance", "None of these"], correctIndex: 0, explanation: "The fundamental accounting equation: Assets = Liabilities + Owner's Equity.", topic: "Basics" },
      { question: "What is a journal entry?", options: ["A diary entry", "Recording transactions chronologically", "A bank statement", "A tax form"], correctIndex: 1, explanation: "A journal entry records business transactions in chronological order.", topic: "Basics" },
      { question: "What does GST stand for?", options: ["General Sales Tax", "Goods and Services Tax", "Government Service Tax", "Gross Sales Total"], correctIndex: 1, explanation: "GST stands for Goods and Services Tax, an indirect tax in India.", topic: "GST" },
      { question: "What is depreciation?", options: ["Increase in asset value", "Decrease in asset value over time", "Asset purchase", "Asset sale"], correctIndex: 1, explanation: "Depreciation is the decrease in value of an asset over its useful life.", topic: "Assets" },
      { question: "Which is NOT a type of account?", options: ["Personal", "Real", "Nominal", "Virtual"], correctIndex: 3, explanation: "The three types of accounts are Personal, Real, and Nominal.", topic: "Basics" },
      { question: "What is a balance sheet?", options: ["A shopping list", "Statement of financial position", "Income report", "Tax return"], correctIndex: 1, explanation: "A balance sheet shows a company's financial position at a point in time.", topic: "Financial Statements" },
      { question: "What is Tally used for?", options: ["Programming", "Accounting & bookkeeping", "Web design", "Data science"], correctIndex: 1, explanation: "Tally is popular accounting software used for bookkeeping and financial management.", topic: "Tally" },
      { question: "What are the golden rules of accounting?", options: ["Rules for gold trading", "Rules for recording transactions", "Tax rules", "Banking rules"], correctIndex: 1, explanation: "The golden rules guide how to record debit and credit for each account type.", topic: "Basics" },
      { question: "What is a ledger?", options: ["A type of loan", "A book of accounts", "A tax form", "A bank product"], correctIndex: 1, explanation: "A ledger is a book containing all accounts for recording transactions.", topic: "Basics" },
      { question: "What is the full form of TDS?", options: ["Tax Deducted at Source", "Total Deduction System", "Tax Distribution Service", "Transaction Data System"], correctIndex: 0, explanation: "TDS stands for Tax Deducted at Source.", topic: "Taxation" },
    ],
    "2": [
      { question: "What is the difference between CGST and SGST?", options: ["Central vs State GST", "Cash vs Service GST", "Capital vs Simple GST", "None"], correctIndex: 0, explanation: "CGST is Central GST and SGST is State GST, both charged on intra-state supplies.", topic: "GST" },
      { question: "What is working capital?", options: ["Capital for workers", "Current Assets - Current Liabilities", "Fixed assets value", "Total capital"], correctIndex: 1, explanation: "Working capital = Current Assets - Current Liabilities, used for day-to-day operations.", topic: "Financial" },
      { question: "What is cost accounting?", options: ["Counting costs", "Recording and analyzing costs", "Tax accounting", "Bank accounting"], correctIndex: 1, explanation: "Cost accounting involves recording, classifying, and analyzing costs.", topic: "Cost Accounting" },
      { question: "FIFO stands for?", options: ["First In First Out", "Final Input Final Output", "Fixed Income Fixed Output", "None"], correctIndex: 0, explanation: "FIFO is an inventory valuation method where first purchased items are sold first.", topic: "Inventory" },
      { question: "What is an audit?", options: ["A type of tax", "Examination of financial records", "A bank loan", "An investment"], correctIndex: 1, explanation: "An audit is an independent examination of financial statements and records.", topic: "Audit" },
      { question: "What is a trial balance?", options: ["A court record", "Statement verifying debit equals credit", "A bank statement", "A budget plan"], correctIndex: 1, explanation: "A trial balance verifies that total debits equal total credits.", topic: "Basics" },
      { question: "What type of account is 'Cash'?", options: ["Personal", "Real", "Nominal", "None"], correctIndex: 1, explanation: "Cash is a Real account. Real accounts deal with assets.", topic: "Basics" },
      { question: "What is IGST?", options: ["International GST", "Integrated GST", "Internal GST", "Initial GST"], correctIndex: 1, explanation: "IGST is Integrated GST, charged on inter-state supplies.", topic: "GST" },
      { question: "What is a P&L statement?", options: ["Property & Land", "Profit & Loss statement", "Payment & Ledger", "Purchase & Loan"], correctIndex: 1, explanation: "A Profit & Loss statement shows revenue, costs, and profit over a period.", topic: "Financial Statements" },
      { question: "What is double-entry system?", options: ["Two entries per day", "Every transaction has debit and credit", "Two accountants needed", "Dual verification"], correctIndex: 1, explanation: "In double-entry, every transaction affects at least two accounts - debit and credit.", topic: "Basics" },
    ],
  },
  management: {
    "1": [
      { question: "What are the 4Ps of Marketing?", options: ["Product, Price, Place, Promotion", "People, Process, Plan, Profit", "Public, Private, Premium, Popular", "None"], correctIndex: 0, explanation: "The marketing mix consists of Product, Price, Place, and Promotion.", topic: "Marketing" },
      { question: "What is SWOT analysis?", options: ["A financial tool", "Strengths, Weaknesses, Opportunities, Threats", "A hiring method", "A pricing strategy"], correctIndex: 1, explanation: "SWOT analysis evaluates Strengths, Weaknesses, Opportunities, and Threats.", topic: "Strategy" },
      { question: "What is HRM?", options: ["Hardware Resource Management", "Human Resource Management", "High Revenue Marketing", "None"], correctIndex: 1, explanation: "HRM is Human Resource Management - managing people in organizations.", topic: "HR" },
      { question: "What is the difference between leader and manager?", options: ["Same thing", "Leaders inspire, managers organize", "Managers inspire, leaders organize", "No difference"], correctIndex: 1, explanation: "Leaders inspire and motivate, while managers plan and organize.", topic: "Leadership" },
      { question: "What is B2B?", options: ["Back to Back", "Business to Business", "Brand to Buyer", "Budget to Balance"], correctIndex: 1, explanation: "B2B means Business to Business - companies selling to other companies.", topic: "Marketing" },
      { question: "What is organizational behavior?", options: ["Office rules", "Study of how people behave in organizations", "Company policy", "HR policy"], correctIndex: 1, explanation: "OB studies how individuals and groups behave within organizations.", topic: "HR" },
      { question: "What is a business plan?", options: ["A daily schedule", "Document outlining business goals & strategy", "An invoice", "A tax form"], correctIndex: 1, explanation: "A business plan outlines goals, strategies, and financial projections.", topic: "Strategy" },
      { question: "What is market segmentation?", options: ["Cutting the market", "Dividing market into distinct groups", "Market monopoly", "Market competition"], correctIndex: 1, explanation: "Market segmentation divides a broad market into sub-groups of consumers.", topic: "Marketing" },
      { question: "What is CRM?", options: ["Cash Revenue Model", "Customer Relationship Management", "Corporate Risk Management", "None"], correctIndex: 1, explanation: "CRM is Customer Relationship Management - managing interactions with customers.", topic: "Marketing" },
      { question: "What is entrepreneurship?", options: ["A job title", "Starting and running a business", "A degree", "A marketing term"], correctIndex: 1, explanation: "Entrepreneurship is the process of creating and managing a new business.", topic: "Strategy" },
    ],
  },
  banking: {
    "1": [
      { question: "What is RBI?", options: ["Reserve Bank of India", "Rural Bank of India", "Revenue Bank of India", "Retail Banking Institute"], correctIndex: 0, explanation: "RBI is the Reserve Bank of India, the central bank of India.", topic: "Banking Basics" },
      { question: "What is KYC?", options: ["Keep Your Cash", "Know Your Customer", "Key Year Certificate", "None"], correctIndex: 1, explanation: "KYC is Know Your Customer, a process to verify customer identity.", topic: "Compliance" },
      { question: "What is NEFT?", options: ["National Electronic Funds Transfer", "New Electronic Financial Transaction", "Net Exchange Fund Transfer", "None"], correctIndex: 0, explanation: "NEFT is National Electronic Funds Transfer for bank-to-bank transfers.", topic: "Payments" },
      { question: "What is a fixed deposit?", options: ["A broken deposit", "Investment for fixed period at fixed interest", "A current account", "A loan"], correctIndex: 1, explanation: "A fixed deposit is an investment for a fixed period earning fixed interest.", topic: "Products" },
      { question: "What is CRR?", options: ["Cash Revenue Ratio", "Cash Reserve Ratio", "Credit Return Rate", "Current Repo Rate"], correctIndex: 1, explanation: "CRR is Cash Reserve Ratio - % of deposits banks must keep with RBI.", topic: "RBI Policy" },
      { question: "Difference between savings and current account?", options: ["Same thing", "Savings earns interest, current is for business", "Current earns more interest", "None"], correctIndex: 1, explanation: "Savings accounts earn interest; current accounts are for business transactions.", topic: "Products" },
      { question: "What is NPA?", options: ["New Product Addition", "Non-Performing Asset", "National Payment Agency", "None"], correctIndex: 1, explanation: "NPA is a Non-Performing Asset - a loan where payment is overdue.", topic: "Banking" },
      { question: "What is SLR?", options: ["Standard Lending Rate", "Statutory Liquidity Ratio", "Simple Loan Rate", "State Loan Reserve"], correctIndex: 1, explanation: "SLR is Statutory Liquidity Ratio - minimum reserves banks must maintain.", topic: "RBI Policy" },
      { question: "What is RTGS?", options: ["Real Time Gross Settlement", "Regular Transaction Gateway Service", "Reserve Transfer General System", "None"], correctIndex: 0, explanation: "RTGS is Real Time Gross Settlement for large value real-time transfers.", topic: "Payments" },
      { question: "What is a cheque?", options: ["A receipt", "A negotiable instrument", "A loan document", "A tax form"], correctIndex: 1, explanation: "A cheque is a negotiable instrument ordering a bank to pay a specific amount.", topic: "Instruments" },
    ],
  },
  "ssc/govt": {
    "1": [
      { question: "Who is known as the Father of the Indian Constitution?", options: ["Mahatma Gandhi", "B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], correctIndex: 1, explanation: "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution.", topic: "Constitution" },
      { question: "How many fundamental rights are there?", options: ["5", "6", "7", "8"], correctIndex: 1, explanation: "There are 6 fundamental rights in the Indian Constitution.", topic: "Rights" },
      { question: "What is the Preamble?", options: ["A law", "Introduction to the Constitution", "A government scheme", "A court order"], correctIndex: 1, explanation: "The Preamble is the introductory statement of the Constitution.", topic: "Constitution" },
      { question: "What is RTI Act?", options: ["Right to Information", "Right to Internet", "Right to Income", "Right to Insurance"], correctIndex: 0, explanation: "RTI is Right to Information Act, promoting transparency in governance.", topic: "Acts" },
      { question: "How many states are in India (2024)?", options: ["28", "29", "30", "27"], correctIndex: 0, explanation: "India currently has 28 states and 8 union territories.", topic: "GK" },
      { question: "What is the full form of UPSC?", options: ["Union Public Service Commission", "United Professional Service Center", "Universal Public Sector Company", "None"], correctIndex: 0, explanation: "UPSC stands for Union Public Service Commission.", topic: "Govt Bodies" },
      { question: "Who appoints the Prime Minister?", options: ["Parliament", "President", "People", "Supreme Court"], correctIndex: 1, explanation: "The President of India appoints the Prime Minister.", topic: "Polity" },
      { question: "What is the minimum age to become President?", options: ["25", "30", "35", "40"], correctIndex: 2, explanation: "The minimum age to become President of India is 35 years.", topic: "Polity" },
      { question: "Which article deals with Right to Equality?", options: ["Article 14", "Article 19", "Article 21", "Article 32"], correctIndex: 0, explanation: "Article 14 provides Right to Equality before law.", topic: "Constitution" },
      { question: "What is the currency of India?", options: ["Dollar", "Rupee", "Euro", "Pound"], correctIndex: 1, explanation: "Indian Rupee (₹) is the official currency of India.", topic: "GK" },
    ],
  },
  medical: {
    "1": [
      { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Brain"], correctIndex: 2, explanation: "Skin is the largest organ of the human body.", topic: "Anatomy" },
      { question: "What is normal body temperature?", options: ["96.6°F", "98.6°F", "100.6°F", "97.6°F"], correctIndex: 1, explanation: "Normal human body temperature is approximately 98.6°F (37°C).", topic: "Vitals" },
      { question: "How many bones are in an adult human body?", options: ["106", "206", "306", "256"], correctIndex: 1, explanation: "An adult human body has 206 bones.", topic: "Anatomy" },
      { question: "What does CPR stand for?", options: ["Critical Patient Recovery", "Cardiopulmonary Resuscitation", "Central Pulse Rate", "None"], correctIndex: 1, explanation: "CPR stands for Cardiopulmonary Resuscitation, an emergency lifesaving procedure.", topic: "Emergency" },
      { question: "Which blood type is the universal donor?", options: ["A", "B", "AB", "O"], correctIndex: 3, explanation: "Blood type O negative is the universal donor.", topic: "Pathology" },
      { question: "What is the Hippocratic Oath?", options: ["A medical test", "An oath of medical ethics", "A drug name", "A disease"], correctIndex: 1, explanation: "The Hippocratic Oath is an ethical oath historically taken by physicians.", topic: "Ethics" },
      { question: "Which organ produces insulin?", options: ["Liver", "Pancreas", "Kidney", "Heart"], correctIndex: 1, explanation: "The pancreas produces insulin to regulate blood sugar.", topic: "Physiology" },
      { question: "What are antibiotics used for?", options: ["Viral infections", "Bacterial infections", "Allergies", "Pain relief"], correctIndex: 1, explanation: "Antibiotics are used to treat bacterial infections, not viral ones.", topic: "Pharmacology" },
      { question: "What is the normal pulse rate?", options: ["40-60 bpm", "60-100 bpm", "100-140 bpm", "20-40 bpm"], correctIndex: 1, explanation: "Normal resting heart rate for adults is 60-100 beats per minute.", topic: "Vitals" },
      { question: "What is the function of white blood cells?", options: ["Carry oxygen", "Fight infections", "Clot blood", "Digest food"], correctIndex: 1, explanation: "White blood cells (WBCs) are part of the immune system and fight infections.", topic: "Physiology" },
    ],
  },
  teaching: {
    "1": [
      { question: "What is pedagogy?", options: ["Study of children", "Art and science of teaching", "A teaching tool", "A curriculum"], correctIndex: 1, explanation: "Pedagogy is the art, science, and practice of teaching.", topic: "Education" },
      { question: "What is Bloom's Taxonomy?", options: ["A plant classification", "A framework for learning objectives", "A grading system", "A school type"], correctIndex: 1, explanation: "Bloom's Taxonomy categorizes educational goals into cognitive levels.", topic: "Education" },
      { question: "What is NEP 2020?", options: ["A technology policy", "National Education Policy 2020", "A health scheme", "An exam"], correctIndex: 1, explanation: "NEP 2020 is India's National Education Policy reforming the education system.", topic: "Policy" },
      { question: "What is formative assessment?", options: ["Final exam", "Ongoing assessment during learning", "Entrance test", "Annual exam"], correctIndex: 1, explanation: "Formative assessment monitors student learning to provide ongoing feedback.", topic: "Assessment" },
      { question: "What is constructivism?", options: ["Building structures", "Learners construct knowledge actively", "A teaching tool", "A subject"], correctIndex: 1, explanation: "Constructivism is a theory where learners actively construct their own understanding.", topic: "Learning Theory" },
      { question: "What is inclusive education?", options: ["Expensive education", "Education for all including special needs", "Private education", "Online education"], correctIndex: 1, explanation: "Inclusive education ensures all students, including those with disabilities, learn together.", topic: "Education" },
      { question: "Who proposed the theory of cognitive development?", options: ["Freud", "Piaget", "Skinner", "Pavlov"], correctIndex: 1, explanation: "Jean Piaget proposed the theory of cognitive development in children.", topic: "Child Development" },
      { question: "What is a lesson plan?", options: ["A vacation plan", "Teacher's guide for a lesson", "A syllabus", "A timetable"], correctIndex: 1, explanation: "A lesson plan outlines objectives, methods, and activities for a teaching session.", topic: "Teaching" },
      { question: "What is summative assessment?", options: ["Daily quiz", "End-of-term evaluation", "Group discussion", "Self-study"], correctIndex: 1, explanation: "Summative assessment evaluates student learning at the end of a unit/term.", topic: "Assessment" },
      { question: "What is classroom management?", options: ["Cleaning class", "Organizing & managing learning environment", "Managing school finances", "Hiring teachers"], correctIndex: 1, explanation: "Classroom management involves techniques to maintain a productive learning environment.", topic: "Teaching" },
    ],
  },
};

export default mockTestQuestions;
