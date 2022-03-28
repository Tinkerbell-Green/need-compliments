import {Settings} from "@styled-icons/fluentui-system-filled";
import {Icon} from "components/atoms/icon";

type IconSettingProps = {
  color?: string;
}

export const IconSetting = (props:IconSettingProps) => {
  return (
    <Icon {...props} isRotate={true}><Settings/></Icon>
  );
}
