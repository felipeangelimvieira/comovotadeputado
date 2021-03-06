import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './autosuggest.css'
import axios from 'axios'


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.nomeParlamentar;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.nomeParlamentar}
  </div>
);

class CustomAutosuggest extends Component {
  constructor(props) {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  
  componentDidMount() {

    var url;
    url = `http://localhost:3333/api/deputados`
    if (process.env.NODE_ENV === "production"){
        url = `https://comovota.herokuapp.com/api/deputados`
    }
    axios.get(url)
    .then(response => {
      console.log("COMPONENT DID MOUNT", response)
      this.setState({congressmen : response.data})
    });
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    if (this.state.congressmen !== undefined) {
      var suggestions = inputLength === 0 ? [] : this.state.congressmen.filter(x =>
        x.nomeParlamentar.toLowerCase().slice(0, inputLength) === inputValue
      );
      return suggestions.slice(0,this.props.numItems)
    }
    return [];
    
    
  }  


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    console.log('suggestion selected', suggestion.deputado_id)
    this.props.onItemSelected(suggestion.deputado_id);
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: '', //'Deputado?',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected = {this.onSuggestionSelected}
      />
    );
  }
}

export default CustomAutosuggest;