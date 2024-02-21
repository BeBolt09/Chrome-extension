import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';

const LineChart = () => {
    const [groupedByTime, setGroupedByTime] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let startTime = currentDate.getTime();

        chrome.history.search({ text: '', startTime, maxResults: 1000 }, function (data) {
            console.log("Browsing history data:", data);
            let urlTimestamps = data.map(item => ({ url: item.url, timestamp: item.lastVisitTime }));
            console.log("URL timestamps:", urlTimestamps);
            let groupedByTime = {};
            urlTimestamps.forEach(item => {
                let hour = new Date(item.timestamp).getHours();
                groupedByTime[hour] = groupedByTime[hour] ? [...groupedByTime[hour], item.url] : [item.url];
            });
            console.log(groupedByTime)
            setGroupedByTime(groupedByTime);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    let labeled_hours = [];
    Object.keys(groupedByTime).forEach((hour) => {
        labeled_hours.push(parseInt(hour));
    });
    for(let i=0;i<=labeled_hours.length;i++){
        if (labeled_hours[i]<12){
            labeled_hours[i]=labeled_hours[i]+"AM";
        }else if(labeled_hours[i]==12){
            labeled_hours[i]=labeled_hours[i]+"PM";
        }else{
            
        }
    };

    let dataPoints = [];
    Object.keys(groupedByTime).forEach((hour) => {
        dataPoints.push(groupedByTime[hour].length);
    });
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                suggestedMin: 0, // Ensure the y-axis starts at 0
            },
        },
    };
    const data = {
        labels: labeled_hours,
        datasets: [
            {
                label: '# of Websites visited at each hour',
                data: dataPoints,
                borderColor: 'black',
                backgroundColor: 'black',
            },
        ],
    };

    return (
        <>
        <div className="bg-white pt-24 pb-0 sm:py-32">
            <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Websites visited each hour</dt>
            <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
                <div className="flex items-center justify-center p-4">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
        </>
    );
};

export default LineChart;
