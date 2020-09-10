import React from 'react';
import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';
import cityList from './cityList.json';
import './index.css';


const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : cityList.filter((lang) =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue,
  );
};

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion.name}
  </div>
);

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested');
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    console.log('onSuggestionsClearRequested');
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'city name',
      value,
      onChange: this.onChange,
    };

    // Finally, render it!
    return (
      <>
      <h1>React-autoSuggest</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </>
    );
  }
}
