import { Timestamp } from "firebase/firestore";

interface TransactionProps {
    success: Boolean;
    timestamp: Timestamp;
    balance: number;
}

const Transaction: React.FC<TransactionProps> = ({success, timestamp, balance}) => {

    return(
        <div className="w-full border-b border-b-neutral-900 py-2 flex">
            <span className="text-black w-2/6">{timestamp.toDate().toLocaleString()} </span>
            {success ? <span className="text-emerald-500 font-semibold w-3/6">Successful</span>
            : <span className="text-red-500 font-semibold w-3/6">Unsuccessful</span>}
            <span className="text-black w-1/6">${balance}</span>
        </div>
    )
}

export default Transaction