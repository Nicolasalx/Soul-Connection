'use client'
import If from "@/components/If";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CircularProgress, Input, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import arrows from "../../../../public/arrows.svg"
import heart from "../../../../public/heart.svg"
import stars from "../../../../public/stars.jpg"
import { astroComps } from "./compatibilities";
import { Divider } from 'antd';
import Customers from "@/app/back/models/customers";


class Client {
  id: number;
  email: string;
  name: string;
  surname: string;

  constructor(id: number, email: string, name: string, surname: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.surname = surname;
  }
}

async function getClientInfos(client: number | null) {
  if (client === null) {
    return null
  }
  try {
    const res = await fetch(`/api/back/customers/${client}`, { method: 'GET' })
    if (res.ok) {
      const clientInfos = await res.json() as Customers
      return clientInfos
    }
  } catch(err) {
    console.error(err)
  }
  return null
}

async function calcCompatibility(sign1: string, sign2: string) {
  const key = (sign1 + sign2).toLowerCase()
  if (!Object.keys(astroComps).includes(key)) {
    return 0
  }
  const value = Object.entries(astroComps).find(val => val[0] === key)
  return value ? value[1] * 100 : 0
}

export default function AstroCompatibility() {
  const [clients, setClients] = useState<Client[]>([])
  const [compatibility, setCompatibility] = useState(-1)
  const [value1, setValue1] = useState<number|null>(null)
  const [value2, setValue2] = useState<number|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [validated, setValidated] = useState(false)
  const [clientInfos1, setClientInfos1] = useState<Customers|null>(null)
  const [clientInfos2, setClientInfos2] = useState<Customers|null>(null)

  useEffect(() => {
    try {
      fetch('/api/back/customers', { method: 'GET' }).then(async (res) => {
        if (res.ok) {
          const clients = await res.json() as Client[]
          setClients(clients)
        } else {
          setClients([])
        }
      })
    } catch(err) {
      console.error(err)
      setClients([])
    }
  }, [])

  useEffect(() => {
    getClientInfos(value1).then((infos) => setClientInfos1(infos))
  }, [value1])
  useEffect(() => {
    getClientInfos(value2).then((infos) => setClientInfos2(infos))
  }, [value2])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    if (value1 === null || value2 === null) {
      return
    }

    setIsLoading(true)
    await new Promise(res => {setTimeout(res, 1000)})
    setIsLoading(false)
    setCompatibility(await calcCompatibility(clientInfos1?.astrological_sign!, clientInfos2?.astrological_sign!))
    setSubmitted(false)
    setValidated(true)
  }

  return (
    <>
      <h1 className="font-bold text-gray-600 text-5xl md:text-6xl p-8">
        Astrology Compatibility
        <Divider style={{ borderColor: '#d3d3d3' }} />
      </h1>
      <div>
        <form className='flex flex-col items-center w-full h-full' onSubmit={handleSubmit}>
          <div className="flex flex-row flex-nowrap justify-around w-full gap-4">
            <div className="flex flex-col">
              <Autocomplete
                variant="bordered"
                label="Client A"
                labelPlacement="outside"
                placeholder="Select client A"
                className="max-w"
                isRequired
                onSelectionChange={(id) => setValue1(id as number)}>
                {clients.map((client) => (
                  <AutocompleteItem key={client.id} value={client.id} textValue={`${client.name} ${client.surname}`}>
                    {client.name} {client.surname}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              {(submitted && value1 === null) && <div className="text-red-600">Please enter a client name.</div>}
              <Input
                className="mt-4 text-black"
                variant="bordered"
                placeholder={clientInfos1?.astrological_sign}
                readOnly />
            </div>
            <Image src={arrows} alt="Double sided arrow" />
            <div className="flex flex-col">
              <Autocomplete
                variant="bordered"
                label="Client B"
                labelPlacement="outside"
                placeholder="Select client B"
                className="max-w"
                isRequired
                onSelectionChange={(id) => setValue2(id as number)}>
                {clients.map((client) => (
                  <AutocompleteItem key={client.id} value={client.id} textValue={`${client.name} ${client.surname}`}>
                    {client.name} {client.surname}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              {(submitted && value2 === null) && <div className="text-red-600">Please enter a client name.</div>}
              <Input
                className="mt-4 text-black"
                variant="bordered"
                placeholder={clientInfos2?.astrological_sign}
                readOnly />
            </div>
          </div>
          <Tooltip content="Calculate" className="bg-slate-600 text-white shadow-lg">
            <Button className="flex flex-col justify-center m-4 w-32 md:w-44 h-32 md:h-44 rounded-full shadow-lg" style={{backgroundImage: `url(${stars.src})`}} type="submit" >
              <div className="flex justify-center text-white">
                <If condition={!isLoading}>
                  {validated && <CircularProgress classNames={{svg: "w-24 md:w-36 h-24 md:h-36", value: "text-2xl"}} aria-label="Result" value={compatibility} showValueLabel={true} color="success" />}
                  {!validated && <h1>Calculate</h1>}
                </If>
                <If condition={isLoading}>
                  <CircularProgress classNames={{svg: "w-24 md:w-36 h-24 md:h-36"}} aria-label="Loading..." color="secondary" />
                </If>
              </div>
            </Button>
          </Tooltip>
          <Image src={heart} width={200} height={200} alt="Heart shape" />
        </form>
      </div>
    </>
  )
}
