'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'


export default function DeleteMovieDialog({ movie,open, isOpen, onClose, onConfirm }) {

    const HandleDelete = movie => {
        // Implement delete logic here if needed
        // console.log('delete movie', movie)
    }

    return (
        <div>
            <Dialog className="text-black"   open={open} onClose={onClose}>
                <DialogHeader>
                    <DialogTitle className="text-red-600">Delete Movie</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <div className="flex items-center text-red-600">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                        </svg>
                        <div className='flex flex-col gap-1 justify-items-between'>
                            <p className='font-bold'>Warning!</p>
                            <p>You are about to delete <span className='text-blue-600'>{movie.title}</span> Movie.</p>
                            <p>Are you sure you want to proceed?</p>
                        </div>
                    </div>
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button className='text-black' variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className='text-white bg-red-600 hover:bg-red-700' variant='destructive' onClick={onConfirm}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
    }
