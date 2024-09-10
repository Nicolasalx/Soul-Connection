"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Events from "@/app/back/models/events";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import location from '../public/location.svg';

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
              <Marker key={event.id} position={[Number(event.location_x), Number(event.location_y)]} draggable={false}>
                <Popup>
                  <Card className="shadow-none">
                    <CardHeader className="flex flex-row justify-between gap-1">
                      <h2>{event.name}</h2>
                      <p>{event.date}</p>
                    </CardHeader>
                    <CardBody className='inline-block align-middle'>
                      <div className='flex flex-row justify-start gap-2'>
                        <Image src={location} alt="Location icon" />
                        {event.location_name}
                      </div>
                    </CardBody>
                    <CardFooter>
                      Max participants: {event.max_participants}
                    </CardFooter>
                  </Card>
                </Popup>
              </Marker>
            )
          )}
    </MapContainer>
  )
}

export default Map
