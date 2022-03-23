import {QueryConstraint, collection, CollectionReference, Firestore, setDoc, doc, SetOptions, getDocs, Query, where, query, deleteDoc, getDoc, DocumentReference, addDoc, updateDoc, UpdateData, PartialWithFieldValue, WithFieldValue, DocumentSnapshot, QuerySnapshot, writeBatch} from "firebase/firestore"
import {firestore} from "../firebase"

export class Repository {
  firestore: Firestore

  constructor(fireStore: Firestore){
    this.firestore = fireStore
  }

  createDocument<DocumentType>({
    path,
    data,
  }: CreateDocumentArguments<DocumentType>) {
    return addDoc<DocumentType>(
      collection(this.firestore, path) as CollectionReference<DocumentType>, 
      data, 
    );
  }

  updateDocument<DocumentType>({
    path,
    pathSegments,
    data,
  }: UpdateDocumentArguments<DocumentType>) {
    return updateDoc<DocumentType>(
      doc(this.firestore, path, ...pathSegments) as DocumentReference<DocumentType>, 
      data
    );
  }

  setDocument<DocumentType>({
    path,
    pathSegments,
    data,
    options,
  }: SetDocumentArguments<DocumentType>) {
    return setDoc<DocumentType>(
      doc(this.firestore, path, ...pathSegments) as DocumentReference<DocumentType>, 
      data, 
      {merge: true, ...options}
    );
  }

  deleteDocument({
    path,
    pathSegments,
  }: DeleteDocumentArguments){
    return deleteDoc(
      doc(this.firestore, path, ...pathSegments)
    );
  }

  deleteDocuments({
    refs,
  }: DeleteDocumentsArguments){
    const batch = writeBatch(this.firestore)
    refs.forEach(item => {
      batch.delete(item)
    })

    return batch.commit();
  }

  getDocument<DocumentType>({
    path,
    pathSegments,
  }: GetDocumentArguments){
    return getDoc<DocumentType>(
      doc(this.firestore, path, ...pathSegments) as DocumentReference<DocumentType>
    );
  }

  getDocuments<DocumentType>({
    path,
    queryConstraints
  }: GetDocumentsArguments){
    const columnRef = collection(this.firestore, path) as CollectionReference<DocumentType>
    const queryInstance = query(columnRef, ...queryConstraints)

    return getDocs<DocumentType>(queryInstance)
  }
}

export const repository = new Repository(firestore)

export type CreateDocumentReturn<DocumentType> = Promise<DocumentReference<DocumentType>>
export type UpdateDocumentReturn = Promise<void>
export type SetDocumentReturn = Promise<void>
export type DeleteDocumentReturn = Promise<void>
export type GetDocumentReturn<DocumentType> = Promise<DocumentSnapshot<DocumentType>>
export type GetDocumentsReturn<DocumentType> = Promise<QuerySnapshot<DocumentType>>

export type CreateDocumentData<DocumentType> = Awaited<CreateDocumentReturn<DocumentType>>
export type UpdateDocumentData = Awaited<UpdateDocumentReturn>
export type SetDocumentData = Awaited<SetDocumentReturn>
export type DeleteDocumentData = Awaited<DeleteDocumentReturn>
export type GetDocumentData<DocumentType> = Awaited<GetDocumentReturn<DocumentType>>
export type GetDocumentsData<DocumentType> = Awaited<GetDocumentsReturn<DocumentType>>

export type CreateDocumentArguments<DocumentType> = {
  path: string
  data: WithFieldValue<DocumentType>
}
export type UpdateDocumentArguments<DocumentType> = {
  path: string
  pathSegments:string[]
  data: UpdateData<DocumentType>
}
export type SetDocumentArguments<DocumentType> = {
  path: string
  pathSegments:string[]
  data: PartialWithFieldValue<DocumentType>
  options?: SetOptions
}
export type DeleteDocumentArguments = {
  path: string
  pathSegments:string[]
}
export type DeleteDocumentsArguments = {
  refs: DocumentReference[]
}
export type GetDocumentArguments = {
  path: string
  pathSegments:string[]
}
export type GetDocumentsArguments = {
  path: string
  queryConstraints: QueryConstraint[]
}