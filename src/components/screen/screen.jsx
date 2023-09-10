import Start from './start/start';
import Character from './character/character';
import Credits from './credits/credits';
import React, {useState} from 'react';

export default function Screen() {
    const [screen, setScreen] = useState('Start')

    const screenHandler = value => {
        setScreen(value)
    }

    return (
    <>
        {screen === 'Start' && <Start screenHandler={screenHandler} />}
        {screen === 'Character' && <Character screenHandler={screenHandler} />}
        {screen === 'Credits' && <Credits screenHandler={screenHandler} />}
    </>
    )
}