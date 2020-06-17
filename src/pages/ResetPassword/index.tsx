import React, { useCallback, useRef } from "react";
import { FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import getValidationErrors from "../../utils/getValidationErrors";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import { Link, useHistory, useLocation } from "react-router-dom";

import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";
import api from "../../services/api";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();
  let params = new URLSearchParams(location.search);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória."),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "As senhas não conferem."
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/password/reset", {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token: params.get("token"),
        });

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: "error",
          title: "Erro ao resetar senha",
          description: "Ocorreu um erro ao resetar sua senha. Tente novamente.",
        });
        return;
      }
    },
    [addToast, history, params]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova senha"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
