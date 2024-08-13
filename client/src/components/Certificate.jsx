import React from 'react'

function Certificate() {
  return (
    <div>
      
       {/* -------------------Certificate-------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 place-items-center container mx-auto px-4">
       <div className="container mx-auto px-4">
          {/* Text Content */}
          <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[--primary-color]">
              Get Your Certificate
            </h1>
            <div className="flex gap-4 items-center">
              <img src="./icon-certif1.svg" alt="Certification Icon 1" className="w-12 h-12 md:w-16 md:h-16" />
              <p className="text-base md:text-lg text-[--primary-color] w-full md:w-3/4">
                Teachers don't get lost in the grid view and have a dedicated Podium space.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <img src="./icon-certif2.svg" alt="Certification Icon 2" className="w-12 h-12 md:w-16 md:h-16" />
              <p className="text-base md:text-lg text-[--primary-color] w-full md:w-3/4">
                TA's and presenters can be moved to the front of the class.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <img src="./icon-certif3.svg" alt="Certification Icon 3" className="w-12 h-12 md:w-16 md:h-16" />
              <p className="text-base md:text-lg text-[--primary-color] w-full md:w-3/4">
                Teachers can easily see all students and class data at one time.
              </p>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2  md:gap-2 gap-4 p-2 w-3/4  md:w-3/4 bg-[--secondary-color] rounded-xl md:p-4 shadow-lg">
        <img src="./certaficate-front.svg" alt="certificate" className=" w-full h-full" />
          <img src="./certaficate-back.svg" alt="certificate" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default Certificate
