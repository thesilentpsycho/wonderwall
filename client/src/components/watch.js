import React, { Component } from 'react';
import '../stylesheets/watch.css'

class Watch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      results: []
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
  
  searchUpdated (term) {
    this.setState({searchTerm: term.target.value});
    fetch('/search?q='+term.target.value)
        .then(results => { return results.json();})
        .then(results => {this.setState({results})});
  }

  render() {
    return (
        <div className="sideticker">
          <div>
            <input type="text" name="query" onChange={this.searchUpdated} />
            <datalist id="allsymbols">
            {this.state.results.map(
                (opt, i) => 
                <option key={i}>{opt.SYMBOL}</option>)}
            </datalist>
          </div>
          <div>
              <ul>
              {this.state.results.map(
                (opt, i) => 
                <li key={i}>{opt.SYMBOL}</li>)}
              </ul>
          </div>
        </div>
    );
  }
}


export default Watch;
