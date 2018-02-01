import React from 'react';

const Osa = (props) => {
        return (
            <div>
                <p>{props.osa.nimi} {props.osa.tehtavia}</p>
            </div>
        )
    
}

export default Osa;