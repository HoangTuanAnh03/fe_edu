import React, { useEffect, useImperativeHandle, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputContainerRef {
  focusInput: () => void;
}

interface InputContainerProps {
  handleSendMessage: (messageInput: string) => void;
}

const InputContainer = React.forwardRef<InputContainerRef, InputContainerProps>(
  ({ handleSendMessage }, ref) => {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    },
  }));

  useEffect(() => {
    inputRef.current?.focus();
  })

  const handleSendClick = () => {
    handleSendMessage(messageInput);
    setMessageInput("");
    inputRef.current?.focus();
  };

  return (
    <div className=" h-full w-full flex items-center gap-4">
      <Input
        ref={inputRef}
        onKeyDown={(e) =>  e.key === "Enter" && handleSendClick()}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        type="text"
        placeholder="Aa"
      />
      <Button onClick={handleSendClick} variant="outline">
        SEND
      </Button>
    </div>
  );
}
);

export default InputContainer;
