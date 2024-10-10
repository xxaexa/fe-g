import { NextResponse } from "next/server";
const API_URL = "http://103.175.216.126:8000/api/articles";

export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const url = new URL(API_URL);
    const page =
      req.url
        .split("?")
        .find((param) => param.startsWith("page="))
        ?.split("=")[1] || 1;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    url.searchParams.append("page", page);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(errorResponse, { status: response.status });
    }

    const articles = await response.json();

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
