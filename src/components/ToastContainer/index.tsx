import React from "react";

import { ToastMessage, useToast } from "../../hooks/toast";

import Toast from "./Toast";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} data={message}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
