import React from 'react';
import Osa from './Osa'

const Sisalto = (props) => {
    return(
      <div>
        {props.kurssi.osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
      </div>
    )
};


export default Sisalto;