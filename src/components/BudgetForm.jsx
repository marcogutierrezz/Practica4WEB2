import { useState, useContext } from "react";
import { BudgetDispatchContext } from "../context/BudgetContext";

export const BudgetForm = () => {

    const [budget, setBudget] = useState(0);
    const dispatch = useContext(BudgetDispatchContext);

    const isInvalid = isNaN(budget) || budget <= 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "add-budget",
            payload: { budget }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <label className="text-4xl text-blue-600 font-bold text-center block">
                Definir presupuesto
            </label>

            <input
                type="number"
                className="w-full bg-slate-100 p-2"
                placeholder="Define tu presupuesto"
                onChange={(e) => setBudget(e.target.valueAsNumber)}
            />

            <input
                type="submit"
                value="Definir presupuesto"
                disabled={isInvalid}
                className="bg-blue-600 w-full p-2 text-white uppercase font-bold rounded-lg disabled:opacity-40"
            />
        </form>
    );
};