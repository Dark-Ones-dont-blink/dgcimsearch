"use client";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Esbirros } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<Esbirros[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(20);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/data?page=${page}&limit=${limit}&search=${search}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const text = await res.text();
      const data = JSON.parse(text);
      setData(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, search, limit]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-12 pb-12">
      <article className="flex min-h-[80svh] w-full h-full relative overflow-hidden">
        <Image
          src={"/dgcim-bg.webp"}
          alt="main-bg"
          width={1000}
          height={1000}
          className="object-cover object-top w-full opacity-50"
        />
        <div className="flex flex-col w-full h-full absolute z-50 top-0 left-0 container justify-center gap-8">
          <h1 className="text-7xl lg:text-9xl uppercase max-w-screen-md [&_span]:text-primary">
            Buscador de <span>esbirros</span> del <span>DGCIM</span>
          </h1>
          <p className="opacity-80 max-w-lg">
            Se brinda información de aquellos que han estado persiguiendo,
            encarcelando y asesinando al pueblo de Venezuela por mandato del
            tirano usurpador Nicolas Maduro y su cúpula del terror.
          </p>
          <div>
            <a href="#buscador" className="btn btn-lg btn-primary uppercase">
              Comenzar búsqueda
            </a>
          </div>
        </div>
        <div className="flex w-full h-full absolute bg-gradient-to-t from-base-100 to-transparent z-40 top-0 left-0" />
      </article>
      <article
        id="buscador"
        className="flex flex-col gap-4 items-center text-center container"
      >
        <h1 className="uppercase [&_span]:text-primary max-w-screen-lg max-md:text-4xl">
          Esta pagina tiene como objetivo exponer a los <span>esbirros</span> de
          la <span>tiranía socialista</span> de Venezuela
        </h1>
        <p className="opacity-80 text-lg max-w-screen-sm">
          La información aquí presentada fue obtenida de la base de datos del
          regimen con la ayuda de Anonymous. Se agradece el esfuerzo y
          dedicación por parte de la resistencia para dejar en evidencia las
          atrocidades cometidas por la tiranía socialista de Venezuela.
        </p>
      </article>
      <article className="w-full h-full container space-y-6">
        <SearchBar onSearch={handleSearch} />
        <div className="join items-center">
          <h6 className="mr-4">Esbirros por pagina:</h6>
          {[20, 30, 40, 50].map((value) => (
            <button
              key={value}
              onClick={() => handleLimitChange(value)}
              className={`join-item btn btn-sm btn-outline ${
                limit === value ? "btn-disabled" : ""
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <DataTable data={data} loading={loading} />
        <Pagination page={page} setPage={setPage} total={total} limit={limit} />
      </article>
    </main>
  );
}
