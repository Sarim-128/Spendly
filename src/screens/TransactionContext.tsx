import { createContext, useContext, useEffect, useState } from "react"
import { createMMKV } from 'react-native-mmkv'




const storage = createMMKV()
const TRANSACTION_KEY = 'user_transaction'


export interface Transaction {
    id: string,
    amount: number,
    title: string,
    type: 'income' | 'expenses'
    date: string
}

interface transactionContextType {
    transactions: Transaction[]
    addTransaction: (tx: Omit<Transaction, 'id'>) => void
    deleteTransaction: (id: string) => void
    clearAllTransactions: () => void
}

const TransactionContext = createContext<transactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [transactions, setTransaction] = useState<Transaction[]>(() => {
        try {
            const storedData = storage.getString(TRANSACTION_KEY);
            return storedData ? JSON.parse(storedData) : []
        }
        catch (e) {
            console.error('Failed to parse transaction from MMKV:', e)
        }
        return []
    });


    useEffect(() => {
        try {
            storage.set(TRANSACTION_KEY, JSON.stringify(transactions))
        }
        catch (e) {
            console.error('Failed to save transactions to MMKV:', e);
        }
    }, [transactions])



    const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
        const itemWithId: Transaction = {
            ...newTx,
            id: Date.now().toString(),
        };
        setTransaction((prev) => [itemWithId, ...prev])
    }

    const deleteTransaction = (id: string) => {
        setTransaction((prev) => prev.filter((tx) => tx.id !== id))
    }

    const clearAllTransactions = () => {
        setTransaction([]);
        storage.remove(TRANSACTION_KEY)
    }

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, clearAllTransactions }}>
            {children}
        </TransactionContext.Provider>
    )
};

export const useTransactions = () => {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error('useTransactions must be used within a Transaction provider')
    }
    return context;
}