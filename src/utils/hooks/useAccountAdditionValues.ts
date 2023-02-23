import { atom } from "jotai";
import { AccountCreation } from "@/pages/create-account";

type AccountCreationFormData = {
    accountCreation: AccountCreation
}

export const accountCreationAtom = atom<AccountCreation | undefined>(undefined)

export const accountAtom = atom(
    (get) => {
        const accountCreation = get(accountCreationAtom)
        return {
            accountCreation
        }
    },
    (_, set, { accountCreation } : AccountCreationFormData) => {
        set(accountCreationAtom, accountCreation)
    }
)