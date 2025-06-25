import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />
      {/* <UserButton /> */}
      <div className=" flex flex-col items-center justify-center bg-white mt-6">
        {/* Announcement Bar */}

        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mt-20">
            Build Your Resume{" "}
            <span className="text-purple-500">with InstaResume</span>
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Easily create a standout resume with the power of our AI-driven
            builder.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center ">
            {/* <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full"> */}
              <Link to={"/auth/sign-in"}>
                <Button size="md" className="h-[50px] w-[100px]">Get Started</Button>
              </Link>
            {/* </button> */}
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-16 px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            At InstaResume, we streamline the resume-building process with
            cutting-edge AI technology. Our intuitive system helps you craft a
            professional resume with ease, making the entire process fast and
            hassle-free. No more spending hours formatting or struggling to find
            the right words – we handle that for you.
          </p>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            Our AI-driven platform analyzes your input, optimizes content, and
            ensures that your resume stands out to employers. It not only saves
            you time but also ensures that your resume is polished and tailored
            to highlight your strengths. Whether you're a recent graduate or a
            seasoned professional, InstaResume simplifies everything so you can
            focus on landing your dream job.
          </p>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            Let us help you create the perfect resume in minutes and save
            countless hours while putting your best foot forward.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
