import Image from "next/image";

export default function Home() {
  return (
    <div className="box-border ">
      <div className={`bg-gray-200 h-screen flex justify-center items-center `}>
        <div className="flex-initial bg-white rounded-xl shadow-md w-1/3 h-1/2 p-10 flex flex-col min-h-96 min-w-96">
          <div className="2xl:text-3xl text-xl text-center font-bold mb-8 2xl:mb-10">
            <span className="text-blue-700">VEHICLE MANAGEMENT SYSTEM</span>
            <span className="text-sky-500"> - VMS </span>
          </div>
          <div className="self-center w-2/3">
            <div className="text-sm 2xl:text-md block mb-2 font-medium text-gray-900 dark:text-white">
              Username:
            </div>
            <input
              type="text"
              id="first_name"
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm 2xl:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              required
            />
            <div className="block mb-2 text-sm 2xl:text-md  font-medium text-gray-900 dark:text-white">
              Password:
            </div>
            <input
              type="password"
              id="password"
              className="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm 2xl:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
            <div className="text-sm 2xl:text-md cursor-pointer w-full h-10 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 rounded-md text-center items-center content-center shadow-md ">
              <div className="text-white drop-shadow-lg select-none">Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
