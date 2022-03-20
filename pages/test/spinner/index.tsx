import type {NextPage} from "next"
import {Snackbar} from "components/atoms/snackbar";
import {Spinner} from "components/atoms/spinner";
import {LayoutCenter} from "components/templates/layout-center"

const TestSpinnerPage: NextPage = () => {
  return (
    <LayoutCenter>
      <Snackbar  type="error" duration={20000} label="snackbar, here!"></Snackbar>
      <Snackbar type="information" duration={16000} label="snackbar, here!"></Snackbar>
      <Snackbar  type="success" duration={12000}label="snackbar, here!"></Snackbar>
      <Snackbar  type="warning" label="snackbar, here!"></Snackbar>
      <Spinner 
        text={"🧚‍♀️ 환영합니다 🧚‍♀️"} 
        color="skyblue"></Spinner>
    </LayoutCenter>
  )}

export default TestSpinnerPage