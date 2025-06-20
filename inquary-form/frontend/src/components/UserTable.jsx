function UserTable({ users, handleEdit, handleDelete }) {
    return (
        <>
            <h3>User List</h3>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Age</th><th>Password</th><th>Gender</th>
                        <th>Phone</th><th>Address</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.password}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default UserTable;
