import React from 'react';
import Sisalto from './Sisalto'
import Otsikko from './Otsikko'

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
        </div>
    );
};

export default Kurssi;