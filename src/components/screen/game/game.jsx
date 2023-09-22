import { useEffect, useRef } from 'react';
import './game.css';
import PixelArtGame from './PixelArtGame';

export default function Game(props) {
    const mapRef = useRef(null);
    const characterRef = useRef(null);
    const scoreRef = useRef(null);
    const timerRef = useRef(null);

    // Variable to hold the game instance
    let game;

    useEffect(() => {

        if (!game) {
            game = new PixelArtGame(mapRef.current, characterRef.current, scoreRef.current, timerRef.current);
            game.showStartScreen();
        }
      
    }, []);

    const backToMenu = () => {
        props.screenHandler('Start')
    }

    return (
        <section id='game-screen'>
            <div className='pixel-corner-wrapper back-to-menu'>
                <div className='button pixel-corners' onClick={backToMenu}>Back to Menu</div>
            </div>

            <div className='game'>
                <div id='score-display'>Fish coins: <span id='score' ref={scoreRef}>0</span></div>
                <div id='timer-display'>Time left: <span id='timer' ref={timerRef}>30</span> seconds</div>

                <div className='camera'>
                    <div className='map' ref={mapRef}>
                        <div className='character' facing='down' walking='false' ref={characterRef}>
                            <div className='sprite'></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
