import React from 'react';

function Features() {
  return (
    <section className="bg-[--text-color] py-20" id="Features">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col gap-5 justify-center items-start rounded-xl bg-[--secondary-color] p-8 md:p-10 shadow-lg md:shadow-2xl">
            <img src="./num1.svg" alt="card1" className="w-16 h-16 md:w-20 md:h-20" />
            <div className="flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-[--primary-color]">Lifetime Access</h3>
              <hr className="h-1 w-16 rounded-xl bg-[--button-color]" />
              <p className="text-sm md:text-lg text-[--primary-color]">
                The gradual accumulation of information about atomic and small-scale behaviour...
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-5 justify-center items-start rounded-xl bg-[--secondary-color] p-8 md:p-10 shadow-lg md:shadow-2xl">
            <img src="./num2.svg" alt="card2" className="w-16 h-16 md:w-20 md:h-20" />
            <div className="flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-[--primary-color]">Training Courses</h3>
              <hr className="h-1 w-16 rounded-xl bg-[--button-color]" />
              <p className="text-sm md:text-lg text-[--primary-color]">
                The gradual accumulation of information about atomic and small-scale behaviour...
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-5 justify-center items-start rounded-xl bg-[--secondary-color] p-8 md:p-10 shadow-lg md:shadow-2xl">
            <img src="./num3.svg" alt="card3" className="w-16 h-16 md:w-20 md:h-20" />
            <div className="flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-[--primary-color]">Books Library</h3>
              <hr className="h-1 w-16 rounded-xl bg-[--button-color]" />
              <p className="text-sm md:text-lg text-[--primary-color]">
                The gradual accumulation of information about atomic and small-scale behaviour...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
