import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import Networking from './Networking.js';
import './results.css';

export default function Results(props) {
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

  useEffect(async () => {
    const json = await myAPI.getWordScores(answer);
    json.scores.forEach((entry) => {
      const scoreIndex = data.findIndex((data) => data.score === entry.score);
      data[scoreIndex].sum++;
    });
    setData(data);
    StillLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div className='graph-wrapper'>
          <BarChart
            width={730}
            height={250}
            data={data}
            layout='vertical'
            barCategoryGap={1}>
            <XAxis hide />
            <YAxis
              dataKey='score'
              type='number'
              interval='preserveStartEnd'
              domain={[1, 6]}
            />
            <Tooltip />
            <Bar dataKey='sum' fill='black'>
              {data.map((entry) => (
                <Cell
                  key={entry}
                  fill={entry.score === userScore ? '#99f2c8' : '#1f4037'}
                  label={entry.sum}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
}
