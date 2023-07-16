import React from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = React.useState({
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(formData);
    resetForm();
  };

  const resetForm = () => {
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

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
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
        <label htmlFor="email" className="form-label">Email</label>
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
        <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
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
        <label htmlFor="gender" className="form-label">Gender</label>
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
        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
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
        <label htmlFor="address" className="form-label">Address</label>
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
        <label htmlFor="course" className="form-label">Course</label>
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
      <button type="submit" className="btn btn-primary">Add Student</button>
    </form>
  );
};

export default StudentForm;
