declare module 'react-native-vector-icons/Ionicons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: ViewStyle | TextStyle;
  }

  export default class Icon extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string
    ): Promise<any>;
    static getFontFamily(): string;
    static loadFont(file?: string): Promise<void>;
    static hasIcon(name: string): boolean;
  }
}

declare module 'react-native-vector-icons/MaterialIcons' {
  import Ionicons from 'react-native-vector-icons/Ionicons';
  export default Ionicons;
}

declare module 'react-native-vector-icons/FontAwesome' {
  import Ionicons from 'react-native-vector-icons/Ionicons';
  export default Ionicons;
}

declare module 'react-native-vector-icons/Feather';
declare module 'react-native-vector-icons/MaterialCommunityIcons';
declare module 'react-native-vector-icons/*';

// Add other icon families you might use
