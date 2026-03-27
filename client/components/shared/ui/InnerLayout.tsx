import React, { ReactNode } from 'react'

interface InnerLayoutProps {
  children?: ReactNode
}

const InnerLayout = ({children}: InnerLayoutProps) => {
  return (
    <div className='flex flex-col gap-8 p-3'>
      {children}
    </div>
  )
}

export default InnerLayout
