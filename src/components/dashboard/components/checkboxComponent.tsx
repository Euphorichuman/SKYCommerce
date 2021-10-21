import React from "react";
import "./styles/checkboxComponent.scss";
import "../../../fonts/icomoon/style.css";

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
