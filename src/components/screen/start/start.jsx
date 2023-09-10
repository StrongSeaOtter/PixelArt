import TypeWriter from "../../typewriter/typewriter";
import './start.css';

export default function Start(props) {

    const text = [
        "Hallo liebes Otti!",
        "Aufwachen...",
        "Dein Abenteuer fängt jetzt an..."
    ]

    const startAdventure = () => {
        props.screenHandler('Character')
    }

    const credits = () => {
        props.screenHandler('Credits')
    }

    return (
        <section id="start-screen">
            <div className="start-text"><h1><TypeWriter text={JSON.stringify(text)} period="2000" loop="true" /></h1></div>
                <nav>
                    <div className='pixel-corner-wrapper'>
                        <div className='button pixel-corners' onClick={startAdventure}>Start Adventure</div>
                    </div>
                    <div className='pixel-corner-wrapper'>
                    <div className='button pixel-corners' onClick={credits}>Credits</div>
                    </div>
                </nav>
        </section>
    )
}