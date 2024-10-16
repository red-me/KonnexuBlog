import React from "react"

export default function Submenu(props) {
  const { path, router } = props
  const submenu = { 'All Threads': '', 'My Threads': 'my-threads' }
  return (
    <div className="block bg-white w-full shadow top-14 z-1 py-2">
      <div className="mx-auto w-full  max-w-screen-xl  flex gap-2 items-center h-8 px-2">
        {submenu && Object.keys(submenu).map(p => <div className="text-sm text-black cursor-pointer" onClick={() => { router.push(`/${path[0]}/${submenu[p]}`) }}>{p}</div>)}
      </div>
    </div>
  )
}