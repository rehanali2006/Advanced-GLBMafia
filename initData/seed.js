const resources = [

  // ================= FIRST YEAR =================

  {
    type: "Notes",
    year: 1,
    branch: "CSE",
    section: "A",
    subject: "Mathematics I",
    unit: 1,
    views: 120,
    file: "maths1_notes_u1.pdf"
  },
  {
    type: "Assignment",
    year: 1,
    branch: "CSE",
    section: "A",
    subject: "Mathematics II",
    unit: 2,
    views: 95,
    file: "maths2_assignment_u2.pdf"
  },
  {
    type: "PYQ",
    year: 1,
    branch: "IT",
    section: "B",
    subject: "Physics",
    unit: 3,
    views: 140,
    file: "physics_pyq_u3.pdf"
  },
  {
    type: "Lab Manual",
    year: 1,
    branch: "ECE",
    section: "A",
    subject: "Chemistry",
    unit: 1,
    views: 70,
    file: "chem_lab_u1.pdf"
  },
  {
    type: "Notes",
    year: 1,
    branch: "AI-ML",
    section: "C",
    subject: "Programming for Problem Solving",
    unit: 4,
    views: 200,
    file: "pps_notes_u4.pdf"
  },
  {
    type: "Syllabus",
    year: 1,
    branch: "EEE",
    section: "B",
    subject: "Electrical Engineering",
    unit: 1,
    views: 90,
    file: "ee_syllabus.pdf"
  },
  {
    type: "Assignment",
    year: 1,
    branch: "ME",
    section: "A",
    subject: "Engineering Mechanics",
    unit: 5,
    views: 110,
    file: "mechanics_assignment_u5.pdf"
  },
  {
    type: "Lab Manual",
    year: 1,
    branch: "CSE",
    section: "C",
    subject: "Basic Electronics",
    unit: 2,
    views: 130,
    file: "electronics_lab_u2.pdf"
  },
  {
    type: "PYQ",
    year: 1,
    branch: "IT",
    section: "A",
    subject: "Environmental Science",
    unit: 3,
    views: 65,
    file: "evs_pyq_u3.pdf"
  },
  {
    type: "Notes",
    year: 1,
    branch: "ECE",
    section: "B",
    subject: "Workshop / Graphics",
    unit: 1,
    views: 150,
    file: "graphics_notes_u1.pdf"
  },

  // ================= SECOND YEAR =================

  {
    type: "Notes",
    year: 2,
    branch: "CSE",
    section: "A",
    subject: "Data Structures",
    unit: 1,
    views: 300,
    file: "ds_notes_u1.pdf"
  },
  {
    type: "PYQ",
    year: 2,
    branch: "IT",
    section: "B",
    subject: "Computer Organization",
    unit: 2,
    views: 180,
    file: "co_pyq_u2.pdf"
  },
  {
    type: "Assignment",
    year: 2,
    branch: "CS-AI",
    section: "A",
    subject: "Discrete Mathematics",
    unit: 4,
    views: 250,
    file: "dm_assignment_u4.pdf"
  },
  {
    type: "Lab Manual",
    year: 2,
    branch: "AI-DS",
    section: "C",
    subject: "OOPs",
    unit: 1,
    views: 160,
    file: "oops_lab_u1.pdf"
  },
  {
    type: "Notes",
    year: 2,
    branch: "ECE",
    section: "A",
    subject: "Digital Logic",
    unit: 5,
    views: 210,
    file: "dl_notes_u5.pdf"
  },
  {
    type: "Assignment",
    year: 2,
    branch: "CSE",
    section: "B",
    subject: "DBMS",
    unit: 3,
    views: 280,
    file: "dbms_assignment_u3.pdf"
  },
  {
    type: "PYQ",
    year: 2,
    branch: "IT",
    section: "A",
    subject: "Operating Systems",
    unit: 2,
    views: 320,
    file: "os_pyq_u2.pdf"
  },
  {
    type: "Notes",
    year: 2,
    branch: "CS-H",
    section: "C",
    subject: "Theory of Computation",
    unit: 1,
    views: 175,
    file: "toc_notes_u1.pdf"
  },
  {
    type: "Lab Manual",
    year: 2,
    branch: "AI-ML",
    section: "A",
    subject: "Software Engineering",
    unit: 4,
    views: 205,
    file: "se_lab_u4.pdf"
  },
  {
    type: "Syllabus",
    year: 2,
    branch: "ECE",
    section: "B",
    subject: "Web Technology",
    unit: 1,
    views: 190,
    file: "wt_syllabus.pdf"
  },

  // ================= THIRD YEAR =================

  {
    type: "Notes",
    year: 3,
    branch: "CSE",
    section: "A",
    subject: "Computer Networks",
    unit: 1,
    views: 450,
    file: "cn_notes_u1.pdf"
  },
  {
    type: "PYQ",
    year: 3,
    branch: "AI-ML",
    section: "B",
    subject: "Compiler Design",
    unit: 2,
    views: 280,
    file: "cd_pyq_u2.pdf"
  },
  {
    type: "Notes",
    year: 3,
    branch: "CS-AI",
    section: "A",
    subject: "Machine Learning",
    unit: 3,
    views: 620,
    file: "ml_notes_u3.pdf"
  },
  {
    type: "Assignment",
    year: 3,
    branch: "AI-DS",
    section: "C",
    subject: "Artificial Intelligence",
    unit: 4,
    views: 510,
    file: "ai_assignment_u4.pdf"
  },
  {
    type: "Lab Manual",
    year: 3,
    branch: "IT",
    section: "A",
    subject: "Data Mining",
    unit: 2,
    views: 240,
    file: "dm_lab_u2.pdf"
  },
  {
    type: "Notes",
    year: 3,
    branch: "CS-DS",
    section: "B",
    subject: "Cloud Computing",
    unit: 5,
    views: 350,
    file: "cloud_notes_u5.pdf"
  },
  {
    type: "PYQ",
    year: 3,
    branch: "ECE",
    section: "C",
    subject: "Big Data",
    unit: 1,
    views: 190,
    file: "bigdata_pyq_u1.pdf"
  },
  {
    type: "Assignment",
    year: 3,
    branch: "CSE",
    section: "A",
    subject: "Cyber Security",
    unit: 3,
    views: 400,
    file: "cyber_assignment_u3.pdf"
  },
  {
    type: "Lab Manual",
    year: 3,
    branch: "IT",
    section: "B",
    subject: "Mobile Computing",
    unit: 4,
    views: 210,
    file: "mobile_lab_u4.pdf"
  },
  {
    type: "Notes",
    year: 3,
    branch: "AI-ML",
    section: "A",
    subject: "Distributed Systems",
    unit: 2,
    views: 300,
    file: "ds_notes_u2.pdf"
  },

  // ================= FOURTH YEAR =================

  {
    type: "Notes",
    year: 4,
    branch: "CSE",
    section: "A",
    subject: "Blockchain",
    unit: 1,
    views: 500,
    file: "blockchain_notes_u1.pdf"
  },
  {
    type: "Assignment",
    year: 4,
    branch: "AI-ML",
    section: "B",
    subject: "IoT",
    unit: 2,
    views: 260,
    file: "iot_assignment_u2.pdf"
  },
  {
    type: "PYQ",
    year: 4,
    branch: "CS-AI",
    section: "A",
    subject: "Deep Learning",
    unit: 4,
    views: 480,
    file: "dl_pyq_u4.pdf"
  },
  {
    type: "Lab Manual",
    year: 4,
    branch: "IT",
    section: "C",
    subject: "Project Phase 1",
    unit: 1,
    views: 120,
    file: "project1_lab_u1.pdf"
  },
  {
    type: "Notes",
    year: 4,
    branch: "ECE",
    section: "A",
    subject: "Elective I",
    unit: 3,
    views: 180,
    file: "elective1_notes_u3.pdf"
  },
  {
    type: "Assignment",
    year: 4,
    branch: "CSE",
    section: "B",
    subject: "Project Phase 2",
    unit: 5,
    views: 210,
    file: "project2_assignment_u5.pdf"
  },
  {
    type: "Syllabus",
    year: 4,
    branch: "AI-DS",
    section: "A",
    subject: "Internship",
    unit: 1,
    views: 90,
    file: "internship_syllabus.pdf"
  },
  {
    type: "PYQ",
    year: 4,
    branch: "CS-H",
    section: "C",
    subject: "Elective II",
    unit: 2,
    views: 150,
    file: "elective2_pyq_u2.pdf"
  },
  {
    type: "Notes",
    year: 4,
    branch: "ECE",
    section: "B",
    subject: "Seminar",
    unit: 4,
    views: 110,
    file: "seminar_notes_u4.pdf"
  },
  {
    type: "Lab Manual",
    year: 4,
    branch: "IT",
    section: "A",
    subject: "Industry Training",
    unit: 1,
    views: 130,
    file: "training_lab_u1.pdf"
  }

];

for(resource of resources){
  resource.owner="6a15f58857a39580349a32ea";
}

module.exports = resources;