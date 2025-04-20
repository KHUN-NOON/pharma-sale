

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">Sorry, the page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 text-blue-600 hover:underline">
        Go back to Dashboard
      </a>
    </div>
  );
}