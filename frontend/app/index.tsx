import React, { useState } from 'react'

const Index = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

  return (
    <div>index</div>
  )
}

export default Index