import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

   
  const fetchStudents = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 3) return setStudents([]);

      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/data?search=${searchQuery}`);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchStudents(query.trim().toLowerCase());
  }, [query, fetchStudents]);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Student Search</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Search for a student..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

       
      {loading && <p className="text-muted">Loading...</p>}

      
      {students.length > 0 && !loading && (
        <ul className="list-group mt-2">
          {students.map((s) => (
            <li
              key={s.rollNumber}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => setSelectedStudent(s)}
              style={{ cursor: "pointer" }}
            >
              {s.name}
              <span className="badge bg-primary">{s.rollNumber}</span>
            </li>
          ))}
        </ul>
      )}

       
      {selectedStudent && (
        <div className="card mt-3 p-3">
          <h3>{selectedStudent.name}</h3>
          <p><strong>Class:</strong> {selectedStudent.class}</p>
          <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
