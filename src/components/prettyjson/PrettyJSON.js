import React from 'react'

class PrettyJSON extends React.Component{
    render(){
        return JSON.stringify(this.props.data, undefined, 4)
    }
}

export default PrettyJSON