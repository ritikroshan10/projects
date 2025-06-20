function RegisterForm({ formData, handleChange, handleSubmit, isEditing, setIsLoginPage }) {
    return (
        <>
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange}></textarea>

                <div className="form-button-group">
                    <button type="submit" className="submit-btn">{isEditing ? 'Update' : 'Submit'}</button>
                    <button type="button" className="login-btn" onClick={() => setIsLoginPage(true)}>Login</button>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;
