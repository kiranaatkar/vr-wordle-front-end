import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList } from "recharts";
import { formatTime } from "./FormatTime";
import Networking from "./Networking.js";
import "./results.css";
import LoadingScreen from "./loadingScreen.js";

export default function ResultsGraph(props) {
  const { answer, userScore } = props;
  const myAPI = new Networking();

  const [loading, StillLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const [data, setData] = useState([
    { score: 1, value: 0 },
    { score: 2, value: 0 },
    { score: 3, value: 0 },
    { score: 4, value: 0 },
    { score: 5, value: 0 },
    { score: 6, value: 0 },
  ]);

  function formatData(jsonScores) {
    const scoresArr = [];
    jsonScores.forEach((entry) => {
      scoresArr.push(entry);
      const scoreIndex = data.findIndex((data) => data.score === entry.score);
      data[scoreIndex].value++;
    });
    setScores([...scoresArr]);
  }

  useEffect(() => {
    async function fetchData() {
      StillLoading(true);
      const json = await myAPI.getWordScores(answer);
      formatData(json.scores);
      setData(data);
      StillLoading(false);
    }
    fetchData();
  }, []);

  function formatLeaderBoard(scores) {
    return scores.slice(0, 3).map((score, i) => {
      if (score) {
        return (
          <div className="leaderboard-entry" key={i}>
            <h5>
              {`${i + 1}. ${score.username} - ${score.score} ${
                score.score > 1 ? "attempts" : "attempt"
              } in ${formatTime(score.game_time)}`}
            </h5>
          </div>
        );
      } else {
        return (
          <div className="leaderboard-entry" key={i}>
            <h5>{i + 1}. </h5>
          </div>
        );
      }
    });
  }

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="graph-wrapper">
            <h2>Leaderboard</h2>
            {formatLeaderBoard(scores)}
          </div>

          <div className="graph-wrapper">
            <h2>Guess distributions for word {answer.toUpperCase()}</h2>
            <BarChart
              width={730}
              height={250}
              data={data}
              layout="vertical"
              barCategoryGap={1.5}
              margin={{ top: 10, bottom: 10 }}
            >
              <XAxis hide type="number" />
              <YAxis
                dataKey="score"
                type="category"
                ticks={[1, 2, 3, 4, 5, 6]}
                fill="black"
                tickLine={false}
                scale="band"
              />
              <Bar dataKey="value" type="number">
                <LabelList position="right" fill="black" />
                {data.map((entry) => (
                  <Cell
                    key={entry.score}
                    fill={entry.score === userScore ? "#99f2c8" : "#1f4037"}
                    dataKey="value"
                    type="number"
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
}
