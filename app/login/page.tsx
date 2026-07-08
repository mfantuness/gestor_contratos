"use client";

import { useState } from "react";
import { Button, Input, FormField } from "@/app/components/ui/design-system";

const mockCredentials = {
  email: "fernanda@crfpe.org.br",
  password: "123456",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email === mockCredentials.email && password === mockCredentials.password) {
      setIsLoggedIn(true);
      setError("");
      window.localStorage.setItem("mock-auth", "true");
      window.location.href = "/";
      return;
    }
    setError("Credenciais inválidas. Use joao@crfpe.gov.br / 123456.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f4f7] px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-[#1a2b4b]">Gestão do Fluxo de Contratação</h1>
          <p className="mt-2 text-sm text-slate-500">Acesse com as credenciais de demonstração</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="E-mail">
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" />
          </FormField>
          <FormField label="Senha">
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••" />
          </FormField>
          {error && <p className="text-sm text-[#ef4444]">{error}</p>}
          <Button type="submit" className="w-full py-3">
            Entrar
          </Button>
        </form>

        {isLoggedIn && <p className="mt-4 text-center text-sm text-[#22c55e]">Login bem-sucedido.</p>}
      </div>
    </div>
  );
}
