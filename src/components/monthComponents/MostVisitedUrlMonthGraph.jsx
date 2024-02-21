import React, { useEffect, useState } from 'react';

const MostVisitedWebsiteGraph = () => {
  const [sourceOfImage, setImgSrc] = useState('');

  useEffect(() => {
    const delayedFetch = async () => {
      // Introduce a 2-second delay using setTimeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // Make a GET request to the Flask server
      fetch('https://backend-for-chrome-extension.onrender.com/get-visited-websites-graph')
        .then(response => response.blob())
        .then(blob => {
          // Convert the blob to a data URL
          const imageUrl = URL.createObjectURL(blob);
          setImgSrc(imageUrl);
        })
        .catch(error => console.error('Error fetching image:', error));
    };

    delayedFetch();
  }, []); // Empty dependency array ensures the effect runs only once


  return (
        <div className="bg-white pt-24 pb-20 sm:py-32">
        <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Top 10 Most Visited Websites in the past Month</dt>
        <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
          <div className="flex items-center justify-center p-4">
            {sourceOfImage && <img src={sourceOfImage} alt="Graph of top ten most popular website" />}
          </div>
        </div>
      </div>
  );
};

export default MostVisitedWebsiteGraph;