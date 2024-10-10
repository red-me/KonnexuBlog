import React from 'react'
export default function Sidebar(props) {

    const { path, controls, app, router, theme, handleClick } = props
    const {
        Card,
        Typography,
        List,
        ListItem,
        Button,
    } = controls

    const category = path[2] || ''
    const categories = app?.settings?.categories.filter(c=>c.active)

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-0 shadow-xl shadow-blue-gray-900/5">
            <div className='px-4 py-6 w-full'>
                <Button
                    style={theme.data.button_primary.style}
                    className={`${theme.data.button_primary.className} w-full flex items-center gap-2 justify-center`}
                    onClick={handleClick}
                >
                    <span className='text-2xl'>+</span> Create New Blog
                </Button>
            </div>
            <div className="mb-2 px-5 pt-4 border-t border-gray-200">
                <Typography variant="h5" color="blue-gray">
                    Categories
                </Typography>
            </div>
            <List className="p-2">
                {categories && categories.map(c => <ListItem style={{ background: category === c ? '#cccccc' : '' }} onClick={() => { router.push(`/${path[0]}/category/${c.id}`) }}>{c.name}</ListItem>)}
            </List>
        </Card>
    );
}