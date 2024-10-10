"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import Card from "@/components/Card";
import { useSession } from "next-auth/react";

export default function Users() {
  // get role
  const { data: session } = useSession();
  const role = session?.user?.role || "admin";

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //  get users
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const accessToken = session.accessToken;
          const response = await fetch("/api/users", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }

          const data = await response.json();
          setUserData(data);
        } catch (err) {
          console.error("Error fetching users data:", err);
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  const columns = React.useMemo(
    () => [
      { Header: "No", accessor: "id" },
      { Header: "Full Name", accessor: "username" },
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-pad min-h-screen">
      <h1 className="py-2">Users</h1>
      {error && <p className="text-red-500">{error}</p>}
      {role === "admin" ? (
        <DataTable data={userData} columns={columns} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.map((user) => (
            <Card key={user.id} data={user} type={"user"} />
          ))}
        </div>
      )}
    </div>
  );
}
