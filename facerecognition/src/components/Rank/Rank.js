/* eslint-disable no-template-curly-in-string */
import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f4'>
                {name}, your entry count is...
            </div>    
            <div className='white f1'>
                #{entries}
            </div>      
        </div>

    );


}

export default Rank;