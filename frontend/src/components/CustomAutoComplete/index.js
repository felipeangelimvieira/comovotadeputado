import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import './styles.css'


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
          <label htmlFor="states-autocomplete">Como vota,</label>
          <Autocomplete
            value={this.state.value}
            //inputProps={{ id: 'states-autocomplete' }}
            wrapperProps = {{className : "wrapper"}}
            wrapperStyle={{ position: 'relative', minHeight :  '10vh' }}
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
            inputProps = {{className : 'input'}}
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