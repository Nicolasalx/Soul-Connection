"use client";

import { useEffect, useState } from "react";
import Events from "../../../back/models/events";
import { getEvents } from "../../../lib/dbhelper/events";
import dynamic from "next/dynamic";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import location from '../../../../public/location.svg'
import Image from "next/image";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

class EventInfos {
  constructor(
    public title: string,
    public date: string,
  ) {
  }
}

export default function EventsPage() {
  const [eventsInfos, setEventsInfos] = useState<Events[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalEventInfos, setModalEventInfos] = useState<EventClickArg | null>(null)

  useEffect(() => {
    getEvents().then((res) => setEventsInfos(res.sort().reverse()));
  }, []);

  function openModal(arg: EventClickArg) {
    setModalEventInfos(arg)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setModalEventInfos(null)
  }

  return (
    <>
      <h1 className="font-bold text-5xl md:text-3xl mb-6">
        Events
      </h1>
      <FullCalendar
        eventClassNames={'cursor-pointer'}
        height={400}
        dayMaxEventRows={2}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={eventsInfos.map(eventInfo => new EventInfos(eventInfo.name, eventInfo.date))}
        eventClick={openModal}
      />
      <div className="mt-3 grid grid-cols-1 gap-5 md:h-[464px]">
        <div className="bg-white-700 h-[305px] md:h-full">
          <Map events={eventsInfos} posix={[46.619209, 2.466162]} zoom={5} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} placement="center" className="rounded-[2px] border-2 border-color">
        <ModalContent>
          <ModalHeader className="flex justify-center gap-1">
            Events on {modalEventInfos?.event.start?.toLocaleDateString()}
          </ModalHeader>
          <Divider />
          <ModalBody>
            <Listbox className="flex flex-col overflow-y-scroll h-[400px]" aria-label="Events display">
              {eventsInfos.filter(eventInfos => eventInfos.date === modalEventInfos?.event.startStr).map(event => (
                <ListboxItem
                  key={event.id}
                  textValue={event.name}
                  aria-label={event.name}
                >
                  <Card className="shadow-none bg-transparent">
                    <CardHeader className="flex flex-row justify-between">
                      <h2>{event.name}</h2>
                      <p>{event.type}</p>
                    </CardHeader>
                    <CardBody className="inline-block align-middle">
                      <div className="flex flex-row justify-start gap-2">
                        <Image src={location} alt="Location icon" />
                        {event.location_name}
                      </div>
                    </CardBody>
                    <CardFooter>
                      Max participants: {event.max_participants}
                    </CardFooter>
                  </Card>
                </ListboxItem>
              ))}
            </Listbox>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button color="primary" onPress={closeModal}>
              <p className="font-bold text-lg">Close</p>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
