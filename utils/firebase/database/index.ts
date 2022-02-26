// ref about general usage in 한글
// https://kyounghwan01.github.io/blog/etc/firebase/#firestore-database-crud

// ref about using TS with firestore
// https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945

import {getFirestore, QueryConstraint, collection, CollectionReference, Firestore, setDoc, doc, SetOptions, getDocs, Query, where, query, deleteDoc, getDoc, DocumentReference} from "firebase/firestore"

export class Database {
  private db: Firestore
  
  constructor(){
    this.db = getFirestore()
  }

  async setDocument<DocumentType>({
    path,
    pathSegments,
    data,
    options,
  }: {
    path: string
    pathSegments:string[]
    data: DocumentType
    options?: SetOptions
  }) {
    return await setDoc(
      doc(this.db, path, ...pathSegments), 
      data, 
      {merge: true, ...options}
    );
  }

  async deleteDocument({
    path,
    pathSegments,
  }: {
    path: string
    pathSegments:string[]
  }){
    return await deleteDoc(
      doc(this.db, path, ...pathSegments)
    );
  }

  async getDocument<DocumentType>({
    path,
    pathSegments,
  }: {
    path: string
    pathSegments:string[]
  }){
    return await getDoc<DocumentType>(
      doc(this.db, path, ...pathSegments) as DocumentReference<DocumentType>
    );
  }

  async getDocuments<DocumentType>({
    path,
    queryConstraints
  }: {
    path: string
    queryConstraints: QueryConstraint[]
  }){
    const columnRef = collection(this.db, path) as CollectionReference<DocumentType>
    const queryInstance = query(columnRef, ...queryConstraints)

    return await getDocs<DocumentType>(queryInstance)
  }
}

export const database = new Database()