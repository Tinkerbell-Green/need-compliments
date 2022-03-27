import type {NextPage} from "next"
import {Tabs} from "components/moleculs/tabs";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutCenter} from "components/templates/layout-center"

const EffectPage: NextPage = () => {
  return (
    <LayoutCenter>
      <Tabs/>
      <FeedPublic/>
    </LayoutCenter>
  )}

export default EffectPage