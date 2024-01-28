"use client";
import SubmitButton from "@/components/submitButton/submitButton";
import { useFormState, useFormStatus } from "react-dom";
import { createInternship } from "@/lib/actions/internship";
import { User } from "@/lib/definitions/user";
export default function NewInternship({ user }: { user: User }) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createInternship, initialState);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="flex flex-col justify-center items-center w-[800px] h-fit gap-10  p-10 overflow-y-auto "
        action={dispatch}
      >
        {/* Informations sur l'entreprise */}
        <div className="flex-flex-col p-5 border-[1px] border-black rounded-lg w-full space-y-5 ">
          <div className="flex w-full gap-5 ">
            <div className="flex flex-col w-[50%] gap-3">
              <h1>Company Name</h1>
              <input
                type="text"
                name="companyName"
                placeholder="Name"
                required
                className="border-b-[1px] border-grey p-3"
              />
            </div>
            <div className="flex flex-col w-[50%] gap-3">
              <h1>Company Address</h1>
              <input
                type="text"
                name="companyAddress"
                placeholder="Address"
                required
                className="border-b-[1px] border-grey p-3"
              />
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="flex flex-col w-[50%] gap-3">
              <h1>City</h1>
              <input
                type="text"
                name="companyCity"
                placeholder="City"
                required
                className="border-b-[1px] border-grey p-3"
              />
            </div>
            <div className="flex flex-col w-[50%] gap-3">
              <h1>Zip Code</h1>
              <input
                type="text"
                name="companyZipCode"
                placeholder="Zip"
                required
                className="border-b-[1px] border-grey p-3"
              />
            </div>
          </div>
        </div>
        {/* Informations sur le tuteur */}
        <div className="flex flex-col justify-center gap-4 p-5 border-[1px] border-black rounded-lg w-full">
          <div className="flex w-full">
            <div className=" w-[50%]">
              <h1>Tutor Name</h1>
              <input
                type="text"
                name="tutorName"
                placeholder=""
                required
                className="border-b-[1px] border-grey p-3"
              />
            </div>
            <div className="w-[50%]">
              <h1>Tutor Phone</h1>
              <input
                type="tel"
                name="tutorPhone"
                placeholder=""
                required
                className="border-b-[1px] border-grey p-3"
              />
            </div>
          </div>
          <div className="">
            <h1>Tutor Email</h1>
            <input
              type="email"
              name="tutorEmail"
              placeholder=""
              required
              className="border-b-[1px] border-grey p-3 w-[90%]"
            />
          </div>
        </div>
        {/* Informations sur le stage */}
        <div className="flex flex-col p-3 border-[1px] border-black rounded-lg w-full gap-4">
          <div className="flex flex-col gap-3">
            <h1>Description</h1>
            <textarea
              name="description"
              placeholder="Description"
              required
              className="border-[1px] border-grey rounded-sm p-3"
            ></textarea>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Salary</h1>
            <div className="flex gap-1">
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                required
                // onChange={handleInputChange}
                className="border-b-[1px] border-grey p-3 w-[90%]"
              />
              <h2 className="flex self-end">€</h2>
            </div>
          </div>
        </div>

        {/* Upload de fichier */}
        <div className="flex flex-col items-center justify-center py-2">
          <input
            type="file"
            name="fileUpload"
            required
            className="block file:rounded-md file:bg-black file:text-white file:h-9 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="h-[1px] w-[150px] bg-black "></div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
