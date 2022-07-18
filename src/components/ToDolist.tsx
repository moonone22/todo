
import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, IToDo, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";




function ToDoList() {
  //현재 toDos의 type은 IToDo[] 
  //(typescript는 toDoState으로 인해 자동으로 useRecoilState(여기값을) type으로 생각)
  //const toDos= useRecoilValue(toDoState);
  // 변수 toDos의 값으로 atoms의 default값을 가져온다
  const toDos = useRecoilValue(toDoSelector);
  const [category, setcategory] = useRecoilState(categoryState)
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setcategory(event.currentTarget.value as any);
  }
  
  return (
    <div>

        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      

      <CreateToDo />    
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      
      
    </div>
  );
}

export default ToDoList;