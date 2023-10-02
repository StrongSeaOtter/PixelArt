import './credits.css';

export default function Credits(props) {

    const backToMenu = () => {
        props.screenHandler('Start')
    }

    return (
        <section id='credits-screen'>
            <div className='pixel-corner-wrapper back-to-menu'>
                <div className='button pixel-corners' onClick={backToMenu}>Back to Menu</div>
            </div>
            <div className='credits-flex'>
                <div className='about-me'>
                    <div className='developer'>
                        <div className='pixel-corner-wrapper'>
                            <h4 className='pixel-corners'>Developed by StrongOtter</h4>
                        </div>
                        <div className='pixel-corner-wrapper'>
                            <img className='pixel-corners' src='img/otter.png' />
                        </div>
                    </div>
                    <div className='contact'>
                        <div className='pixel-corner-wrapper'>
                            <h4 className='pixel-corners'>Find me at</h4>
                        </div>
                        <div className='pixel-corner-wrapper'>
                            <a href='https://github.com/StrongSeaOtter' target="_blank">
                                <img className='pixel-corners' src='img/github.png' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='newsletter'>
                    <div className='pixel-corner-wrapper'>
                        <h4 className='pixel-corners'>Newsletter</h4>
                    </div>
                    <p>Subscribe for the latest news, updates and developments.</p>
                    <form>
                        <input className= 'pixel-corners' type='email' placeholder='E-Mail Adresse' />
                        <span className='button pixel-corners'>Subscribe</span>
                    </form>
                </div>
            </div>
        </section>
    )
}