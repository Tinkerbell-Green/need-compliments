import React, { useCallback, useState } from "react";
import Switch from "react-switch";

export const SliderSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const SWITCH_HEIGHT = 27;

  const onChange = useCallback((isChecked: boolean) => {
    setIsChecked(isChecked);
  }, []);

  return (
    <div className="example">
      <label htmlFor="material-switch">
        <Switch
          checked={isChecked}
          onChange={onChange}
          offColor="#323232"
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={SWITCH_HEIGHT}
          uncheckedIcon={false}
          checkedIcon={false}
          height={SWITCH_HEIGHT}
          width={50}
          className="react-switch"
        />
      </label>
    </div>
  );
};
