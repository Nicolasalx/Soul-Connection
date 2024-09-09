"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Events from "@/app/back/models/events";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    events: Events[]
    zoom?: number,
}

const defaults = {
    zoom: 19,
}

const Map = (props: MapProps) => {
  const { zoom = defaults.zoom, posix, events } = props

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full z-30">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.map(event => (
              <Marker position={[Number(event.location_x), Number(event.location_y)]} draggable={false}>
                <Popup>{event.name}</Popup>
              </Marker>
            )
          )}
    </MapContainer>
  )
}

export default Map
