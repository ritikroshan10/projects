import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//------------- Import components-----------------
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserTable from './components/UserTable';
import Profile from './components/Profile';


function App() {
  // Stores list of all users fetched from backend
  const [users, setUsers] = useState([]);

  // State to track registration or edit form fields
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', password: '', gender: '', phone: '', address: ''
  });

  // Whether we're editing an existing user
  const [isEditing, setIsEditing] = useState(false);

  // Holds the ID of the user being edited
  const [editUserId, setEditUserId] = useState(null);

  // State for login form fields
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Switch between Registration and Login page
  const [isLoginPage, setIsLoginPage] = useState(false);

  // Indicates if a user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Stores the logged-in user's details
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Runs only once on initial page load
  useEffect(() => {
    fetchUsers(); // Fetch users from backend
  }, []);

  // Fetch all users from backend API
  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data); // Set the response data into users state
  };

  // Update formData state on input field change (registration form)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //--------------- Update loginData state on input field change (login form)-------------
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // -------------Handle login form submission-------------
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!loginData.email || !loginData.password) {
      return toast.error("Email and Password required");
    }

    try {
      // Send login request to backend
      const res = await axios.post('http://localhost:5000/login', loginData);

      // If login success, show toast and update login state
      toast.success("Login successful!");
      setIsLoggedIn(true); // Set login status true
      setLoggedInUser(res.data.user); // Save logged-in user data
      setLoginData({ email: '', password: '' }); // Reset login form
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  // Handle registration form submission or updating an existing user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const { name, email, age, password, gender, phone, address } = formData;

    // Validate all fields are filled
    if (!name || !email || !age || !password || !gender || !phone || !address) {
      return toast.error("All fields are required");
    }

    try {
      if (isEditing) {
        // If editing mode, send PUT request to update user
        await axios.put(`http://localhost:5000/users/${editUserId}`, formData);
        toast.success("User updated successfully!");
        setIsEditing(false); // Reset editing state
        setEditUserId(null); // Clear edit user ID
      } else {
        // Else, send POST request to register a new user
        await axios.post('http://localhost:5000/users', formData);
        toast.success("User registered successfully!");
      }

      // Reset form fields after submission
      setFormData({ name: '', email: '', age: '', password: '', gender: '', phone: '', address: '' });

      fetchUsers(); // Refresh user list after create/update
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Handle delete user by ID
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    toast.error("User deleted successfully!");
    fetchUsers(); // Refresh the user list
  };

  //-------------- Fill form with existing user data to edit-----------
  const handleEdit = (user) => {
    setIsEditing(true); // Turn on editing mode
    setEditUserId(user._id); // Save user ID being edited

    // Populate form fields with selected user's data
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      password: user.password,
      gender: user.gender,
      phone: user.phone,
      address: user.address
    });
  };

  // Conditionally render profile if user is logged in
  if (isLoggedIn) {
    return (
        <Profile
          loggedInUser={loggedInUser}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedInUser={setLoggedInUser}
          setIsLoginPage={setIsLoginPage}
        />
    );
  }

  // If login mode is active and not logged in yet, show login form
  if (isLoginPage) {
    return (
      <div className="container">
        <LoginForm
          loginData={loginData}
          handleLoginChange={handleLoginChange}
          handleLogin={handleLogin}
          setIsLoginPage={setIsLoginPage}
        />
      </div>
    );
  }

  // -----------------------------------registration form and table list-------------------------
  return (
    <div className="container">
      {/* Registration or Update Form */}
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        setIsLoginPage={setIsLoginPage}
      />

      {/* User table with Edit/Delete options */}
      <UserTable
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Toast notification area */}
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
