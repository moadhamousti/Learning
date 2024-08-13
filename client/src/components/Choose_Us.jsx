import React from 'react';

function Choose_Us() {
  return (
    <>
      {/* -------------------Why should you choose us -------------------------- */}
      <div className="my-10 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-[--primary-color] rounded-2xl max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[--text-color] leading-snug">
              Why should you choose us?
            </h1>
            <ul className="text-[--text-color] list-none flex flex-col gap-3 mt-4">
              <li className="flex gap-2 items-start">
                <img src="./star-circle.svg" alt="Star Icon" className="w-6 h-6" />
                Teachers don't get lost in the grid view and have a dedicated Podium space.
              </li>
              <li className="flex gap-2 items-start">
                <img src="./star-circle.svg" alt="Star Icon" className="w-6 h-6" />
                Teachers don't get lost in the grid view and have a dedicated Podium space.
              </li>
              <li className="flex gap-2 items-start">
                <img src="./star-circle.svg" alt="Star Icon" className="w-6 h-6" />
                Teachers can easily see all students and class data at one time.
              </li>
            </ul>
          </div>

          {/* Image Content */}
          <div className="flex items-center justify-center p-4">
            <img
              src="./girl-image.svg"
              alt="Girl"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Choose_Us;
