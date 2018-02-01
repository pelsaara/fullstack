import React from 'react';
import Sisalto from './Sisalto'
import Otsikko from './Otsikko'
import Statistiikka from './Statistiikka'

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Statistiikka kurssi={kurssi} />
        </div>
    )
}

export default Kurssi;