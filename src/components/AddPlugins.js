import { useEffect, useState } from 'react'

export default function AddPlugins () {
  const [plugins, setPlugins] = useState([])
  const [query, setQuery] = useState('')
//     useEffect(() => {
// fetch('https://api.spiget.org/v2/search/resources/discordsrv?field=name')
    //     })
  const getPlugins = async () => {
    const res = await fetch(`https://api.spiget.org/v2/search/resources/${query}?field=name`)
    const data = await res.json()
    setPlugins(data.filter(e => e.premium === false))
  }
  return <div className='hero min-h-screen bg-base-200'>
    <div className='hero-content text-center'>
      <div className='max-w-2xl'>
        <h1 className='text-5xl font-bold'>Search plugins</h1>

        <form className='py-6' onSubmit={(e) => e.preventDefault()}>
          <label for='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
              </svg>
            </div>
            <input type='search' id='default-search' className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Worldgaurd,edit' required onChange={(e) => setQuery(e.target.value)} value={query} />
            <button type='submit' className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={getPlugins}>Search</button>
          </div>
        </form>
        <br />
        <hr />
        <br />
        <div className='grid grid-cols-2 p-2 mt-2 rounded-lg shadow-xl lg:grid-cols-4 border-20'>
          {plugins.map((s, i) => {
            console.log(s)
            return <div className='m-2 transition duration-500 ease-in-out transform shadow-xl card bg-base-100 hover:-translate-y-1 lg:hover:scale-110 hover:scale-105' key={i}>
              <img src={`data:image/jpg;base64,${s.icon.data}`} alt='' />
              <h2 className='card-title'>{s.name}</h2>
              <p className='card-body'>{s.tag}</p>
              <div className='flex-1'>
                <button className='btn btn-primary' onClick={() => {
                  window.open(`https://www.spigotmc.org/resources/${s.file.url.split('/').slice(0, 2)}/`)
                }}>Spigot</button>

                <button className='btn btn-primary'>
                                Install
                    </button>
              </div>
              {/* <button className='btn btn-primary' onClick={() => {
            const urlParams = new URLSearchParams(window.location.search)
            urlParams.set('server', s.uuid)
            window.location.search = urlParams.toString()
          }}>Open</button> */}
            </div>
          })}
        </div>

      </div>
    </div>
  </div>
}
