import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "./ui/MaterialUI";
 
export default function Modal({ isOpen, isSaving, title, content, onCancel, onConfirm }) {
  return (
    <>
      <Dialog open={isOpen}>
        <DialogHeader>{ title }</DialogHeader>
        <DialogBody>{ content }</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={onCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={onConfirm}>
            <span>{ isSaving ? 'Confirming...' : 'Confirm'}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
