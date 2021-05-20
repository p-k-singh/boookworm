import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Loading = (props) => {
return (
    <div align='center' style={{marginTop:props.mt}}>
    <Loader
    type="Puff"
        color="#fd4dcc"
        height={80}
        width={100}
        timeout={60000} //3 secs
        />
      </div>
    )
}

export default Loading
