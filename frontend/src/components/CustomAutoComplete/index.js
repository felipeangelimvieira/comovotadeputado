import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

function matchItemToValue(item, value) {
    return (
      item.nomeParlamentar.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    )
  }

class CustomAutocomplete extends Component {
    state = { value: '' } 
    render() {
      return (
        <div>
          <label htmlFor="states-autocomplete">Choose a state from the US</label>
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
              <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                //key={item.id}
              >{item.nomeParlamentar}</div>
            )}
          />
        </div>
      )
    }
  }

export default CustomAutocomplete;