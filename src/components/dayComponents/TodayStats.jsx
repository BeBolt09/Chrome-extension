import NumVisited from './NumberEachDay';
import BusiestTime from './HourlyCount';
import MostVisitedUrl from './MostVisitedToday'

const stats = [
    { id: 1, name: 'Different URLs visited today', value : <NumVisited/> },
    { id: 2, name: 'Most URLs visited at this time', value : <BusiestTime/> },
    { id: 3, name: 'Most visited website today', value: <MostVisitedUrl/> },
  ]
  
  export default function Today() {
    return (
      <div className="bg-white pt-24 pb-0 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 border-3 border-black rounded-lg">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 p-8">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  