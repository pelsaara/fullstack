import React from 'react';

const Statistiikka = ({kurssi}) => {
    
    return(
      <p>yhteensä {kurssi.osat.reduce((sum, curr) => sum + curr.tehtavia, 0)} tehtävää</p>
    )
  }


export default Statistiikka;