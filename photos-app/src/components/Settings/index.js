import React from 'react'

import Tabs from "./Tabs"
import DisplaySettings from "./DisplaySettings"
import UserGroupSettings from "./UserGroupSettings"
import CategorySettings from "./CategorySettings"

const index = props => {

  const { app, path, hostReact } = props
  // path = ROOT_URL/admincp/apps/${APP_NAME}/settings/



  //TODO: 3 tabs: Display, User Groups, Categories

  const tabLabels = ["Display", "User Groups", "Categories"];

  const contents = [
    <DisplaySettings {...props}></DisplaySettings>,
    <UserGroupSettings {...props}></UserGroupSettings>,
    <CategorySettings {...props}></CategorySettings>,

  ]

  let initialActiveIndex = 0;
  const app_name_path_index = path.findIndex(p => p.toLowerCase() === app.name.toLowerCase());

  if (path.length > app_name_path_index + 2) {

    //there are 2 more slugs after /app --> /app/settings/some-slug

    const slug3 = path[app_name_path_index + 2].toLowerCase();

    if (slug3 === 'display') initialActiveIndex = 0;
    else if (slug3 === 'usergroups') initialActiveIndex = 1;
    if (slug3 === 'categories') initialActiveIndex = 2;
  }


  const [appSettingsPaths, setAppSettingsPaths] = hostReact.useState(path)
  const [appSettingsIndex, setAppSettingsIndex] = hostReact.useState([])
  const onChange = (index) => {

    setAppSettingsIndex(index)
    setAppSettingsPaths(['', ...path.slice(0, path.findIndex(c => c === app.name) - 1), app.name, 'settings', tabLabels[index].toLowerCase().replace(" ", '')])

  }
  hostReact.useEffect(() => {
    if (appSettingsPaths.indexOf('admincp') === -1) {
      //use only outside admincp?
      window.history.replaceState(null, `Settings > ${tabLabels[index]}`, appSettingsPaths.join("/"))
    }
  }, [appSettingsPaths])

  return (
    <>
      <div className="shadow bg-white border rounded-lg m-4 min-h-64">
        <div className="px-4 py-8">
          <Tabs {...props} onChange={onChange} initialActiveIndex={initialActiveIndex} highlight={"bg-blue-500"} labels={tabLabels} contents={contents}></Tabs>
        </div>
      </div>

    </>
  )
}



export default index