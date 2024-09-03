import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase"; // Import your Firebase configuration

function ShowAllInternships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchAllInternships = () => {
      // Reference to the students node
      const studentsRef = ref(db, 'students');
      
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Prepare a list to hold all internships
          const allInternships = [];

          // Iterate through each student's data
          for (const userId in data) {
            const userInternships = data[userId].internships;
            if (userInternships) {
              for (const internshipId in userInternships) {
                allInternships.push({
                  userId,
                  internshipId,
                  ...userInternships[internshipId],
                });
              }
            }
          }

          setInternships(allInternships);
        } else {
          // Handle the case when there is no data
          setInternships([]);
        }
      });
    };

    fetchAllInternships();
  }, []);

  return (
    <div>
      <h1>All Student Internships</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Internship ID</th>
            <th>Designation</th>
            <th>Organisation</th>
            <th>Internship Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Industry</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {internships.map((internship) => (
            <tr key={internship.internshipId}>
              <td>{internship.userId}</td>
              <td>{internship.internshipId}</td>
              <td>{internship.designation}</td>
              <td>{internship.organisation}</td>
              <td>{internship.internshipType}</td>
              <td>{internship.fromDate}</td>
              <td>{internship.toDate}</td>
              <td>{internship.industry}</td>
              <td>{internship.phone}</td>
              <td>{internship.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAllInternships;
