import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "IT Support Portal",
  description: "IT Support Portal Login",
};


export default function RootLayout({
  children,
}: {

  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <AuthProvider>
        <body className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
