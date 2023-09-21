import { useEffect } from 'react';
import './game.css';

export default function Game(props) {

    useEffect(() => {
        const pixelArtGame = new window.PixelArtGame();
        pixelArtGame.showStartScreen();
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
                <div id='score-display'>Fish coins: <span id='score'>0</span></div>
                <div id='timer-display'>Time left: <span id='timer'>30</span> seconds</div>

                <div className='camera'>
                    <div className='map'>
                        <div className='character' facing='down' walking='false'>
                            <div className='sprite'></div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

