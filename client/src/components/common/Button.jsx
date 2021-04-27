import React from 'react'

export default function Button({label, type, onClick, className}) {
  return (
    <button onClick={onClick} type={type} className={className}>
      {label}
    </button>
  )
}
