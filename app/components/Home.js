import React from 'react'
import Rebase from 're-base'


export default function Home () {
  return (
    <div>
      <h2 className="text-center">
        Select a Campaign
      </h2>
      <ul>
        <li><a href="/#/campaign/test-list">test-list</a></li>
        <li><a href="/#/campaign/test-list-2">test-list-2</a></li>
        <li><a href="/#/campaign/test-list-3">test-list-3</a></li>
      </ul>
    </div>
  )
}
