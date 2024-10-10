import React from 'react'

// might need to translate slugs to meaningful text rather that doing the split-joint-split thing.

function PageHeader({ slugs }) {
  return (
    <div className="bg-gray-100 shadow p-4 sticky top-0 z-10">
      <h1 className="capitalize">{slugs.join(' / ').split("-").join(" ")}</h1>
    </div>
  )
}

export default PageHeader