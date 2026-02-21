import "../globals.css";

export const metadata = {
    title: "Admin Panel | Kalyan Physiotherapy",
};

export default function AdminRootLayout({ children }) {
    return (
        <html lang="en">
            <body className="font-sans antialiased bg-gray-50">
                {children}
            </body>
        </html>
    );
}
