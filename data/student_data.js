const students = [
  {
    id: "100001",
    firstName: "Ahmet",
    lastName: "Tokmakçı",
    courses: [
      {
        courseCode: "CENG3507",
        courseName: "Web Development and Programming",
        credit:5,
        midterm: 50,// 50*40 /100 = 20
        final: 50, // 50 *60  /100 = 30
        score: 50,
        letterGrade: "F",
        status: "Fail",
      },
      {
        courseCode: "CENG3526",
        courseName: "Natural Language Processing",
        credit:6,
        midterm: 80, // 80*4 /100 = 32
        final: 100,  // 100*6 /100 = 60
        score: 92,
        letterGrade: "A",
        status: "Pass",
      },
    ],
    GPA: 2.18, 
  },
  {
    id: "100002",
    firstName: "Bob",
    lastName: "Smith",
    courses: [
      {
        courseCode: "CENG3507",
        courseName: "Web Development and Programming",
        credit:5,
        midterm: 50,// 50*40 /100 = 20
        final: 40,  // 40*60 /100 = 24
        score: 44,
        letterGrade: "F",
        status: "Fail",
      },
      {
        courseCode: "CENG3511",
        courseName: "Artificial Intelligence",
        credit:6,
        midterm: 100, //40
        final: 70, // 42
        score: 82,
        letterGrade: "C",
        status: "Pass",
      },
    ],
    GPA: 1.09,
  },
  {
    id: "100003",
    firstName: "Yakup",
    lastName: "Zengin",
    courses: [
      {
        courseCode: "CENG3522",
        courseName: "Applied Machine Learning",
        credit:6,
        midterm: 85,// 85*40 /100 = 34
        final: 95,  // 95*60 /100 = 57
        score: 91,
        letterGrade: "A",
        status: "Pass",
      }
    ],
    GPA: 4,
  },
  {
    id: "100004",
    firstName: "Cedi",
    lastName: "Osman",
    courses: [
    ],
    GPA: 0,
  },

];

export default students;
