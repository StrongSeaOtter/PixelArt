import { useState } from 'react';
import { characterList } from './character_list.js';
import './character.css';

export default function Character(props) {
    const [index, setIndex] = useState(0);

    let hasPrev = index > 0;
    let hasNext = index < characterList.length - 1;

    function handlePrevClick() {
        if (hasPrev) {
            setIndex(index - 1);
        }
    }

    function handleNextClick() {
        if (hasNext) {
            setIndex(index + 1);
        }
    }

    const backToMenu = () => {
        props.screenHandler('Start')
    }

    let character = characterList[index];
    return (
        <section id='character-screen'>
            <div className='pixel-corner-wrapper back-to-menu'>
                <div className='button pixel-corners' onClick={backToMenu}>Back to Menu</div>
            </div>
            <div className='character-selection'>
                <div className='character-name'>
                    <h2>Choose your character here</h2>
                    <h3>{character.name}</h3>
                </div>
                <div className='character-image'>
                    <div className='button pixel-corners' onClick={handlePrevClick} disabled={!hasPrev}>&larr;</div>
                    <img src={character.url} alt={character.alt} />
                    <div className='button pixel-corners' onClick={handleNextClick} disabled={!hasNext}>&rarr;</div>
                </div>
                <div className='character-details'>
                    <p>{character.description}</p>
                </div>
            </div>
        </section>
    );
}

