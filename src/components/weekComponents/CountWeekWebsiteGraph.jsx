import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountPerWeekGraph = () => {
  const [graphUrl, setGraphUrl] = useState('');

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        // Introduce a delay of 1 second (adjust as needed)
        await new Promise(resolve => setTimeout(resolve, 200));

        const response = await axios.get('https://backend-for-chrome-extension.onrender.com/weekly-url-count-graph', { responseType: 'arraybuffer' });
        const imageBlob = new Blob([response.data], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setGraphUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching graph:', error);
      }
    };

    fetchGraph();
  }, []);

  return (
    <div className="bg-white pt-24 pb-0 sm:py-32">
      <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Number of Websites Opened In the Past 5 Weeks</dt>
      <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
        <div className="flex items-center justify-center p-4">
          {graphUrl && <img src={graphUrl} alt="Visited Counts Graph" className="max-w-300 max-h-300" />}
        </div>
      </div>
    </div>

  );
};

export default CountPerWeekGraph;