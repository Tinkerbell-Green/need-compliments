import {QueryConstraint, where} from "firebase/firestore"
import {ComplimentData, ComplimentDocument} from "stores/data/types"
import {GetDocumentsData, Repository} from "utils/firebase"

export const getTasksComplimentsMap = async ({
  tasks,
  repository,
}: {
  tasks: string[]
  repository: Repository
}) => {
  const map = new Map<string, ComplimentData[]>()

  try {
    tasks.forEach(async (task)=>{
      const queryConstraints: QueryConstraint[] = []
      queryConstraints.push(where("task", "==", task))

      const response: GetDocumentsData<ComplimentDocument> = await repository.getDocuments({
        path: "compliments",
        queryConstraints,
      }) 

      const complimentData: ComplimentData[] = response.docs.map(item => ({
        id: item.id,
        ...item.data()
      }))

      map.set(task, complimentData)
    })

    return map
  }
  catch(error) {
    console.error(error)
    return map
  }
}