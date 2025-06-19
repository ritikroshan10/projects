// src/App.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', gender: '', phone: '', address: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age, gender, phone, address } = formData;
    if (!name || !email || !age || !gender || !phone || !address) return;

    if (editId) {
      await axios.put(`http://localhost:5000/users/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/users', formData);
    }

    setFormData({ name: '', email: '', age: '', gender: '', phone: '', address: '' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      address: user.address
    });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: '', email: '', age: '', gender: '', phone: '', address: '' });
  };

  return (
    <div className="container">
      <h2>{editId ? 'Edit User' : 'User Registration Form'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange}></textarea>

        <button type="submit">{editId ? 'Update' : 'Submit'}</button>
        {editId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      <h3>User List</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Age</th><th>Gender</th><th>Phone</th><th>Address</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button className='edit-btn' onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
