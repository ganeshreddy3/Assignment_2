import React from 'react';
import './StudentForm.css';

const StudentForm = ({
  form,
  editingStudentId,
  handleChange,
  handleSubmit,
  handleCancelEdit,
  loading
}) => {
  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingStudentId ? 'Edit Student' : 'Add New Student'}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="enquiry-form"
      >
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            id="studentId"
            type="text"
            name="studentId"
            placeholder="160123733304"
            value={form.studentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            type="text"
            name="department"
            placeholder="CSE, ECE, IT, etc."
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="enrollmentYear">Enrollment Year</label>
          <input
            id="enrollmentYear"
            type="number"
            name="enrollmentYear"
            placeholder="2024"
            value={form.enrollmentYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="isActive">Active Status</label>
          <input
            id="isActive"
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              editingStudentId ? 'Update Student' : 'Add Student'
            )}
          </button>

          {editingStudentId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
