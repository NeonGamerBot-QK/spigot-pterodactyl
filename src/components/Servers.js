import { isLoggedIn } from '../util/loginsys'
import { getServers } from '../util/api'
import { useEffect, useState } from 'react'
export default function Servers () {
  const [servers, setServers] = useState([])
  useEffect(() => {
    if (isLoggedIn()) {
      getServers().then((r) => {
        setServers(r.map(s => s.attributes).filter(s => s.server_owner && s.egg_features && s.egg_features.includes('java_version')))
      })
    }
  }, [])

  return <div>
    <h1 className='text-5xl font-bold'>Select a server</h1>
    <div className='grid grid-cols-1 p-2 mt-2 rounded-lg shadow-xl lg:grid-cols-2 border-20'>
      {servers.map((s, i) => {
        return <div className='m-2 transition duration-500 ease-in-out transform shadow-xl card bg-base-100 hover:-translate-y-1 lg:hover:scale-110 hover:scale-105' key={i}>
          <h2 className='card-title'>{s.name}</h2>
          <p className='card-body'>{s.description}</p>
          <button className='btn btn-primary' onClick={() => {
            const urlParams = new URLSearchParams(window.location.search)
            urlParams.set('server', s.uuid)
            window.location.search = urlParams.toString()
          }}>Open</button>
        </div>
      })}
    </div>
  </div>
}
