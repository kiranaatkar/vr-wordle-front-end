import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList } from 'recharts';
import Networking from './Networking.js';
import './results.css';
import LoadingScreen from './loadingScreen.js';

export default function ResultsGraph(props) {
  // const {answer} = props
  const { answer, userScore } = props;
  const myAPI = new Networking();
  const [loading, StillLoading] = useState(true);
  const [data, setData] = useState([
    { score: 1, sum: 0 },
    { score: 2, sum: 0 },
    { score: 3, sum: 0 },
    { score: 4, sum: 0 },
    { score: 5, sum: 0 },
    { score: 6, sum: 0 },
  ]);

  useEffect(() => {
    async function fetchData() {
      StillLoading(true);
      const json = await myAPI.getWordScores(answer);
      const scores = json.scores;
      scores.forEach((entry) => {
        const scoreIndex = data.findIndex((data) => data.score === entry.score);
        data[scoreIndex].sum++;
      });
      setData(data);
      StillLoading(false);
    }
    fetchData();
    console.log(data);

    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='graph-wrapper'>
          <BarChart
            width={730}
            height={250}
            data={data}
            layout='vertical'
            barCategoryGap={1}
            fill='black'
            margin={{ top: 10, bottom: 10 }}>
            <XAxis hide />
            <YAxis
              dataKey='score'
              type='number'
              interval={0}
              domain={[1, 6]}
              ticks={[1, 2, 3, 4, 5, 6]}
              fill='black'
            />
            <Bar dataKey='sum'>
              <LabelList dataKey='sum' position='right' fill='black' />
              {data.map((entry) => (
                <Cell
                  key={entry}
                  fill={entry.score === userScore ? '#99f2c8' : '#1f4037'}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
}