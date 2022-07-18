import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

//ToDO 컴포넌트는 text,id,category 3개의 prop이 필요하다
            

            //ToDo( {text} :{text:string} ) type이 {text:string}이면
            //  <ToDo key={toDo.id} text={toDo.text}/> 가능하고

            //ToDo( {text} : IToDo ) type이 IToDo라면
            //  <ToDo key={toDo.id} {...toDo}/> 모든 속성값을 보내야한다.
            //{...toDo} 는 text={toDo.text} id={} category={} 의 축약형이다

             //{text} = {text : toDo의text값} 를 말한다.
             // text = toDo의text값
function ToDo( {text,category,id}  : IToDo ) {
    //console.lg(text,id) 현재 카테고리의 전체 text와 id
    const setToDos =useSetRecoilState(toDoState)
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) =>{
            const {currentTarget:{name}} =event;
            console.log(id);//클릭된 li의 text와 id 
            setToDos(oldToDos =>{
              
              const targetIndex = oldToDos.findIndex((toDo=>toDo.id===id))
                                         //findIndex 함수는 배열의 요소를 순차적으로 순회하면서 조건에 일치하는 요소의 인덱스를 반환합니다.
                                        //조건을 일치하는 경우가 없다면, -1을 반환합니다.
              const oldToDo = oldToDos[targetIndex];
              const newToDo = {text, id , category:name as any}
              return [
                ...oldToDos.slice(0,targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1)
              ];
            })
    }

  //삭제버튼
   const deletClick = (event:React.MouseEvent<HTMLButtonElement>) => {
      setToDos(oldToDos => {
        const targetIndex = oldToDos.findIndex((toDo=>toDo.id===id))
        
        return[
          ...oldToDos.slice(0,targetIndex),
          ...oldToDos.slice(targetIndex+1)
        ]
      })
   }

  return (
    <li id={id+""}>
      
      <span>{text}</span>
      {category !== Categories.TO_DO && <button name={Categories.TO_DO + ""} onClick={onClick}>TO Do</button>}
      {category !== Categories.DOING && <button name={Categories.DOING + "" } onClick={onClick}> Doing</button>}
      {category !== Categories.DONE && <button name={Categories.DONE + ""} onClick={onClick}>Done</button>}
      <button onClick={deletClick}>X</button>
      

    </li>

  );
}

export default ToDo;