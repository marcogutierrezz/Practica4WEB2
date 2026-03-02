import { useContext } from "react";
import { BudgetStateContext } from "../context/BudgetContext";
import { ExpenseDetails } from "./ExpenseDetails";

export default function ExpenseList() {

    const state = useContext(BudgetStateContext);

    const filteredExpenses = state.currentCategory
        ? state.expenses.filter(
            expense => expense.category === state.currentCategory
        )
        : state.expenses;

    if (!filteredExpenses.length) {
        return <p className="text-center">No hay gastos aún</p>;
    }

    return (
        <div className="space-y-4">
            {filteredExpenses.map(expense => (
                <ExpenseDetails key={expense.id} expense={expense} />
            ))}
        </div>
    );
}