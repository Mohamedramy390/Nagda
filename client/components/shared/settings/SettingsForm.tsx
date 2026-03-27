'use client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ProfileHeader from './ProfileHeader'
import PersonalDetails from './PersonalDetails'
import AccountPreferences from './AccountPreferences'
import PrimaryBtn from '../ui/PrimaryBtn'
type userData = {
    firstName: string,
    lastName: string,
    role: string,
    email: string
}
const SettingsForm = ({initialData}:{initialData:userData}) => {

    const methods = useForm({
        defaultValues: initialData,
        mode: 'onChange'
    })

    const onSubmit = (data:userData) =>{
        console.log('data saved', data)
    }
  return (
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-10 space-y-10">
        <ProfileHeader />
        <PersonalDetails />
        <AccountPreferences />
        
        <PrimaryBtn label='Save changes' icon='save' type='save'/>
      </form>
    </FormProvider>
  )
}

export default SettingsForm
