import React from "react";
import {Link} from "react-router-dom";

const StationLinks = (props) => {
    const linkString = `${props.station.name}, `;
    return <Link to={`/stations/${props.station.id}`}>{linkString}</Link>
}

export default StationLinks;