import { useEffect, useState } from 'react'
import api, { getServer } from '../util/api'
import { isLoggedIn } from '../util/loginsys'

export default function ServerInfo () {
  const [server, setServer] = useState({})
  const [errored, setErrored] = useState(false);
  const [jars, setJars] = useState([])
  useEffect(() => {
    if (isLoggedIn() && (!window.lastRequest || Date.now() - window.lastRequest > 2500)) {
      window.lastRequest = Date.now()
      const id = new URL(window.location.href).searchParams.get('server')
      try {
      getServer(id).then((r) => {
        setServer(r)
        api.get(`/servers/${id}/files/list?directory=/plugins`).then(r => {
        // console.log(r)
          setJars(r.data.data.filter(e => e.attributes.mimetype === 'application/jar'))
        }).catch(e => {
          setErrored(true)
        })
      })
    } catch (e) {
      // setJars([{ attributes: { name: "ERR:! SERVER BROKEN!!" }}])
    setErrored(true)
    }
    } else {
      if (!window.lastRequest) {
        window.lastRequest = Date.now()
      }
    }
  })
  const restartServer = async () => {
    const id = new URL(window.location.href).searchParams.get('server')
    // await fetch(localStorage.getItem('pteroURL') + '/sanctum/csrf-cookie', { mode: 'no-cors'})
    // fetch(`http://localhost:3001/power`, {
    //   method: 'POST',
    //   headers: {
    //     // 'X-CSRF-Token': localStorage.getItem('pteroCSRF'),
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'PanelUrl': localStorage.getItem('pteroURL') + '/api/client/servers/' + id + '/power'
    //   },
    //   body: JSON.stringify({
    //     body: JSON.stringify({
    //       signal: 'restart'
    //     }),
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('pteroKey'),
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   })
    // })

    api.post(`/servers/${id}/power`, {
      signal: 'restart'
    }).then(console.log)
    // debugger
    alert('Restarting server...')
    // window.location.reload()
  }
  const reloadServer = async () => {
    const id = new URL(window.location.href).searchParams.get('server')
    // await api.post(`/servers/${id}/command`, {
    //   command: 'reload'
    // })
    // fetch(`http://localhost:3001/cmd`, {
    //   method: 'POST',
    //   headers: {
    //     // 'X-CSRF-Token': localStorage.getItem('pteroCSRF'),
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'PanelUrl': localStorage.getItem('pteroURL') + '/api/client/servers/' + id + '/command'
    //   },
    //   body: JSON.stringify({
    //     body: JSON.stringify({
    //       command: 'reload'
    //     }),
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('pteroKey'),
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   })
    // })
    // if (!window.confirm('Are you sure you want to reload the server?')) return
    // fetch(`http://localhost:3001/cmd`, {
    //   method: 'POST',
    //   headers: {
    //     // 'X-CSRF-Token': localStorage.getItem('pteroCSRF'),
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'PanelUrl': localStorage.getItem('pteroURL') + '/api/client/servers/' + id + '/command'
    //   },
    //   body: JSON.stringify({
    //     body: JSON.stringify({
    //       command: 'reload confirm'
    //     }),
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('pteroKey'),
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   })
    // })
    // alert('Reloaded server!')
  }

  return <div>
    <h1 className='text-5xl font-bold'>{server.name}</h1>
    <p>{server.description}</p>
    <div className='p-5 m-5 rounded-lg shadow-xl'>
      <h2 className='text-2xl font-bold'>Plugins</h2>
     {errored ? <>
     <p className='text-red-500'>There was an error getting plugins, check console.</p>
     </>:  <ul>
        {jars.map((j, i) => {
          return <li key={i}><pre>{j.attributes.name.replace('.jar', '')}</pre></li>
        })}
      </ul>}
    </div>
    <div className='p-5 m-5 rounded-lg shadow-xl'>
      <button className='m-5 btn btn-primary' disabled={errored} onClick={restartServer} >Restart</button>
      <button className='m-5 btn btn-primary' disabled={errored} onClick={() => {
        window.location.href = '#addplugins'
        window.location.reload()
      }}>Add Plugins</button>
      <button  disabled={errored} className='m-5 btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={reloadServer}>Reload</button>
    </div>

  </div>
}
