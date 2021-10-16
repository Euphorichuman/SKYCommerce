import React, { Component, Ref, forwardRef } from "react";
import "./styles/checkboxComponent.scss";
import "../../../fonts/icomoon/style.css";

/*interface ICheckboxComponentsProps {
  onClick: any,
  ref: React.ForwardedRef<HTMLInputElement>
}

export class CheckboxComponent extends Component<ICheckboxComponentsProps> {
  render() {
      const {ref, onClick} = this.props;
    return (
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          ref={ref}
          onClick={onClick}
        />
        <label className="form-check-label" id="booty-check" />
      </div>
    );
  }
}*/

interface ICheckboxComponentsProps {
  onClickProp: any;
}

export const CheckboxComponent = React.forwardRef<
  HTMLInputElement,
  ICheckboxComponentsProps
>((props, ref) => {
  const { onClickProp } = props;
  return (
    <label className="control control--checkbox">
      <input type="checkbox" ref={ref} onClick={onClickProp} {...props} />
      <div className="control__indicator"></div>
    </label>
  );
});
