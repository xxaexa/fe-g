"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function UserDetail() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const params = useParams();
  const id = params.id;

  // get user by id
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const accessToken = session.accessToken;
          const response = await fetch(`/api/users/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await response.json();
          setUserData(data);
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            username: data.username || "",
            email: data.email || "",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  // handleChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = session.accessToken;
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      alert("User updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating user data.");
    }
  };

  // loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen content-pad">
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="dark:text-white text-black py-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <h2 className="pl-2 py-2">Update User</h2>
      </div>

      {/* Form for updating user details */}
      <form onSubmit={handleSubmit} className="mt-4">
        <InputField
          id="first_name"
          label="First Name"
          type="text"
          placeholder="Enter First Name"
          value={formData.first_name || ""}
          required={true}
          name="first_name"
          onChange={handleInputChange}
        />

        <InputField
          id="last_name"
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
          value={formData.last_name || ""}
          required={true}
          name="last_name"
          onChange={handleInputChange}
        />

        <InputField
          id="username"
          label="Username"
          type="text"
          placeholder="Enter Username"
          value={formData.username || ""}
          required={true}
          name="username"
          onChange={handleInputChange}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          value={formData.email || ""}
          required={true}
          name="email"
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>

        <Button label="Edit" />
      </form>
    </div>
  );
}
