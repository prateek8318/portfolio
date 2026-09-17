export const featuredProjects = [
  {
    id: "mann-fleet",
    name: "Mann Fleet",
    slug: "mann-fleet",
    description: "A smart and easy-to-use ride booking app offering fast, safe, and affordable transportation. Engineered the Backend, Admin Panel, and Website.",
    tech: ["Node.js", "Express", "MongoDB", "React", "Socket.io"],
    isPrivate: true,
    githubUrl: null,
    liveUrl: "https://www.mannfleetpartners.com/",
    image: "/mann_fleet.jpg",
    caseStudy: {
      problem: "<strong>Mann Fleet – Your Reliable Ride Partner</strong><br/><br/>Mann Fleet is a smart and easy-to-use ride booking app that helps you travel comfortably anytime, anywhere. Whether you need a quick ride across the city or a long-distance trip, Mann Fleet offers fast, safe, and affordable transportation at your fingertips.<br/><br/><strong>Why Choose Mann Fleet?</strong><br/>• Instant Ride Booking with multiple vehicle options.<br/>• Affordable Pricing with no hidden charges.<br/>• Real-Time Tracking for driver location and arrival time.<br/>• Safe & Secure Rides with verified drivers.",
      objective: "Architect a robust <strong>Backend</strong> infrastructure, a comprehensive <strong>Admin-Panel</strong>, and a sleek <strong>Website</strong> to manage the entire fleet, drivers, and riders seamlessly for daily commutes, airport transfers, outstation trips, and local rides.",
      architecture: "graph TD;\n  A[Rider/Driver App] <-->|WebSockets| B[Node.js Backend]\n  B --> C[(MongoDB Cluster)]\n  D[React Admin Panel] --> B\n  E[Marketing Website] --> B",
      contribution: "Designed and developed the entire <strong>Backend API</strong> using Node.js/Express. Built a powerful React-based <strong>Admin-Panel</strong> from scratch to monitor live vehicle locations, manage driver KYC, and handle financial settlements. Additionally, developed the main public-facing <strong>Website</strong>. Integrated Socket.io for millisecond-level real-time tracking.",
      challenges: [
        "Handling high-frequency GPS coordinate updates from hundreds of drivers simultaneously without crashing the server.",
        "Building a complex state machine for ride lifecycles (Requested -> Accepted -> Ongoing -> Completed)."
      ],
      result: "Successfully launched with 100% transparent pricing and high driver verification standards. The admin panel reduced operational overhead by 70%, ensuring a smooth experience."
    }
  },
  {
    id: "practly",
    name: "Practly",
    slug: "practly",
    description: "Prepare smarter with Practly — an all-in-one platform for MCQ practice, mock tests, and previous year papers. Built the Microservices Backend and Admin Panel.",
    tech: ["Node.js", "React", "Docker", "Microservices", "PostgreSQL"],
    isPrivate: false,
    githubUrl: null, 
    liveUrl: "https://practly.in/", 
    image: "/practly.jpg",
    caseStudy: {
      problem: "<strong>About Practly</strong><br/><br/>Prepare smarter and improve your exam performance with Practly — your all-in-one platform for MCQ practice, mock tests, and previous year papers. Whether you are preparing for competitive exams, entrance exams, or academic assessments, Practly helps you practice questions, test your knowledge, and identify areas where you need improvement.",
      objective: "Build a crash-proof, distributed <strong>Backend</strong> architecture and an intuitive <strong>Admin-Panel</strong> for educators to upload bulk question banks and analyze student performance. Key features include Subject-Wise MCQ Practice, Mock Tests in an exam-like environment, and Performance Improvement tracking.",
      architecture: "graph TD;\n  A[Student Portal] --> B[API Gateway]\n  B --> C[Exam Microservice]\n  B --> D[Auth Service]\n  E[React Admin Panel] --> B",
      contribution: "Spearheaded the <strong>Backend</strong> development utilizing a Microservices architecture via Docker to handle high concurrent traffic. Developed a feature-rich <strong>Admin-Panel</strong> in React that allows educators to effortlessly manage bulk MCQ uploads, schedule mock exams, and view deep analytics.",
      challenges: [
        "Ensuring zero downtime and state persistence during critical national mock exams.",
        "Processing massive datasets to generate instant percentile and ranking analytics for thousands of students."
      ],
      result: "Platform successfully handled thousands of concurrent test-takers. The admin panel streamlined content operations, making exam preparation simple, focused, and effective."
    }
  },
  {
    id: "dvagoo-driver",
    name: "DVAGOO Pilot",
    slug: "dvagoo-driver",
    description: "DVAGOO – Smart Driver Management & Ride Assignment App. Developed the core Backend and Administrative Dashboard.",
    tech: ["Node.js", "React", "AWS", "OCR APIs"],
    isPrivate: true,
    githubUrl: null,
    liveUrl: "https://www.dvagoo.com/",
    image: "/dvagoo.jpg",
    caseStudy: {
      problem: "<strong>DVAGOO – Smart Driver Management & Ride Assignment App</strong><br/><br/>DVAGOO is a powerful and easy-to-use driver application designed to simplify driver onboarding, document verification, and ride management. Built for modern fleet systems, the app helps drivers securely register, get verified, and manage their daily ride assignments efficiently.",
      objective: "Create a fully automated <strong>Backend</strong> pipeline and a centralized <strong>Admin-Panel</strong> for instant KYC verification (Aadhaar, PAN), Ride Assignment Management, Two-Step Verification for Rides, and Driver Profile Management.",
      architecture: "graph TD;\n  A[Driver App] --> B[Node.js Backend]\n  B --> C[External OCR/KYC API]\n  D[React Admin Panel] --> B\n  B --> E[AWS S3 Secure Storage]",
      contribution: "Engineered the secure <strong>Backend API</strong> to handle secure document uploads to AWS S3. Built a robust <strong>React Admin-Panel</strong> for the operational team to verify documents instantly. Integrated third-party APIs for automated Aadhaar/PAN validation and implemented the core ride assignment matching algorithms.",
      challenges: [
        "Ensuring strict data encryption and security for highly sensitive PII (Aadhaar, PAN).",
        "Implementing a fair Two-Step Verification flow for ride acceptance to ensure transparency and trust."
      ],
      result: "Reduced driver onboarding processing time from days to under 5 minutes. The admin panel provided complete driver lifecycle management, secure verification, and efficient ride handling."
    }
  },
  {
    id: "apexjee",
    name: "ApexJEE",
    slug: "apexjee",
    description: "A complete, structured IIT JEE preparation platform. Designed and built the Admin Panel and Student Panel.",
    tech: ["Node.js", "React", "MongoDB", "Express"],
    isPrivate: false,
    githubUrl: null,
    liveUrl: "http://160.187.87.138:9071/",
    image: "/apexjee.jpg",
    caseStudy: {
      problem: "<strong>About ApexJEE</strong><br/><br/>I built ApexJEE with one clear principle: a serious student should never have to step outside this platform for anything during their JEE preparation. Everything you need — the theory, the practice questions, the mock tests that feel like the real exam, the timetable that actually adapts to your life, the doubt resolution, the analytics that show exactly where you're losing marks — all of it is here, fully integrated, and designed to work as one coherent system. Not a collection of links and PDFs, but a complete, structured path from Day 1 to Rank 1.",
      objective: "Build a comprehensive ecosystem comprising an <strong>Admin-Panel</strong> for content management and a deeply integrated <strong>Student Panel</strong> where students can generate dynamic timetables and kickstart their IIT preparation.",
      architecture: "graph TD;\n  A[Student Panel (React)] --> B[Node.js Backend]\n  C[Admin Panel (React)] --> B\n  B --> D[(MongoDB)]\n  B --> E[Analytics Engine]",
      contribution: "Designed and engineered the full-stack solution from scratch. Developed the <strong>Admin-Panel</strong> for seamless content and user management, and the interactive <strong>Student Panel</strong> which includes adaptive timetables, mock tests, and deep analytics.",
      challenges: [
        "Building a dynamic timetable generator that truly adapts to a student's daily life and progress.",
        "Creating an analytics engine that precisely pinpoints where marks are lost in complex JEE patterns."
      ],
      result: "Created a unified platform that replaces scattered resources with a coherent, structured path from Day 1 to Rank 1, enabling serious JEE aspirants to focus entirely on learning."
    }
  },
  {
    id: "olcure",
    name: "OLCURE",
    slug: "olcure",
    description: "A smart healthcare consultation ecosystem. Engineered the Backend API for Doctor/Patient Apps, along with Admin and Hospital panels.",
    tech: ["Node.js", "Express", "React", "MongoDB", "WebRTC"],
    isPrivate: false,
    githubUrl: null,
    liveUrl: "https://olcure.com/",
    image: "/olcure.png",
    caseStudy: {
      problem: "<strong>About OLCURE</strong><br/><br/>OLCURE is a smart and easy-to-use healthcare consultation app that connects users with verified doctors and medical consultants anytime, anywhere. Users can search for experienced doctors, book appointments, and get medical advice from the comfort of their homes via secure Video and Chat consultations.",
      objective: "Develop a massive healthcare ecosystem requiring robust APIs for dual mobile applications (<strong>Doctor App</strong> & <strong>Patient App</strong>), alongside a comprehensive <strong>Admin-Panel</strong>, a specialized <strong>Hospital-Panel</strong>, and a public <strong>Website</strong>.",
      architecture: "graph TD;\n  A[Patient App] <-->|APIs/WebRTC| B[Node.js Backend]\n  C[Doctor App] <-->|APIs/WebRTC| B\n  D[React Admin/Hospital Panels] --> B\n  E[Website] --> B\n  B --> F[(MongoDB)]",
      contribution: "Played a core role in the architecture. Built the complete <strong>Backend API</strong> handling business logic for both the Doctor and Patient apps. Furthermore, I developed the primary <strong>Website</strong>, the centralized <strong>Admin-Panel</strong> for platform management, and the dedicated <strong>Hospital-Panel</strong> for institutional control.",
      challenges: [
        "Implementing secure and reliable real-time video/chat consultation features (WebRTC/Sockets) while maintaining strict health data privacy.",
        "Designing a complex, unified API architecture capable of serving two distinct mobile apps concurrently without data leakage."
      ],
      result: "Successfully delivered a smooth, scalable, and user-friendly healthcare platform. The interconnected panels and apps drastically simplified medical consultations and saved crucial time for patients avoiding hospital queues."
    }
  },
  {
    id: "shaadi-overseas",
    name: "Shaadi Overseas",
    slug: "shaadi-overseas",
    description: "A premium wedding planning directory connecting couples with global resources. Built the robust Backend, Admin Panel, and main Website.",
    tech: ["Node.js", "React", "MongoDB", "Express"],
    isPrivate: false,
    githubUrl: null,
    liveUrl: "http://160.187.87.138:866/",
    image: "/shaadi.png",
    caseStudy: {
      problem: "<strong>About Shaadi Overseas</strong><br/><br/>We are a premium wedding planning directory. Our motive was to provide high-quality resources and vendor connections to couples planning to get married in and outside India. Planning a destination wedding often involves fragmented information and unreliable vendor data, making the process highly stressful.",
      objective: "Develop a centralized, premium <strong>Website</strong> to showcase global wedding resources, powered by a highly scalable <strong>Backend</strong> and a powerful <strong>Admin-Panel</strong> for managing vendor listings, user inquiries, and premium subscriptions.",
      architecture: "graph TD;\n  A[Public Website (React)] --> B[Node.js Backend]\n  C[Admin Panel (React)] --> B\n  B --> D[(MongoDB)]\n  B --> E[AWS/Cloudinary for Media]",
      contribution: "Architected and developed the entire ecosystem from the ground up. Engineered the <strong>Backend API</strong> to handle complex filtering and search queries for vendors. Built the main public-facing <strong>Website</strong> with a premium UI/UX, and a comprehensive <strong>Admin-Panel</strong> for staff to moderate listings, approve vendors, and track user engagement.",
      challenges: [
        "Designing an advanced, lightning-fast search and filtering algorithm to help couples find vendors by specific regions, budgets, and services globally.",
        "Managing and optimizing thousands of high-resolution images and media assets uploaded by vendors without sacrificing page load speed."
      ],
      result: "Successfully launched a premium directory that unified scattered wedding resources into one elegant platform. The admin panel provided complete control over content, driving faster vendor approvals and a seamless experience for couples."
    }
  },
  {
    id: "nitarya-security",
    name: "Nitarya Security Admin Panel",
    slug: "nitarya-security",
    description: "A comprehensive Super Admin dashboard for security services. Engineered the complex ticket workflow, emergency alerts, and unified operations portal.",
    tech: ["React", "Node.js", "Express", "REST APIs"],
    isPrivate: true,
    githubUrl: null,
    liveUrl: "http://160.187.87.138:832/",
    image: "/security.png",
    caseStudy: {
      problem: "<strong>About Nitarya Services Security Dashboard</strong><br/><br/>Security services companies require absolute precision in managing field operations. The client lacked a centralized system, struggling with scattered spreadsheets for guard duty assignments, delayed emergency incident reports, and inefficient manual billing.",
      objective: "Develop a unified <strong>Super Admin Dashboard</strong> to seamlessly manage staff operations, client relationships, support tickets, and billing from a single, role-based interface.",
      architecture: "graph TD;\n  A[React Admin Dashboard] --> B[Node.js REST API]\n  B --> C[(Relational Database)]\n  B --> D[Real-time Notification Service]\n  E[Field Operations] --> B",
      contribution: "Architected the complete system logic and UI. <strong>Built the React dashboard UI</strong> handling massive data sets (KPI cards, Active Staff, Pending Invoices). <strong>Engineered the ticket workflow logic</strong> (Open → Assigned → In Progress → Resolved) and designed a specialized <strong>Emergency Alerts Panel</strong> for time-sensitive incident response. Integrated comprehensive invoice tracking directly with the backend API.",
      challenges: [
        "Designing an Emergency Alerts system that guarantees immediate visibility for critical-priority tickets across all active admin sessions.",
        "Building a unified activity feed that provides a real-time audit trail of all staff movements, ticket updates, and client registrations."
      ],
      result: "Deployed a highly responsive, card-based dashboard that centralized all operations. The system drastically improved response times for emergency tickets and eliminated manual billing errors through automated invoice tracking."
    }
  },
  {
    id: "text-analyzer",
    name: "Text Analyzer",
    slug: "text-analyzer",
    description: "A text analysis tool redesigned with a premium, polished UI, featuring real-time metrics and dynamic interactions.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
    isPrivate: false,
    githubUrl: null,
    liveUrl: "https://text-analyzer-ruddy-two.vercel.app/",
    image: "/text.png",
    caseStudy: {
      problem: "<strong>About Text Analyzer</strong><br/><br/>Most text analysis tools on the web are purely functional utilities with generic, cluttered interfaces. The objective was to redesign a standard text analyzer into a premium, production-quality product from the very first screen.",
      objective: "Elevate the user experience by implementing a clear visual hierarchy, premium card layouts, refined spacing, and purposeful Call-To-Action (CTA) interactions.",
      architecture: "graph TD;\n  A[React Frontend] --> B[Tailwind CSS Styling]\n  B --> C[Framer Motion Animations]\n  A --> D[Real-time Parsing Logic]",
      contribution: "<strong>Redesigned the UI/UX from scratch</strong> to reflect a clean, professional design language. <strong>Implemented a card-based layout</strong> for results, ensuring that the most important information stands out immediately. <strong>Added action button interactions and micro-animations</strong> (e.g., Analyze, Copy, Export, Reset) to make the tool feel highly interactive and complete.",
      challenges: [
        "Processing large blocks of text in real-time without causing UI lag or stutter during typing.",
        "Balancing a clean, minimalist design while simultaneously displaying numerous complex text metrics."
      ],
      result: "The changes transformed the analyzer from a basic text-in/text-out utility into a genuinely attractive, production-quality application, significantly improving both the first impression and overall usability."
    }
  },
  {
    id: "game-hub",
    name: "Game Hub",
    slug: "game-hub",
    description: "A browser-based mini-games hub offering classic games like Tic-Tac-Toe, Memory, and Rock Paper Scissors with persistent score tracking.",
    tech: ["React", "Tailwind CSS", "JavaScript", "Context API"],
    isPrivate: false,
    isPlayable: true,
    githubUrl: null,
    liveUrl: "https://tic-tac-toe-blond-nine-89.vercel.app/",
    image: "/tic-toe.png",
    caseStudy: {
      problem: "<strong>About Game Hub</strong><br/><br/>The goal was to create a unified, browser-based mini-games hub offering multiple classic games — Tic-Tac-Toe, Memory, and Rock Paper Scissors — under a single platform. Instead of isolated, basic HTML/JS games, it needed to feel like a modern, cohesive web app with persistent state.",
      objective: "Design a visually striking platform with a shared scoreboard system, persistent navigation, and a vibrant gradient UI (coral-to-teal) to make the experience highly engaging.",
      architecture: "graph TD;\n  A[React Frontend] --> B[Shared State Management]\n  B --> C[Tic-Tac-Toe Engine]\n  B --> D[Memory Game Engine]\n  B --> E[RPS Game Engine]",
      contribution: "<strong>Built the complex game logic</strong> for Tic-Tac-Toe, Memory, and Rock Paper Scissors from scratch. <strong>Designed the shared scoreboard and multi-game state management</strong> to ensure real-time tracking of Player X, Player O, and Draws across sessions. <strong>Implemented the gradient UI theme</strong> and card-based layout to give the hub a premium, cohesive aesthetic.",
      challenges: [
        "Managing complex, shared state across multiple distinct game engines without prop drilling.",
        "Ensuring smooth, responsive UI transitions and animations during fast-paced gameplay."
      ],
      result: "Delivered a highly polished, interactive platform. The purple-to-lavender gradient background and consistent color language elevated the project from a simple utility to an attractive, playable portfolio piece."
    }
  }
];
