import { initializeApp } from "firebase/app";
import './styles/index.css'
import { addDoc, collection, getDoc, getDocs, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDyNrfM-4wIJo97m2lIAQ7s6cDqD_C3-pI",
    authDomain: "reactfirebase-f52a8.firebaseapp.com",
    projectId: "reactfirebase-f52a8",
});

export const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    const db = getFirestore(firebaseApp);
    const userCollectionRef = collection(db, 'users');

    async function createUsers(){
        const user = await addDoc(userCollectionRef, {
            name, email,
        })
        console.log(user)
    }

    async function deleteUser(id){
        const userDoc = doc(db, 'users', id);
        await deleteDoc(userDoc);

    }

    useEffect(()=>{
        const getUsers = async ()=>{
            const data = await getDocs(userCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getUsers();
    }, [])

    return (
        <div className="container">
            <div className="form">
                <h1>Cadastrar Usuário</h1>
                <input type="text" placeholder="name..." value={name} onChange={(e) => setName(e.target.value)}/> <br />
                <input type="text" placeholder="e-mail..." value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
                <button onClick={createUsers}>Criar Usuário</button>
            </div>
            <ul>
                {
                    users.map(user =>{
                        return (
                            <div className="list">
                                <li>Nome:  {user.name}</li>
                                <li>E-mail: {user.email}</li>
                                <button className="delete" onClick={()=>{
                                    deleteUser(user.id)
                                }}>
                                    deletar user
                                </button>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    );
}