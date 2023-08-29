import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import logo from "../../Assets/smllogo.webp";
export default function LoginDesktop({ handleOpenRegister, handleJoin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showView, setShowView] = useState(false);

  //   const handlePasswordView = () => {
  //     setShowView(!showView);
  //   };
  //   const handleSubmit = async () => {
  //     const response = await axios.get(`/clientes/username?username=${username}`);
  //     const client = response.data;
  //     console.log(client);
  //     if (username === client.username && password === client.password) {
  //       handleJoin();
  //     } else {
  //       console.log("todo mal");
  //     }
  //   };

  return (
    <div className="flex  flex-row justify-evenly items-center w-screen h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-y-4 mt-8 w-fit h-fit">
          <SignIn
            routing="path"
            path="/sign-in"
            appearance={{
              variables: {
                spacingUnit: "0.8rem",
                borderRadius: "10px",
              },
              layout: {
                socialButtonsVariant: "blockButton",
                socialButtonsPlacement: "top",
              },
              elements: {
                socialButtonsBlockButton:
                  "text-white bg-[#404062] m-2 h-14 w-[450px] ",
                formButtonPrimary: "hidden",
                formFieldInput: "hidden",
                card: " bg-transparent m-0 p-0 flex items-center justify-center h-[200px] w-[400px] shadow-none",
                main: "flex flex-col p-0 m-0  w-fit bg-transparent items-center justify-center gap-4 shadow-none",
                form: "hidden",
                formField: "hidden",
                dividerRow: "hidden",
                formFieldLabel: "hidden",
                footerActionText: "hidden",
                logoImage: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton__slack: "hidden",
                button: "hidden",
                footerAction__signUp: "hidden",
                footer: "hidden",
                logoBox: "hidden",
                navbar: "hidden",
              },
            }}
            afterSignInUrl="/clientes-home"
          />

          <div className="flex ">
            <p>¿No tienes cuenta?</p>
            <button onClick={handleOpenRegister} className="text-blue-600 ml-1">
              Crea una!
            </button>
          </div>
        </div>
      </div>
      <hr className="border-2 border-[#8F00FF] h-4/6 w-0 mx-4 py-52 rounded-2xl" />
      <img src={logo} alt="logo" className="w-[350px] h-[350px]" />
    </div>
  );
}
