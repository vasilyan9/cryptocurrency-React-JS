import React from 'react'
import "./loading.css"

const Loading = (props) => {
    const { width , height } = props;
    return(
        <div className="Loading" 
            style = {{ width, height }}
        />
    )
}

Loading.defaultProps = {
    width: '56px',
    height: '56px'
}
export default Loading;