import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import '../stylesheets/buymodal.css'

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  // const top = 50 + rand();
  const top = 50;
  // const left = 50 + rand();
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {

  constructor(props) {
		super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleOrderTypeChange = this.handleOrderTypeChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  state = {
    open: false,
    selectedType: 'MIS',
    selectedOrderType: 'LIMIT',
    side: this.props.side,
    symbol: this.props.symbol,
    qty: 1,
    limitprice: 0,
    triggerprice: 0,
    exchange: 'NSE'
  };

  handleTypeChange = (changeEvent) => {
    this.setState({
      selectedType: changeEvent.target.value
    });
  }

  handleOrderTypeChange = (changeEvent) => {
    this.setState({
      selectedOrderType: changeEvent.target.value
    });
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.handleClose();
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>{this.props.side === 'BUY' ? 'BUY' : 'SELL'}</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className="orderdiv1" style={
              this.props.side === 'BUY' ? {backgroundColor:'blue'}:{backgroundColor:'red'}
              }>
              <h2>{this.props.side === 'BUY' ? 'BUY' : 'SELL'} {this.props.symbol} x qty Qty</h2>
              <p>price on Exchange</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="orderdiv2">
                <div>
                <label>
                  <input type="radio" value="MIS" checked={this.state.selectedType === 'MIS'}
                  onChange={this.handleTypeChange} />
                  MIS
                </label>
                <label>
                  <input type="radio" value="CNC" checked={this.state.selectedType === 'CNC'}
                  onChange={this.handleTypeChange} />
                  CNC
                </label>
                </div>
                <div>
                <label>
                  <input type="radio" value="MARKET" checked={this.state.selectedOrderType === 'MARKET'}
                  onChange={this.handleOrderTypeChange} />
                  MARKET
                </label>
                <label>
                  <input type="radio" value="LIMIT" checked={this.state.selectedOrderType === 'LIMIT'}
                  onChange={this.handleOrderTypeChange} />
                  LIMIT
                </label>
                <label>
                  <input type="radio" value="SLM" checked={this.state.selectedOrderType === 'SLM'}
                  onChange={this.handleOrderTypeChange} />
                  SLM
                </label>
                <label>
                  <input type="radio" value="SLL" checked={this.state.selectedOrderType === 'SLL'}
                  onChange={this.handleOrderTypeChange} />
                  SLL
                </label>
                </div>
              </div>
              <div className="orderdiv3">
              <div>
                <label>Qty</label>
                <input type="number" defaultValue={this.state.qty} placeholder="" autoCorrect="off" min="1" step="1" noerror="true" staticlabel="true" animate="true" label="Qty" />
              </div>
              <div>
              <label>Price</label>
              <input type="number" defaultValue={this.state.limitprice} placeholder="" autoCorrect="off" min="0" step="0.05" disabled="false" noerror="true" staticlabel="true" animate="true" label="Price" />
              </div>
              <div>
              <label>Trigger</label>
              <input type="number" defaultValue={this.state.triggerprice} placeholder="" autoCorrect="off" min="0" step="0.05" disabled="false" noerror="true" staticlabel="true" animate="true" label="Trigger" />
              </div>
              </div>
              <div className="orderdiv4">
                <Button type="submit" value="Submit">{this.props.side === 'BUY' ? 'BUY' : 'SELL'}</Button>
                <Button type="button" onClick={this.handleClose}>Cancel</Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const OrderModalWrapped = withStyles(styles)(SimpleModal);

export default OrderModalWrapped;