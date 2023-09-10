import React, { useEffect } from "react";
import loadTypeWriter from "./typewriter.helper";
import "./typewriter.css";

export default function TypeWriter(props) {

    let isTypeWriterLoaded = false;

    useEffect(() => {
        if (!isTypeWriterLoaded) {
            loadTypeWriter();
            isTypeWriterLoaded = true;
        }
    }, []);

    return (
        <span className="typewrite" data-period={props.period} data-text={props.text} data-loop={props.loop}>
            <span className="wrap"></span>
        </span>
    )
}