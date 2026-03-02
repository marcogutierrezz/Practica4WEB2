import { Fragment, useContext } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { BudgetDispatchContext, BudgetStateContext } from "../context/BudgetContext";
import { ExpenseForm } from "./ExpenseForm";

export default function ExpenseModal() {

    const { modal } = useContext(BudgetStateContext);
    const dispatch = useContext(BudgetDispatchContext);

    return (
        <>
            <div className="fixed right-5 bottom-5">
                <button onClick={() => dispatch({ type: "show-modal" })}>
                    <PlusCircleIcon className="w-16 h-16 text-blue-600" />
                </button>
            </div>

            <Transition appear show={modal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => dispatch({ type: "close-modal" })}
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-2xl">
                            <ExpenseForm />
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}