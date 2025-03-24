"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Page({}) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [control, setControl] = useState(true);
  const [dark, setDark] = useState("");
  const [id, setId] = useState(0);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const storeTaskData = localStorage.getItem("taskData");
    if (storeTaskData) {
      const taskData = JSON.parse(storeTaskData);

      setInputTitle(taskData[0].title);
      setInputDescription(taskData[0].description);
      setId(taskData[0].id);
    }
  }, []);

  const changeMode = () => {
    if (control) {
      setDark("dark");
      setControl(false);
    } else {
      setDark("");
      setControl(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputTitle || !inputDescription) {
      alert("Por favor, complete los campos");
      return;
    }
    const newTodo = {
      title: inputTitle,
      description: inputDescription,
    };

    const apiUrlMod = `${apiURL}/${id}`;

    try {
      const response = await fetch(apiUrlMod, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tarea Modificada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al modificar la tarea");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  return (
    <>
      <main
        className={`bg-veryLightGrayishBlue flex flex-col min-h-screen ${dark} dark:bg-veryDarkBlue`}
      >
        <div className='bg-[url("/bg-mobile-light.jpg")] dark:bg-[url("/bg-mobile-dark.jpg")] xl:bg-[url("/bg-desktop-light.jpg")] xl:dark:bg-[url("/bg-desktop-dark.jpg")] bg-no-repeat bg-cover h-[200px] px-5 flex flex-col justify-evenly py-3 md:px-[31%] md:h-[260px] md:pt-16'>
          <Link href={"/"} className="text-white ml-[-30px] mb-6 ">
            <span className="text-3xl">←</span> Volver
          </Link>
          <div className=" flex justify-between items-baseline ml-1">
            <div>
              <h1 className="text-white text-[26px] font-bold uppercase tracking-[10px] md:text-[34px] md:-mb-10">
                Task:
              </h1>
              <p className="mt-8 text-2xl text-white">{inputTitle}</p>
            </div>

            <Image
              onClick={changeMode}
              className="w-5 h-5 cursor-pointer"
              src={control ? "/icon-moon.svg" : "/icon-sun.svg"}
              alt="icono"
              width={25}
              height={25}
            />
          </div>

          <form onSubmit={handleSubmit} className="w-80">
            <div className="w-full bg-white h-12 rounded-sm flex items-center dark:bg-veryDarkDesaturatedBlue md:h-[58px] px-3 mb-6 mt-[32px]">
              <input
                type="text"
                className="border-0 active:border-0 focus:border-0 outline-none placeholder:text-[16px] dark:bg-veryDarkDesaturatedBlue sm:text-[16px] dark:sm:text-lightGrayishBlueDark w-80 cursor-text "
                placeholder="Title:"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
            </div>
            <div className="w-full bg-white h-12 rounded-sm flex items-center dark:bg-veryDarkDesaturatedBlue md:h-[58px] px-3 my-6">
              <textarea
                type="textarea"
                className="border-0 active:border-0 focus:border-0 outline-none placeholder:text-[16px] dark:bg-veryDarkDesaturatedBlue sm:text-[16px] dark:sm:text-lightGrayishBlueDark w-80 resize-none cursor-text "
                placeholder="Description:"
                value={inputDescription}
                onChange={(e) => setInputDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex justify-center bg-blue-500 dark:bg-white dark:text-black px-2 h-8 rounded-md text-white items-center cursor-pointer "
              >
                Modificar
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer
        className={`bg-veryLightGrayishBlue p-5 dark:bg-veryDarkBlue ${dark} dark:text-veryDarkGrayishBlueDark md:text-center`}
      >
        <div className="attribution text-xs dark:border-0">
          Challenge by <p>Academia ForIT</p>. Coded by{" "}
          <a href="https://www.linkedin.com/in/alejandro-elias-full-stack/">
            Alejandro Elias
          </a>
          .
        </div>
      </footer>
    </>
  );
}
