import React, { useEffect } from 'react'


const TheaterMap = ({coordinate}) => {
    
    const theaterCoordinate = coordinate
    console.log(theaterCoordinate)

    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(theaterCoordinate[0], theaterCoordinate[1]),
          level: 3
        };
        var map = new kakao.maps.Map(container, options);

        let markerPosition = new kakao.maps.LatLng(
            theaterCoordinate[0],
            theaterCoordinate[1]
          );
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

        }, [theaterCoordinate])
        const { kakao } = window;
       


    return (
        <div>
            <div id="map" style={{width:"540px", height:"240px", borderRadius:'10px'}}></div> 
        </div>
    );
};

export default TheaterMap;

