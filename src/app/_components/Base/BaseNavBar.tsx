"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SiAirtable } from "react-icons/si";
import Image from "next/image";
import DropDownMenu from "../DropDownMenu";

const NavBar = () => {
  const {data: session } = useSession();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleDropDown = () => setIsDropDownOpen(!isDropDownOpen);

  return (
    <nav className="flex items-center justify-between w-full px-4 py-3 pale-teal-green sticky top-0 z-30">
      {/** left portion */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <SiAirtable 
            fill="white" 
            size={20}
            className="mr-2"
          />
          <h1>Untitled base</h1>
          <svg
            role='button'
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="white"
          >
            <use href="/icons/icons_definitions.svg#ChevronDown"></use>
          </svg>
        </div>

        <div className="text-[0.8rem] flex gap-4 items-center text-white">
          <div role="button" className="flex justify-center items-center dark-teal-green rounded-2xl px-3 py-[0.4rem] text-white">
            <span>Data</span>
          </div>
          <div role="button" className="base-nav-item">
            <span>Automation</span>
          </div>
          <div role="button"  className="base-nav-item">
            <span>Interfaces</span>
          </div>
          <div className="separator"></div>
          <div role="button"  className="base-nav-item">
            <span>Forms</span>
          </div>
        </div>
      </div>

      {/** right portion */}
      <div className="flex items-center gap-1">
        <div className="base-nav-item">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="white"
          >
            <path fill-rule="nonzero" d="M8.13367 2.0017C6.52708 1.96745 4.93757 2.57928 3.75879 3.75902L1.63452 5.87719C1.54063 5.97081 1.48777 6.09789 1.48756 6.23048C1.48736 6.36307 1.53982 6.49031 1.63342 6.58422C1.67978 6.63073 1.73485 6.66765 1.79547 6.69287C1.8561 6.7181 1.92111 6.73114 1.98677 6.73124C2.05244 6.73134 2.11748 6.71851 2.17819 6.69347C2.23889 6.66843 2.29407 6.63168 2.34058 6.58532L4.46558 4.46654C4.46537 4.46675 4.46578 4.46634 4.46558 4.46654C5.89626 3.03469 8.04552 2.60602 9.91565 3.38024C11.7858 4.15445 13.0029 5.97586 13.0029 7.99999C13.0029 10.0241 11.7858 11.8455 9.91565 12.6197C8.04552 13.394 5.89687 12.9659 4.46619 11.534C4.41977 11.4876 4.36466 11.4507 4.30401 11.4256C4.24335 11.4004 4.17833 11.3875 4.11266 11.3875C4.047 11.3874 3.98197 11.4003 3.92129 11.4255C3.86062 11.4506 3.80548 11.4874 3.75903 11.5338C3.71258 11.5802 3.67573 11.6353 3.65057 11.696C3.62542 11.7566 3.61246 11.8217 3.61244 11.8873C3.61242 11.953 3.62533 12.018 3.65044 12.0787C3.67555 12.1394 3.71237 12.1945 3.75879 12.241C5.47337 13.9569 8.05683 14.4715 10.2981 13.5437C12.5394 12.6158 14.0029 10.4257 14.0029 7.99998C14.0029 5.57424 12.5394 3.38414 10.2981 2.45628C9.5977 2.16633 8.86394 2.01727 8.13367 2.0017Z M1.98755 3.23119C1.85494 3.23119 1.72776 3.28387 1.634 3.37764C1.54023 3.47141 1.48755 3.59858 1.48755 3.73119L1.48756 6.23048C1.48736 6.36307 1.53982 6.49031 1.63342 6.58422C1.72719 6.67799 1.85416 6.73123 1.98677 6.73124L4.48755 6.73119C4.55321 6.73119 4.61823 6.71826 4.67889 6.69313C4.73955 6.668 4.79467 6.63117 4.8411 6.58474C4.88753 6.53832 4.92436 6.4832 4.94949 6.42253C4.97462 6.36187 4.98755 6.29685 4.98755 6.23119C4.98755 6.09858 4.93487 5.97141 4.8411 5.87764C4.74733 5.78387 4.62016 5.73119 4.48755 5.73119H2.48755V3.73119C2.48755 3.59858 2.43487 3.47141 2.3411 3.37764C2.24733 3.28387 2.12016 3.23119 1.98755 3.23119Z M8 4.49999C7.86739 4.49999 7.74021 4.55267 7.64645 4.64644C7.55268 4.7402 7.5 4.86738 7.5 4.99999V7.99999C7.50721 8.02138 7.51585 8.04226 7.52588 8.06249C7.53865 8.12323 7.56262 8.18106 7.59656 8.23302C7.62459 8.28835 7.66267 8.33799 7.70886 8.37938C7.72139 8.3982 7.73517 8.41614 7.75012 8.4331L10.3501 9.9331C10.407 9.96591 10.4698 9.98721 10.5349 9.99576C10.6 10.0043 10.6661 9.99995 10.7295 9.98294C10.793 9.96593 10.8524 9.93659 10.9045 9.89659C10.9566 9.8566 11.0003 9.80675 11.0331 9.74987C11.0659 9.69299 11.0872 9.63021 11.0957 9.5651C11.1043 9.5 11.0999 9.43385 11.0829 9.37043C11.0659 9.30701 11.0366 9.24756 10.9966 9.19547C10.9566 9.14339 10.9067 9.0997 10.8499 9.06688L8.5 7.71117V4.99999C8.5 4.86738 8.44732 4.7402 8.35355 4.64644C8.25979 4.55267 8.13261 4.49999 8 4.49999Z" />
          </svg>
        </div>

        <div className="flex items-center gap-3">
          <div role="button" className="base-nav-item gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="white"
            >
              <path fill-rule="nonzero" d="M8.07349 4.50134C7.75062 4.49155 7.43049 4.55078 7.13904 4.67151C6.36183 4.99344 5.75017 5.76895 5.75 6.74988C5.74997 6.88249 5.80262 7.00968 5.89636 7.10347C5.99011 7.19726 6.11727 7.24997 6.24988 7.25C6.31554 7.25002 6.38056 7.2371 6.44123 7.21199C6.5019 7.18687 6.55703 7.15006 6.60347 7.10364C6.64991 7.05722 6.68675 7.00211 6.71189 6.94145C6.73704 6.8808 6.74998 6.81578 6.75 6.75012C6.75013 6.17215 7.08092 5.77793 7.52173 5.59534C7.96254 5.41275 8.47515 5.45759 8.88391 5.86621C9.24251 6.22468 9.34907 6.75995 9.15503 7.22839C8.96099 7.69684 8.50716 8.00009 8.00012 8C7.93445 7.99999 7.86942 8.01292 7.80875 8.03804C7.74808 8.06316 7.69295 8.09999 7.6465 8.14642C7.60006 8.19285 7.56322 8.24797 7.53809 8.30864C7.51295 8.36931 7.50001 8.43433 7.5 8.5V9C7.5 9.13261 7.55268 9.25979 7.64645 9.35355C7.74021 9.44732 7.86739 9.5 8 9.5C8.13261 9.5 8.25979 9.44732 8.35355 9.35355C8.44732 9.25979 8.5 9.13261 8.5 9V8.93738C9.1999 8.77686 9.79665 8.2924 10.0789 7.61108C10.4266 6.77156 10.2336 5.80137 9.59094 5.15894C9.15735 4.7255 8.61159 4.51766 8.07349 4.50134Z M8 12C8.41419 12 8.75 11.6642 8.75 11.25C8.75 10.8358 8.41419 10.5 8 10.5C7.58581 10.5 7.25 10.8358 7.25 11.25C7.25 11.6642 7.58581 12 8 12Z M8 1.5C4.41604 1.5 1.5 4.41604 1.5 8C1.5 11.5839 4.41603 14.5 8 14.5C11.5839 14.5 14.5 11.5839 14.5 8C14.5 4.41603 11.5839 1.5 8 1.5ZM8 2.5C11.0435 2.5 13.5 4.95647 13.5 8C13.5 11.0435 11.0435 13.5 8 13.5C4.95647 13.5 2.5 11.0435 2.5 8C2.5 4.95647 4.95647 2.5 8 2.5Z" />
            </svg>
            <span className="text-white text-xs">Help</span>
          </div>
          <div role="button"
            className="base-nav-item"
            style={
              {backgroundColor: "#006055"}
            }
          >
            <span className="text-white text-xs">Trial: 14 days left</span>
          </div>
          <div
            role="button"
            className="flex items-center rounded-2xl px-3 py-2 gap-1 bg-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#008080"
            >
              <path fill-rule="nonzero" d="M10.5922 3C10.2508 3.00105 9.91112 3.04688 9.58166 3.13623C9.45368 3.17094 9.34474 3.25507 9.27878 3.3701C9.21283 3.48514 9.19527 3.62166 9.22997 3.74963C9.26468 3.87761 9.34881 3.98655 9.46384 4.05251C9.57888 4.11846 9.7154 4.13602 9.84338 4.10132C10.0882 4.03493 10.3407 4.00099 10.5944 4.00012C12.1188 4.00046 13.3437 5.22551 13.3437 6.75C13.3437 8.27471 12.1184 9.5 10.5937 9.5V9.5C10.5286 9.51286 10.4664 9.53855 10.4114 9.57556C10.3503 9.58836 10.2923 9.61245 10.2401 9.64661C10.2059 9.69888 10.1818 9.75709 10.1691 9.81824C10.1322 9.87324 10.1066 9.93502 10.0937 10C10.1066 10.0651 10.1323 10.1273 10.1693 10.1824C10.1821 10.2434 10.2062 10.3015 10.2403 10.3536C10.2926 10.3878 10.3508 10.4119 10.412 10.4247C10.467 10.4616 10.5288 10.4872 10.5937 10.5V10.5C12.2226 10.499 13.7486 11.2915 14.6844 12.6248C14.7222 12.6785 14.7701 12.7243 14.8255 12.7595C14.881 12.7947 14.9428 12.8187 15.0075 12.83C15.0721 12.8413 15.1384 12.8398 15.2025 12.8255C15.2666 12.8112 15.3272 12.7844 15.381 12.7467C15.4895 12.6705 15.5633 12.5544 15.5862 12.4238C15.6091 12.2932 15.5792 12.1588 15.5031 12.0503C14.7925 11.0381 13.7964 10.2873 12.6661 9.87122C13.6757 9.19798 14.3437 8.04978 14.3437 6.75C14.3437 4.68486 12.6589 3 10.5937 3H10.5922Z M5.49999 3C3.43484 3 1.74999 4.68485 1.74999 6.75C1.74999 8.81515 3.43484 10.4998 5.49999 10.4998C7.56514 10.4998 9.24999 8.81515 9.24999 6.75C9.24999 4.68485 7.56514 3 5.49999 3ZM5.49999 9.49976C3.54646 9.49969 1.71405 10.4516 0.590934 12.05C0.514698 12.1585 0.484679 12.2929 0.50748 12.4235C0.530281 12.5541 0.604033 12.6703 0.712516 12.7466C0.821007 12.8228 0.955338 12.8528 1.08596 12.83C1.21658 12.8072 1.3328 12.7335 1.40905 12.625C2.34551 11.2922 3.87113 10.4997 5.49999 10.4998C7.12885 10.4998 8.65439 11.2923 9.59093 12.625C9.66718 12.7335 9.7834 12.8072 9.91402 12.83C10.0446 12.8528 10.179 12.8228 10.2875 12.7466C10.3959 12.6703 10.4697 12.5541 10.4925 12.4235C10.5153 12.2929 10.4853 12.1585 10.409 12.05C9.28586 10.4518 7.45347 9.4998 5.49999 9.49976ZM5.49999 4C7.02471 4 8.24999 5.22528 8.24999 6.75C8.24999 8.27472 7.02471 9.49976 5.49999 9.49976C3.97527 9.49976 2.74999 8.27472 2.74999 6.75C2.74999 5.22528 3.97527 4 5.49999 4Z" />
            </svg>
            <span className="text-xs" style={{color:`var(--pale-teal-green)`}}>Share</span>
          </div>
          <div role="button" className=" bg-white rounded-full p-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#008080"
            >
              <path fill-rule="nonzero" d="M6 11.5C5.86739 11.5 5.74021 11.5527 5.64645 11.6464C5.55268 11.7402 5.5 11.8674 5.5 12V12.5C5.49987 13.8749 6.62514 15.0001 8 15C8.66281 15 9.29903 14.7365 9.7677 14.2678C10.2364 13.7991 10.5 13.1628 10.5 12.5V12C10.5 11.8674 10.4473 11.7402 10.3536 11.6464C10.2598 11.5527 10.1326 11.5 10 11.5C9.86739 11.5 9.74021 11.5527 9.64645 11.6464C9.55268 11.7402 9.5 11.8674 9.5 12V12.5C9.50001 12.898 9.34212 13.2793 9.06067 13.5607C8.77926 13.8421 8.398 14 8 14C7.16564 14.0001 6.49992 13.3344 6.5 12.5V12C6.5 11.8674 6.44732 11.7402 6.35355 11.6464C6.25978 11.5527 6.13261 11.5 6 11.5Z M8.03394 1.50012C5.26871 1.48474 3.00893 3.73483 3.01245 6.5V7.00014C3.01245 9.16781 2.56115 10.3731 2.19849 10.9995V10.9995C2.11088 11.1513 2.06437 11.324 2.06421 11.4992C2.06387 12.0445 2.51528 12.498 3.06055 12.5L3.06238 12.5002H12.9374L12.9392 12.5C13.1144 12.4994 13.2863 12.4529 13.4377 12.3649C13.9096 12.0911 14.0746 11.4723 13.8016 10.9999V10.9999C13.4389 10.3735 12.9874 9.16781 12.9874 7.00015V6.5563C12.9874 3.80889 10.7849 1.52098 8.03503 1.50015L8.03394 1.50012ZM8.02734 2.5V2.5C10.2272 2.51694 11.9874 4.34136 11.9874 6.55628V7.00012C11.9874 9.30695 12.4736 10.7013 12.9358 11.5C12.9358 11.5 12.9383 11.4986 12.9358 11.5L3.06434 11.5001V11.5001C3.52659 10.7015 4.01246 9.30699 4.01246 7.00013V6.50013V6.50013C4.00929 4.27789 5.80529 2.48824 8.02734 2.5Z" />
            </svg>
          </div>
          <div className="border-white border-2 rounded-full">
            <Image
              src={session?.user?.image ?? "/favicon.ico"}
              alt="profile-image"
              width={26}
              height={26}
              className="rounded-full cursor-pointer"
              onClick={toggleDropDown}
            />
          </div>
        </div>
        
        {isDropDownOpen && <DropDownMenu top="top-14" />}
      </div>
    </nav>
  );
}

export default NavBar;

