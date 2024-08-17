import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { storage } from '../firebaseStorage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import loaderGif from '../assets/spin.gif'; // Add the correct path to your loader GIF
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          // Fetch user data by ID
          const userResponse = await axios.get(`/api/user/me`);
          setUserData(userResponse.data);

          // Fetch user forms
          const formsResponse = await axios.get(`/api/form/user/email/${encodeURIComponent(user.email)}`);
          setUserForms(formsResponse.data);

        } catch (error) {
          console.error('Error fetching user data or forms:', error.response ? error.response.data : error.message);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (file) => {
    setUserData({ ...userData, image: file });
  };

  const handleImageUpload = async () => {
    let imageUrl = userData.image;

    // If image is a file (not already a string URL)
    if (userData.image && typeof userData.image !== 'string') {
      setLoading(true);
      try {
        // Upload image to Firebase
        const fileRef = ref(storage, `profilePics/${userData.image.name}`);
        await uploadBytes(fileRef, userData.image);

        // Get the download URL for the uploaded image
        imageUrl = await getDownloadURL(fileRef);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }

    return imageUrl; // Return the image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image if needed
      const imageUrl = await handleImageUpload();

      // Prepare updated user data
      const updatedUser = {
        name: userData.name,
        email: userData.email,
        image: imageUrl,  // Set the image URL here
      };

      // Add password only if it is being changed
      if (userData.password) {
        updatedUser.password = userData.password;
      }

      // Update user via PUT request
      await axios.put(`/api/user/me`, updatedUser);

      // Optionally, you can re-fetch the user data after a successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const imageSrc = userData.image && typeof userData.image === 'string' 
    ? userData.image 
    : userData.image instanceof File 
      ? URL.createObjectURL(userData.image) 
      : '/path-to-default-image.jpg'; // Replace with your default image path

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <div className="flex items-center justify-center mb-6">
            <div
              className="relative w-48 h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {loading ? (
                <img src={loaderGif} alt="Loading" className="w-16 h-16" />
              ) : (
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <input
                id="fileInput"
                type="file"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-md text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>

      <div className="mt-8 p-6 bg-white shadow-md rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">My Forms</h2>
        <div className="space-y-4">
          {userForms.length > 0 ? (
            userForms.map((form) => (
              <div key={form._id} className="p-4 border rounded-md">
                <p><strong>Created At:</strong> {new Date(form.createdAt).toLocaleDateString()}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Phone:</strong> {form.phoneNumber}</p>
                <p><strong>Status:</strong> {form.status}</p>
              </div>
            ))
          ) : (
            <p>No forms submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
