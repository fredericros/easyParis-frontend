import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      newReviewText: ''
    };
  }

  componentDidMount() {
    // Make an API call to fetch the list of reviews
    // and update the state with the returned data
    fetch('/api/reviews')
      .then(response => response.json())
      .then(data => {
        this.setState({ reviews: data });
      });
  }

  handleChange(text) {
    this.setState({ newReviewText: text });
  }

  handleSubmit() {
    // Make an API call to submit the new review
    // and update the state with the returned data
    fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ text: this.state.newReviewText }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          reviews: [...this.state.reviews, data],
          newReviewText: ''
        });
      });
  }

  render() {
    return (
      <View>
        <Text>Reviews</Text>
        {this.state.reviews.map(review => (
          <Text key={review.id}>{review.text}</Text>
        ))}
        <TextInput
          value={this.state.newReviewText}
          onChangeText={this.handleChange.bind(this)}
        />
        <Button onPress={this.handleSubmit.bind(this)} title="Submit" />
      </View>
    );
  }
}

export default Reviews;