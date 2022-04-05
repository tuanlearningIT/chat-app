
import { useEffect, useState } from "react"
import { db } from "../firebase/config"


const UseFirestores = (collection, condittion) => {
    const [documents, setDocuments] = useState([])
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt')

        //condittion
        /**
         * {
         * fieldName: 'abc'
         * operator: '=='
         * compareValue: 'abc'
         * 
         * }
         */
        if (collection) {
            if (!condittion.compareValue || !condittion.compareValue.length) {
                return;
            }
            collectionRef = collectionRef.where(
                condittion.fieldName,
                condittion.operator,
                condittion.compareValue
            )
        }
        const unsubscibed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(documents)
        })
        return unsubscibed
    }, [collection, condittion])
    return documents;
}

export default UseFirestores;