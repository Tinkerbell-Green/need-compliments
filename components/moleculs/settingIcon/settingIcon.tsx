import {Settings} from "@styled-icons/fluentui-system-filled";
import {Icon} from "components/atoms/icon";

type SettingIconProps = {
  color?: string;
  rotate?: boolean;
}

export const SettingIcon = (props:SettingIconProps) => {
  return (
    <Icon {...props}><Settings/></Icon>
  );
}
