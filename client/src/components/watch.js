import React, { Component } from 'react';
import '../stylesheets/watch.css'

class Watch extends Component {
  render() {
    return (
        <div className="sideticker">
          <div class="container-fluid">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for scrips"/>
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">
                <i class="glyphicon glyphicon-search"></i>
              </button>
            </div>
          </div>
          <div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <span>
                      <h5>Cras justo odio</h5>
                    </span>
                    <span>
                      <span class="btn btn-success">
                          <i class="glyphicon glyphicon-plus"></i>
                      </span>
                      <span class="btn btn-danger">
                          <i class="glyphicon glyphicon-minus"></i>
                      </span>
                      <span class="btn btn-default">C</span>
                    </span>
                  </li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
          </div>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12">
    </div>
        </div>
    );
  }
}

export default Watch;
