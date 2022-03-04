import ResultsGraph from './ResultsGraph';
import './results.css';

export default function ResultsScreen(props) {
  const { answer, userScore, gameTime } = props;
  return (
    <div className='results-page-wrapper'>
      <h1 className='graph-text'>Statistics</h1>
      <h3 className='graph-text'>
        {userScore
          ? `You got it in ${userScore} ${
              userScore > 1 ? 'attempts' : 'attempt'
            } (${gameTime}s)!`
          : 'Better luck tomorrow!'}
      </h3>
      <ResultsGraph answer={answer} userScore={userScore} />
    </div>
  );
}
