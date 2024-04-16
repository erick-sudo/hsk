import React, { useContext, useEffect, useState } from "react";
import QuickBook from "./common/QuickBook";
import { clsx } from "clsx";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import AppName from "./common/AppName";
import { axiosGet, axiosPost } from "../lib/axiosLib";
import { apis } from "../lib/apis";
import ControlledAccordions from "./ControlledAccordions";
import { Discount } from "@mui/icons-material";
import { AppContext } from "./context/AppContext";

function Selectable({ className, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer duration-300 flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
}

function RequirementCustomizationStepIconComponent({
  active,
  completed,
  icon,
}) {
  const icons = {
    1: <Cog8ToothIcon height={30} />,
    2: <CalendarDaysIcon height={30} />,
    3: <ArrowPathIcon height={30} />,
    4: <PlusCircleIcon height={30} />,
    5: <CreditCardIcon height={30} />,
  };

  return (
    <div
      className={clsx(
        "relative -translate-x-3 flex items-center justify-center rounded-full",
        {
          "bg-gradient-to-tl from-purple-950 to-purple-400 text-white max-h-10 max-w-10 min-h-10 min-w-10 m-2":
            active,
          "bg-gradient-to-tl from-purple-950 to-purple-400 text-white max-h-14 max-w-14 min-h-14 min-w-14":
            completed,
          "bg-gradient-to-tl from-gray-950 to-gray-400 text-white max-h-14 max-w-14 min-h-14 min-w-14":
            !active && !completed,
        }
      )}
    >
      <div
        className={clsx("", {
          "block absolute -inset-2 border-1 rounded-full border-purple-700":
            active,
        })}
      ></div>
      {icons[icon + ""]}
    </div>
  );
}

const defaultRequirementState = {
  services: [],
  cleaning_frequency_id: 0,
  start_date: dayjs(),
  end_date: dayjs(),
  start_time: dayjs(),
  end_time: dayjs(),
  access_info: {
    address_name: "",
    address_code: "",
    how_to_get_in: "",
    any_pets: false,
    pets_description: "",
    additional_notes: "",
  },
  step: 0,
};

function Services() {
  const [cleaningFrequencies, setCleaningFrequencies] = useState([]);
  const [cleanTypes, setCleanTypes] = useState([]);
  const { startLoading, stopLoading, snackNotifier } = useContext(AppContext);
  const [requirements, setRequirements] = useState({
    ...defaultRequirementState,
  });

  const handleServiceChange = (serviceId) => {
    let services = [...requirements.services];
    if (services.includes(serviceId)) {
      services = services.filter((service) => service !== serviceId);
    } else {
      services.push(serviceId);
    }
    setRequirements({
      ...requirements,
      services,
    });
  };

  const handleSubmit = () => {
    const payload = {
      services: requirements.services,
      cleaning_frequency_id: requirements.cleaning_frequency_id,
      start_date: requirements.start_date.format("YYYY-MM-DD"),
      end_date: requirements.end_date.format("YYYY-MM-DD"),
      start_time: requirements.start_time.format("HH:mm:ss"),
      end_time: requirements.end_time.format("HH:mm:ss"),
      access_info: requirements.access_info,
    };
    startLoading();
    axiosPost(apis.bookings.create, payload)
      .then((response) => {
        stopLoading();
        snackNotifier(response.data.message, "success", "top-center");
        setRequirements({
          ...defaultRequirementState,
        });
      })
      .catch((axiosError) => {
        stopLoading();
        if (axiosError?.response?.data) {
          snackNotifier(axiosError.message, "error", "top-center");
          console.log(axiosError);
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
      });
  };

  const fetchCleanTypes = () => {
    axiosGet(apis.clean_types.list)
      .then((res) => {
        setCleanTypes(res.data);
      })
      .catch((_) => {
        // Ignore Error
      });
  };

  const fetchCleaningFrequencies = () => {
    axiosGet(apis.cleaning_frequencies)
      .then((response) => {
        setCleaningFrequencies(response.data);
      })
      .catch((_) => {
        // Ignore Error
      });
  };

  useEffect(() => {
    fetchCleaningFrequencies();
    fetchCleanTypes();
  }, []);

  return (
    <div className="container">
      <div>
        {/* Quick Book */}
        <div className="px-6">
          <h3 className="font-bold text-2xl my-4">Quick book</h3>
          <QuickBook />
        </div>

        <div className="container py-12 px-4">
          <Stepper activeStep={requirements.step} orientation="vertical">
            <Step>
              <StepLabel
                sx={{
                  "& .Mui-active, .Mui-completed": {
                    color: "rgb(126 34 206)",
                  },
                }}
                StepIconComponent={RequirementCustomizationStepIconComponent}
              >
                <h3 className="font-bold text-2xl px-4 ">
                  Customize Your Requirements
                </h3>
              </StepLabel>
              <StepContent>
                {/* Customize Your Requirements */}
                <div>
                  {/* Select Services */}

                  <div>
                    <h3 className="text-xl px-4">Select services</h3>
                    <div className="px-4">
                      {cleanTypes.length > 0 && (
                        <ControlledAccordions
                          className="grid xl:grid-cols-2 items-start gap-x-4"
                          items={cleanTypes.map((cleanType) => ({
                            summary: (
                              <div className="w-full flex gap-2 items-center">
                                <Discount className="text-purple-900" />
                                <span className="">{cleanType.name}</span>
                              </div>
                            ),
                            details: (
                              <div>
                                <h3 className="">{cleanType.description}</h3>
                                <div className="py-2 grid gap-2">
                                  {cleanType.sub_services.map(
                                    (service, idx) => (
                                      <div
                                        key={idx}
                                        onClick={() =>
                                          handleServiceChange(service.id)
                                        }
                                        className={clsx(
                                          "group rounded cursor-pointer px-2 flex py-2 items-center shadow-md hover:bg-purple-700 duration-300",
                                          {
                                            "border-1 border-purple-700 shadow-purple-700":
                                              requirements.services.includes(
                                                service.id
                                              ),
                                          }
                                        )}
                                      >
                                        <div className="grow text-gray-600 group-hover:text-[#fff] duration-300 font-bold">
                                          {service.name}
                                        </div>
                                        <div className="shrink-0 text-end group-hover:text-[#fff] duration-300 font-bold">
                                          ${service.price}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ),
                          }))}
                        />
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl px-4">Selected Services</h3>
                      <div className="grid px-4 lg:grid-cols-2 gap-2">
                        {cleanTypes
                          .map((service) => [...service.sub_services])
                          .flat()
                          .filter((t) => requirements.services.includes(t.id))
                          .map((service, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleServiceChange(service.id)}
                              className={clsx(
                                "group rounded cursor-pointer px-2 flex py-2 items-center shadow-md hover:bg-purple-700 duration-300",
                                {
                                  "shadow-purple-800":
                                    requirements.services.includes(service.id),
                                }
                              )}
                            >
                              <div className="grow text-gray-600 group-hover:text-[#fff] duration-300 font-bold">
                                {service.name}
                              </div>
                              <div className="shrink-0 text-end group-hover:text-[#fff] duration-300 font-bold">
                                ${service.price}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  {/* <div className="flex flex-col items-center">
                        <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                          Number of bedrooms
                        </h4>
                        <div className="flex gap-2 p-4">
                          {["Studio", 1, 2, 3, 4, 5].map((choice, idx) => (
                            <Selectable
                              onClick={() =>
                                setRequirements({
                                  ...requirements,
                                  bedrooms: choice,
                                })
                              }
                              className={clsx(
                                "font-bold -md:px-6 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                                {
                                  "border-purple-700 text-purple-700 shadow-md shadow-purple-700":
                                    `${choice}` === `${requirements.bedrooms}`,
                                }
                              )}
                              key={idx}
                            >
                              {choice}
                            </Selectable>
                          ))}
                        </div>
                      </div> */}

                  {/* Bathrooms */}
                  {/* <div className="flex flex-col items-center">
                        <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                          Number of bathrooms
                        </h4>
                        <div className="flex gap-2 p-4">
                          {[1, 2, 3, 4, 5].map((choice, idx) => (
                            <Selectable
                              onClick={() =>
                                setRequirements({
                                  ...requirements,
                                  bathrooms: choice,
                                })
                              }
                              className={`font-bold -md:px-6 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                  ${
                    `${choice}` === `${requirements.bathrooms}` &&
                    "border-purple-700 text-purple-700 shadow-md shadow-purple-700"
                  }
                `}
                              key={idx}
                            >
                              {choice}
                            </Selectable>
                          ))}
                        </div>
                      </div> */}

                  {/* Clean Time */}
                  {/* <div className="flex flex-col items-center">
                        <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                          Clean Time
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2 p-4">
                          {[
                            "Standard",
                            "Deep Clean",
                            "Moving In/Out",
                            "Post Construction",
                          ].map((choice, idx) => (
                            <Selectable
                              onClick={() =>
                                setRequirements({
                                  ...requirements,
                                  clean_type: choice,
                                })
                              }
                              className={`font-bold -md:px-4 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                  ${
                    `${choice}` === `${requirements.clean_type}` &&
                    "border-purple-700 text-purple-700 shadow-md shadow-purple-700"
                  }
                `}
                              key={idx}
                            >
                              {choice}
                            </Selectable>
                          ))}
                        </div>
                      </div> */}

                  {/* Next */}
                  <div className="flex py-12 justify-center">
                    <button
                      disabled={requirements.services.length < 1}
                      onClick={() =>
                        setRequirements({
                          ...requirements,
                          step: 1,
                        })
                      }
                      className=" disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                    >
                      <span>Next</span>
                      <ArrowLongRightIcon height={24} />
                    </button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel
                sx={{
                  "& .Mui-active, .Mui-completed": {
                    color: "rgb(126 34 206)",
                  },
                }}
                StepIconComponent={RequirementCustomizationStepIconComponent}
              >
                <h3 className="font-bold text-2xl px-4 ">Book Date and Time</h3>
              </StepLabel>
              <StepContent>
                <div>
                  {/* Date Picker backgroundColor: "rgba(126, 34, 206, .06)", */}
                  <div className="py-8 grid gap-4 lg:grid-cols-2">
                    <div className="bg-purple-700/20 rounded-xl py-2">
                      <h3 className="pt-2 px-12 text-xl font-extrabold text-purple-900">
                        Start Date
                      </h3>
                      <StaticDatePicker
                        onChange={(dateTime) => {
                          setRequirements({
                            ...requirements,
                            start_date: dateTime,
                          });
                        }}
                        sx={{
                          backgroundColor: "transparent",
                          padding: "10px 20px",
                        }}
                        slotProps={{
                          leftArrowIcon: {
                            color: "rgb(126 34 206)",
                            width: 32,
                          },
                          rightArrowIcon: {
                            color: "rgb(126 34 206)",
                            width: 32,
                          },
                          day: {
                            sx: {
                              color: "rgb(126 34 206)",
                              fontWeight: "bolder",
                              backgroundColor: "rgba(126, 34, 206, 0.1)",
                            },
                          },
                        }}
                        slots={{
                          leftArrowIcon: ArrowLongLeftIcon,
                          rightArrowIcon: ArrowLongRightIcon,
                        }}
                        orientation="portrait"
                        value={requirements.start_date}
                      />
                    </div>
                    <div className="bg-purple-700/20 rounded-xl py-2">
                      <h3 className="pt-2 px-12 text-xl font-extrabold text-purple-900">
                        End Date
                      </h3>
                      <StaticDatePicker
                        onChange={(dateTime) => {
                          setRequirements({
                            ...requirements,
                            end_date: dateTime,
                          });
                        }}
                        sx={{
                          backgroundColor: "transparent",
                          padding: "10px 20px",
                        }}
                        slotProps={{
                          leftArrowIcon: {
                            color: "rgb(126 34 206)",
                            width: 32,
                          },
                          rightArrowIcon: {
                            color: "rgb(126 34 206)",
                            width: 32,
                          },
                          day: {
                            sx: {
                              color: "rgb(126 34 206)",
                              fontWeight: "bolder",
                              backgroundColor: "rgba(126, 34, 206, 0.1)",
                            },
                          },
                        }}
                        slots={{
                          leftArrowIcon: ArrowLongLeftIcon,
                          rightArrowIcon: ArrowLongRightIcon,
                        }}
                        orientation="portrait"
                        value={requirements.end_date}
                      />
                    </div>
                    <div className="bg-purple-700/20 rounded-xl py-2">
                      <h3 className="pt-2 px-12 text-xl font-extrabold text-purple-900">
                        Start Time
                      </h3>
                      <StaticTimePicker
                        onChange={(dateTime) => {
                          setRequirements({
                            ...requirements,
                            start_time: dateTime,
                          });
                        }}
                        sx={{
                          backgroundColor: "transparent",
                          padding: "10px 20px",
                        }}
                        slotProps={{
                          day: {
                            sx: {
                              color: "rgb(126 34 206)",
                              fontWeight: "bolder",
                              backgroundColor: "rgba(126, 34, 206, 0.1)",
                            },
                          },
                        }}
                        slots={{
                          leftArrowIcon: ArrowLongLeftIcon,
                          rightArrowIcon: ArrowLongRightIcon,
                        }}
                        orientation="portrait"
                        value={requirements.start_time}
                      />
                    </div>
                    <div className="bg-purple-700/20 rounded-xl py-2">
                      <h3 className="pt-2 px-12 text-xl font-extrabold text-purple-900">
                        End Time
                      </h3>
                      <StaticTimePicker
                        onChange={(dateTime) => {
                          setRequirements({
                            ...requirements,
                            end_time: dateTime,
                          });
                        }}
                        sx={{
                          backgroundColor: "transparent",
                          padding: "10px 20px",
                        }}
                        slotProps={{
                          day: {
                            sx: {
                              color: "rgb(126 34 206)",
                              fontWeight: "bolder",
                              backgroundColor: "rgba(126, 34, 206, 0.1)",
                            },
                          },
                        }}
                        slots={{
                          leftArrowIcon: ArrowLongLeftIcon,
                          rightArrowIcon: ArrowLongRightIcon,
                        }}
                        orientation="portrait"
                        value={requirements.end_time}
                      />
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center px-4 justify-around">
                    <button
                      onClick={() =>
                        setRequirements({
                          ...requirements,
                          step: 0,
                        })
                      }
                      className=" flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                    >
                      <ArrowLongLeftIcon height={24} />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() =>
                        setRequirements({
                          ...requirements,
                          step: 2,
                        })
                      }
                      className=" flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                    >
                      <span>Next</span>
                      <ArrowLongRightIcon height={24} />
                    </button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel
                sx={{
                  "& .Mui-active, .Mui-completed": {
                    color: "rgb(126 34 206)",
                  },
                }}
                StepIconComponent={RequirementCustomizationStepIconComponent}
              >
                <h3 className="font-bold text-2xl px-4">Select Frequency</h3>
              </StepLabel>
              <StepContent>
                <div>
                  {/* Select Frequency */}
                  <div className="flex flex-col items-center">
                    <h4 className="font-extrabold text-gray-600 mt-8">
                      <AppName />
                      <span>Save save 20% annually</span>
                    </h4>
                    <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                      Recurring
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2 p-4 mb-8">
                      {cleaningFrequencies.map((choice, idx) => (
                        <Selectable
                          onClick={() =>
                            setRequirements({
                              ...requirements,
                              cleaning_frequency_id: choice.id,
                            })
                          }
                          className={`font-bold -md:px-4 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                  ${
                    `${choice.id}` ===
                      `${requirements.cleaning_frequency_id}` &&
                    "border-purple-700 text-purple-700 shadow-md shadow-purple-700"
                  }
                `}
                          key={idx}
                        >
                          {choice.name}
                        </Selectable>
                      ))}
                    </div>
                  </div>

                  <Typography
                    component="div"
                    variant="h5"
                    className="text-center mb-4"
                  >
                    Click to select
                  </Typography>

                  {/* Navigation */}
                  <div className="flex items-center px-4 justify-around">
                    <button
                      onClick={() =>
                        setRequirements({
                          ...requirements,
                          step: 1,
                        })
                      }
                      className=" flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                    >
                      <ArrowLongLeftIcon height={24} />
                      <span>Previous</span>
                    </button>
                    <button
                      disabled={!Boolean(requirements.cleaning_frequency_id)}
                      className=" disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                      onClick={() =>
                        setRequirements({
                          ...requirements,
                          step: 3,
                        })
                      }
                    >
                      <span>Next</span>
                      <ArrowLongRightIcon height={24} />
                    </button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel
                sx={{
                  "& .Mui-active, .Mui-completed": {
                    color: "rgb(126 34 206)",
                  },
                }}
                StepIconComponent={RequirementCustomizationStepIconComponent}
              >
                <h3 className="font-bold text-2xl px-4 ">
                  Address and Details
                </h3>
              </StepLabel>
              <StepContent>
                <div className="px-4">
                  {/*  */}
                  <div className="">
                    <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                      Address
                    </h4>
                    <div className=" max-w-4xl flex -md:flex-col gap-4 p-4">
                      <input
                        value={requirements.access_info.address_name || ""}
                        onChange={(e) => {
                          setRequirements({
                            ...requirements,
                            access_info: {
                              ...requirements.access_info,
                              address_name: e.target.value,
                            },
                          });
                        }}
                        className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
                        placeholder="Enter a location"
                      />
                      <input
                        value={requirements.access_info.address_code || ""}
                        onChange={(e) => {
                          setRequirements({
                            ...requirements,
                            access_info: {
                              ...requirements.access_info,
                              address_code: e.target.value,
                            },
                          });
                        }}
                        className="border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
                        placeholder="Address Code"
                      />
                    </div>
                  </div>

                  <div className="">
                    <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                      How do we get in?
                    </h4>

                    <div className="flex flex-wrap gap-2 p-4">
                      {[
                        "Someone is Home",
                        "Doorman",
                        "Hidden Key",
                        "Others",
                      ].map((choice, idx) => (
                        <Selectable
                          onClick={() =>
                            setRequirements({
                              ...requirements,
                              access_info: {
                                ...requirements.access_info,
                                how_to_get_in: choice,
                              },
                            })
                          }
                          className={`font-bold -md:px-4 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                  ${
                    `${choice}` ===
                      `${requirements.access_info.how_to_get_in}` &&
                    "border-purple-700 text-purple-700 shadow-md shadow-purple-700"
                  }
                `}
                          key={idx}
                        >
                          {choice}
                        </Selectable>
                      ))}
                    </div>
                    <Typography component="div" variant="h5" className="">
                      Click to select
                    </Typography>
                  </div>

                  <div className="">
                    <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                      Any pets?
                    </h4>
                    <div className="flex flex-wrap gap-2 p-4">
                      {["Yes", "No"].map((choice, idx) => (
                        <Selectable
                          onClick={() =>
                            setRequirements({
                              ...requirements,
                              access_info: {
                                ...requirements.access_info,
                                any_pets: choice === "Yes",
                              },
                            })
                          }
                          className={`font-bold -md:px-4 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                  ${
                    `${choice}` ===
                      `${requirements.access_info.any_pets ? "Yes" : "No"}` &&
                    "border-purple-700 text-purple-700 shadow-md shadow-purple-700"
                  }
                `}
                          key={idx}
                        >
                          {choice}
                        </Selectable>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`${
                      requirements.access_info.any_pets ? "flex" : "hidden"
                    } max-w-4xl mb-8 duration-300`}
                  >
                    <input
                      value={requirements.access_info.pets_description || ""}
                      onChange={(e) => {
                        setRequirements({
                          ...requirements,
                          access_info: {
                            ...requirements.access_info,
                            pets_description: e.target.value,
                          },
                        });
                      }}
                      className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
                      placeholder="What types of pets? Some of our cleaners have pet allergies"
                    />
                  </div>

                  <div>
                    <h4 className="uppercase font-extrabold text-gray-400 mt-8">
                      Any additional notes?
                    </h4>
                    <div className="flex max-w-4xl mb-8">
                      <textarea
                        value={requirements.access_info.additional_notes || ""}
                        onChange={(e) => {
                          setRequirements({
                            ...requirements,
                            access_info: {
                              ...requirements.access_info,
                              additional_notes: e.target.value,
                            },
                          });
                        }}
                        rows={4}
                        className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
                        placeholder="Additional information?"
                      ></textarea>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center px-4 justify-around">
                    <button
                      onClick={() =>
                        setRequirements({
                          ...requirements,
                          step: 2,
                        })
                      }
                      className=" flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                    >
                      <ArrowLongLeftIcon height={24} />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() => handleSubmit()}
                      disabled={
                        !Boolean(
                          requirements.access_info.address_name &&
                            requirements.access_info.address_code &&
                            requirements.access_info.how_to_get_in
                        )
                      }
                      className=" disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-4 bg-purple-900 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-700 duration-300"
                    >
                      <span>Finish</span>
                      <ArrowLongRightIcon height={24} />
                    </button>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
}

function PaymentDetails({ requirements }) {
  const [paymentDetails, setPaymentDetails] = useState({
    how_to_contact: "Call",
  });

  return (
    <div className="grid gap-4">
      <div>
        <h4 className="uppercase font-extrabold text-gray-400 mt-8">
          Add in your payment details through our secure gateway
        </h4>

        {/*  */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="grid p-2 items-start">
            <label className="uppercase text-sm font-bold text-gray-500">
              Credit Card
            </label>
            <input
              className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="grid p-2">
              <label className="uppercase text-sm font-bold text-gray-500">
                Exp Date
              </label>
              <input
                className="border-3 w-full px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
                placeholder="mm/yyyy"
              />
            </div>
            <div className="grid p-2">
              <label className="uppercase text-sm font-bold text-gray-500">
                CVV
              </label>
              <input
                className="border-3 w-full px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
                placeholder="CVV"
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="grid p-2 items-start">
            <label className="uppercase text-sm font-bold text-gray-500">
              Full Name
            </label>
            <input className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700" />
          </div>
          <div className="grid p-2 items-start">
            <label className="uppercase text-sm font-bold text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700"
            />
          </div>
        </div>

        {/*  */}
        {/* <div className="grid md:grid-cols-2 gap-2">
          <div className="grid p-2 items-start">
            <label className="uppercase text-sm font-bold text-gray-500">
              Phone Number
            </label>
            <input className="grow border-3 px-4 py-2 rounded-lg focus:outline-purple-700 focus:shadow-md focus:shadow-purple-700" />
          </div>
          <div className="grid p-2 items-start">
            <label className="uppercase text-sm font-bold text-gray-500">
              How do we contact you
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Text", "Call", "Email"].map((choice, idx) => (
                <Selectable
                  onClick={() =>
                    setPaymentDetails({
                      ...paymentDetails,
                      how_to_contact: choice,
                    })
                  }
                  className={`font-bold -md:px-4 md:px-6 -md:py-1 md:py-2 lg:px-8 lg:py-3 border-3 rounded-lg hover:bg-purple-700 hover:text-white ",
                  ${
                    `${choice}` === `${paymentDetails.how_to_contact}` &&
                    "border-purple-700 text-purple-700 shadow-md shadow-purple-700"
                  }
                `}
                  key={idx}
                >
                  {choice}
                </Selectable>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <div className="bg-gray-100 py-8 px-4 rounded-lg">
        <h4 className="uppercase font-extrabold text-purple-800">Billing</h4>
        <div className="grid lg:grid-cols-2 my-4 gap-4">
          <div className="rounded-lg bg-[#fff] p-4">
            <div className="grid grid-cols-3 font-bold text-center">
              <div className="border-b border-r py-2 border-purple-700">
                {requirements.bedrooms === "Studio"
                  ? "Studio"
                  : `${requirements.bedrooms} Bedrooms`}
              </div>
              <div className="border-b border-r py-2 border-purple-700">
                {requirements.bathrooms} Bathrooms
              </div>
              <div className="border-b py-2 border-purple-700">
                {requirements.clean_type}
              </div>
            </div>
            <div className="flex gap-2 font-bold py-3 border-b border-purple-700">
              <span>{requirements.frequency}</span>
              <span>|</span>
              <span className="text-purple-700 ">{`${requirements.date_time[
                "$d"
              ].toDateString()} at ${
                requirements.date_time["$d"].toTimeString().split("GMT")[0]
              }`}</span>
            </div>
            <div className="flex gap-2 font-bold py-3 border-b border-purple-700">
              {requirements.address}
            </div>
            <div className="flex gap-2 font-bold py-3 border-b border-purple-700">
              {requirements.apt}
            </div>
          </div>
          <div className="rounded-lg bg-[#fff] p-4 mb-8">
            <table className="w-full">
              <tbody>
                <tr className="">
                  <td className="p-2 font-bold">Value</td>
                  <td className="p-2 text-end font-bold">$125.99</td>
                </tr>
                <tr className="border-b border-purple-700/20">
                  <td className="p-2 font-bold">Discounts</td>
                  <td className="p-2 text-end font-bold">-$15.89</td>
                </tr>
                <tr className="">
                  <td className="p-2">Subtotal</td>
                  <td className="p-2 text-end font-bold">$110.01</td>
                </tr>
                <tr className="border-b border-purple-700/20">
                  <td className="p-2">Tax</td>
                  <td className="p-2 text-end font-bold">+$5.20</td>
                </tr>
                <tr className="border-b border-purple-700/20">
                  <td className="p-2 font-extrabold">Total</td>
                  <td className="p-2 text-end font-bold">$610.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <button className="mx-auto flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Services;
