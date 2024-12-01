import students from "../../data/student_data.js";

function populateStudentsList() {
    const studentsTableBody = document.getElementById("studentsTableBody");
    studentsTableBody.innerHTML = ""; // Clear existing table rows

    // Iterate through the students array and create a row for each student
    students.forEach((student, index) => {
        const row = document.createElement("tr");

        // Set the row's inner HTML to include student details and action buttons
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.GPA}</td>
            <td>
                <button class="edit-btn" data-index="${student.id}">Edit</button>
                <button class="delete-btn" data-index="${student.id}">Delete</button>
                <button class="more-info-btn" data-index="${index}">More Information</button>
            </td>
        `;
        
        // Append the newly created row to the table body
        studentsTableBody.appendChild(row);
    });
}

export default populateStudentsList;
