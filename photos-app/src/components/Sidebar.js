import React from "react";
/* import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react"; */


export default function Sidebar(props) {



    const { path, query, hostReact, controls, app, router } = props
    const {
        Card,
        Typography,
        List,
        ListItem,

    } = controls

    const category = path[2] || ''
    const categories = app?.settings?.categories.filter(c=>c.active)
    //  hostReact.useEffect(() => {

    /*   if (query)
          try {
              query('app', {
                  where: { name: "photo" }
              }).then(app => {
  
  
                  setCats(app[0].settings.categories)
              })
          } catch (error) {
              console.log(error)
          }
   */
    //}, [query])



    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-0 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-2">
                <Typography variant="h5" color="blue-gray">
                    Categories
                </Typography>
            </div>
            <List>
                {categories && categories.map(c => <ListItem style={{ background: category === c ? '#cccccc' : '' }} onClick={() => { router.push(`/${path[0]}/category/${c.name}`) }}>{c.name}</ListItem>)}


            </List>
        </Card>
    );
}