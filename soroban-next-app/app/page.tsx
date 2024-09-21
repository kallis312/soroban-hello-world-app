'use client'

import * as Client from 'hello_world'
import { useState } from 'react'

const client = new Client.Client({
  ...Client.networks.testnet,
  rpcUrl: 'https://soroban-testnet.stellar.org',
})

export default function Home() {
  const [msg, setMsg] = useState<string>('')

  const formAction = async (formData: FormData) => {
    const name = formData.get('name')
    if (name) {
      const { result } = await client.hello({
        to: name.toString()
      })
      setMsg(result.join(' ') + '!')
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form action={formAction}>
          <label htmlFor="nameInput" className="block mb-2 text-sm font-medium text-gray-900">
            Your Name:
          </label>
          <input type="text" className="border border-gray-300 rounded-md p-2 mr-2" placeholder="Enter your name" name="name" />
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Submit</button>
          <p className="text-lg">{msg}</p>
        </form>
      </main>
    </div>
  );
}
