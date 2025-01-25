"use client";
import {signOut, useSession} from "next-auth/react";

type Props = {
  top: string;
}


const DropDownMenu = ({top}: Props) => {
  const {data: session} = useSession();

  return (  
    <div className={`absolute right-4 ${top} w-sm bg-white border-2 rounded-lg shadow-md z-10`}>
      <div className="px-4 py-2">
        <p className="text-sm font-medium">{session?.user?.name}</p>
        <p className="text-[0.75rem] text-gray-500">{session?.user?.email}</p>
      </div>
      <hr />
      <button 
        className="px-4 py-2 w-full text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        onClick={() => signOut()}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="gray"
        >
          <path fill-rule="nonzero" d="M3 2C2.45364 2 2 2.45364 2 3V13C2.00007 13.5463 2.45357 13.9999 2.99988 14C2.99984 14 2.99992 14 2.99988 14H6.5C6.63261 14 6.75979 13.9473 6.85355 13.8536C6.94732 13.7598 7 13.6326 7 13.5C7 13.3674 6.94732 13.2402 6.85355 13.1464C6.75979 13.0527 6.63261 13 6.5 13H3.00012L3 3H6.5C6.6326 3 6.75978 2.94732 6.85355 2.85355C6.94732 2.75979 7 2.63261 7 2.5C7 2.36739 6.94732 2.24021 6.85355 2.14645C6.75978 2.05268 6.6326 2 6.5 2H3Z M10.875 4.875C10.7424 4.87502 10.6152 4.92771 10.5215 5.02148C10.4277 5.11525 10.3751 5.24241 10.3751 5.375C10.3751 5.50759 10.4277 5.63475 10.5215 5.72852L12.293 7.5H6.5C6.36739 7.5 6.24021 7.55268 6.14645 7.64645C6.05268 7.74021 6 7.86739 6 8C6 8.13261 6.05268 8.25979 6.14645 8.35355C6.24021 8.44732 6.36739 8.5 6.5 8.5H12.293L10.5215 10.2715C10.4277 10.3652 10.3751 10.4924 10.3751 10.625C10.3751 10.7576 10.4277 10.8848 10.5215 10.9785C10.6152 11.0723 10.7424 11.1249 10.875 11.1249C11.0076 11.1249 11.1348 11.0723 11.2285 10.9785L13.8535 8.35352C13.9414 8.26249 13.9915 8.14153 13.9938 8.01501C13.9959 8.01004 13.998 8.00504 14 8C13.9985 7.98678 13.9964 7.97363 13.9938 7.96057C13.9917 7.93512 13.9877 7.90985 13.9818 7.88501C13.9757 7.85934 13.9675 7.8342 13.9574 7.80981C13.9476 7.78622 13.936 7.7634 13.9227 7.74158C13.9089 7.7191 13.8934 7.69776 13.8762 7.67773C13.8691 7.66703 13.8615 7.6566 13.8535 7.64648L11.2285 5.02148C11.1348 4.92771 11.0076 4.87502 10.875 4.875Z" />
        </svg>
        <span className="text-slate-500">Log out</span>
      </button>
    </div>
  )
}

export default DropDownMenu;