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
    const {
        Card,
        Typography,
        List,
        ListItem,

    } = props.controls
    const { path } = props
    const categories = ["Anthro",
        "Artisan Crafts",
        "Cartoons & Comics",
        "Comedy",
        "Community Projects",
        "Contests",
        "Customization",
        "Designs & Interfaces",
        "Digital Art",
        "Fan Art",
        "Film & Animation",
        "Fractal Art",
        "Game Development Art",
        "Literature",
        "People",
        "Pets & Animals",
        "Photography",
        "Resources & Stock Images",
        "Science & Technology",
        "Sports",
        "Traditional Art"]
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-0 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-2">
                <Typography variant="h5" color="blue-gray">
                    Categories
                </Typography>
            </div>
            <List>
                {categories.map(c => <ListItem>{c}</ListItem>)}


            </List>
        </Card>
    );
}