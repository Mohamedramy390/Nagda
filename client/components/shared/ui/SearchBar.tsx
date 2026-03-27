'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  queryParam?: string // URL query parameter name (default: 'search')
  debounceMs?: number // Debounce delay in milliseconds (default: 300)
  className?: string
  onSearch?: (value: string) => void // Optional callback when search value changes
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for tickets, articles...", 
  queryParam = 'search',
  debounceMs = 300,
  className = "",
  onSearch
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Local state for the input (transient, changes immediately on typing)
  const urlValue = searchParams.get(queryParam) || ''
  const [inputValue, setInputValue] = useState(urlValue)

  // Update local state when URL changes (browser back/forward)
  useEffect(() => {
    setInputValue(urlValue)
  }, [urlValue])

  // Debounce and update URL when input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update URL if the input value differs from current URL value
      if (inputValue === urlValue) return

      const params = new URLSearchParams(searchParams.toString())
      
      if (inputValue.trim()) {
        params.set(queryParam, inputValue)
      } else {
        params.delete(queryParam)
      }
      
      // Update URL without page reload
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.push(newUrl, { scroll: false })
      
      // Call optional callback
      if (onSearch) {
        onSearch(inputValue)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [inputValue, urlValue, pathname, queryParam, debounceMs, onSearch, router, searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={`flex w-full max-w-md items-center ${className}`}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
        </div>
        <input 
          className="block w-full rounded-lg border-0 bg-slate-100 py-2 pl-10 pr-4 text-sm text-[#0d141b] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all dark:bg-slate-800 dark:text-white" 
          placeholder={placeholder}
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SearchBar

