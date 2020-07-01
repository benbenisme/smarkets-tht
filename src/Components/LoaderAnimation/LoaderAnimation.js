import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import React from 'react';

export default function LoaderAnimation(props) {
    return (<Loader
        type="Puff"
        color=" #A6A6A6"        
        timeout={116000} 
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={props.dimensions.height}
        width={props.dimensions.width}
      />);
}