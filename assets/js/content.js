/* ======================================================================
   SITE A  (joshua-srf.github.io)  —  ALL EDITABLE TEXT AND LINKS LIVE HERE
   Edit only the text between quotes. Each block below is one section of the site.
   ====================================================================== */

/* ===== SECTION 0: SITE SETTINGS =====  (links, email, banner, tiny link to the other site) */
const SITE = {
  NAME: "Joshua Fernando",
  BRAND: "Joshua Fernando Engineering Portfolio",         // <-- top-left of every page
  EMAIL: "joshua.f1915@gmail.com",                       // <-- MECH-ENG EMAIL shown when the email icon is clicked
  LINKEDIN: "https://www.linkedin.com/in/joshua-sr-f",   // <-- LinkedIn icon opens this
  BANNER_IMAGE: "assets/img/banner.jpg",                 // <-- your banner (replace the file, keep the name)
  OTHER_SITE: "https://joshua-fern.github.io/",          // <-- the founder site (opened by the Ø icon in the footer, see PORTAL at the bottom)
  DOWNLOADS: {                                           // <-- files inside assets/docs/
    cv:    "assets/docs/Joshua-Fernando-CV.pdf",
    ats:   "assets/docs/Joshua-Fernando-ATS-CV.pdf",
    cover: "assets/docs/Joshua-Fernando-Cover-Letter.pdf"
  },
  WATERMARK: "VIEW ONLY \u00b7 JOSHUA FERNANDO"             // <-- diagonal text over certificates
};

/* ===== SECTION 1: HERO TEXT  (the writing under the banner)
   >>>>>>  TYPE / PASTE YOUR TOP-OF-PAGE INTRODUCTION BETWEEN THE QUOTES NEXT TO  bio:  BELOW  <<<<<<  */
const HERO = {
  kicker: [                                               // small line above the bio. [text] or [text, link]
    ["Mechanical Engineer"], ["BEng (Hons) 2:1"],
    ["IMechE-accredited", "https://imeche.org/membership-registration/become-a-member/academic-requirements"],   // <-- link: what the accreditation means
    ["UWE Bristol", "https://courses.uwe.ac.uk/H300/mechanical-engineering"]                                      // <-- link: UWE engineering course page
  ],
  bio: "I'm a mechanical engineering graduate from the University of the West of England with a strong academic record and a proven focus on bridging the gap between mathematical theory and high-performance physical systems. Through diverse, multi-disciplinary projects, I have developed technical proficiency in CAD design, FEA, and CFD using industry-standard platforms like ANSYS, Siemens NX, SolidWorks, and Autodesk Fusion, alongside advanced controls modeling with MATLAB, Simulink, and Python.",   // <-- YOUR INTRODUCTION TEXT
  buttons: ["Download Standard CV (With Photo)", "Download ATS CV", "Download Cover Letter"]   // button labels
};

/* ===== SECTION 2: NUMBERS STRIP ===== [big number, small label] */
const STATS = [["98%", "Engineering Mathematics \u2014 1st in cohort"], ["2:1", "BEng (Hons) Mechanical, UWE Bristol"], ["8.0", "UKVI IELTS"]];

/* ===== PROJECT PICTURES (drop-in) =====
   Put a picture named  <slug>.jpg  (or .png / .webp) in IMG_DIR and it automatically becomes that project's thumbnail.
   Slugs: green-hydrogen, robotic-chess, gearbox, golf-robot, tensile-tester, threaded-bung, cnc-digital-twin, moses-proposal, ebike-kit
   If there is no picture there, the default cover from COVER_DIR is used.                                                                  */
const IMG_DIR = "assets/img/projects/";      // <-- YOUR pictures go here
const COVER_DIR = "assets/img/covers/";      // default covers (report / presentation cover pages)

/* ===== SECTION 3: PROJECTS =====
   Each project becomes the page  joshua-srf.github.io/<slug>/
   img   = thumbnail in assets/img/ ("" = blueprint grid)
   deck  = optional slideshow banner at the very top { dir: folder of 01.jpg, 02.jpg..., count, pdf, label }
   docs  = reports shown below it, scrollable. [label, file in assets/docs/projects/]
   figures = optional picture gallery [file in assets/img/figures/, caption]
   stats = [big, small] tiles       sections = [heading, paragraph]                              */
const PROJECTS_SECTION = { title: "Engineering Projects", sub: "University and applied work. Every project page opens with the full report: scroll it, or open it in a new tab." };
const PROJECTS = [
{ slug: "green-hydrogen", tag: "Dissertation \u00b7 MATLAB \u00b7 ANSYS \u00b7 SolidWorks", title: "Solar-Powered Green Hydrogen",
  blurb: "Compared AWE, PEM and a 3D-printed gyroid electrode for solar-powered hydrogen production, then compared combustion and fuel-cell energy recovery.",
  deck: { dir: "assets/slides/green-hydrogen", count: 15, pdf: "assets/docs/projects/hydrogen-viva.pdf", label: "Viva presentation" },   // slideshow banner at the top
  docs: [["Dissertation", "assets/docs/projects/hydrogen-dissertation.pdf"]],
  stats: [["203 vs 54 cm\u00b2", "gyroid vs flat electrode surface area"], ["3.8\u00d7", "faster than flat AWE in the modelled run (7.92 vs 29.78 min)"], ["65%", "fuel-cell energy recovery"], ["55%", "combustion energy recovery"]],
  figures: [   // [file in assets/img/figures/, caption]
    ["gyroid-model.jpg", "The gyroid electrode modelled in SolidWorks: a 3D-printable nickel lattice with far more surface area than a flat plate."],
    ["gyroid-surface-area.jpg", "Hydrogen volume over time: gyroid electrode (203 cm\u00b2) against a regular electrode (54 cm\u00b2)."],
    ["hydrogen-production-graph.jpg", "Modelled hydrogen volume over the first 15 minutes for AWE, AWE with the gyroid electrode, and PEM."],
    ["hydrogen-results-table.jpg", "Results table: time, electrode area, current density, voltage and energy for each electrolyser."],
    ["hydrogen-methodology.jpg", "Methodology: three electrolysis routes compared on hydrogen output, then on combustion and fuel-cell energy recovery."]],
  sections: [
    ["Question", "Which route turns sunlight into usable energy most efficiently: solar \u2192 electrolysis \u2192 hydrogen \u2192 recovery?"],
    ["Method", "Thermodynamic models in MATLAB, geometry and FEA work in SolidWorks and ANSYS, and a literature-grounded comparison of alkaline (AWE) and PEM electrolysers on solar PV supply."],
    ["The gyroid electrode", "A gyroid is a lattice shape with very high surface area and porosity. A 3D-printed nickel gyroid with about 203 cm\u00b2 of surface area replaced a 54 cm\u00b2 flat electrode, which improved the production rate for the same energy input. Gas-bubble dissipation inside the lattice is the main open question."],
    ["Findings", "PEM was the most energy-efficient electrolyser. The gyroid AWE reached PEM-like production rates (7.92 min against 6.27 min for PEM, versus 29.78 min for flat AWE in the results table). Hydrogen combustion recovers about 55% of the energy and fuel cells about 65%."],
    ["Honest limits", "Marker feedback asked for sharper discussion of results and clearer future work; the efficiency headline figures are theoretical, not measured."]] },

{ slug: "robotic-chess", tag: "Robotics \u00b7 Vision \u00b7 Python", title: "Vision-Guided Robotic Chess",
  blurb: "A low-cost Lynxmotion AL5D arm and one camera that reads a physical board, asks an engine for a reply and plays it.",
  deck: { dir: "assets/slides/robotic-chess", count: 16, pdf: "assets/docs/projects/chess-slides.pdf", label: "Project presentation" },   // slideshow banner at the top
  docs: [["Project report", "assets/docs/projects/chess-report.pdf"]],
  stats: [["327 mm", "effective planar reach"], ["1,152", "poses planned, 0 failures"], ["9.6 s / 17.8 s", "modelled quiet / capture move"], ["~2,100", "lines of Python, 11 modules"]],
  sections: [
    ["Challenge", "Engines are solved; lifting a 25 mm pawn from a crowded board is not. The project isolates perception and manipulation."],
    ["Approach", "Camera + ArUco homography, a luminance and edge-energy occupancy score, legality-constrained change matching (handles castling, en passant, promotion), a UCI engine interface and closed-form inverse kinematics."],
    ["Result", "Best geometry found: a 240 mm board at 100 mm stand-off covers all 64 squares. Change matching beat per-frame classification for continuous play."],
    ["Status", "Photographic validation and full-game reliability testing are stated in the report as next-phase work."]] },

{ slug: "gearbox", tag: "Machine design \u00b7 FEA \u00b7 SolidWorks", title: "Gearbox Design & Analysis",
  blurb: "2.2 kW reduction gearbox for a Honda GX100: 1500 \u2192 300 rpm, hand-calculated then verified in SolidWorks Simulation.",
  docs: [["Project report", "assets/docs/projects/gearbox.pdf"]],
  stats: [["5:1", "gear ratio (30 / 150 mm)"], ["14 \u2192 70 Nm", "input / output torque"], ["17 / 22 mm", "shaft diameters"], ["95%", "design reliability target"]],
  sections: [
    ["Brief", "Reduce 2200 W at 1500 rpm to 300 rpm inside a 300 \u00d7 200 \u00d7 300 mm envelope, with a 95% reliability target, 8-year life, 6 h/day duty and a 50 \u00b0C ceiling."],
    ["Design process", "Three concepts (a redundant 6-gear layout, a 4-gear linear train and a 4-gear/3-shaft compound) were rejected on cost, weight and unbalanced shaft loading. The final two-gear, two-shaft design won on simplicity."],
    ["Analysis", "Lewis bending stress with a velocity factor gave the gear factor of safety; tangential force is 933.7 N. Shafts were sized with the ASME equation (FoS 2 and 3), then checked for deflection, slope and critical speed. SKF 6202-2RS1 and 16004 bearings were selected for 95% reliability."],
    ["Materials & simulation", "High-carbon steel gears and shafts, aluminium housing for mass and heat rejection. SolidWorks study on AISI 1020 gears with bonded and contact interactions."]] },

{ slug: "golf-robot", tag: "Robotics \u00b7 Group design project \u00b7 MATLAB", title: "Golf Placement Robot (AL5D)",
  blurb: "Group Design and Integration Project: a Lynxmotion AL5D arm with a custom gripper that places golf balls for repeated swings at a driving range.",
  docs: [["Group report (UFMFV8-15-3)", "assets/docs/projects/golf-robot.pdf"]],
  stats: [["5", "student project team"], ["5 + redesign", "gripper concepts evaluated"], ["518 mm", "modelled reach (requirement: 500 mm)"], ["6", "servo motors on the AL5D"]],
  figures: [
    ["golf-gripper-designs.jpg", "High-level gripper design in CAD: trimetric view, bird's-eye view, and holding a golf ball."],
    ["golf-gripper-design5.jpg", "Redesigned two-prong gripper with a serrated edge for grip, shown open and closed on a golf ball."],
    ["golf-arm-cad.jpg", "Simplified CAD model of the AL5D arm used to verify the 50 cm reach requirement."]],
  sections: [
    ["Brief", "Pick a standard golf ball and place it on a tee or an adjustable point in front of the golfer, so players can repeat swings without stopping. Driving ranges do not use tees, so the robot places the ball on a specified point as well as on a tee."],
    ["My role", "Part of a five-person team; I led the project (see my CV) alongside work on the control and design side."],
    ["Gripper design", "Five gripper concepts plus a redesign were compared against the requirements. The final serrated two-prong design widened the prong spacing and lengthened the arms so the reach requirement was met in both the X and Y axes."],
    ["Robotics design", "The AL5D arm is driven by six servos. A camera finds the pickup location and watches the drop zone; an ultrasonic sensor triggers the camera to confirm a golf ball is present. Software is MATLAB (Robotics Toolbox kinematics, trajectory generation, PID control, image processing)."],
    ["Planning and verification", "The report also covers Gantt chart and critical path, stakeholder and risk analysis, a financial plan, and a verification and validation plan, with 3D-printing material choices for the gripper."]] },

{ slug: "tensile-tester", tag: "Systems design \u00b7 Machine design", title: "Tensile Testing Machine Design",
  blurb: "100 kN twin power-screw tester for aluminium sand castings, chosen from four concepts.",
  docs: [["Design report", "assets/docs/projects/tensile-report.pdf"], ["Presentation", "assets/docs/projects/tensile-slides.pdf"]],
  stats: [["100 kN", "max force"], ["< 800 kg", "total mass"], ["< \u00a37,500", "standard components"], ["103:1", "selected gearbox ratio"]],
  sections: [
    ["Spec", "Self-locking screw drive, 0.05\u2013175 mm/min, 1300 mm test space, 575 mm between columns, 15-year life, 10\u201390% humidity."],
    ["Concepts", "Concepts A\u2013D compared on sustainability, cost, size and reliability. Concept D (twin power screw with central gearbox) balances load."],
    ["Embodiment", "Components chosen to meet the force, speed and cost targets, with manufacturability and UK safety standards in mind."]] },

{ slug: "threaded-bung", tag: "CNC \u00b7 Manufacturing", title: "CNC Programming: Threaded Bung",
  blurb: "Production plan for 5,000 EN1A steel pipe bungs on a CNC lathe, with G-code and a method for a 52 mm hex.",
  docs: [["Project report", "assets/docs/projects/threaded-bung.pdf"]],
  stats: [["5,000", "parts planned"], ["\u00b10.01 mm", "target tolerance"], ["70 mm", "EN1A bar stock"], ["ISO 965 / 2768", "thread & tolerance standards"]],
  sections: [
    ["Brief", "Machine a threaded bung with symmetrical chamfers and a 5 mm full radius in volume."],
    ["Process plan", "Turret tooling, bar feeder and hydraulic chuck, AC servo and ball-screw drives, chip and coolant handling, plus CAD/CAM post-processing."],
    ["Programming", "Annotated G-code with a tool table (rough, finish, thread, groove, part-off) and a live-tooling proposal for the shoulder hexagon."],
    ["Standards", "ISO 12100, EN ISO 23125, BS 970 230M07, ISO 9001 and PUWER considerations."]] },

{ slug: "cnc-digital-twin", tag: "Research proposal \u00b7 Digital twin \u00b7 Group of 5", title: "Digital Twins for Just-in-Time CNC",
  blurb: "Group funding-call proposal: using digital twins to cut waste and raise efficiency in CNC machining for precision parts.",
  docs: [["Group presentation", "assets/docs/projects/cnc-digital-twin.pdf"]],
  stats: [["5", "student research group"], ["JIT", "just-in-time manufacturing focus"], ["CNC", "precision-part machining"], ["Digital twin", "core method"]],
  sections: [
    ["Aim", "Improve manufacturing by using digital twins to reduce waste and increase efficiency in the CNC production process."],
    ["Research questions", "How can waste be reduced in manufacturing? How can CNC machining be made more efficient with digital twins? How can just-in-time manufacturing be made more reliable?"],
    ["Method", "Study how digital twins are used in aerospace and automotive manufacturing, set up a twin with the parameters of concern, then implement the changes it identifies."],
    ["Also covered", "Ethics of digital twins (bias, data security, workforce impact), risk assessment with root-cause analysis and mitigation, and expected impact."]] },

{ slug: "moses-proposal", tag: "Research proposal \u00b7 CFD \u00b7 Thermodynamics", title: "M.O.S.E.S. Research Proposal",
  blurb: "Moisture Obtaining Solar Energy System: a 2024 proposal for pulling water from air with a cooled mesh, compression and solar power.",
  docs: [["Research proposal (UFMFMRS-15-2)", "assets/docs/projects/moses-proposal.pdf"]],
  stats: [["2024", "proposal year"], ["Solar", "powered, off-grid intent"], ["2", "versions: drinking and agricultural"], ["CFD", "ANSYS modelling plan"]],
  sections: [
    ["Concept", "Air is funnelled through a cooled mesh so moisture condenses and is collected; the air is also compressed to improve efficiency; power comes from solar energy so the unit can run independently."],
    ["Plan", "Research ANSYS CFD and heat-exchanger modelling, solar energy, air-compression ratios, condensation factors, rechargeable power cells for night operation, coolant pumps and existing technologies."],
    ["Two versions", "One with filtration for human consumption, one without for agriculture and cleaning."]] },

{ slug: "ebike-kit", tag: "Sustainability \u00b7 Project management", title: "DIY Electric Bike Conversion Kit",
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
const CERTS_SECTION = { title: "Certifications",
  sub: "These certificates are pixelated for privacy reasons. The full documents can be requested through NØLL, or by clicking a document and pressing Request.",
  note: "Click any certificate to view it, then press \u201cRequest Unredacted Copy\u201d to choose the documents you need and leave your email. Your request goes straight to Joshua." };
const CERTS = [["degree", "BEng (Hons) Mechanical Engineering"], ["transcript", "UWE Transcript"], ["alevels", "Cambridge A-Levels"], ["ielts", "UKVI IELTS"],
  ["olevels", "G.C.E. O-Levels"], ["reference", "Recommendation Letter"], ["character", "Character Certificate"]];

/* ===== PORTAL (the Ø icon at the bottom that opens the founder site with a transition) ===== */
window.PORTAL = { url: SITE.OTHER_SITE, label: "ventures", iconColor: "#000000", leave: "black" };   // label = tiny word next to the icon; screen turns black when leaving
