import React from 'react';
import { Image as RNimage, StyleSheet, View, Button } from 'react-native'
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import imagePng from './images/demo.png';


export default class App extends React.Component {
    handleCanvas = (canvas) => {
        const image = new CanvasImage(canvas);
        canvas.width = 400;
        canvas.height = 400;

        const context = canvas.getContext('2d');

        const imageUri = RNimage.resolveAssetSource(imagePng).uri
        image.src = imageUri;
        
        image.addEventListener('load', () => {
            debugger
            console.log('image is loaded');
            context.drawImage(image, 0, 0, 400, 400);
            console.log(this.props.video);
        });

    }

    render() {
        return (
            <Canvas ref={this.handleCanvas} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});