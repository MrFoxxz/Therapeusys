import React from 'react'
import Headerv1 from '../components/headers/headerv1'

const Layoutv1 = (props) => {
    return (
        <div>
            <Headerv1/>
            {props.children}
        </div>
    )
}

export default Layoutv1
