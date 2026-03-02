import { useContext } from "react";
import { categories } from "../data/categories";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { BudgetDispatchContext } from "../context/BudgetContext";

export const ExpenseDetails = ({ expense }) => {

    const dispatch = useContext(BudgetDispatchContext);

    const categoryInfo = categories.find(
        cat => cat.id === expense.category
    );

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() =>
                dispatch({
                    type: "get-expense-by-id",
                    payload: { id: expense.id }
                })
            }>
                Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive onClick={() =>
                dispatch({
                    type: "remove-expense",
                    payload: { id: expense.id }
                })
            }>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-6 border-b flex gap-5 items-center">

                    <img
                        src={`/icono_${categoryInfo.icon}.svg`}
                        className="w-16"
                    />

                    <div className="flex-1">
                        <p className="uppercase text-sm text-slate-500 font-bold">
                            {categoryInfo.name}
                        </p>

                        <p>{expense.expenseName}</p>

                        <p className="text-sm text-slate-600">
                            {new Date(expense.date).toLocaleDateString()}
                        </p>
                    </div>

                    <p className="text-xl font-bold text-blue-600">
                        ${expense.amount}
                    </p>

                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};