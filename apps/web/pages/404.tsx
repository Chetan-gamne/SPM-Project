import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link href="/">
        <a className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go back to home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
