import { ToastAndroid } from "react-native";

const showToast = (
    message: string = "",
    duration: number = ToastAndroid.SHORT
) => {
    ToastAndroid.show(
        message,
        duration
    );
}; 

const showToastWithGravity = (
    message: string = "",
    duration: number = ToastAndroid.SHORT,
    gravity: number = ToastAndroid.TOP
) => {
    ToastAndroid.showWithGravity(
        message,
        duration,
        gravity,
    );
};

const showToastWithGravityAndOffset = ( 
    message: string,
    duration: number = ToastAndroid.SHORT,
    gravity: number = ToastAndroid.TOP,
    xOffset: number = 0,
    yOffset: number = 0
) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        duration,
        gravity,
        xOffset,
        yOffset,
    );
};

export {
    showToast,
    showToastWithGravity,
    showToastWithGravityAndOffset
};