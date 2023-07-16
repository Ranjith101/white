import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const StudentTableRow = ({ student, handleDeleteStudent, handleUpdateStudent }) => {
    const { id, name, email, mobileNumber, gender, dateOfBirth, address, course, acceptanceOfTerms, status } = student;
  
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{mobileNumber}</td>
        <td>{gender}</td>
        <td>{dateOfBirth}</td>
        <td>{address}</td>
        <td>{course}</td>
        <td>{acceptanceOfTerms ? 'Accepted' : 'Not Accepted'}</td>
        <td>
          <span className={`status ${status ? 'active' : 'inactive'}`}>
            {status ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td>
          <button onClick={() => handleDeleteStudent(id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button onClick={() => handleUpdateStudent(student)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </td>
      </tr>
    );
  };
  export default StudentTableRow;