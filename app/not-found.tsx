"use client";
import React from "react";
import Link from "next/link";

export default function notFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white selection:bg-secondary bg-[url('https://pinstergames.vercel.app/_next/image?url=%2Fimages%2F404.gif&w=3840&q=75')] bg-no-repeat bg-[position:center_50%]">
      <div className="text-center">
        <h1 className="text-[#9ca3af] text-[7rem] mb-[320px] font-mono relative flex justify-center items-center w-full after:content-['Erro:_Página_Não_Encontrada'] after:bottom-0 after:absolute after:text-center after:block after:text-gray-500 after:text-2xl after:w-[80vw] max-[720px]:after:bottom-[-30%]">
          404
        </h1>
        <h2 className="text-[#1a2e4a] text-[min(3rem,5vw)] mb-2.5">
          Ops! Parece que você está perdido!
        </h2>
        <h3 className="text-gray-500 text-[min(2rem,4vw)] mb-5">
          Esta página não esta disponível...
        </h3>
        <Link 
          href="/" 
          className="inline-block bg-[#3396d3]/10 px-5 py-2.5 text-[#3396d3] font-bold rounded-tl-xl rounded-br-xl hover:rounded-tr-xl hover:rounded-bl-xl hover:bg-[#3396d3] hover:text-white transition-all duration-300"
        >
          Voltar ao Inicio
        </Link>
      </div>
    </section>
  );
}
