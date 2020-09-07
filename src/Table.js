import React from 'react'

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => ( //esto lo que hace es desestructurar la informacion con el map busca desde countries a country y despues cases
               <tr>
                   <td>{country}</td>
                   <td><strong>{cases}</strong></td>
               </tr>
            ))}
        </div>
    )
}

export default Table
