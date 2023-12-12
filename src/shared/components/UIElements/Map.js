import React, { useRef, useEffect } from "react";

function Map(props) {
  const ref = useRef();
  const { center, zoom } = props;
  console.log(center);
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div ref={ref} className={`map ${props.className}`} style={props.style}>
    
    </div>
  );
}

export default Map;
