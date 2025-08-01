import React from "react";
import bgImage from "../../assets/images/bg-image.avif";
// replace with your image path
import  { useState } from "react";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";

const EntryPage = () => {
  const [view, setView] = useState("hero"); // values: 'hero' | 'signin' | 'signup'

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
         style={{ backgroundImage: `url(${bgImage})` }} // use your uploaded image
      >
      {/* Overlay for dark background */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-4xl font-bold text-red-600">BAKOLA</h1>
       {
        view=='hero' &&  <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => setView("signin")}
        >
          Sign In
        </button>
       }
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-20 px-6">
        {view === "hero" && (
          <>
            <h2 className="text-5xl font-extrabold text-white mb-4">
              Unlimited Products, Offers, and More
            </h2>
            <p className="text-xl text-white mb-8">
              Starts as low as $2.99. Cancel anytime.
            </p>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded text-lg hover:bg-red-700"
              onClick={() => setView("signup")}
            >
              Get Started
            </button>
          </>
        )}

        {view === "signin" && <SignInForm onSwitch={() => setView("signup")} />}
        {view === "signup" && <SignUpForm onSwitch={() => setView("signin")} />}
      </div>
    </div>
  );
};

export default EntryPage;

