import courses from "../../data/course_data.js";

// Function to show the course list
function populateCoursesList() {
    const coursesTableBody = document.getElementById("coursesTableBody");
    coursesTableBody.innerHTML = "";

    
    // Iterate through all courses and create table rows for each
    courses.forEach((course, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.courseCode}</td>
            <td>${course.courseName}</td>
            <td>${course.instructor}</td>
            <td>${course.credit}</td>
            <td>${course.scale}</td>
            <td>
                <button class="course-edit-btn" data-index="${course.courseCode}">Edit</button>
                <button class="course-delete-btn" data-index="${course.courseCode}">Delete</button>
            </td>

        `;
        
        coursesTableBody.appendChild(row);
    });
}

export default populateCoursesList;