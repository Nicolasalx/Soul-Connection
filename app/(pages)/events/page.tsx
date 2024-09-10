'use client';

import { useEffect, useState } from 'react';
import { Divider } from 'antd';
import Map from '@/components/Map';
import Events from '../../back/models/events';
import { getEvents } from '../../lib/dbhelper/events';
import { Card, CardBody, CardFooter, CardHeader, Listbox, ListboxItem } from '@nextui-org/react';
import location from '../../../public/location.svg';
import Image from 'next/image';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    getEvents().then(res => setEvents(res.sort().reverse()))
  }, [])

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-10 mt-10 text-5xl md:text-6xl">
        Events
        <Divider style={{ borderColor: '#d3d3d3' }} />
      </h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-2 md:h-[464px]">
        <div className="bg-white-700 h-[305px] md:h-full">
          <Map events={events} posix={[46.619209, 2.466162]} zoom={5} />
        </div>
        <Listbox
          className="flex flex-col overflow-y-scroll h-[305px] md:h-full"
          items={events}
          aria-label='events'>
          {event => (
            <ListboxItem key={event.id} textValue={event.name} aria-label={event.name}>
              <Card className="shadow-none bg-transparent">
                <CardHeader className="flex flex-row justify-between">
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
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </>
  )
}
