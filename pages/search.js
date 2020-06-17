import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/home/Section";
import SearchIcon from "../public/assets/search.svg";

export default function Search() {
  return (
    <Layout title="Roomet">
      <div className="bg-turquey p-4">
        <div className="container bg-white relative px-2 py-2 bd-width rounded bd-grey-light shadow-md-light">
          <SearchIcon fill="rgb(96, 111, 123)" width={20} height={20} />
          <input
            id="where"
            type="text"
            placeholder="Managua, Nicaragua"
            className="input-search"
            onChange={(e) => {
              setSearchText(e.target.value.toLowerCase());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search/${searchText}`, undefined, {
                  shallow: true,
                });
              }
            }}
          ></input>
        </div>
      </div>
      <Section
        title="Resultados de la busqueda"
        customMsg="Escribe el nombre de una ciudad para encontrar tu casa o apartamento ideal."
      />
      <style jsx>
        {`
          .container {
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1rem;
            padding-left: 1rem;
          }
        `}
      </style>
    </Layout>
  );
}
