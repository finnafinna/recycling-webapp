import { Timestamp } from "firebase/firestore";
import Image from "next/image";

interface TransactionFullProps {
    success: Boolean;
    timestamp: Timestamp;
    balance: number;
    image: string;
}

const TransactionFull: React.FC<TransactionFullProps> = ({success, timestamp, balance, image}) => {

    return(
        <>
        <div className="min-w-full max-w-full border-t border-t-neutral-900 py-2 flex items-center justify-center">
            <Image src={image} alt="transaction result" width={600} height={600}/>

        </div>
        <div className="min-w-full max-w-full border-b border-b-neutral-900 py-2 flex">
            <span className="text-black w-2/6">{timestamp.toDate().toLocaleString()} </span>
            {success ? <span className="text-emerald-500 font-semibold w-3/6">Successful</span>
            : <span className="text-red-500 font-semibold w-3/6">Unsuccessful</span>}
            <span className="text-black w-1/6">${balance.toFixed(2)}</span>
        </div>
        </>
    )
}

export default TransactionFull