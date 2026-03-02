import { useContext, useState, useEffect } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
    BudgetDispatchContext,
    BudgetStateContext
} from "../context/BudgetContext";
import ErrorMessage from "./ErrorMessage";

export const ExpenseForm = () => {

    const dispatch = useContext(BudgetDispatchContext);
    const state = useContext(BudgetStateContext);

    const [expense, setExpense] = useState({
        expenseName: "",
        amount: 0,
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState("");

    // 🔵 Cargar datos si estamos editando
    useEffect(() => {
        if (state.editingId) {
            const expenseToEdit = state.expenses.find(
                exp => exp.id === state.editingId
            );
            if (expenseToEdit) {
                setExpense(expenseToEdit);
            }
        }
    }, [state.editingId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔴 Validación campos vacíos
        if (
            expense.expenseName.trim() === "" ||
            expense.amount <= 0 ||
            expense.category === ""
        ) {
            setError("Todos los campos son obligatorios");
            return;
        }

        // 🔴 Calcular total actual
        const totalActual = state.expenses.reduce(
            (acc, exp) => acc + exp.amount,
            0
        );

        // 🔴 Si estamos editando, restamos el monto anterior
        let totalSinEditar = totalActual;

        if (state.editingId) {
            const originalExpense = state.expenses.find(
                exp => exp.id === state.editingId
            );
            totalSinEditar = totalActual - originalExpense.amount;
        }

        // 🔴 Validar que no exceda el presupuesto
        if (totalSinEditar + expense.amount > state.budget) {
            setError("No puedes exceder el presupuesto definido");
            return;
        }

        // 🟢 Si estamos editando
        if (state.editingId) {
            dispatch({
                type: "update-expense",
                payload: { expense }
            });
        } else {
            // 🟢 Nuevo gasto
            dispatch({
                type: "add-expense",
                payload: { expense }
            });
        }

        // 🔵 Reset del formulario
        setExpense({
            expenseName: "",
            amount: 0,
            category: "",
            date: new Date(),
        });

        setError("");
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>

            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Nombre */}
            <div className="flex flex-col gap-2">
                <label className="text-xl">Nombre Gasto:</label>
                <input
                    type="text"
                    className="bg-slate-100 p-2"
                    value={expense.expenseName}
                    onChange={(e) =>
                        setExpense({ ...expense, expenseName: e.target.value })
                    }
                />
            </div>

            {/* Monto */}
            <div className="flex flex-col gap-2">
                <label className="text-xl">Cantidad:</label>
                <input
                    type="number"
                    className="bg-slate-100 p-2"
                    value={expense.amount}
                    onChange={(e) =>
                        setExpense({ ...expense, amount: Number(e.target.value) })
                    }
                />
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-2">
                <label className="text-xl">Categoría:</label>
                <select
                    className="bg-slate-100 p-2"
                    value={expense.category}
                    onChange={(e) =>
                        setExpense({ ...expense, category: e.target.value })
                    }
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Fecha */}
            <div className="flex flex-col gap-2">
                <label className="text-xl">Fecha Gasto:</label>
                <DatePicker
                    value={expense.date}
                    onChange={(date) =>
                        setExpense({ ...expense, date })
                    }
                />
            </div>

            <input
                type="submit"
                value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            />
        </form>
    );
};