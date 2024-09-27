"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from 'next/link';
import toast from "react-hot-toast";

function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (isLoaded && user) {
      setFormData({
        firstName: user.firstName || "Anonymous",
        lastName: user.lastName || "User",
        email: user.primaryEmailAddress?.emailAddress || "",
        username: user.username || "",
      });
      setLoading(false);
    }
  }, [isLoaded, user]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-800 text-white">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading profile...</div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-75"></div>
        </div>
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center bg-gray-800 text-white">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Please sign in to view your profile</div>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | null | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "Not available";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-4 sm:p-6 md:p-8 shadow-lg border-b-4 border-green-500">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-green text-center">
          Your Profile
        </h1>

        {/* Profile Information */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
            <img
              src={user.imageUrl}
              alt={`${user.firstName || "Anonymous"} ${user.lastName || "User"}`}
              className="w-32 h-32 rounded-full mb-4 sm:mb-0 sm:mr-6 border-4 border-green-500 shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-green">
                {`${user.firstName || "Anonymous"} ${user.lastName || "User"}`}
              </h2>
              <p className="text-gray-400 mb-2">{user.primaryEmailAddress?.emailAddress}</p>
              <p className="text-gray-500">Member since: {formatDate(user.createdAt)}</p>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-green">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                <p className="text-gray-400 mb-1">Username</p>
                <p className="font-medium text-white">{user.username || "Not set"}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                <p className="text-gray-400 mb-1">Last Sign In</p>
                <p className="font-medium text-white">{formatDate(user.lastSignInAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-green">
            {editing ? "Edit Your Profile" : "Profile Details"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              />
            </div>
            <div className="flex justify-between">
              <Link href="/chat-page" className="text-green hover:underline">
                Back to Chat
              </Link>
              <div className="flex space-x-4">
                {editing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
