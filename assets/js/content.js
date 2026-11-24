/* ======================================================================
   SITE A  (joshua-srf.github.io)  —  ALL EDITABLE TEXT AND LINKS LIVE HERE
   Edit only the text between quotes. Each block below is one section of the site.
   ====================================================================== */

/* ===== SECTION 0: SITE SETTINGS =====  (links, email, banner, tiny link to the other site) */
const SITE = {
  NAME: "Joshua Fernando",
  EMAIL: "joshua.f1915@gmail.com",                       // <-- MECH-ENG EMAIL shown when the email icon is clicked
  LINKEDIN: "https://www.linkedin.com/in/joshua-sr-f",   // <-- LinkedIn icon opens this
  BANNER_IMAGE: "assets/img/banner.jpg",                 // <-- your banner (replace the file, keep the name)
  OTHER_SITE: "https://joshua-fern.github.io/",          // <-- tiny, almost invisible link in the footer (set "" to remove it)
  OTHER_SITE_LABEL: "ventures",                          // <-- the word shown for that tiny link
  DOWNLOADS: {                                           // <-- files inside assets/docs/
    cv:    "assets/docs/Joshua-Fernando-CV.pdf",
    ats:   "assets/docs/Joshua-Fernando-ATS-CV.pdf",
    cover: "assets/docs/Joshua-Fernando-Cover-Letter.pdf"
  },
  WATERMARK: "VIEW ONLY \u00b7 JOSHUA FERNANDO"             // <-- diagonal text over certificates
};

/* ===== SECTION 1: HERO (the strip under the banner) ===== */
const HERO = {
  kicker: "Mechanical Engineer \u00b7 BEng (Hons) 2:1 \u00b7 IMechE-accredited \u00b7 UWE Bristol",   // small line above the bio
  bio: "I design, simulate and stress-test mechanical systems, from gearboxes and CNC processes to robotic arms and solar-hydrogen systems. Ranked 1st in my cohort for Engineering Mathematics (98%), with hands-on CAD, FEA, CFD, control-systems and manufacturing experience. Every project below opens with its full report: scroll through it on the page.",
  buttons: ["Download Standard CV (With Photo)", "Download ATS CV", "Download Cover Letter"]   // button labels
};

/* ===== SECTION 2: NUMBERS STRIP ===== [big number, small label] */
const STATS = [["98%", "Engineering Mathematics \u2014 1st in cohort"], ["2:1", "BEng (Hons) Mechanical, UWE Bristol"], ["8.0", "UKVI IELTS"], ["\u00a32,000", "Merit scholarship"]];

/* ===== SECTION 3: PROJECTS =====
   Each project becomes the page  joshua-srf.github.io/<slug>/
   img   = thumbnail in assets/img/ ("" = blueprint grid)
   docs  = reports shown at the TOP of the project page, scrollable. [label, file in assets/docs/projects/]
   stats = [big, small] tiles       sections = [heading, paragraph]                              */
const PROJECTS_SECTION = { title: "Engineering Projects", sub: "University and applied work. Every project page opens with the full report: scroll it, or open it in a new tab." };
const PROJECTS = [
{ slug: "gearbox", img: "assets/img/gearbox.jpg", tag: "Machine design \u00b7 FEA \u00b7 SolidWorks", title: "Spur Gearbox Design & Analysis",
  blurb: "2.2 kW reduction gearbox for a Honda GX100: 1500 \u2192 300 rpm, hand-calculated then verified in SolidWorks Simulation.",
  docs: [["Project report", "assets/docs/projects/gearbox.pdf"]],
  stats: [["5:1", "gear ratio (30 / 150 mm)"], ["14 \u2192 70 Nm", "input / output torque"], ["17 / 22 mm", "shaft diameters"], ["95%", "design reliability target"]],
  sections: [
    ["Brief", "Reduce 2200 W at 1500 rpm to 300 rpm inside a 300 \u00d7 200 \u00d7 300 mm envelope, with a 95% reliability target, 8-year life, 6 h/day duty and a 50 \u00b0C ceiling."],
    ["Design process", "Three concepts (a redundant 6-gear layout, a 4-gear linear train and a 4-gear/3-shaft compound) were rejected on cost, weight and unbalanced shaft loading. The final two-gear, two-shaft design won on simplicity."],
    ["Analysis", "Lewis bending stress with a velocity factor gave the gear factor of safety; tangential force is 933.7 N. Shafts were sized with the ASME equation (FoS 2 and 3), then checked for deflection, slope and critical speed. SKF 6202-2RS1 and 16004 bearings were selected for 95% reliability."],
    ["Materials & simulation", "High-carbon steel gears and shafts, aluminium housing for mass and heat rejection. SolidWorks study on AISI 1020 gears with bonded and contact interactions."]] },

{ slug: "green-hydrogen", img: "assets/img/hydrogen.jpg", tag: "Dissertation \u00b7 MATLAB \u00b7 ANSYS", title: "Solar-Powered Green Hydrogen",
  blurb: "Compared AWE and PEM electrolysis on solar power and modelled a 3D-printed gyroid electrode.",
  docs: [["Dissertation", "assets/docs/projects/hydrogen-dissertation.pdf"], ["Viva slides", "assets/docs/projects/hydrogen-viva.pdf"]],
  stats: [["3\u00d7+", "gyroid vs typical electrode output"], ["25%", "best PV conversion studied"], ["65%", "fuel-cell recovery"], ["55%", "combustion recovery"]],
  sections: [
    ["Question", "Which route turns sunlight into usable energy most efficiently: solar \u2192 electrolysis \u2192 hydrogen \u2192 recovery?"],
    ["Method", "Thermodynamic models in MATLAB, FEA and geometry work in ANSYS and SolidWorks, and a literature-grounded comparison of AWE and PEM electrolysers on PV supply."],
    ["Findings", "PEM electrolysis with combustion recovery was the best path in the study. A gyroid AWE electrode, with its much higher surface area, matched PEM-like production rates and beat conventional nickel electrodes."],
    ["Honest limits", "Marker feedback asked for sharper discussion of results and clearer future work; the efficiency headline figures are theoretical, not measured."]] },

{ slug: "robotic-chess", img: "assets/img/robotic-chess.jpg", tag: "Robotics \u00b7 Vision \u00b7 Python", title: "Vision-Guided Robotic Chess",
  blurb: "A low-cost Lynxmotion AL5D arm and one camera that reads a physical board, asks an engine for a reply and plays it.",
  docs: [["Project report", "assets/docs/projects/chess-report.pdf"], ["Slides", "assets/docs/projects/chess-slides.pdf"]],
  stats: [["327 mm", "effective planar reach"], ["1,152", "poses planned, 0 failures"], ["9.6 s / 17.8 s", "modelled quiet / capture move"], ["~2,100", "lines of Python, 11 modules"]],
  sections: [
    ["Challenge", "Engines are solved; lifting a 25 mm pawn from a crowded board is not. The project isolates perception and manipulation."],
    ["Approach", "Camera + ArUco homography, a luminance and edge-energy occupancy score, legality-constrained change matching (handles castling, en passant, promotion), a UCI engine interface and closed-form inverse kinematics."],
    ["Result", "Best geometry found: a 240 mm board at 100 mm stand-off covers all 64 squares. Change matching beat per-frame classification for continuous play."],
    ["Status", "Photographic validation and full-game reliability testing are stated in the report as next-phase work."]] },

{ slug: "golf-robot", img: "", tag: "Robotics \u00b7 PID control \u00b7 Team lead", title: "Automated Golf Placement Robot",
  blurb: "AL5D robotic arm with PID control and sensor integration that places golf balls automatically. I led a team of five.",
  docs: [],
  stats: [["95%", "image-recognition accuracy"], ["5", "person multidisciplinary team"], ["PID", "control architecture"], ["2025", "project year"]],
  sections: [
    ["Role", "Project lead for a team of five spanning robotics, automation and mechanical design. Responsible for control architecture, simulation, design and component interfacing."],
    ["Technical approach", "PID control algorithms and real-time sensor integration for precise, repeatable placement, written in Python with CAD for the mechanical interfaces."],
    ["Outcome", "Reached 95% image-recognition accuracy on the placement task (figure from my CV). A written report is not published here yet."]] },

{ slug: "tensile-tester", img: "assets/img/tensile-tester.jpg", tag: "Systems design \u00b7 Machine design", title: "Tensile Testing Machine Design",
  blurb: "100 kN twin power-screw tester for aluminium sand castings, chosen from four concepts.",
  docs: [["Design report", "assets/docs/projects/tensile-report.pdf"], ["Presentation", "assets/docs/projects/tensile-slides.pdf"]],
  stats: [["100 kN", "max force"], ["< 800 kg", "total mass"], ["< \u00a37,500", "standard components"], ["103:1", "selected gearbox ratio"]],
  sections: [
    ["Spec", "Self-locking screw drive, 0.05\u2013175 mm/min, 1300 mm test space, 575 mm between columns, 15-year life, 10\u201390% humidity."],
    ["Concepts", "Concepts A\u2013D compared on sustainability, cost, size and reliability. Concept D (twin power screw with central gearbox) balances load."],
    ["Embodiment", "Components chosen to meet the force, speed and cost targets, with manufacturability and UK safety standards in mind."]] },

{ slug: "threaded-bung", img: "assets/img/threaded-bung.jpg", tag: "CNC \u00b7 Manufacturing", title: "CNC Programming: Threaded Bung",
  blurb: "Production plan for 5,000 EN1A steel pipe bungs on a CNC lathe, with G-code and a method for a 52 mm hex.",
  docs: [["Project report", "assets/docs/projects/threaded-bung.pdf"]],
  stats: [["5,000", "parts planned"], ["\u00b10.01 mm", "target tolerance"], ["70 mm", "EN1A bar stock"], ["ISO 965 / 2768", "thread & tolerance standards"]],
  sections: [
    ["Brief", "Machine a threaded bung with symmetrical chamfers and a 5 mm full radius in volume."],
    ["Process plan", "Turret tooling, bar feeder and hydraulic chuck, AC servo and ball-screw drives, chip and coolant handling, plus CAD/CAM post-processing."],
    ["Programming", "Annotated G-code with a tool table (rough, finish, thread, groove, part-off) and a live-tooling proposal for the shoulder hexagon."],
    ["Standards", "ISO 12100, EN ISO 23125, BS 970 230M07, ISO 9001 and PUWER considerations."]] },

{ slug: "cnc-digital-twin", img: "assets/img/cnc-digital-twin.jpg", tag: "Research proposal \u00b7 Digital twin \u00b7 Group of 5", title: "Digital Twins for Just-in-Time CNC",
  blurb: "Group funding-call proposal: using digital twins to cut waste and raise efficiency in CNC machining for precision parts.",
  docs: [["Group presentation", "assets/docs/projects/cnc-digital-twin.pdf"]],
  stats: [["5", "student research group"], ["JIT", "just-in-time manufacturing focus"], ["CNC", "precision-part machining"], ["Digital twin", "core method"]],
  sections: [
    ["Aim", "Improve manufacturing by using digital twins to reduce waste and increase efficiency in the CNC production process."],
    ["Research questions", "How can waste be reduced in manufacturing? How can CNC machining be made more efficient with digital twins? How can just-in-time manufacturing be made more reliable?"],
    ["Method", "Study how digital twins are used in aerospace and automotive manufacturing, set up a twin with the parameters of concern, then implement the changes it identifies."],
    ["Also covered", "Ethics of digital twins (bias, data security, workforce impact), risk assessment with root-cause analysis and mitigation, and expected impact."]] },

{ slug: "moses-proposal", img: "assets/img/moses-proposal.jpg", tag: "Research proposal \u00b7 CFD \u00b7 Thermodynamics", title: "M.O.S.E.S. Research Proposal",
  blurb: "Moisture Obtaining Solar Energy System: a 2024 proposal for pulling water from air with a cooled mesh, compression and solar power.",
  docs: [["Research proposal (UFMFMRS-15-2)", "assets/docs/projects/moses-proposal.pdf"]],
  stats: [["2024", "proposal year"], ["Solar", "powered, off-grid intent"], ["2", "versions: drinking and agricultural"], ["CFD", "ANSYS modelling plan"]],
  sections: [
    ["Concept", "Air is funnelled through a cooled mesh so moisture condenses and is collected; the air is also compressed to improve efficiency; power comes from solar energy so the unit can run independently."],
    ["Plan", "Research ANSYS CFD and heat-exchanger modelling, solar energy, air-compression ratios, condensation factors, rechargeable power cells for night operation, coolant pumps and existing technologies."],
    ["Two versions", "One with filtration for human consumption, one without for agriculture and cleaning."]] },

{ slug: "ebike-kit", img: "assets/img/ebike-kit.jpg", tag: "Sustainability \u00b7 Project management", title: "DIY Electric Bike Conversion Kit",
  blurb: "Bristol sustainability project: a DIY e-bike kit plus public charging network supporting the city's carbon-neutral goals.",
  docs: [["Project week presentation", "assets/docs/projects/ebike-kit.pdf"]],
  stats: [["30%", "short commutes by car (survey)"], ["18%", "by bike (survey)"], ["Nov 2023", "Project Week 1 (Group E)"], ["Lead", "concept & project management"]],
  sections: [
    ["Aims", "Design and produce a DIY electric bike kit, reduce the cost of owning an electric vehicle, offer free communal charging, integrate with universities, supermarkets and housing developments, and spread awareness of Bristol's carbon-neutral goals."],
    ["Market research", "University of Bristol travel-to-work data showed about 30% of short commutes by car against 18% by bike, which framed the opportunity."],
    ["My role", "Led concept development, project management and team coordination; ran feasibility analysis and energy-demand modelling across the full transport system."]] }
];

/* ===== SECTION 4: CERTIFICATIONS =====
   [id, title]. The image for each id must be uploaded to  assets/certs/<id>.jpg
   (.png or .webp also work). EXACT FILE NAMES:
     degree.jpg  transcript.jpg  alevels.jpg  ielts.jpg  olevels.jpg  reference.jpg  character.jpg
   To add one: add a line here, add the same id in NOLL_CONFIG.CERTS (noll-widget.js), upload <id>.jpg.   */
const CERTS_SECTION = { title: "Certifications", sub: "View-only previews with personal details hidden.", note: "Need the original? Open a certificate and press \u201cRequest Unredacted Copy\u201d: NØLL will take your details and Joshua will follow up." };
const CERTS = [["degree", "BEng (Hons) Mechanical Engineering"], ["transcript", "UWE Transcript"], ["alevels", "Cambridge A-Levels"], ["ielts", "UKVI IELTS"],
  ["olevels", "G.C.E. O-Levels"], ["reference", "Recommendation Letter"], ["character", "Character Certificate"]];
