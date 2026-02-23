"use client"

import React from "react"

const CollapsibleContext = React.createContext({})

const Collapsible = React.forwardRef(({ open, onOpenChange, defaultOpen, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || false)
  
  const isControlled = open !== undefined
  const state = isControlled ? open : isOpen

  const handleOpenChange = (value) => {
    if (!isControlled) setIsOpen(value)
    onOpenChange?.(value)
  }

  return (
    <CollapsibleContext.Provider value={{ isOpen: state, onOpenChange: handleOpenChange }}>
      <div 
        ref={ref}
        data-state={state ? "open" : "closed"} 
        {...props}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
})

const CollapsibleTrigger = React.forwardRef(({ children, onClick, ...props }, ref) => {
  const { isOpen, onOpenChange } = React.useContext(CollapsibleContext)
  
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e)
        onOpenChange(!isOpen)
      }}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </button>
  )
})

const CollapsibleContent = React.forwardRef(({ children, ...props }, ref) => {
  const { isOpen } = React.useContext(CollapsibleContext)
  
  if (!isOpen) return null

  return (
    <div 
      ref={ref}
      data-state="open" 
      {...props}
    >
      {children}
    </div>
  )
})

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
