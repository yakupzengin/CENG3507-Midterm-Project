import courses from "../../data/course_data.js";
import calculateGradeAndStatus from "../grade-calculation/calculateGradeAndStatus.js";
import calculateGPA from "../grade-calculation/calculateGPA.js";
import handleCourseSelection from "../course-management/handleCourseSelection.js";

function updateStudentGPAAndGrades(student, updatedCourse) {

    // Debugging: Check student and updated course data first
    console.log("Student data: ", student);
    console.log("Updated course: ", updatedCourse);

    // Check the array of target courses
    console.log("All courses before processing: ", courses);

    if (!courses || !Array.isArray(courses)) {
        console.error("Courses array is not defined or not an array");
        return;
    }

    if (!student || !student.courses || !Array.isArray(student.courses)) {
        console.error("Student's courses data is missing or not an array");
        return;
    }

    student.courses.forEach(course => {
        // Check for the updated course
        console.log(`Checking course: ${course.courseCode}`);
        
        if (course.courseCode === updatedCourse.courseCode) {
            console.log("Updating course with new scale:", updatedCourse.scale);

            const { score, letterGrade, status } = calculateGradeAndStatus(
                course.midterm ? course.midterm : 0,
                course.final ? course.final : 0,
                updatedCourse.scale
            );
            
            course.score = score;
            course.letterGrade = letterGrade;
            course.status = status;

            console.log(`Updated course data for ${course.courseName}:`, course);
            
            const existCourse = courses.find(c => c.courseCode === course.courseCode);
            if (existCourse) {
                const studentIndex = existCourse.students.findIndex(s => s.studentId === student.id);
                if (studentIndex !== -1) {
                    existCourse.students[studentIndex].midterm = course.midterm;
                    existCourse.students[studentIndex].final = course.final;
                    existCourse.students[studentIndex].score = score;
                    existCourse.students[studentIndex].letterGrade = letterGrade;
                    existCourse.students[studentIndex].status = status;
                    console.log(`Updated ${student.firstName} ${student.lastName}'s data in course ${existCourse.courseName}`);
                }
            }
        } else {
            console.log(`No update needed for course: ${course.courseName}`);
        }
    });

    // Calculate and update the student's GPA
    student.GPA = calculateGPA(student);
    handleCourseSelection(); // Update the course selection screen
    alert(`${student.firstName} ${student.lastName}'s GPA and course grades have been updated.`);
}





export { updateStudentGPAAndGrades };
