import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { useIntern } from "../../Context/InternContext";

function ShowData() {
  const { user } = useAuth();
  const { interns, setInterns } = useIntern();
  useEffect(() => {
    const fetchData = () => {
      if (user) {
        try {
          // Reference to the user's internships node
          const internshipsRef = ref(db, `students/${user.uid}/internships`);

          // Fetch data from the internships node
          onValue(
            internshipsRef,
            (snapshot) => {
              const data = snapshot.val();
              if (data) {
                // Convert the data into an array of internships
                const internshipsList = Object.keys(data).map((key) => ({
                  id: key,
                  ...data[key],
                }));

                console.log(internshipsList);
                setInterns(internshipsList);
              } else {
                // Handle the case when there is no data
                setInterns([]);
              }
            },
            {
              onlyOnce: true, // Fetch data only once
            }
          );
        } catch (err) {
          console.error("Error fetching internships: ", err);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div className="m-4 mt-4 h-[85%] border rounded-lg p-10 bg-white overflow-scroll overflow-x-hidden">
      <div className=" border-2 border-gray-200 rounded-lg mt-4 p-2">
        Hellow
      </div>
      <div className=" border-2 border-gray-200 rounded-lg mt-4 p-2">
        Hellow
      </div>
      {user && interns?.length > 0 ? (
        interns.map((intern) => (
          <div
            key={intern.id}
            className="border-2 border-gray-200 rounded-lg mt-4 p-2"
          >
            <h2 className="text-xl font-semibold">{intern.designation}</h2>
            <p>
              <strong>Organisation:</strong> {intern.organisation}
            </p>
            <p>
              <strong>Internship Type:</strong> {intern.internshipType}
            </p>
            <p>
              <strong>From:</strong> {intern.fromDate}
            </p>
            <p>
              <strong>To:</strong> {intern.toDate}
            </p>
            <p>
              <strong>Industry Sector:</strong> {intern.industrySector}
            </p>
            <p>
              <strong>Company:</strong> {intern.company}
            </p>
            <p>
              <strong>Phone:</strong> {intern.phone}
            </p>
          </div>
        ))
      ) : (
        <p>No internships found.</p>
      )}
    </div>
  );
}

export default ShowData;
