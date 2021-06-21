import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { FetchEvents, FetchStates, fetchMachine } from './fetchMachine';


const fetchers = {
  fetchDog:  async () => {
    const responce = await fetch('https://dog.ceo/api/breeds/image/random');
    if(responce.ok){
      return responce.json()
    }else{
      throw new Error("fetch error!")
    }
  },
};


function App() {
  const [state, send] = useMachine(fetchMachine, { 
    services: { 
      fetchData: fetchers.fetchDog
    },
  });

  useEffect(() => {
    send(FetchEvents.FETCH)
  },[send])


  useEffect(() => {
    console.log(state)
  },[state]);

  const retry = () => {
    send(FetchEvents.RETRY);
  }

  return (
    <div>
      {state.matches(FetchStates.LOADING) &&
        <span>loading...</span>
      }
      {state.matches(FetchStates.FAILURE) &&
        <>
          <span>{state.context.error.message}</span>
          <button onClick={retry}>Retry</button>
        </>
      }
      {state.matches(FetchStates.SUCCESS) &&
        <img
          src={state.context.data.message}
          alt="dog"
        />
      }
    </div>
  );
}

export default App;
