// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
// import './App.css';
// import StudentForm from './component/StudentForm.jsx';

// // Navbar Component
// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="app-title">Student Management</div>
//       <ul className="nav-menu">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/add">Add Student</Link></li>
//         <li><Link to="/manage">Manage details</Link></li>
//       </ul>
//     </nav>
//   );
// };

// // Home Page - List of All Students
// const Home = ({ students }) => {
//   if (!students) return <div className="loading">Loading...</div>;

//   return (
//     <div className="container">
//       <h1>All Students</h1>
//       <div className="student-list">
//         {students.length === 0 ? (
//           <p>No students found</p>
//         ) : (
//           students.map(student => (
//             <div className="student-item" key={student._id || student.studentId}>
//               <div className="student-details">
//                 <h3>{student.firstName} {student.lastName}</h3>
//                 <p>ID: {student.studentId}</p>
//                 <p>Email: {student.email}</p>
//                 <p>Department: {student.department || 'N/A'}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// // Add Student Page
// const AddStudent = ({ fetchStudents }) => {
//   const [form, setForm] = useState({
//     studentId: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     department: '',
//     enrollmentYear: '',
//     isActive: true,
//     profilePhoto: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     // Validate enrollmentYear is a number
//     const enrollmentYearNum = Number(form.enrollmentYear);
//     if (isNaN(enrollmentYearNum) || enrollmentYearNum <= 0) {
//       setMessage('Enrollment Year must be a valid positive number');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/students', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, enrollmentYear: enrollmentYearNum }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setMessage(errorData.message || 'Failed to add student');
//         setLoading(false);
//         return;
//       }

//       setMessage('Student added successfully');
//       setForm({
//         studentId: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         dob: '',
//         department: '',
//         enrollmentYear: '',
//         isActive: true,
//         profilePhoto: null,
//       });
//       fetchStudents();
//       setLoading(false);
//       setTimeout(() => navigate('/'), 1500);
//     } catch (error) {
//       setMessage('Error adding student: ' + error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Add New Student</h1>
//       {message && <div className="message">{message}</div>}
//       <StudentForm
//         form={form}
//         editingStudentId={null}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//       />
//     </div>
//   );
// };

// // Manage Students Page
// const ManageStudents = ({ students, fetchStudents }) => {
//   const [message, setMessage] = React.useState('');
//   const navigate = useNavigate();

//   const handleDelete = async (studentId) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       try {
// const response = await fetch('http://localhost:5000/api/students/' + studentId, {
//   method: 'DELETE',
// });
//         if (!response.ok) {
//           const errorData = await response.json();
//           setMessage(errorData.message || 'Failed to delete student');
//           return;
//         }
//         setMessage('Student deleted successfully');
//         fetchStudents();
//       } catch (error) {
//         setMessage('Error deleting student: ' + error.message);
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Manage Students</h1>
//       {message && <div className="message">{message}</div>}
//       <table className="student-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Department</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.length === 0 ? (
//             <tr><td colSpan="4">No students found</td></tr>
//           ) : (
//             students.map(student => (
//               <tr key={student._id || student.studentId}>
//                 <td>{student.studentId}</td>
//                 <td>{student.firstName} {student.lastName}</td>
//                 <td>{student.department || 'N/A'}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => navigate(\`/edit/\${student.studentId}\`)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(student._id || student.studentId)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Edit Student Page
// const EditStudent = ({ students, fetchStudents }) => {
//   const { id } = useParams();
//   const [form, setForm] = useState({
//     studentId: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     department: '',
//     enrollmentYear: '',
//     isActive: true,
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const student = students.find(s => s.studentId === id);
//     if (student) {
//       setForm({
//         studentId: student.studentId,
//         firstName: student.firstName,
//         lastName: student.lastName,
//         email: student.email,
//         dob: student.dob ? student.dob.substring(0, 10) : '',
//         department: student.department,
//         enrollmentYear: student.enrollmentYear,
//         isActive: student.isActive,
//       });
//     }
//     setLoading(false);
//   }, [id, students]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');

//     // Validate enrollmentYear is a number
//     const enrollmentYearNum = Number(form.enrollmentYear);
//     if (isNaN(enrollmentYearNum) || enrollmentYearNum <= 0) {
//       setMessage('Enrollment Year must be a valid positive number');
//       setSubmitting(false);
//       return;
//     }

//     try {
// const response = await fetch('http://localhost:5000/api/students/' + id, {
//   method: 'PUT',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ ...form, enrollmentYear: enrollmentYearNum }),
// });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setMessage(errorData.message || 'Failed to update student');
//         setSubmitting(false);
//         return;
//       }

//       setMessage('Student updated successfully');
//       fetchStudents();
//       setSubmitting(false);
//       setTimeout(() => navigate('/manage'), 1500);
//     } catch (error) {
//       setMessage('Error updating student: ' + error.message);
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;

//   return (
//     <div className="container">
//       <h1>Edit Student</h1>
//       {message && <div className="message">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-field">
//           <label>Student ID</label>
//           <input type="text" name="studentId" value={form.studentId} onChange={handleChange} required />
//         </div>

//         <div className="form-row">
//           <div className="form-field">
//             <label>First Name</label>
//             <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
//           </div>
//           <div className="form-field">
//             <label>Last Name</label>
//             <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
//           </div>
//         </div>

//         <div className="form-field">
//           <label>Email</label>
//           <input type="email" name="email" value={form.email} onChange={handleChange} required />
//         </div>

//         <div className="form-row">
//           <div className="form-field">
//             <label>Date of Birth</label>
//             <input type="date" name="dob" value={form.dob} onChange={handleChange} />
//           </div>
//           <div className="form-field">
//             <label>Department</label>
//             <input type="text" name="department" value={form.department} onChange={handleChange} />
//           </div>
//         </div>

//         <div className="form-field">
//           <label>Enrollment Year</label>
//           <input type="text" name="enrollmentYear" value={form.enrollmentYear} onChange={handleChange} />
//         </div>

//         <div className="form-field checkbox">
//           <label>
//             <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active Student
//           </label>
//         </div>

//         <div className="form-actions">
//           <button type="button" className="cancel-btn" onClick={() => navigate('/manage')}>Cancel</button>
//           <button type="submit" disabled={submitting}>{submitting ? 'Updating...' : 'Update Student'}</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [students, setStudents] = useState([]);

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/students');
//       if (!response.ok) {
//         console.error('Failed to fetch students');
//         return;
//       }
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <main>
//           <Routes>
//             <Route path="/" element={<Home students={students} />} />
//             <Route path="/add" element={<AddStudent fetchStudents={fetchStudents} />} />
//             <Route path="/manage" element={<ManageStudents students={students} fetchStudents={fetchStudents} />} />
//             <Route path="/edit/:id" element={<EditStudent students={students} fetchStudents={fetchStudents} />} />
//           </Routes>
//         </main>
//         <footer>
//           <p>Student Management System</p>
//         </footer>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import StudentForm from './component/StudentForm.jsx';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="app-title">Student Management</div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Student</Link></li>
        <li><Link to="/manage">Manage details</Link></li>
      </ul>
    </nav>
  );
};

// Home Page
const Home = ({ students }) => {
  if (!students) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1>All Students</h1>
      <div className="student-list">
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map(student => (
            <div className="student-item" key={student._id || student.studentId}>
              <div className="student-details">
                <h3>{student.firstName} {student.lastName}</h3>
                <p>ID: {student.studentId}</p>
                <p>Email: {student.email}</p>
                <p>Department: {student.department || 'N/A'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Add Student Page
const AddStudent = ({ fetchStudents }) => {
  const [form, setForm] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
    profilePhoto: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const enrollmentYearNum = Number(form.enrollmentYear);
    if (isNaN(enrollmentYearNum) || enrollmentYearNum <= 0) {
      setMessage('Enrollment Year must be a valid positive number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, enrollmentYear: enrollmentYearNum }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to add student');
        setLoading(false);
        return;
      }

      setMessage('Student added successfully');
      setForm({
        studentId: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        department: '',
        enrollmentYear: '',
        isActive: true,
        profilePhoto: null,
      });
      fetchStudents();
      setLoading(false);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage('Error adding student: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add New Student</h1>
      {message && <div className="message">{message}</div>}
      <StudentForm
        form={form}
        editingStudentId={null}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

// Manage Students Page
const ManageStudents = ({ students, fetchStudents }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          setMessage(errorData.message || 'Failed to delete student');
          return;
        }
        setMessage('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        setMessage('Error deleting student: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Manage Students</h1>
      {message && <div className="message">{message}</div>}
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="4">No students found</td></tr>
          ) : (
            students.map(student => (
              <tr key={student._id || student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.department || 'N/A'}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/edit/${student.studentId}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(student._id || student.studentId)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Edit Student Page
const EditStudent = ({ students, fetchStudents }) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const student = students.find(s => s.studentId === id);
    if (student) {
      setForm({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        dob: student.dob ? student.dob.substring(0, 10) : '',
        department: student.department,
        enrollmentYear: student.enrollmentYear,
        isActive: student.isActive,
      });
    }
    setLoading(false);
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const enrollmentYearNum = Number(form.enrollmentYear);
    if (isNaN(enrollmentYearNum) || enrollmentYearNum <= 0) {
      setMessage('Enrollment Year must be a valid positive number');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, enrollmentYear: enrollmentYearNum }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to update student');
        setSubmitting(false);
        return;
      }

      setMessage('Student updated successfully');
      fetchStudents();
      setSubmitting(false);
      setTimeout(() => navigate('/manage'), 1500);
    } catch (error) {
      setMessage('Error updating student: ' + error.message);
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1>Edit Student</h1>
      {message && <div className="message">{message}</div>}
      <StudentForm
        form={form}
        editingStudentId={id}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

// Main App Component
const App = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      if (!response.ok) {
        console.error('Failed to fetch students');
        return;
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home students={students} />} />
            <Route path="/add" element={<AddStudent fetchStudents={fetchStudents} />} />
            <Route path="/manage" element={<ManageStudents students={students} fetchStudents={fetchStudents} />} />
            <Route path="/edit/:id" element={<EditStudent students={students} fetchStudents={fetchStudents} />} />
          </Routes>
        </main>
        <footer>
          <p>Student Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
