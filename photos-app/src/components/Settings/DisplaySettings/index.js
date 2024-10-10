
import React from 'react'


import SettingRow from "../SettingRow"


function index(props) {
    const { SelectMultiple, SelectOne, Toastify } = props.components

    const { Bounce, toast } = Toastify;


    const { Switch, Input, Button } = props.controls;
    const { hostReact, query, mutate, app, isLoading } = props
    const { settings } = props.app
    const displaySettings = settings.displaySettings;

    const paginationTypes = [
        { id: 'scroll-to-bottom', name: "Scroll to bottom", description: "Scrolling to the bottom of the list will load more items if available." },
        { id: 'previous-next', name: "Use Next / Previous Buttons", description: "Pressing the Previous or Next button will navigate to a page before or after the current page" },
        { id: 'page-number', name: "Use Page Numbers", description: "Pressing the page number will load the items for the selected page." }
    ]

    const [paginationType, setPaginationType] = hostReact.useState(displaySettings?.paginationType || null)
    const [allowCategorySelection, setAllowCategorySelection] = hostReact.useState(displaySettings?.allowCategorySelection || null)
    const [editPhotoAfterUpload, setEditPhotoAfterUpload] = hostReact.useState(displaySettings?.editPhotoAfterUpload || null)
    /* const [autoRefreshFeaturedPhotos, setAutoRefreshFeaturedPhotos] = hostReact.useState(displaySettings?.autoRefreshFeaturedPhotos || null) */



    /*   const SelectOneSettingRow = ({ label, description, source, fieldName, setter, listItems, idField, textField, descriptionField }) => {
          return <SettingRow label={label} description={description} >
              <SelectOne className="w-full" items={listItems} idField={idField} textField={textField} descriptionField={descriptionField} selectedValue={source[fieldName]} setSelectedValue={setPaginationType}
              ></SelectOne>
          </SettingRow>
      } */


    const saveDisplaySettings = () => {
        const displaySettingsData = {
            paginationType,
            allowCategorySelection,
            editPhotoAfterUpload,
            /* autoRefreshFeaturedPhotos */
        }
        const newSettings = { ...settings, displaySettings: displaySettingsData }

        mutate('update', {
            where: { id: app.id },
            data: { settings: newSettings }
        }).then(result => {
            if (result.id)
                toast.success('Display Settings updated successfully.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            else toast.error('Failed to update.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })

    }

    return (
        <div className='p-4   flex flex-col gap-4'>
            <div className='flex flex-row items-center gap-4 bg-gray-50 p-6 rounded shadow-sm  justify-end'>
                <Button loading={isLoading} color={"blue"} variant="gradient" onClick={() => { saveDisplaySettings() }}>Save Settings</Button></div>

            <SettingRow label={"Pagination Style"} description={"Defines how items are shown on the screen"}>
                <SelectOne className="w-full" items={paginationTypes} idField={"id"} textField={"name"} descriptionField={"description"} selectedValue={paginationType} setSelectedValue={setPaginationType}
                ></SelectOne>
            </SettingRow>

            <SettingRow label={"Allow Selection of Categories"} description={"Enable this feature to give users the option to select categories directly while uploading photos."}>
                <Switch checked={allowCategorySelection} onChange={() => { setAllowCategorySelection(v => !v) }} />
            </SettingRow>


            <SettingRow label={"Edit Photos After Upload"} description={"Enable this option if you want users to edit the batch of photos they had just recently updated."}>
                <Switch checked={editPhotoAfterUpload} onChange={() => { setEditPhotoAfterUpload(v => !v) }} />
            </SettingRow>


           {/*  <SettingRow label={"AJAX Refresh Featured Photos"} description={"With this option enabled photos within the \"Featured Photo\" block will refresh."}>
                <Switch checked={autoRefreshFeaturedPhotos} onChange={() => { setAutoRefreshFeaturedPhotos(v => !v) }} />
            </SettingRow> */}



            <SettingRow label={"Display User Profile Photos within Gallery"} description={"Disable this feature if you do not want to display user profile photos within the photo gallery."}>
                <Switch />
            </SettingRow>



            <SettingRow label={"Display User Cover Photos within Gallery"} description={"Disable this feature if you do not want to display user cover photos within the photo gallery."}>
                <Switch />
            </SettingRow>



            <SettingRow label={"Display photos/albums which created in Group to the Photo app"} description={"Enable to display all public photos/albums created in Group to Photos app. Disable to hide them."}>
                <Switch />
            </SettingRow>


            <SettingRow label={"Display User Timeline Photos within Gallery"} description={"Disable this feature if you do not want to display user timeline photos within the photo gallery."}>
                <Switch />
            </SettingRow>



            <SettingRow label={"Allow posting on Main Feed"} description={"Allow posting on Main feed when adding a new photo/album."}>
                <Switch />
            </SettingRow>



            <SettingRow label={"Photo Meta Description"} description={"Meta description added to pages related to the Photo app."}>
                <Input />
            </SettingRow>



        </div>
    )
}

export default index