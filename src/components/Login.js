import { login } from "../util/loginsys"

export default function Login() {
    return (
        <div className="min-h-screen hero bg-base-200">
  <div className="flex-col hero-content lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login</h1>
      <p className="py-6">Login using your pterodactyl credentials</p>
    </div>
    <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
                    <form className="card-body" onSubmit={(e) => {
                        e.preventDefault()
                        const key = e.target[1].value
                        const url = e.target[0].value
                        login(key, url).then(() => {
                          window.location.reload()
                        })
                       
      }}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Panel URL</span>
          </label>
          <input type="url" placeholder="https://pterodactyl.file.properties" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pterodactyl Client Api Key</span>
          </label>
          <input type="password" placeholder="apikey" className="input input-bordered" required />
          {/* <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label> */}
        </div>
        <div className="mt-6 form-control">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    )
}