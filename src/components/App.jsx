import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = evt => {
    if (evt.target !== evt.currentTarget) {
      switch (evt.target.textContent.toLowerCase()) {
        case 'good':
          setGood(good + 1);
          break;
        case 'neutral':
          setNeutral(neutral + 1);
          break;
        case 'bad':
          setBad(bad + 1);
          break;
        default:
          return;
      }
    }
  };

  const countTotalFeedback = () => {
    return [good, neutral, bad].reduce((total, feedback) => {
      return (total += feedback);
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / countTotalFeedback());
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions goodFeedback={handleGoodFeedback} />
      </Section>

      <Section title="Statistics">
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage}
        />
      </Section>
    </>
  );
};
