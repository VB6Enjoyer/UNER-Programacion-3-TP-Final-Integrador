// propio de reactjs
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import { Cuerpo } from "../Cuerpo/Cuerpo";

export function Login() {
  const baseURL = "http://localhost:3010/api/v1/";
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    correoElectronico: "",
    clave: "",
  });

  const { setUserData } = useContext(UserContext);

  const enviarInformacion = async (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "auth/login", formulario)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          setUserData({ user: res.data.usuario, token: res.data.token });
          navigate("/privado/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Cuerpo>
        <div className="login-container">
          <div className="login-form">
            <Form onSubmit={(e) => enviarInformacion(e)}>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group className="mb-3" controlId="formBasicUsuario">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          correoElectronico: e.target.value,
                        })
                      }
                      value={formulario.correoElectronico}
                      required
                      placeholder="Ingresa tu correo electrónico"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group className="mb-3" controlId="formBasicClave">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) =>
                        setFormulario({ ...formulario, clave: e.target.value })
                      }
                      value={formulario.clave}
                      required
                      placeholder="Ingresa tu clave"
                    />
                  </Form.Group>
                </div>
              </div>

              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </Form>
          </div>
        </div>
      </Cuerpo>
    </>
  );
}
