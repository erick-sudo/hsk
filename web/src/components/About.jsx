import React from "react";
import AppName from "./common/AppName";
import { images } from "../assets/images/images";
import QuickBook from "./common/QuickBook";

function About() {
  return (
    <div className="">
      <div className="container">
        <div className="min-h-[50vh] relative flex">
          <div className="absolute inset-0">
            <img className="h-full mx-auto" src={images.roomCleaning} />
          </div>
          <div className="grow flex mt-24 justify-center z-20">
            <h3 className="text-5xl font-extrabold text-gray-700">About Us</h3>
          </div>
        </div>
        <div>
          <h3 className="flex items-center font-bold text-2xl mx-auto w-max p-4">
            <div className="-translate-y-2">
              <AppName />
            </div>
            Cleaning.Co Story
          </h3>
          <p className="max-w-xl text-center mx-auto">
            Our story began in 2014 when we realized there's no convenient way
            for us to find cleaners in a simple manner. We take our jobs very
            seriously, just ask the 10,000+ recurring customers who keep coming
            back for our professional services. We use a combination of
            enterprise grade technology and technical cleaning methods to ensure
            that your house, office or commercial setting is as good as new,
            healthy and clean - when we're done.
          </p>
        </div>

        <div className="py-12 px-4 bg-purple-800/10 rounded-lg my-12">
          <h3 className="text-5xl text-center font-extrabold text-gray-700">
            Contact Us
          </h3>
          <div className="text-center pt-8 max-w-xl mx-auto">
            If you call during our business hours you'll get through to us
            instantly. If you email, we'll usually get back to you within the
            same business day. Our client services team members are eager to
            answer all of your cleaning services questions.
          </div>
          <div className="max-w-sm p-4 mx-auto">
            <h4 className="font-extrabold text-gray-700">Working Hours</h4>
            <div className="flex">
              <span className="w-2/3">Monday - Friday</span>
              <span className="1/3 text-purple-700 font-bold">8 AM - 7 PM</span>
            </div>
            <div className="flex">
              <span className="w-2/3">Saturday</span>
              <span className="1/3 text-purple-700 font-bold">8 AM - 6 PM</span>
            </div>
            <div className="flex">
              <span className="w-2/3">Sunday</span>
              <span className="1/3 text-purple-700 font-bold">8 AM - 1 PM</span>
            </div>
          </div>
        </div>

        <div className="relative py-12 my-12">
          <div className="absolute inset-0 -z-10">
            <img
              className="h-full mx-auto my-auto"
              src={images.roomCleaning2}
            />
          </div>
          <h4 className="text-5xl shadow rounded-lg bg-white/10 backdrop-blur text-gray-700 py-12 font-extrabold text-center w-max mx-auto mb-8">
            Servicing 10K+
            <br />
            Users Across Your City
          </h4>

          <div className="rounded-lg backdrop-blur p-4 shadow">
            <QuickBook />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
