import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ModalButton({
  innerButtonText,
  color,
  openButtonStyles,
  variant,
  title,
  leftButtonText,
  rightButtonText,
  leftButtonAction,
  rightButtonAction,
  leftButtonStyles,
  rightButtonStyles,
  severity,
  content,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleLeftButton = () => {
    leftButtonAction && leftButtonAction();
    setOpen(!open);
  };
  const handleRightButton = () => {
    rightButtonAction && rightButtonAction();
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleOpen} variant={variant} className={`${openButtonStyles}`}>
        {innerButtonText}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <div className="w-full flex-col justify-center items-center">
            {title}
          </div>
        </DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleLeftButton}
            className={`${leftButtonStyles} mr-1`}
          >
            <span>{leftButtonText}</span>
          </Button>
          <Button
            variant={"filled"}
            className={`${rightButtonStyles} mr-1`}
            onClick={handleRightButton}
          >
            <span>{rightButtonText}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
