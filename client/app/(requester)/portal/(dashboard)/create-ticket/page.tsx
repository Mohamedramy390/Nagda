import CreateTicketForm from '@/components/shared/ticket/CreateTicketForm'
import InnerLayout from '@/components/shared/ui/InnerLayout'
import Title from '@/components/shared/ui/Title'
import React from 'react'

const page = () => {
  return (
    <InnerLayout>
        <Title title='Create Ticket' 
            description='Fill in the details below to submit a new support request regarding your issue.' 
        />
        <CreateTicketForm />
    </InnerLayout>
  )
}

export default page