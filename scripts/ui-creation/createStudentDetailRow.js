import createStudentDetails from "./createStudentDetails.js"
import createLectureTable from "./createLectureTable.js"

// Create a detailed row for a student, including personal information and attended lectures

function createStudentDetailRow(student) {
    const detailRow = document.createElement("tr");
    detailRow.id = `student-details-${student.id}`;
    detailRow.innerHTML = `
        <td colspan="5">
            <table class="detail-table">
                <thead>
                    <tr>
                        <th>Detail</th>
                        <th>Information</th>
                    </tr>
                </thead>
                <tbody>
                    ${createStudentDetails(student)}
                    <tr>
                        <td>Attended Lectures:</td>
                        <td>
                            ${createLectureTable(student.courses)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    `;
    return detailRow; // Return the generated row with student details
}


export default createStudentDetailRow;