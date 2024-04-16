import React from "react";
import { GiVacuumCleaner, GiStarSwirl } from "react-icons/gi";
import { TbCalendarStats } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
import {
  AutoAwesome,
  CheckCircleOutlined,
  Diversity1Outlined,
  Diversity2Outlined,
  MilitaryTechOutlined,
  QuestionMarkOutlined,
  RocketLaunchOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import {
  ArrowLongRightIcon,
  ComputerDesktopIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { GiFloorPolisher, GiWindow, GiRedCarpet } from "react-icons/gi";
import { TbHomeMove } from "react-icons/tb";
import QuickBook from "./common/QuickBook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Grid } from "@mui/material";
import { clsx } from "clsx";

const styles = {
  submit: {
    backgroundColor: "rgb(71, 3, 131)",
    "&:hover": {
      backgroundColor: "rgb(148, 77, 211)",
    },
  },
};

const testimonials = [
  {
    name: "Emily Smith",
    occupation: "Homeowner",
    testimonial:
      "I'm extremely satisfied with the level of cleanliness and professionalism displayed by the cleaning team. My house has never looked better!",
  },
  {
    name: "John Doe",
    occupation: "Business Owner",
    testimonial:
      "The office cleaning service provided by this company is outstanding. The staff is punctual, thorough, and respectful. Highly recommended!",
  },
  {
    name: "Sarah Johnson",
    occupation: "Parent",
    testimonial:
      "As a busy parent, I appreciate the convenience and reliability of this cleaning service. They always do an amazing job, allowing me to focus on more important tasks.",
  },
  {
    name: "Michael Brown",
    occupation: "Restaurant Manager",
    testimonial:
      "Our restaurant floors have never looked cleaner! The floor cleaning service provided by this company is truly exceptional.",
  },
  {
    name: "Amanda Taylor",
    occupation: "Apartment Renter",
    testimonial:
      "Moving out was made so much easier with the help of this cleaning service. They did a fantastic job, ensuring my apartment was spotless for the next tenant.",
  },
  {
    name: "David Clark",
    occupation: "Small Business Owner",
    testimonial:
      "I've been using this cleaning service for years and have never been disappointed. Their attention to detail and commitment to customer satisfaction sets them apart.",
  },
  {
    name: "Jennifer Martinez",
    occupation: "Event Planner",
    testimonial:
      "I rely on this cleaning service for all my event clean-up needs, and they always deliver excellent results. Professional, efficient, and dependable!",
  },
  {
    name: "Robert Wilson",
    occupation: "Facility Manager",
    testimonial:
      "The window cleaning service provided by this company is exceptional. Our windows have never looked clearer, and the team is always professional and courteous.",
  },
  {
    name: "Karen Thompson",
    occupation: "Hotel Manager",
    testimonial:
      "We trust this cleaning service to maintain the cleanliness of our hotel rooms, and they consistently exceed our expectations. Guests frequently comment on the pristine condition of their rooms.",
  },
  {
    name: "Daniel White",
    occupation: "Real Estate Agent",
    testimonial:
      "I frequently recommend this cleaning service to my clients for move-in and move-out cleanings. They always do an amazing job, helping homes look their best for potential buyers.",
  },
  {
    name: "Jessica Adams",
    occupation: "Small Business Owner",
    testimonial:
      "The customized cleaning plans offered by this company have been a game-changer for my business. They cater to our specific needs and ensure our space is always clean and welcoming.",
  },
  {
    name: "Mark Garcia",
    occupation: "Homeowner",
    testimonial:
      "I've tried many cleaning services in the past, but this one is by far the best. The quality of their work is consistently excellent, and their prices are very reasonable.",
  },
];

const blogs = [
  {
    title: "HIGH CLASS CLEANING",
    author: "Kristin Watson",
    position: "Marketing Coordinator",
    date: {
      day: 22,
      month: "APR",
    },
    image:
      "https://cdn.pixabay.com/photo/2021/10/29/14/58/dirt-6752127_640.jpg",
    description:
      "Discover how our high-class cleaning services exceed expectations and leave your space immaculate.",
  },
  {
    title: "QUICK WORKER FINDING",
    author: "Ralph Edwards",
    position: "Nursing Assistant",
    date: {
      day: 16,
      month: "JUL",
    },
    image:
      "https://cdn.pixabay.com/photo/2018/01/06/16/32/window-3065340_640.jpg",
    description:
      "Learn how our efficient team ensures swift and thorough cleaning, saving you time and hassle.",
  },
  {
    title: "CUSTOMIZED SERVICE",
    author: "Albert Flores",
    position: "President of Sales",
    date: {
      day: 31,
      month: "DEC",
    },
    image:
      "https://cdn.pixabay.com/photo/2016/10/21/00/55/door-1756960_640.png",
    description:
      "Explore the benefits of our personalized cleaning plans tailored to your unique needs and preferences.",
  },
  {
    title: "TRAINED WORKERS",
    author: "Jacob Jones",
    position: "Dog Trainer",
    date: {
      day: 18,
      month: "MAY",
    },
    image:
      "https://cdn.pixabay.com/photo/2014/10/16/08/41/bathroom-490781_640.jpg",
    description:
      "Find out how our skilled and trained cleaning professionals deliver exceptional results with expertise and precision.",
  },
];

const services = [
  {
    title: "House Cleaning",
    description:
      "Comprehensive cleaning services tailored to your home's needs.",
    icon: <HomeModernIcon height={40} />,
  },
  {
    title: "Office Cleaning",
    description:
      "Professional cleaning solutions to maintain a pristine office environment.",
    icon: <ComputerDesktopIcon height={40} />,
  },
  {
    title: "Floor Cleaning",
    description:
      "Specialized treatments to restore the shine and cleanliness of your floors.",
    icon: <GiFloorPolisher className="text-4xl" />,
  },
  {
    title: "Window Cleaning",
    description: "Thorough window washing for sparkling, streak-free windows.",
    icon: <GiWindow className="text-4xl" />,
  },
  {
    title: "Carpet Cleaning",
    description:
      "Deep cleaning methods to remove dirt, stains, and odors from carpets.",
    icon: <GiRedCarpet className="text-4xl" />,
  },
  {
    title: "Move-in/Move-out Cleaning",
    description:
      "Complete cleaning services to prepare your new home or leave it spotless when moving out.",
    icon: <TbHomeMove className="text-4xl" />,
  },
];

const whyChoose = [
  {
    title: "Flexible Scheduling",
    desc: "Book cleaning sessions at your convenience, fitting your busy schedule seamlessly.",
  },
  {
    title: "Professional Staff",
    desc: "Trust our experienced and courteous team to deliver top-notch cleaning results.",
  },
  {
    title: "Competitive Pricing",
    desc: "Get high-quality cleaning services at affordable rates, ensuring great value for your money.",
  },
];
const howItWorks = [
  {
    title: "Book",
    desc: "Tell us when and where you want your cleaning.",
    icon: <TbCalendarStats className="-rotate-45" />,
  },
  {
    title: "Clean",
    desc: "A Professional cleaner comes over and cleans your place.",
    icon: <GiVacuumCleaner className="-rotate-45" />,
  },
  {
    title: "Freedom",
    desc: "Enjoy your life and come back to a clean space!.",
    icon: <GiStarSwirl className="-rotate-45" />,
  },
];

const numbers = [
  {
    title: "Happpy Customers",
    value: "567+",
    icon: <Diversity1Outlined fontSize="large" />,
  },
  {
    title: "Team Members",
    value: "48",
    icon: <Diversity2Outlined fontSize="large" />,
  },
  {
    title: "Award Winning",
    value: "26",
    icon: <MilitaryTechOutlined fontSize="large" />,
  },

  {
    title: "Project Complete",
    value: "759+",
    icon: <RocketLaunchOutlined fontSize="large" />,
  },
];

function Home() {
  return (
    <div className="px-4 container flex flex-col gap-12">
      <div className="relative">
        <h1 className="text-[3.5em] font-extrabold py-[2em] text-gray-700">
          Your One Stop Cleaning
          <br />
          Center For All Needs
        </h1>
        <h2 className="uppercase font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-purple-500 to-purple-700 w-max">
          SparkleSync Cleaning Services
        </h2>

        <button className="mt-[4em] ml-12 bg-purple-800 py-3 px-6 rounded-full font-extrabold text-white hover:bg-purple-500 duration-300">
          Get started
        </button>

        <div className="absolute inset-0 -z-10 flex">
          <div className="grow hidden md:grid grid-cols-3 gap-12 p-12">
            {new Array(6).fill(0).map((_, idx) => (
              <div key={idx} className="h-12 bg-purple-700/5 rounded-xl"></div>
            ))}
          </div>
          <div className="hidden xl:block">
            <img
              className="h-full max-w-lg"
              src="https://cdn.pixabay.com/photo/2016/11/15/09/21/aim-for-1825672_1280.jpg"
            />
          </div>
        </div>

        <div className="mt-8 pt-12">
          <QuickBook />
        </div>
      </div>

      <div className="py-12 font-semibold text-gray-700 p-4 grid gap-4 lg:grid-cols-2 items-center mt-8">
        <h3 className="text-4xl">
          Why Choose<br></br>
          <span className="flex items-center">
            SparkleSync
            <QuestionMarkOutlined className="text-purple-700" />
          </span>
        </h3>
        <div className="max-w-lg py-12 text-gray-500">
          We understand your home is important to you. That's why we focus on
          the quality of the clean. Our cleaners aren't contract workers - they
          are full-time employees. They care as much as we do.
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 bg-purple-100 px-4 py-8 mt-12">
        {whyChoose.map((choice, idx) => (
          <div key={idx} className="">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <FiActivity className="text-purple-700" />
              <span className="absolute left-[100%] bottom-[75%] text-purple-700">
                <AutoAwesome />
              </span>
            </div>
            <h3 className="text-gray-800 text-lg font-bold py-4">
              {choice.title}
            </h3>
            <p className="max-w-[18rem] text-gray-500">{choice.desc}</p>
          </div>
        ))}
      </div>

      <div className="py-12 text-gray-700">
        <h3 className="text-xl font-bold">How it works</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 px-4">
          {howItWorks.map((step, idx) => (
            <div key={idx} className="flex justify-center">
              <div className="p-4">
                <div className="py-12">
                  <div className="h-48 w-48 shadow-xl scale-90 rounded-lg shadow-purple-700/10 text-[5em] flex items-center justify-center rotate-45">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-purple-700 text-xl uppercase">
                  {step.title}
                </h3>
                <div className="max-w-[18rem]">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="uppercase text-center text-purple-700 p-2">
          Our Services
        </h3>
        <h4 className="uppercase text-center text-gray-700 font-extrabold text-2xl">
          What we are offering
        </h4>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="relative shadow group cursor-pointer hover:bg-purple-700 hover:text-white duration-300 border-1 rounded-lg mt-12 pt-12 flex flex-col items-center"
            >
              <div className="absolute h-24 border w-24 rounded-full bottom-[100%] translate-y-12 bg-white flex items-center justify-center text-purple-700">
                {service.icon}
              </div>
              <h3 className="max-w-[12rem] mx-auto text-center h-12 py-2 font-bold text-purple-700 group-hover:text-white">
                {service.title}
              </h3>
              <div className="text-center px-4 pb-4">{service.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <PricingPlans />
      </div>

      <Grid
        container
        className="container border items-center bg-purple-800 p-4 rounded-lg text-white shadow my-12"
      >
        {numbers.map((number, idx) => (
          <Grid xs={6} lg={3} item key={idx} className={clsx("p-4")}>
            <div className={`flex items-center self-center`}>
              <div className="h-12 w-12 flex items-center justify-center">
                {number.icon}
              </div>
              <div className="">
                <div className="text-xl translate-y-2 px-3 font-extrabold">
                  {number.value}
                </div>
                <div className="px-2 whitespace-nowrap">{number.title}</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <div className="mt-12">
        <h3 className="uppercase text-center text-purple-700 p-2">
          Happy Customers
        </h3>
        <h4 className="uppercase text-center text-gray-700 font-extrabold text-2xl">
          What our customers say
        </h4>

        <div className="mt-12">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx} className="relative max-w-sm">
                <div className="relative border p-4 rounded-lg mt-8 flex flex-col items-center mb-12">
                  <div className="absolute h-16 border w-16 rounded-full bottom-[100%] translate-y-8 bg-white flex items-center justify-center text-purple-700">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src="https://cdn.pixabay.com/photo/2016/10/07/02/18/motorbike-1720531_640.jpg"
                    />
                  </div>
                  <h3 className="text-gray-800 font-bold mt-4">
                    {testimonial.name}
                  </h3>
                  <h3 className="pb-2 text-gray-500 font-bold">
                    {testimonial.occupation}
                  </h3>
                  <p>{testimonial.testimonial}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="uppercase text-center text-purple-700 p-2">
          Latest News
        </h3>
        <h4 className="uppercase text-center text-gray-700 font-extrabold text-2xl">
          Read our latest blog
        </h4>

        <div className="flex items-end gap-2 py-2 border-b">
          <span className="font-extrabold">SparkleSync</span>
          <span>BLOG</span>
          <div className="grow"></div>
          <button className="flex text-purple-700 hover:text-purple-900">
            <span>See all</span>
            <span>
              <ArrowLongRightIcon height={24} />
            </span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 p-4 justify-center">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="relative max-w-sm border rounded-lg overflow-hidden"
            >
              <div className="h-48 relative">
                <img
                  className="w-full h-full object-cover z-10"
                  src={blog.image}
                />
                <div className="absolute right-6 flex flex-col top-full -translate-y-1/2 z-20 bg-purple-700 py-2 px-2 items-end text-[#fff]">
                  <span>{blog.date.day}</span>
                  <span>{blog.date.month}</span>
                </div>
              </div>
              <div className=" px-4 pt-2 flex items-center gap-2">
                <div className="h-6 w-6">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={blog.image}
                  />
                </div>
                <div className="font-bold">
                  <h3 className="text-xs">{blog.author}</h3>
                  <h4 className="text-xs text-gray-500">{blog.position}</h4>
                </div>
              </div>
              <h3 className="px-4 h-12 py-2 font-bold text-purple-700 group-hover:text-white">
                {blog.title}
              </h3>
              <div className="px-4 pb-4">{blog.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-24 px-4 bg-gray-100 rounded-xl backdrop-blur">
        <QuickBook className="bg-white" />
      </div>
    </div>
  );
}

function PricingPlans() {
  const pricingPlans = [
    {
      title: "Standard Cleaning",
      price: "$350",
      description:
        "Our basic cleaning package covers essential cleaning tasks to keep your space fresh and tidy.",
      features: ["Vacuuming", "Dusting", "Mopping", "Surface Wiping"],
    },
    {
      title: "Deep Cleaning",
      price: "$450",
      description:
        "For a more thorough cleaning experience, our deep cleaning package ensures every nook and cranny is sparkling clean.",
      features: [
        "Standard Cleaning features",
        "Window Cleaning",
        "Appliance Cleaning",
        "Detailed Bathroom Cleaning",
      ],
    },
    {
      title: "Customized Cleaning",
      price: "$550",
      description:
        "Tailored to your specific needs, our customized cleaning plan offers flexibility and personalized service.",
      features: [
        "Deep Cleaning features",
        "Specialized Floor Treatment",
        "Additional Room Cleaning upon request",
        "Flexible scheduling",
      ],
    },
  ];

  return (
    <div className="">
      <h3 className="uppercase text-center text-purple-700 p-2">
        Pricing Plans
      </h3>
      <h4 className="uppercase text-center text-gray-700 font-extrabold text-2xl">
        Choose your plan
      </h4>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative group p-4 cursor-pointer hover:shadow-lg hover:shadow-purple-700 duration-300 rounded-lg ${
              index % 2 == 0 ? "bg-purple-100/50" : "bg-indigo-700/20"
            }`}
          >
            <h3 className="uppercase font-extrabold flex items-center gap-2">
              <span
                className={`${
                  index % 2 == 0 ? "text-purple-700" : "text-indigo-700"
                } duration-300`}
              >
                <StarBorderOutlined />
              </span>
              <span
                className={`${
                  index % 2 == 0 ? "text-purple-700" : "text-indigo-700"
                } group-hover:text-gray-800 duration-300`}
              >
                {plan.title}
              </span>
            </h3>
            <h3 className="px-4 flex items-center gap-2 py-2">
              <span className="font-extrabold text-3xl text-gray-800">
                {plan.price}
              </span>
              <span>/service</span>
            </h3>
            <div className=" text-gray-500 font-semibold px-2">
              {plan.description}
            </div>
            <div className="border-b my-2"></div>
            <div className="grid gap-1 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <span
                    className={`${
                      index % 2 == 0 ? "text-purple-700" : "text-indigo-700"
                    }`}
                  >
                    <CheckCircleOutlined />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button
              className={`px-4 py-2 text-[#fff] rounded-full w-full ${
                index % 2 == 0
                  ? "bg-purple-700 hover:bg-purple-400"
                  : "bg-indigo-700 hover:bg-indigo-400"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
