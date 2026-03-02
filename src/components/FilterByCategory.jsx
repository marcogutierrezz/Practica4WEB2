import { useContext } from "react";
import { categories } from "../data/categories";
import { BudgetDispatchContext } from "../context/BudgetContext";

export default function FilterByCategory() {

    const dispatch = useContext(BudgetDispatchContext);

    return (
        <div className="mb-5">
            <select
                className="bg-slate-100 p-2 w-full"
                onChange={(e) =>
                    dispatch({
                        type: "add-filter-category",
                        payload: { category: e.target.value }
                    })
                }
            >
                <option value="">-- Todas las categorías --</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}