import React from 'react'

export default function ConfirmDialog(props) {
  const { postId, isLoading, isOpen, handleConfirm, handleClose, controls, theme } = props
  const {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Button,
  } = controls

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen}>
      <DialogHeader className='border-b border-gray-200'>Confirm</DialogHeader>
      <DialogBody>
        <Typography className='text-gray-900 text-lg'>Are you sure you want to permanently delete this thread?</Typography>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="blue"
          onClick={handleClose}
          className="py-2.5 px-5 ms-3 mr-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <span>Cancel</span>
        </Button>
        <Button style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} onClick={(e) => handleConfirm(e, postId)}>
          <span>{ isLoading ? 'Confirming...' : 'Confirm'}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}