import { useContext } from "react";
import {
    BudgetStateContext,
    BudgetDispatchContext
} from "../context/BudgetContext";
import AmountDisplay from "./AmountDisplay";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {

    const state = useContext(BudgetStateContext);
    const dispatch = useContext(BudgetDispatchContext);

    const totalExpenses = state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const remainingBudget = state.budget - totalExpenses;

    const percentage = state.budget > 0
        ? ((totalExpenses / state.budget) * 100).toFixed(2)
        : 0;

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">

            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    pathColor: percentage > 100 ? "#dc2626" : "#3b82f6",
                    textColor: percentage > 100 ? "#dc2626" : "#3b82f6",
                    trailColor: "#e5e7eb"
                })}
            />

            <div className="flex flex-col gap-4">

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />

                <button
                    onClick={() => dispatch({ type: "reset-app" })}
                    className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg uppercase font-bold mt-4"
                >
                    Resetear App
                </button>

            </div>
        </div>
    );
}