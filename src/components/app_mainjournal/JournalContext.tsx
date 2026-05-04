import { createContext, useContext, useState } from "react";

export enum JournalType {
    SMORX = 1,
    INOGOROD = 2,
}

interface JournalContextType {
    journalType: JournalType;
    setJournalType: (type: JournalType) => void;
    journalName: string;
}

interface JournalProviderProps {
    children: React.ReactNode;
    defaultType?: JournalType;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider = ({
    children,
    defaultType = JournalType.SMORX
}: JournalProviderProps) => {
    const [journalType, setJournalType] = useState<JournalType>(defaultType);
    const journalName = journalType === JournalType.SMORX ? 'СМО РХ' : 'Иногородние';

    return (
        <JournalContext.Provider value={{
            journalType,
            setJournalType,
            journalName
        }}>
            {children}
        </JournalContext.Provider>
    )
}

export const useJournal = () => {
    const context = useContext(JournalContext);

    if (context === undefined) {
        throw new Error('useJournal должен использоваться в рамках JournalProvider');
    }

    return context;
}