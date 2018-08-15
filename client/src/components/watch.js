import React, { Component } from 'react';
import '../stylesheets/watch.css'

export const SymbolList = [
	"Alpine Meadows",
	"Boreal",
	"Diamond Peak",
	"Donner Ski Ranch", 
	"Heavenly", 
	"Homewood",
	"Kirkwood",
	"Mt. Rose", 
	"Northstar",
	"Squaw Valley",
	"Sugar Bowl"
]

class Watch extends Component {
  
  render() {
    return (
        <div className="sideticker">
          <div>
            <input  ref="inputResort"
                    type="text" 
                    list="allsymbols" />
            <datalist id="allsymbols">
              {this.props.options.map(
                (opt, i) => 
                <option key={i}>{opt}</option>)}
            </datalist>
          </div>
          <div>
              <ul>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
          </div>
        </div>
    );
  }
}

export default Watch;
