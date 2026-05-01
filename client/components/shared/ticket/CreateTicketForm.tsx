'use client'

import { useAuth } from "@/context/AuthContext"
import { createTicket } from "@/lib/api/tickets"
import { PriorityEnum } from "@/utils/priorityEnum"
import React, { ChangeEvent, useState } from "react"

interface CreateTicketPayload {
    subject: string
    category: string
    priority: PriorityEnum
    description: string
    attachments: File[]
}

const CreateTicketForm = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState<CreateTicketPayload>({
        subject: '',
        category: '',
        priority: PriorityEnum.MEDIUM,
        description: '',
        attachments: []
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev: CreateTicketPayload) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({
                ...prev,
                attachments: Array.from(e.target.files as FileList)
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        try{
            const data = {
                subject: formData.subject,
                category: formData.category,
                priority: formData.priority,
                description: formData.description,
                requesterId: user?.id as string,
            }

            await createTicket(data);
            console.log(data);


            setFormData({
                subject: '',
                category: '',
                priority: PriorityEnum.MEDIUM,
                description: '',
                attachments: []
            })  

        }catch (error){
            if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log(String(error))
            }
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="subject">Subject <span className="text-red-500">*</span></label>
                <input 
                    value={formData.subject}
                    onChange={handleChange}
                    name="subject" 
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all" id="subject" placeholder="E.g., Cannot access VPN network" required type="text"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="category">Category</label>
                <div className="relative">
                    <select 
                        value={formData.category}
                        onChange={handleChange}
                        name="category" 
                        className="w-full appearance-none rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 pr-10 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer" id="category">
                    <option disabled value="">Select a category</option>
                    <option value="hardware">Hardware Issue</option>
                    <option value="software">Software / Application</option>
                    <option value="network">Network &amp; Connectivity</option>
                    <option value="access">Access &amp; Permissions</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="priority">Priority Level</label>
                <div className="relative">
                    <select 
                        value={formData.priority}
                        onChange={handleChange}
                        name="priority" 
                        className="w-full appearance-none rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 pr-10 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer" id="priority">
                        <option value={PriorityEnum.LOW}>Low - General Inquiry</option>
                        <option value={PriorityEnum.MEDIUM}>Medium - Affects Productivity</option>
                        <option value={PriorityEnum.HIGH}>High - System Unavailable</option>
                        <option value={PriorityEnum.CRITICAL}>Critical - Business Stoppage</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                       <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>
            </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="description">Description <span className="text-red-500">*</span></label>
                <textarea 
                    value={formData.description}
                    onChange={handleChange}
                    name="description" 
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 resize-y transition-all" id="description" placeholder="Please describe the issue in detail. Include steps to reproduce if possible..." rows={5}></textarea>
                <p className="text-xs text-slate-400 text-right">0/5000 characters</p>
            </div>
        </div>
        <hr className="border-slate-100 dark:border-slate-700"/>

        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Attachments</h3>
            <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Optional</span>
            </div>
            <div className="group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary dark:hover:border-primary transition-all cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="mb-3 p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-[28px]">cloud_upload</span>
                </div>
                <p className="mb-1 text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-slate-400">SVG, PNG, JPG or PDF (MAX. 10MB)</p>
                </div>
                    <input 
                        onChange={handleFileChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
                </div>
            </div>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 mt-2">
            <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800" type="button">
                                        Cancel
                                    </button>
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 focus:ring-4 focus:ring-primary/30">
            <span>Submit Ticket</span>
            <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
        </div>
    </form>
  )
}

export default CreateTicketForm