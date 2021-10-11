import React, { Component } from "react";
import './css/card.scss'

interface ICardProps {
    title?: string;
    description?: string;
}

export class Card extends Component<ICardProps> {
  render() {
    const { title, description } = this.props;
    return (
      <div className="col-md-4">
        <div className="card" style={{minHeight: "12.875rem", maxHeight: "12.875rem"}}>
          <div className="card-block">
            <h4 className="card-title">{title}</h4>
            <p className="card-text p-y-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
