import type {NextPage} from "next"
import {Snackbar} from "components/atoms/snackbar";
import {Spinner} from "components/atoms/spinner";
import {LayoutCenter} from "components/templates/layout-center"

const TestSpinnerPage: NextPage = () => {
  return (
    <LayoutCenter>
      <Snackbar visible onClose={()=>console.log("snackbar close")} type="error" duration={20000} message="snackbar, here!"></Snackbar>
      <Spinner 
        text={"🧚‍♀️ 환영합니다 🧚‍♀️"} 
        color="skyblue"></Spinner>
    </LayoutCenter>
  )}

export default TestSpinnerPage