import { useEffect, useState } from "react"
import api, { getServer } from "../util/api"
import { isLoggedIn } from "../util/loginsys"

export default function ServerInfo() {
  const [server, setServer] = useState({})
  const [jars, setJars] = useState([])
    useEffect (() => {
    if(isLoggedIn() && (!window.lastRequest || Date.now() - window.lastRequest > 2500)) {
 
        window.lastRequest = Date.now()
        const id = new URL(window.location.href).searchParams.get('server')
        getServer (id).then((r) => {
        setServer (r)
    api.get(`/servers/${id}/files/list?directory=/plugins`).then(r => {
        // console.log(r)
        setJars(r.data.data.filter(e => e.attributes.mimetype === 'application/jar'))
    })
    })
    } else {
        if(!window.lastRequest) {
            window.lastRequest = Date.now()
        }
    }
})
const restartServer = async () => {
    const id = new URL(window.location.href).searchParams.get('server')
  await fetch(localStorage.getItem('pteroURL') + '/sanctum/csrf-cookie', { mode: 'cors'})
    api.post(`/servers/${id}/power`, {
        signal: 'restart'
    }).then(console.log)
    debugger;
    alert('Restarting server...')
    window.location.reload()
}
const reloadServer = async () => {
    const id = new URL(window.location.href).searchParams.get('server')
await api.post(`/servers/${id}/command`, {
  command: 'reload'
})
if(!window.confirm('Are you sure you want to reload the server?')) return;
api.post(`/servers/${id}/command`, {
    command: 'reload confirm'
})
alert('Reloaded server!')
}

    return <div>
        <h1 className="text-5xl font-bold">{server.name}</h1>
        <p>{server.description}</p>
        <div className="p-5 m-5 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold">Plugins</h2>
        <ul>
            {jars.map((j,i) => {
                return <li key={i}><pre>{j.attributes.name.replace('.jar', '')}</pre></li>
            })}
        </ul>
        </div>
        <div className="p-5 m-5 rounded-lg shadow-xl">
            <button className="m-5 btn btn-primary" onClick={restartServer} >Restart</button>
            <button className="m-5 btn btn-primary" onClick={() => window.location.href = "#addplugins"}>Add Plugins</button>
            <button className="m-5 btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={reloadServer}>Reload</button>
        </div>

       
    </div>
}