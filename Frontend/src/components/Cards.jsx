import React from "react";
import { Link } from "react-router-dom";
import { WORKERS, getCategoryById } from "../data/workers.js";
const Cards = () => {
    const data = WORKERS;
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((card,index)=>{
        const cat = getCategoryById(card.categoryId);
        const cover = card.images?.[0] || cat?.image;
        return (
            <div key={index} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  {cover ? <img src={cover} alt={card.name} className="h-full w-full object-cover transition group-hover:scale-[1.03]" /> : null}
                </div>
                <div className="p-4">
                    <h3 className="font-extrabold text-slate-900">{card.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{card.location}</p>
                    <p className="mt-1 text-sm text-slate-500">{card.listedAt}</p>
                    <div className="mt-4">
                      <Link to={`/workers/${encodeURIComponent(card.id)}`} className="inline-flex w-full">
                        <button className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black">
                          View details
                        </button>
                      </Link>
                    </div>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default Cards
