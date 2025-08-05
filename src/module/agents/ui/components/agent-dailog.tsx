import React from 'react'
import ResponsiveDialog from "@/components/responsive-dailog"
import { AgentForm } from './agent-form'
import { toast } from 'sonner'


interface NewAgentDialogProps {
    open:boolean,
    onOpenChange:(open:boolean)=>void
}

const AgentDialog = ({open,onOpenChange}:NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
    title='New Agent'
    description='Create a new agent'
    open={open}
    onOpenChange={onOpenChange}
    >
     <AgentForm
     onSuccess={()=>{
      onOpenChange(false)
      toast.success('Agent created successfully')
     }}
     onCancel={()=>onOpenChange(false)}
     />
    </ResponsiveDialog>
  )
}

export default AgentDialog
