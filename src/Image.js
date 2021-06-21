import { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { fetchMachine, FetchEvents } from './fetchMachine'

export default function Image() {
    const [request, send] = useMachine(fetchMachine)

    useEffect(() => {
        send(FetchEvents.FETCH)
    })
    return (
      <div>
        <img 
          src="https://images.dog.ceo/breeds/akita/512px-Ainu-Dog.jpg"
          alt="dog"
        />
      </div>
    );
}