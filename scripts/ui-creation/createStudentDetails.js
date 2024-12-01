

// Create student details for display

function createStudentDetails(student) {
    return `
        <tr><td>Name:</td><td>${student.firstName} ${student.lastName}</td></tr>  <!-- Display student's full name -->
        <tr><td>Student ID:</td><td>${student.id}</td></tr>  <!-- Display student's ID -->
        <tr><td>GPA:</td><td>${student.GPA}</td></tr>  <!-- Display student's GPA -->
    `;
}

export default createStudentDetails;
