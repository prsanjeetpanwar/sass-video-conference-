"use client"
import React from 'react'
import {
 Dialog, DialogContent,
 DialogHeader, DialogTitle, DialogDescription
}
from "@/components/ui/dialog"
import { useIsMobile } from '@/hooks/use-mobile'
import { Drawer, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer'


interface ResponsiveDialogProps {
   title: string, 
   description:string,
   children: React.ReactNode,
   open:boolean,
   onOpenChange:(open:boolean) =>void
}

const ResponsiveDialog = ({title,
    description,
    children ,
    open,
    onOpenChange
}: ResponsiveDialogProps) => {
    const isMobile=useIsMobile()



    if(isMobile){
        return (
            <Drawer open={open} onOpenChange={onOpenChange} >
                <DrawerHeader>
                  <DrawerTitle>
                   {title}
                  </DrawerTitle>
                   <DrawerDescription>
                      {description}
                    </DrawerDescription>
                    <div className='p-4'>
                   {children}
                    </div>
                </DrawerHeader>
            </Drawer>
        )
    }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogDescription>
        {description}
      </DialogDescription>
    </DialogHeader>
    {children}
   </DialogContent>
    </Dialog>
  )
}

export default ResponsiveDialog
