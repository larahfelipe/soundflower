import type { TouchableOpacityProps } from 'react-native';

export type ControlBtnProps = TouchableOpacityProps & {
  icon: string;
  active?: boolean;
};

export type IconProps = {
  size: number;
  active?: boolean;
};
