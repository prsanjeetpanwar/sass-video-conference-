"use client"
import React from 'react'
import {useQuery, useSuspenseQuery} from "@tanstack/react-query"
import { useTRPC } from '@/trpc/client'
import { LoadingState } from '@/components/loading-state'
import ErrorState from '@/components/error-state'
import ResponsiveDialog from '@/components/responsive-dailog'
import { Button } from '@/components/ui/button'

export const AgentView = () => {
    const trpc= useTRPC()
    const {data,isLoading}=useSuspenseQuery(trpc.agents.getMany.queryOptions())

    
    // if(isError){
    //     return (
    //       <ErrorState title="Error Loading Agents" description="Please try again later." />
    //     )
    // }
  return (
    <div>

      {JSON.stringify(data,null,2)}
    </div>
  )
}



export const  AgentsViewLoading=()=>{

  return (
    <div className="flex flex-1 items-center justify-center">
      <LoadingState title="Loading Agents" description="This may take a few seconds." />
    </div>
  )
}

export default AgentsViewLoading