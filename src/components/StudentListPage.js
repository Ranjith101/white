import React, { useEffect, useState, useRef } from 'react';
import { dummyData } from '../utils/data';
import '../styles/s_page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StudentTable from './StudentTable';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    course: '',
    acceptanceOfTerms: false,
    status: false,
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const studentsPerPage = 4;

  const formRef = useRef(null);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }else{
      setStudents(dummyData)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    if (selectedStudent) {
      setFormData(selectedStudent);
      // formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [students, selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: fieldValue }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = { id: Date.now(), ...formData };
    setStudents([...students, newStudent]);
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      course: '',
      acceptanceOfTerms: false,
      status: false,
    });
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };


  const handleUpdateStudent = (e) => {
    e.preventDefault();

    const updatedStudent = { ...selectedStudent, ...formData };
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? updatedStudent : student
    );

    setStudents(updatedStudents);
    setSelectedStudent(null);
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      course: '',
      acceptanceOfTerms: false,
      status: false,
    });
    setShowUpdateForm(false);
  };

  const handleShowUpdateForm = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setShowUpdateForm(true);
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterStatus = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortStudents = (students) => {
    if (sortField) {
      const sortedStudents = [...students].sort((a, b) => {
        const fieldValueA = a[sortField];
        const fieldValueB = b[sortField];

        if (fieldValueA < fieldValueB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldValueA > fieldValueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      return sortedStudents;
    }

    return students;
  };

  const filteredStudents = sortStudents(
    students.filter((student) => {
      const { name, email, mobileNumber, status } = student;
      const searchRegex = new RegExp(searchText, 'i');
      return (
        (searchRegex.test(name) ||
          searchRegex.test(email) ||
          searchRegex.test(mobileNumber)) &&
        (filterStatus === 'All' ||
          (filterStatus === 'Active' && status === true) ||
          (filterStatus === 'Inactive' && status === false))
      );
    })
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Student List</h2>

      <div className="row mb-3">
        <div className="col-md-6 col-6">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or mobile number"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="col-md-6 col-6">
          <div className="input-group">
            <label className="input-group-text" htmlFor="filterStatus">
              Filter by Status:
            </label>
            <select
              id="filterStatus"
              className="form-select"
              value={filterStatus}
              onChange={handleFilterStatus}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <StudentTable
          students={currentStudents}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSort={handleSort}
          handleDeleteStudent={handleDeleteStudent}
          handleUpdateStudent={handleShowUpdateForm}
        />
      </div>

      <nav>
        <ul className="pagination">
          {Array(Math.ceil(filteredStudents.length / studentsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      <h2>{selectedStudent ? 'Update Student' : 'Add Student'}</h2>
                 <form  ref={formRef} onSubmit={handleAddStudent} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div>
            <label className="form-check-label">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
                className="form-check-input"
                required
              />
              Male
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
                className="form-check-input"
                required
              />
              Female
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Select Course</option>
            <option value="BE">BE</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="acceptanceOfTerms"
            checked={formData.acceptanceOfTerms}
            onChange={handleInputChange}
            className="form-check-input"
            required
          />
          <label className="form-check-label" htmlFor="acceptanceOfTerms">
            Acceptance of Terms
          </label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleInputChange}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="status">
            Status
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedStudent ? 'Update Student' : 'Add Student'}
        </button>
      </form>
      {showUpdateForm && (
  <div className="update-form-popup">
    <h2>Update Student</h2>
    <form onSubmit={handleUpdateStudent}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mobileNumber" className="form-label">
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <div>
          <label className="form-check-label">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleInputChange}
              className="form-check-input"
              required
            />
            Male
          </label>
          <label className="form-check-label">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleInputChange}
              className="form-check-input"
              required
            />
            Female
          </label>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="dateOfBirth" className="form-label">
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="course" className="form-label">
          Course
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
          className="form-control"
          required
        >
          <option value="">Select Course</option>
          <option value="BE">BE</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          name="acceptanceOfTerms"
          checked={formData.acceptanceOfTerms}
          onChange={handleInputChange}
          className="form-check-input"
          required
        />
        <label className="form-check-label" htmlFor="acceptanceOfTerms">
          Acceptance of Terms
        </label>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleInputChange}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="status">
          Status
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Update Student
      </button>
    </form>
  </div>
)}

    </div>
  );
};

export default StudentListPage;
