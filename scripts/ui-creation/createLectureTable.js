
// Create a table to display lecture details such as course name, midterm, final, score, letter grade, and result

function createLectureTable(courses) {
    return `
        <table class="lecture-table">
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Midterm</th>
                    <th>Final</th>
                    <th>Score</th>
                    <th>Letter Grade</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                ${courses.map(course => `
                    <tr>
                        <td>${course.courseName}</td>
                        <td>${course.midterm}</td>
                        <td>${course.final}</td>
                        <td>${course.score}</td>
                        <td>${course.letterGrade}</td>
                        <td>${course.status}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}


export default createLectureTable;