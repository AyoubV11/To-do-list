import React from 'react';

function PrintArticle(props){
    return(
        <div>
            <h2>{props.titre}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default PrintArticle;