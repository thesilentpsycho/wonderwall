import React, { Component } from 'react';
import { FaBeer, FaPlus, FaMinus } from 'react-icons/fa';
import '../stylesheets/watch.css'

class Watch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      results: [],
      userwatch: []
    }
    this.searchUpdated = this.searchUpdated.bind(this)
    this.addScrip = this.addScrip.bind(this)
  }
  
  searchUpdated (term) {
    this.setState({searchTerm: term.target.value});
    if(term.target.value === ''){
      this.setState({results : []});
    }
    else{
      fetch('/search?q='+term.target.value)
          .then(results => { return results.json();})
          .then(results => {this.setState({results})});
    }
  }

  addScrip(scrip){
    this.setState({userwatch : [...this.state.userwatch, scrip]});
  }

  removeScrip(scrip){
    let temp = this.state.userwatch.filter(el => el.SYMBOL !== scrip.SYMBOL);
    this.setState({userwatch: temp});
  }

  render() {
    return (
        <div className="sideticker">
          <div>
            <input className='searchinput' type="text" name="query" onChange={this.searchUpdated} />
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
                <li className='userwatchitem' key={i}>
                  <div className='scripdata'>
                    <span>{opt.SYMBOL}</span>
                    <button onClick={() => this.addScrip(opt)}><FaPlus size={20}/></button>
                    <button><FaMinus size={20}/></button>
                  </div>
                  <div className='scripdetails'>
                    <div>{opt.COMPANYNAME}</div>
                    <div>{opt.SERIES}</div>
                  </div>
                </li>)}
              </ul>
          </div>
          <div>
              <ul>
              {this.state.userwatch.map(
                (scrip, i) => 
                  <li className='userwatchitem' key={i}>
                  <div className='scrip'>
                    <span>{scrip.SYMBOL}</span>
                    <button onClick={this.addScrip}><FaPlus size={20}/></button>
                    <button><FaMinus size={20}/></button>
                  </div>
                  </li>
                )}
              </ul>
          </div>
        </div>
    );
  }
}


export default Watch;
