import React from 'react'
import { AlertCircle } from 'lucide-react'

interface Props {
  title: string
  description: string
}

const ErrorState = ({ title, description }: Props) => {

  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4 bg-background rounded-lg p-10 shadow-sm border border-red-300">
        <AlertCircle className="size-8 text-red-600" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-semibold text-red-700">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorState
