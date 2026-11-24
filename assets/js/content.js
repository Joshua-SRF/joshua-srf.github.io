/* ===================== === MASTER CONFIGURATION === =====================
   Every link, file path and piece of visible copy for Site A lives in this file. */
const SITE = {
  NAME: "Joshua Fernando",
  EMAIL: "joshua.f1915@gmail.com",
  LINKEDIN: "https://www.linkedin.com/in/joshua-sr-f",
  BANNER_IMAGE: "assets/img/banner.jpg",              // put your banner here (file missing = blueprint fallback shows)
  DOWNLOADS: {                                         // files live in assets/docs/
    cv:    "assets/docs/Joshua-Fernando-CV.pdf",
    ats:   "assets/docs/Joshua-Fernando-ATS-CV.pdf",
    cover: "assets/docs/Joshua-Fernando-Cover-Letter.pdf"
  },
  WATERMARK: "VIEW ONLY \u00b7 JOSHUA FERNANDO"           // diagonal text over certificates
};

/* ---- COPY (EDIT ME): hero text ---- */
const HERO = {
  kicker: "Mechanical Engineer \u00b7 BEng (Hons) 2:1 \u00b7 IMechE-accredited",
  title: "Engineering that survives<br>the calculation.",
  bio: "UWE Bristol graduate (Nov 2025) with a first-in-cohort result in Engineering Mathematics (98%) and hands-on work across CAD, FEA, CFD, CNC and control systems. I design, simulate, then stress-test until the numbers hold."
};

/* ---- COPY (EDIT ME): numbers strip under the hero (all taken from your CV) ---- */
const STATS = [["98%", "Engineering Mathematics \u2014 1st in cohort"], ["2:1", "BEng (Hons) Mechanical, UWE"], ["8.0", "UKVI IELTS"], ["\u00a32,000", "Merit scholarship"]];

/* ---- COPY (EDIT ME): project cards + deep-dive pages. Each slug becomes /slug/ ---- */
const PROJECTS = [
  { slug: "gearbox", img: "assets/img/gearbox.jpg", tag: "Machine design \u00b7 FEA", title: "Spur Gearbox Design & Analysis",
    blurb: "2.2 kW reduction gearbox for a Honda GX100: 1500 \u2192 300 rpm, hand-calculated then verified in SolidWorks Simulation.",
    stats: [["5:1", "gear ratio (30 / 150 mm)"], ["14 \u2192 70 Nm", "input / output torque"], ["17 / 22 mm", "shaft diameters"], ["95%", "design reliability target"]],
    sections: [
      ["Brief", "Reduce 2200 W at 1500 rpm to 300 rpm inside a 300 \u00d7 200 \u00d7 300 mm envelope, with a 95% reliability target, 8-year life, 6 h/day duty and a 50 \u00b0C ceiling."],
      ["Design process", "Three concepts (a redundant 6-gear layout, a 4-gear linear train and a 4-gear/3-shaft compound) were rejected on cost, weight and unbalanced shaft loading. The final two-gear, two-shaft design won on simplicity."],
      ["Analysis", "Lewis bending stress with a velocity factor gave gear factor of safety; tangential force is 933.7 N. Shafts were sized with the ASME equation (FoS 2 and 3), then checked for deflection, slope and critical speed. SKF 6202-2RS1 and 16004 bearings were selected for 95% reliability."],
      ["Materials & simulation", "High-carbon steel gears and shafts, aluminium housing for mass and heat rejection. SolidWorks study on AISI 1020 gears with bonded and contact interactions."]
    ] },
  { slug: "green-hydrogen", img: "assets/img/hydrogen.jpg", tag: "Dissertation \u00b7 MATLAB \u00b7 ANSYS", title: "Solar-Powered Green Hydrogen",
    blurb: "Compared AWE and PEM electrolysis on solar power and modelled a 3D-printed gyroid electrode.",
    stats: [["3\u00d7+", "gyroid vs typical electrode output"], ["25%", "best PV conversion studied"], ["65%", "fuel-cell recovery"], ["55%", "combustion recovery"]],
    sections: [
      ["Question", "Which route turns sunlight into usable energy most efficiently: solar \u2192 electrolysis \u2192 hydrogen \u2192 recovery?"],
      ["Method", "Thermodynamic models in MATLAB, FEA and geometry work in ANSYS and SolidWorks, and a literature-grounded comparison of AWE and PEM electrolysers on PV supply."],
      ["Findings", "PEM electrolysis with combustion recovery was the best path in the study. A gyroid AWE electrode, with its much higher surface area, matched PEM-like production rates and beat conventional nickel electrodes."],
      ["Honest limits", "Marked feedback asked for sharper discussion of results and clearer future work; efficiency headline figures are theoretical, not measured."]
    ] },
  { slug: "robotic-chess", img: "assets/img/robotic-chess.jpg", tag: "Robotics \u00b7 Vision \u00b7 Python", title: "Vision-Guided Robotic Chess",
    blurb: "A low-cost Lynxmotion AL5D arm and one camera that reads a physical board, asks an engine for a reply and plays it.",
    stats: [["327 mm", "effective planar reach"], ["1,152", "poses planned, 0 failures"], ["9.6 s / 17.8 s", "modelled quiet / capture move"], ["~2,100", "lines of Python, 11 modules"]],
    sections: [
      ["Challenge", "Engines are solved; lifting a 25 mm pawn from a crowded board is not. The project isolates perception and manipulation."],
      ["Approach", "Camera + ArUco homography, a luminance and edge-energy occupancy score, legality-constrained change matching (handles castling, en passant, promotion), UCI engine interface and closed-form inverse kinematics."],
      ["Result", "Best geometry found: a 240 mm board at 100 mm stand-off covers all 64 squares. Change matching beat per-frame classification for continuous play."],
      ["Status", "Photographic validation and full-game reliability testing are stated in the report as next-phase work."]
    ] },
  { slug: "threaded-bung", img: "assets/img/threaded-bung.jpg", tag: "CNC \u00b7 Manufacturing", title: "CNC Programming: Threaded Bung",
    blurb: "Production plan for 5,000 EN1A steel pipe bungs on a CNC lathe, with G-code and a method for a 52 mm hex.",
    stats: [["5,000", "parts planned"], ["\u00b10.01 mm", "target tolerance"], ["70 mm", "EN1A bar stock"], ["ISO 965 / 2768", "thread & tolerance standards"]],
    sections: [
      ["Brief", "Machine a threaded bung with symmetrical chamfers and a 5 mm full radius in volume."],
      ["Process plan", "Turret tooling, bar feeder and hydraulic chuck, AC servo and ball-screw drives, chip and coolant handling, plus CAD/CAM post-processing."],
      ["Programming", "Annotated G-code with tool table (rough, finish, thread, groove, part-off) and live-tooling proposal for the shoulder hexagon."],
      ["Standards", "ISO 12100, EN ISO 23125, BS 970 230M07, ISO 9001 and PUWER considerations."]
    ] },
  { slug: "tensile-tester", img: "", tag: "Systems design \u00b7 Machine design", title: "Tensile Testing Machine Design",
    blurb: "100 kN twin power-screw tester for aluminium sand castings, chosen from four concepts.",
    stats: [["100 kN", "max force"], ["< 800 kg", "total mass"], ["< \u00a37,500", "standard components"], ["103:1", "selected gearbox ratio"]],
    sections: [
      ["Spec", "Self-locking screw drive, 0.05\u2013175 mm/min, 1300 mm test space, 575 mm between columns, 15-year life, 10\u201390% humidity."],
      ["Concepts", "Concepts A\u2013D compared on sustainability, cost, size and reliability. Concept D (twin power screw with central gearbox) balances load."],
      ["Embodiment", "Components chosen to meet the force, speed and cost targets, with manufacturability and UK safety standards in mind."]
    ] }
];

/* ---- CERTIFICATES (EDIT ME): id must match NOLL_CONFIG.CERTS and assets/certs/<id>.jpg ---- */
const CERTS = [["degree", "BEng (Hons) Mechanical Engineering"], ["transcript", "UWE Transcript"], ["alevels", "Cambridge A-Levels"], ["ielts", "UKVI IELTS"],
  ["olevels", "G.C.E. O-Levels"], ["reference", "Recommendation Letter"], ["character", "Character Certificate"]];
