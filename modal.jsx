import React, { useEffect } from 'react';
import { Animated, Modal } from 'react-native';
import { StyledTouchableOpacity, StyledView } from './StyledComponents';
import { globalStyles } from '@utils/Styles/globalStyles';
import AppImage from '@utils/Assets';
 
const CustomModal = ({
  visible,
  onRequestClose,
  onBackdropPress,
  children,
  customStyles,
}) => {
  const translateY = new Animated.Value(0);
 
  const slideIn = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
 
  const slideOut = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onRequestClose());
  };
 
  useEffect(() => {
    if (visible) {
      slideIn();
    } else {
      translateY.setValue(0);
    }
  }, [visible]);
 
  const slideAnimationStyle = {
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [0, 1],
          outputRange: [1000, 0],
        }),
      },
    ],
  };
 
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={slideOut}>
      <StyledTouchableOpacity
        onPress={onBackdropPress}
        className="bg-black absolute left-0 right-0 bottom-0 top-0 opacity-20"
      />
      <Animated.View
        className="mt-auto rounded-t-2xl bg-white max-h-[95%]"
        style={[customStyles, slideAnimationStyle]}>
        <StyledTouchableOpacity
          onPress={slideOut}
          activeOpacity={0.9}
          style={globalStyles?.listcardShadow}
          className="z-50 w-9 h-9 items-center justify-center rounded-full bg-white absolute right-6 -top-4">
          {AppImage?.SVG?.CloseCircle}
        </StyledTouchableOpacity>
        <StyledView className="h-1 w-14 bg-white rounded-full self-center mt-5" />
        {children}
      </Animated.View>
    </Modal>
  );
};
 
export default CustomModal;