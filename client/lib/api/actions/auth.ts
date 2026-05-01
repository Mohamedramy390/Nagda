'use server'

import { cookies } from 'next/headers'

export async function loginAction(email: string, password: string) {
  const response = await fetch('http://localhost:3200/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json()

  // Securely store the token in an HTTP-only cookie 🍪
  ;(await cookies()).set('token', data.token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
    path: '/', // Available everywhere in the app
    maxAge: 60 * 60 * 24 * 7 // Keeps the cookie for 7 days
  })

  // We only return the user info to the frontend. 
  // The token stays hidden in the cookie!
  return data.user
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

export async function checkAuthAction() {
  const cookieStore = await cookies()
  return cookieStore.has('token')
}

export async function verifyTokenAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    return false
  }
  const response = await fetch('http://localhost:3200/auth/verify-token', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.ok
}

export async function verifySessionAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
    return false
  }
  const response = await fetch('http://localhost:3200/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  const data = await response.json()
  console.log("1. Data from NestJS:", data)
  return data.user
}
