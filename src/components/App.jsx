import { Component } from 'react';
import { Section } from 'components/Section/Section';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { Statistics } from 'components/Statistics/Statistics';

export class App extends Component {
  // return (
  //   <div
  //     style={{
  //       height: '100vh',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       fontSize: 40,
  //       color: '#010101',
  //     }}
  //   ></div>
  // );

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onFeedbackLeave = name => {
    this.setState(pState => {
      return {
        [name]: pState[name] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    const amount = Object.values(this.state).reduce((total, option) => {
      return total + option;
    }, 0);
    return amount;
  };

  countPositiveFeedbackPercentage = () => {
    const percentage = (this.state.good / this.countTotalFeedback()) * 100;
    return Math.round(percentage);
  };

  render() {
    if (this.countTotalFeedback()) {
      return (
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(this.state)}
              onLeaveFeedback={this.onFeedbackLeave}
            ></FeedbackOptions>
          </Section>
          <Section title="Statistics">
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          </Section>
        </div>
      );
    } else {
      return (
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(this.state)}
              onLeaveFeedback={this.onFeedbackLeave}
            ></FeedbackOptions>
          </Section>
          <Section title="Statistics">
            <Notification message="There is no feedback"></Notification>
          </Section>
        </div>
      );
    }
  }
}
