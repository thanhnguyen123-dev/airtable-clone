import React from 'react';
import TableSideItem from './TableSideItem';
import ViewSearchBar from './ViewSearchBar';
import CreateViewButton from './CreateViewButton';

const tableSideItems = [
  {name: "Calendar", color: "rgb(213, 68, 1)", d: "M5.75 7.5C5.61739 7.5 5.49021 7.55268 5.39645 7.64645C5.30268 7.74021 5.25 7.86739 5.25 8C5.25 8.13261 5.30268 8.25979 5.39645 8.35355C5.49021 8.44732 5.61739 8.5 5.75 8.5H6.45972L6.10962 8.93762C6.05075 9.01123 6.01388 9.09999 6.00326 9.19365C5.99265 9.28731 6.00872 9.38206 6.04963 9.46698C6.09054 9.55189 6.15462 9.62352 6.23448 9.6736C6.31433 9.72367 6.40672 9.75016 6.50098 9.75C6.87529 9.74929 7.10696 10.0953 6.96375 10.4412C6.96379 10.4411 6.9637 10.4412 6.96375 10.4412C6.89965 10.5961 6.76358 10.7079 6.59912 10.7405C6.59916 10.7405 6.59908 10.7405 6.59912 10.7405C6.43467 10.7731 6.26622 10.7219 6.14782 10.6032C6.10146 10.5567 6.04638 10.5197 5.98575 10.4945C5.92512 10.4693 5.86011 10.4563 5.79445 10.4562C5.72878 10.4561 5.66374 10.4689 5.60304 10.494C5.54234 10.519 5.48716 10.5558 5.44067 10.6022C5.39417 10.6485 5.35726 10.7036 5.33204 10.7642C5.30683 10.8249 5.2938 10.8899 5.29371 10.9556C5.29362 11.0212 5.30646 11.0863 5.33151 11.147C5.35656 11.2077 5.39332 11.2628 5.43969 11.3093C5.79332 11.6639 6.30238 11.8188 6.79357 11.7213C7.28484 11.6239 7.6962 11.2865 7.88769 10.8237C8.17053 10.1406 7.88369 9.40065 7.32678 9.01697L7.89038 8.31238C7.9492 8.23883 7.98605 8.15017 7.9967 8.0566C8.00735 7.96303 7.99136 7.86835 7.95057 7.78347C7.90979 7.69858 7.84585 7.62694 7.76614 7.57679C7.68643 7.52665 7.59418 7.50003 7.5 7.5H5.75Z M10.0472 7.50232C9.92336 7.49052 9.79953 7.52534 9.69995 7.59998L8.69995 8.34997C8.64741 8.38937 8.60315 8.43874 8.56969 8.49524C8.53624 8.55175 8.51424 8.61429 8.50495 8.6793C8.49567 8.74431 8.49928 8.81051 8.51559 8.87413C8.53189 8.93774 8.56057 8.99752 8.59998 9.05005C8.63937 9.10259 8.68874 9.14685 8.74524 9.1803C8.80175 9.21376 8.86429 9.23576 8.9293 9.24505C8.99431 9.25433 9.06052 9.25072 9.12413 9.23441C9.18774 9.21811 9.24752 9.18943 9.30005 9.15002L9.5 9V11.25C9.5 11.3826 9.55268 11.5098 9.64645 11.6036C9.74021 11.6973 9.86739 11.75 10 11.75C10.1326 11.75 10.2598 11.6973 10.3536 11.6036C10.4473 11.5098 10.5 11.3826 10.5 11.25V8C10.5 7.87559 10.4536 7.75566 10.3698 7.66363C10.2861 7.5716 10.1711 7.51409 10.0472 7.50232Z M5 1C4.86739 1 4.74021 1.05268 4.64645 1.14645C4.55268 1.24021 4.5 1.36739 4.5 1.5V2H3C2.45364 2 2 2.45364 2 3V13C2 13.5464 2.45364 14 3 14H13C13.5464 14 14 13.5464 14 13V3C14 2.45364 13.5464 2 13 2H11.5V1.5C11.5 1.36739 11.4473 1.24021 11.3536 1.14645C11.2598 1.05268 11.1326 1 11 1C10.8674 1 10.7402 1.05268 10.6464 1.14645C10.5527 1.24021 10.5 1.36739 10.5 1.5V2H5.5V1.5C5.5 1.36739 5.44732 1.24021 5.35355 1.14645C5.25979 1.05268 5.13261 1 5 1ZM3 3H4.5V3.5C4.5 3.63261 4.55268 3.75979 4.64645 3.85355C4.74021 3.94732 4.86739 4 5 4C5.13261 4 5.25979 3.94732 5.35355 3.85355C5.44732 3.75979 5.5 3.63261 5.5 3.5V3H10.5V3.5C10.5 3.63261 10.5527 3.75979 10.6464 3.85355C10.7402 3.94732 10.8674 4 11 4C11.1326 4 11.2598 3.94732 11.3536 3.85355C11.4473 3.75979 11.5 3.63261 11.5 3.5V3H13V5H3V3ZM3 6H13V13H3V6Z"}
  ,{name: "Gallery", color: 'rgb(124, 55, 239)', d: "M1.5 3.5C1.5 2.67157 2.17157 2 3 2H6C6.82843 2 7.5 2.67157 7.5 3.5V6C7.5 6.82843 6.82843 7.5 6 7.5H3C2.17157 7.5 1.5 6.82843 1.5 6V3.5ZM3 3C2.72386 3 2.5 3.22386 2.5 3.5V6C2.5 6.27614 2.72386 6.5 3 6.5H6C6.27614 6.5 6.5 6.27614 6.5 6V3.5C6.5 3.22386 6.27614 3 6 3H3Z M8.5 3.5C8.5 2.67157 9.17157 2 10 2H13C13.8284 2 14.5 2.67157 14.5 3.5V6C14.5 6.82843 13.8284 7.5 13 7.5H10C9.17157 7.5 8.5 6.82843 8.5 6V3.5ZM10 3C9.72386 3 9.5 3.22386 9.5 3.5V6C9.5 6.27614 9.72386 6.5 10 6.5H13C13.2761 6.5 13.5 6.27614 13.5 6V3.5C13.5 3.22386 13.2761 3 13 3H10Z M1.5 10C1.5 9.17157 2.17157 8.5 3 8.5H6C6.82843 8.5 7.5 9.17157 7.5 10V12.5C7.5 13.3284 6.82843 14 6 14H3C2.17157 14 1.5 13.3284 1.5 12.5V10ZM3 9.5C2.72386 9.5 2.5 9.72386 2.5 10V12.5C2.5 12.7761 2.72386 13 3 13H6C6.27614 13 6.5 12.7761 6.5 12.5V10C6.5 9.72386 6.27614 9.5 6 9.5H3Z M8.5 10C8.5 9.17157 9.17157 8.5 10 8.5H13C13.8284 8.5 14.5 9.17157 14.5 10V12.5C14.5 13.3284 13.8284 14 13 14H10C9.17157 14 8.5 13.3284 8.5 12.5V10ZM10 9.5C9.72386 9.5 9.5 9.72386 9.5 10V12.5C9.5 12.7761 9.72386 13 10 13H13C13.2761 13 13.5 12.7761 13.5 12.5V10C13.5 9.72386 13.2761 9.5 13 9.5H10Z"}
  ,{name: "Kanban", color: 'rgb(4, 138, 14)', d: "M1 3.5C1 2.67157 1.67157 2 2.5 2H13.5C14.3284 2 15 2.67157 15 3.5V9.5C15 10.3284 14.3284 11 13.5 11H11.5C11.3247 11 11.1564 10.9699 11 10.9146V12.5C11 13.3284 10.3284 14 9.5 14H6.5C5.67157 14 5 13.3284 5 12.5V7.91465C4.84361 7.96992 4.67532 8 4.5 8H2.5C1.67157 8 1 7.32843 1 6.5V3.5ZM6 12.5C6 12.7761 6.22386 13 6.5 13H9.5C9.77614 13 10 12.7761 10 12.5V3H6V12.5ZM5 3H2.5C2.22386 3 2 3.22386 2 3.5V6.5C2 6.77614 2.22386 7 2.5 7H4.5C4.77614 7 5 6.77614 5 6.5V3ZM11 3V9.5C11 9.77614 11.2239 10 11.5 10H13.5C13.7761 10 14 9.77614 14 9.5V3.5C14 3.22386 13.7761 3 13.5 3H11Z"}
  ,{name: "Timeline", color: 'rgb(220, 4, 59)', d: "M9 0.5C9 0.223858 8.77614 0 8.5 0C8.22386 0 8 0.223858 8 0.5V15.5C8 15.7761 8.22386 16 8.5 16C8.77614 16 9 15.7761 9 15.5V14H11.5C12.3284 14 13 13.3284 13 12.5V10.5C13 9.67157 12.3284 9 11.5 9H9V7H14.5C15.3284 7 16 6.32843 16 5.5V3.5C16 2.67157 15.3284 2 14.5 2H9V0.5ZM9 3V6H14.5C14.7761 6 15 5.77614 15 5.5V3.5C15 3.22386 14.7761 3 14.5 3H9ZM9 10V13H11.5C11.7761 13 12 12.7761 12 12.5V10.5C12 10.2239 11.7761 10 11.5 10H9Z M4.5 2H7V3H4.5C4.22386 3 4 3.22386 4 3.5V5.5C4 5.77614 4.22386 6 4.5 6H7V7H4.5C3.67157 7 3 6.32843 3 5.5V3.5C3 2.67157 3.67157 2 4.5 2Z M7 9H1.5C0.671573 9 0 9.67157 0 10.5V12.5C0 13.3284 0.671573 14 1.5 14H7V13H1.5C1.22386 13 1 12.7761 1 12.5V10.5C1 10.2239 1.22386 10 1.5 10H7V9Z"}
  ,{name: "List", color: 'rgb(13, 82, 172)', d: "M8.5 10C8.5 9.72386 8.72386 9.5 9 9.5H12C12.2761 9.5 12.5 9.72386 12.5 10C12.5 10.2761 12.2761 10.5 12 10.5H9C8.72386 10.5 8.5 10.2761 8.5 10Z M8.5 6.5C8.5 6.22386 8.72386 6 9 6H12C12.2761 6 12.5 6.22386 12.5 6.5C12.5 6.77614 12.2761 7 12 7H9C8.72386 7 8.5 6.77614 8.5 6.5Z M7.61756 5.16104C7.80477 5.36404 7.79196 5.68036 7.58896 5.86756L5.42021 7.86756C5.22853 8.04433 4.93319 8.04412 4.74176 7.86708L3.66051 6.86708C3.45778 6.67958 3.44543 6.36324 3.63292 6.16051C3.82042 5.95778 4.13676 5.94543 4.33949 6.13292L5.08174 6.8194L6.91104 5.13244C7.11404 4.94523 7.43036 4.95804 7.61756 5.16104Z M7.61756 8.66104C7.80477 8.86404 7.79196 9.18036 7.58896 9.36756L5.42021 11.3676C5.22853 11.5443 4.93319 11.5441 4.74176 11.3671L3.66051 10.3671C3.45778 10.1796 3.44543 9.86324 3.63292 9.66051C3.82042 9.45778 4.13676 9.44543 4.33949 9.63292L5.08174 10.3194L6.91104 8.63244C7.11404 8.44523 7.43036 8.45804 7.61756 8.66104Z M1 3.5C1 2.67157 1.67157 2 2.5 2H13.5C14.3284 2 15 2.67157 15 3.5V12.5C15 13.3284 14.3284 14 13.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5ZM2.5 3C2.22386 3 2 3.22386 2 3.5V12.5C2 12.7761 2.22386 13 2.5 13H13.5C13.7761 13 14 12.7761 14 12.5V3.5C14 3.22386 13.7761 3 13.5 3H2.5Z"}
  ,{name: "Gant", color: 'rgb(13, 127, 120)', d:"M0 3.5C0 2.67157 0.671573 2 1.5 2H11.5C12.3284 2 13 2.67157 13 3.5V5.5C13 6.32843 12.3284 7 11.5 7H4.5V10C4.5 10.5523 4.94771 11 5.5 11H7.5V10.5C7.5 9.67157 8.17157 9 9 9H14.5C15.3284 9 16 9.67157 16 10.5V12.5C16 13.3284 15.3284 14 14.5 14H9C8.17157 14 7.5 13.3284 7.5 12.5V12H5.5C4.39543 12 3.5 11.1046 3.5 10V7H1.5C0.671573 7 0 6.32843 0 5.5V3.5ZM8.5 12.5C8.5 12.7761 8.72386 13 9 13H14.5C14.7761 13 15 12.7761 15 12.5V10.5C15 10.2239 14.7761 10 14.5 10H9C8.72386 10 8.5 10.2239 8.5 10.5V12.5ZM1.5 3C1.22386 3 1 3.22386 1 3.5V5.5C1 5.77614 1.22386 6 1.5 6H11.5C11.7761 6 12 5.77614 12 5.5V3.5C12 3.22386 11.7761 3 11.5 3H1.5Z"}
]

const TableSideBar = () => {
  return (
    <div className='border-r w-[280px] min-w-[280px] flex flex-col justify-between h-full'>
      <ViewSearchBar />
      <div className='flex flex-col w-full p-4'>
        <div className='flex flex-col'>
          <hr className='my-2'/>
          <div className='flex justify-between w-full p-2'>
            <span className='text-sm font-medium'>Create...</span>
            <svg
              width={16}
              height={16}
              viewBox='0 0 16 16'
              className='flex-none'
              fill='black'
            >
              <use href='icons/icons_definitions.svg#ChevronDown'></use>
            </svg>
          </div>
        </div>
        <CreateViewButton />
        {tableSideItems.map((item, index) => (
          <TableSideItem
            key={index}
            name={item.name}
            color={item.color}
            d={item.d}
          />
        ))}
        <TableSideItem key={tableSideItems.length} name='New sections'/>
        <hr className='my-2'/>
        <TableSideItem key={tableSideItems.length+1} name='Form' color='rgb(221, 4, 168)' d="M4.5 6.5C4.5 6.22386 4.72386 6 5 6H7.5C7.77614 6 8 6.22386 8 6.5C8 6.77614 7.77614 7 7.5 7H5C4.72386 7 4.5 6.77614 4.5 6.5Z M5.5 8C4.67157 8 4 8.67157 4 9.5C4 10.3284 4.67157 11 5.5 11H10.5C11.3284 11 12 10.3284 12 9.5C12 8.67157 11.3284 8 10.5 8H5.5ZM5 9.5C5 9.22386 5.22386 9 5.5 9H10.5C10.7761 9 11 9.22386 11 9.5C11 9.77614 10.7761 10 10.5 10H5.5C5.22386 10 5 9.77614 5 9.5Z M1 3.5C1 2.67157 1.67157 2 2.5 2H13.5C14.3284 2 15 2.67157 15 3.5V12.5C15 13.3284 14.3284 14 13.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5ZM2.5 3C2.22386 3 2 3.22386 2 3.5V12.5C2 12.7761 2.22386 13 2.5 13H13.5C13.7761 13 14 12.7761 14 12.5V3.5C14 3.22386 13.7761 3 13.5 3H2.5Z"/>
      </div>
    </div>
  )
}

export default TableSideBar;