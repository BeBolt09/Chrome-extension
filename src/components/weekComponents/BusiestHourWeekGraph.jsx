import React, { useEffect, useState } from 'react';

const WeekHourAverage = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      // Introduce a 2-second delay using setTimeout
      await new Promise(resolve => setTimeout(resolve, 500));

      // Make a GET request to the Flask server
      fetch('https://backend-for-chrome-extension.onrender.com/week-hours-average-graph')
        .then(response => response.blob())
        .then(blob => {
          // Convert the blob to a data URL
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        })
        .catch(error => console.error('Error fetching image:', error));
    };

    fetchDataWithDelay();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
        <div className="bg-white pt-24 pb-0 sm:py-32">
        <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Average Visits Each Hour</dt>
        <div className="mx-auto w-3/4 px-6 lg:px-18 border-3 border-black rounded-lg">
          <div className="flex items-center justify-center p-4">
            {imageSrc && <img src={imageSrc} alt="Busy Times Graph" />}
          </div>
        </div>
      </div>
  );
};

export default WeekHourAverage;