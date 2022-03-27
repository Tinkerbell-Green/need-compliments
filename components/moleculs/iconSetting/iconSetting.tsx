import {Settings} from "@styled-icons/fluentui-system-filled";
import {Icon} from "components/atoms/icon";

type IconSettingProps = {
  color?: string;
  rotate?: boolean;
}

export const IconSetting = (props:IconSettingProps) => {
  return (
    <Icon {...props}><Settings/></Icon>
  );
}
