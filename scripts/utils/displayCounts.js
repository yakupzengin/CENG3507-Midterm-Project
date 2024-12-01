import students from "../../data/student_data.js";
import courses from "../../data/course_data.js";

// Wait until the document content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  

  // Update the displayed student and course count
  const totalStudentsElement = document.querySelector(".total-students");
  const totalCoursesElement = document.querySelector(".total-courses");

  totalStudentsElement.textContent = students.length;
  totalCoursesElement.textContent = courses.length;

});
