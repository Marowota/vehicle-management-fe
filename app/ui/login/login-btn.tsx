"use client";
interface LoginHandler {
  handler: () => void;
}

export default function LoginBtn({ handler }: LoginHandler) {
  return (
    <div
      className="text-sm 2xl:text-md cursor-pointer w-full h-10 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 rounded-md text-center items-center content-center shadow-md "
      onClick={(e) => {
        handler();
      }}
    >
      <div className="text-white drop-shadow-lg select-none">Login</div>
    </div>
  );
}
