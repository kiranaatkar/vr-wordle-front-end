import ResultsGraph from './ResultsGraph';
import './results.css';

export default function ResultsScreen(props) {
  const { answer, userScore } = props;
  return (
    <div className='results-page-wrapper'>
      <h1 className='graph-text'>Statistics</h1>
      <h2 className='graph-text'>
        Guess distributions for word {answer.toUpperCase()}
      </h2>
      <ResultsGraph answer={answer} userScore={userScore} />
      <h3 className='graph-text'>
        {userScore
          ? `You got it in ${userScore} ${
              userScore > 1 ? 'attempts' : 'attempt'
            }!`
          : 'Better luck tomorrow!'}
      </h3>
    </div>
  );
}
