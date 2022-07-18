import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
  }
  
//CreateToDo 컴포넌트에서는 
//useForm 사용해서 input을검사하고 오류가 없다면 value값을 
//setToDos로 atoms에 state 값을 바꿔준다


function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState)
    const category  = useRecoilValue(categoryState);
    const {register,handleSubmit,setValue} = useForm<IForm>();
    //toDo는 input의 value값이 들어온다 toDo:value 
    
    const handleValid = ({ toDo }: IForm) => {
        //oldToDos에는  함수의 인자로 이전 toDos 즉 이전 state값이 들어온다 
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
    ...oldToDos,
    ]);
    //input "toDo"를 "" 값으로 한다 
    setValue("toDo", "");
    
};

    return (
      
        // /* handleSubmit은 인자를 딱한개 받느다 (onVaild 함수)
        //               onVaild함수는 나의 form 데이터가 유효할때 호출 (즉 input값이 오류가 없다면 호출) */};
      <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
    );
}
export default CreateToDo ;