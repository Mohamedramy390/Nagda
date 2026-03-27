'use server'

import { cookies } from 'next/headers'

const getDashboardOverview = async () => {
   try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch('http://localhost:3200/dashboard/overview', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      // The calling component can catch this error and redirect
      throw new Error("Unauthorized");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard:", error);
    throw error; // Rethrow so the client can catch it
  }
}

export default getDashboardOverview