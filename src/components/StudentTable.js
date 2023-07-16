import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import StudentTableRow from './StudentTableRow';

const StudentTable = ({ students, sortField, sortOrder, handleSort, handleDeleteStudent, handleUpdateStudent }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>
            <button
              className={`btn btn-link ${sortField === 'name' ? 'active' : ''}`}
              onClick={() => handleSort('name')}
            >
              Name
              {sortField === 'name' && (
                <FontAwesomeIcon
                  icon={faSort}
                  className={`ml-1 ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                />
              )}
            </button>
          </th>
          <th>
            <button
              className={`btn btn-link ${sortField === 'email' ? 'active' : ''}`}
              onClick={() => handleSort('email')}
            >
              Email
              {sortField === 'email' && (
                <FontAwesomeIcon
                  icon={faSort}
                  className={`ml-1 ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                />
              )}
            </button>
          </th>
          <th>
            <button
              className={`btn btn-link ${sortField === 'mobileNumber' ? 'active' : ''}`}
              onClick={() => handleSort('mobileNumber')}
            >
              Mobile Number
              {sortField === 'mobileNumber' && (
                <FontAwesomeIcon
                  icon={faSort}
                  className={`ml-1 ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                />
              )}
            </button>
          </th>
          <th>Gender</th>
          <th>DOB</th>
          <th>Address</th>
          <th>Course</th>
          <th>Terms</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentTableRow
            key={student.id}
            student={student}
            handleDeleteStudent={handleDeleteStudent}
            handleUpdateStudent={handleUpdateStudent}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
