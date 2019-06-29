import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

function toCamelCase(string) {

  var split = string.split(' ');
  var new_word = [];
  for (var i = 0; i < split.length; i++) {
    var word = split[i];
    if (word === 'de' || word === 'das' || word === 'dos') {
      new_word.push(word);
    }
    else {
      new_word.push(word[0].toUpperCase() + word.slice(1));
    }
  }

  return new_word.join(' ')

}

function matchItemToValue(item, value) {
    return (
      item.nomeParlamentar.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    )
  }

class CustomAutocomplete extends Component {
    state = { value: '' } 
    render() {
      console.log(toCamelCase('abc de eftgh asdipij'));
      console.log(this.props.items)
      return (
        <div>
          <label htmlFor="states-autocomplete">Como vota,</label>
          <Autocomplete
            value={this.state.value}
            //inputProps={{ id: 'states-autocomplete' }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            items={this.props.items}
            getItemValue={(item) => item.nomeParlamentar}
            shouldItemRender={matchItemToValue}
            onChange={(event, value) => this.setState({ value })}
            onSelect={value => this.setState({ value })}
            renderMenu={children => (
              <div className="menu">
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item.deputado_id}
              >{item.nomeParlamentar}</div>
            )}
          />
        </div>
      )
    }
  }

export default CustomAutocomplete;