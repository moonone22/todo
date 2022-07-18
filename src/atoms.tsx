import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
  });

export enum Categories{
"TO_DO" = "TO_DO",
"DOING" = "DOING",
"DONE" = "DONE",

}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
  }

export const categoryState = atom<Categories>({
  key:"category",
  default: Categories.TO_DO
})


//새로 추가하는 toDo들이 모두 toDoState에 있다
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom], 
  });


  //toDo를 보려고 할때는 selector을 이용
  export const toDoSelector = selector ({
    key:"toDoSelector",
    get:({get}) => {
      const toDos = get(toDoState);
      const category =get (categoryState);
      
      return toDos.filter((toDo) => toDo.category === category)
    }
  });
  