function Profile({ loggedInUser, setIsLoggedIn, setLoggedInUser, setIsLoginPage }) {
  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setIsLoginPage(false);
  };

  return (
    <div className="welcome-container">
      {/* Profile Picture */}
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(loggedInUser?.name)}&background=0D8ABC&color=fff&size=128`}
        alt="Profile"
        className="profile-pic"
      />

      {/* Welcome Heading */}
      <h1>Welcome, {loggedInUser?.name} 👋</h1>

      {/* User Info */}
      <div className="profile-details">
        <p><strong>Email:</strong> {loggedInUser?.email}</p>
        <p><strong>Age:</strong> {loggedInUser?.age}</p>
        <p><strong>Age:</strong> {loggedInUser?.password}</p>
        <p><strong>Gender:</strong> {loggedInUser?.gender}</p>
        <p><strong>Phone:</strong> {loggedInUser?.phone}</p>
        <p><strong>Address:</strong> {loggedInUser?.address}</p>
      </div>

      {/* Logout Button */}
      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
